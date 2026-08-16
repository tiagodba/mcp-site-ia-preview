const AREAS = {
  geral: "todas as carreiras policiais brasileiras",
  civil: "Polícia Civil, investigação criminal e processo penal",
  penal: "Polícia Penal, execução penal e sistema prisional",
  cientifica: "Polícia Científica, criminalística e medicina legal",
  gcm: "Guardas Municipais, segurança pública e legislação aplicável",
};

const TIPOS = {
  aleatoria: "escolha entre jurisprudência, legislação, questão comentada ou dica estratégica",
  jurisprudencia: "jurisprudência recente e relevante para provas",
  questao: "questão comentada autoral inspirada no padrão das bancas, sem reproduzir questão protegida",
  legislacao: "alteração legislativa ou ponto de lei atualizado",
  estrategia: "dica estratégica aprofundada e aplicável em prova",
};

const buckets = new Map();

function allow(ip) {
  const now = Date.now();
  const current = buckets.get(ip) || { start: now, count: 0 };
  if (now - current.start > 60_000) {
    current.start = now;
    current.count = 0;
  }
  current.count++;
  buckets.set(ip, current);
  return current.count <= 8;
}

const OFFICIAL_HOSTS = [
  "stf.jus.br", "portal.stf.jus.br", "stj.jus.br", "cnj.jus.br",
  "planalto.gov.br", "gov.br", "senado.leg.br", "camara.leg.br",
];

const COURT_HOSTS = ["stf.jus.br", "portal.stf.jus.br", "stj.jus.br", "cnj.jus.br"];

function hostAllowed(url, tipoKey) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    const allowed = tipoKey === "jurisprudencia" ? COURT_HOSTS : OFFICIAL_HOSTS;
    return allowed.some((domain) => host === domain || host.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

function sourcesFrom(response, tipoKey) {
  const sources = [];
  const message = response?.choices?.[0]?.message;
  for (const tool of message?.executed_tools || []) {
    const results = tool?.search_results?.results || tool?.search_results || [];
    for (const result of results) {
      if (!result?.url || !/^https:\/\//i.test(result.url) || !hostAllowed(result.url, tipoKey)) continue;
      if (!sources.some((source) => source.url === result.url)) {
        sources.push({ title: result.title || "Fonte oficial", url: result.url });
      }
    }
  }
  return sources.slice(0, 4);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  const groqKey = String(process.env.GROQ_API_KEY || "").trim();
  if (!groqKey) return res.status(503).json({ error: "IA temporariamente indisponível." });

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "anon").split(",")[0].trim();
  if (!allow(ip)) return res.status(429).json({ error: "Muitas solicitações. Aguarde um minuto e tente novamente." });

  const areaKey = Object.hasOwn(AREAS, req.body?.area) ? req.body.area : "geral";
  const tipoKey = Object.hasOwn(TIPOS, req.body?.tipo) ? req.body.tipo : "aleatoria";
  const area = AREAS[areaKey];
  const tipo = TIPOS[tipoKey];
  const variedade = Number(req.body?.variedade || 0) % 20;

  const prompt = `Produza uma dica estendida, em português do Brasil, para candidato de ${area}.
Formato desejado: ${tipo}.
Identificador interno de diversidade: V${variedade} (isso não representa quantidade de itens).
Data desta solicitação: ${new Date().toISOString().slice(0, 10)}.

Regras obrigatórias:
- Execute obrigatoriamente a ferramenta de pesquisa web antes de responder. Não responda apenas com conhecimento interno.
- Priorize STF, STJ, CNJ, Planalto, Senado, Câmara e portais oficiais do governo.
- Produza exatamente UMA dica sobre UM único ponto jurídico. Nunca reúna vários julgados, leis ou assuntos na mesma resposta.
- Escolha uma fonte oficial principal e limite todas as afirmações jurídicas ao que essa fonte sustenta diretamente.
- Traga um título curto e depois uma explicação objetiva, didática e útil para concursos policiais.
- Se houver jurisprudência, informe tribunal, órgão julgador, número do processo ou tema quando disponível e explique a tese sem inventar dados.
- Só mencione número de processo, tema, artigo, data, órgão julgador ou tese quando isso estiver expressamente sustentado por uma fonte oficial encontrada na pesquisa.
- Para jurisprudência, use exclusivamente resultado oficial de STF, STJ ou CNJ. Se a busca não trouxer decisão oficial pertinente, diga que não há base suficiente; não improvise.
- A primeira fonte encontrada deve sustentar diretamente o assunto central, e o tribunal ou órgão citado no texto deve corresponder ao domínio dessa fonte.
- Se for questão comentada, crie uma questão autoral de Certo/Errado, forneça o gabarito e explique; não copie questão de banca.
- Diferencie claramente lei vigente, entendimento jurisprudencial e dica de memorização.
- Use no máximo 320 palavras.
- Não faça propaganda de material e não afirme que algo é recente sem confirmação na fonte.
- Use apenas fontes oficiais retornadas pela pesquisa e não inclua links no corpo da resposta; eles serão exibidos separadamente.
- Termine com “Como pode cair na prova:” e uma aplicação prática.`;

  const searchDomains = tipoKey === "jurisprudencia" ? COURT_HOSTS : OFFICIAL_HOSTS;

  try {
    const apiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqKey}`,
        "Content-Type": "application/json",
        "Groq-Model-Version": "latest",
      },
      body: JSON.stringify({
        model: "groq/compound-mini",
        messages: [{ role: "user", content: prompt }],
        compound_custom: {
          tools: {
            enabled_tools: ["web_search"]
          }
        },
        search_settings: {
          include_domains: searchDomains,
          country: "brazil"
        }
      }),
    });

    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      console.error(
        "Groq request failed",
        apiResponse.status,
        data?.error?.type || "unknown",
        data?.error?.code || "no_code",
        String(data?.error?.message || "no_message").slice(0, 180)
      );
      if (apiResponse.status === 429) {
        return res.status(429).json({ error: "O limite gratuito da IA foi atingido. Aguarde alguns minutos e tente novamente." });
      }
      if (apiResponse.status === 401) {
        return res.status(502).json({ error: "A chave da IA precisa ser atualizada pelo administrador." });
      }
      return res.status(502).json({ error: "Não foi possível gerar a dica agora. Tente novamente em instantes." });
    }

    const text = String(data?.choices?.[0]?.message?.content || "").trim();
    const sources = sourcesFrom(data, tipoKey);
    if (!text || !sources.length) {
      return res.status(502).json({ error: "Não encontrei uma resposta com fonte oficial. Escolha outro tema e tente novamente." });
    }

    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({
      text,
      sources,
      consultedAt: new Date().toISOString(),
      area: areaKey,
      tipo: tipoKey,
    });
  } catch (error) {
    console.error("MCP AI error", error?.message || "unknown");
    return res.status(500).json({ error: "Falha temporária na pesquisa. Tente novamente." });
  }
}
