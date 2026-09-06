const N8N_WEBHOOK = 'https://tiagoteixeira.app.n8n.cloud/webhook/mcp-lead-site';
const SITE = 'https://materiais-carreiras-policiais.vercel.app';

function materialFor(concurso) {
  const mapa = {
    'GCM Paracatu': {
      titulo: 'Reta Final GCM Paracatu',
      url: SITE + '/reta-final-gcm-paracatu.html',
      texto: 'Acesse a central de Reta Final da GCM Paracatu com materiais gratuitos e conteúdos direcionados.'
    },
    'Polícia Penal': {
      titulo: 'Central Polícia Penal RN 2026',
      url: SITE + '/policia-penal-rn-2026.html',
      texto: 'Acesse a central de Polícia Penal com materiais, questões e conteúdos de reta final.'
    },
    'GCM Caldas Novas': {
      titulo: 'Materiais GCM Caldas Novas',
      url: SITE + '/#materiais',
      texto: 'Confira os materiais e atualizações disponíveis para Guarda Municipal.'
    },
    'Polícia Civil': {
      titulo: 'Materiais para Polícia Civil',
      url: SITE + '/#materiais',
      texto: 'Confira apostilas, questões, mapas e materiais disponíveis para Polícia Civil.'
    },
    'Polícia Científica': {
      titulo: 'Materiais para Polícia Científica',
      url: SITE + '/#materiais',
      texto: 'Confira conteúdos de perícia, cadeia de custódia, medicina legal e criminalística.'
    },
    'PM / Bombeiros': {
      titulo: 'Materiais para PM e Bombeiros',
      url: SITE + '/#materiais',
      texto: 'Confira os materiais disponíveis para carreiras militares.'
    },
    'Outro concurso policial': {
      titulo: 'Materiais Carreiras Policiais',
      url: SITE + '/#materiais',
      texto: 'Confira a central de materiais MCP e escolha sua carreira.'
    }
  };
  return mapa[concurso] || mapa['Outro concurso policial'];
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const nome = String(body.nome || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().toLowerCase().slice(0, 180);
    const concurso = String(body.concurso || '').trim().slice(0, 180);
    const consentimento = body.consentimento === true;

    if (!nome || !email || !concurso) {
      return res.status(400).json({ ok: false, error: 'Preencha nome, e-mail e concurso.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Informe um e-mail válido.' });
    }
    if (!consentimento) {
      return res.status(400).json({ ok: false, error: 'É necessário autorizar o envio do material por e-mail.' });
    }

    const material = materialFor(concurso);
    const nomeSeguro = escapeHtml(nome);
    const concursoSeguro = escapeHtml(concurso);
    const tituloSeguro = escapeHtml(material.titulo);
    const textoSeguro = escapeHtml(material.texto);

    const assuntoEmail = `Seu material MCP - ${concurso}`;
    const emailHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:auto;color:#0a2443">
        <div style="background:#03162f;padding:24px;border-radius:12px 12px 0 0;color:#fff;text-align:center">
          <img src="https://materiais-carreiras-policiais.basegpt2.chatgpt.site/logo-mcp.png" alt="MCP Materiais Carreiras Policiais" width="110" style="display:block;width:110px;max-width:110px;height:auto;margin:0 auto 14px">
          <div style="font-size:12px;letter-spacing:2px;color:#efbd26;font-weight:700">MCP • MATERIAIS CARREIRAS POLICIAIS</div>
          <h2 style="margin:10px 0 0;font-size:28px">Olá, ${nomeSeguro}!</h2>
        </div>
        <div style="border:1px solid #dce1e7;border-top:0;padding:26px;border-radius:0 0 12px 12px">
          <p style="font-size:16px;line-height:1.6">Obrigado pelo interesse nos materiais do MCP.</p>
          <p style="font-size:16px;line-height:1.6">Você informou interesse em <strong>${concursoSeguro}</strong>.</p>
          <div style="background:#f4f6f9;border-left:4px solid #efbd26;padding:18px;margin:22px 0">
            <strong style="font-size:18px">${tituloSeguro}</strong>
            <p style="margin:8px 0 0;line-height:1.5">${textoSeguro}</p>
          </div>
          <p style="text-align:center;margin:28px 0">
            <a href="${material.url}" style="display:inline-block;background:#efbd26;color:#062a5d;text-decoration:none;font-weight:800;padding:14px 22px;border-radius:7px">IR DIRETO AOS MATERIAIS</a>
          </p>
          <p style="font-size:13px;color:#6c7581;line-height:1.5">Você recebeu esta mensagem porque solicitou material no site do MCP.</p>
        </div>
      </div>`;

    const payload = {
      nome,
      email,
      concurso,
      consentimento: true,
      assuntoEmail,
      emailHtml,
      materialTitulo: material.titulo,
      materialUrl: material.url,
      origem: 'site-mcp',
      pagina: String(body.pagina || '').slice(0, 300),
      recebidoEm: new Date().toISOString()
    };

    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const txt = await response.text().catch(() => '');
      console.error('n8n webhook error', response.status, txt);
      return res.status(502).json({ ok: false, error: 'Não foi possível registrar sua solicitação agora.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('lead endpoint error', error);
    return res.status(500).json({ ok: false, error: 'Erro interno ao processar a solicitação.' });
  }
}
