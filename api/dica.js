const AREAS = {
  geral: "todas as carreiras policiais brasileiras",
  civil: "Polícia Civil, investigação criminal e processo penal",
  penal: "Polícia Penal, execução penal e sistema prisional",
  cientifica: "Polícia Científica, criminalística e medicina legal",
  gcm: "Guardas Municipais, segurança pública e legislação aplicável",
};
const TIPOS = {
  aleatoria: "dica estratégica de estudo, revisão ou resolução de questões, sem citar números de leis, artigos ou processos",
  jurisprudencia: "jurisprudência recente e relevante para provas",
  questao: "questão comentada autoral inspirada no padrão das bancas, sem reproduzir questão protegida",
  legislacao: "alteração legislativa ou ponto de lei atualizado",
  estrategia: "dica estratégica aprofundada e aplicável em prova",
};
const OFFICIAL_HOSTS=["stf.jus.br","portal.stf.jus.br","stj.jus.br","cnj.jus.br","planalto.gov.br","gov.br","senado.leg.br","camara.leg.br"];
const COURT_HOSTS=["stf.jus.br","portal.stf.jus.br","stj.jus.br","cnj.jus.br"];
function hostAllowed(url,tipoKey){try{const host=new URL(url).hostname.toLowerCase();const allowed=tipoKey==="jurisprudencia"?COURT_HOSTS:OFFICIAL_HOSTS;return allowed.some(d=>host===d||host.endsWith(`.${d}`))}catch{return false}}
function cleanKey(v){return String(v||"").trim().replace(/^Bearer\s+/i,"").replace(/^['\"]|['\"]$/g,"").trim()}
function geminiResult(data,tipoKey){const parts=[],sources=[];for(const step of data?.steps||[]){if(step?.type!=="model_output")continue;for(const b of step.content||[]){if(b?.type!=="text")continue;if(b.text)parts.push(b.text);for(const c of b.annotations||[]){if(c?.type!=="url_citation"||!hostAllowed(c.url,tipoKey))continue;if(!sources.some(s=>s.url===c.url))sources.push({title:c.title||"Fonte oficial",url:c.url})}}}return{text:parts.join("\n\n").trim(),sources:sources.slice(0,4)}}
function tavilyReply(text,sources,areaKey,tipoKey){return {text:text+"\n\n**Como pode cair na prova:** revise o ponto central e confira as fontes oficiais abaixo.",sources,consultedAt:new Date().toISOString(),area:areaKey,tipo:tipoKey,provider:"tavily-fallback"}}
export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({error:"Método não permitido."});
 const geminiKey=cleanKey(process.env.GEMINI_API_KEY),tavilyKey=cleanKey(process.env.TAVILY_API_KEY||process.env.TAVLY_API_KEY),groqKey=cleanKey(process.env.GROQ_API_KEY);
 if(!tavilyKey&&!geminiKey&&!groqKey)return res.status(503).json({error:"IA temporariamente indisponível."});
 const areaKey=Object.hasOwn(AREAS,req.body?.area)?req.body.area:"geral",tipoKey=Object.hasOwn(TIPOS,req.body?.tipo)?req.body.tipo:"aleatoria",area=AREAS[areaKey],tipo=TIPOS[tipoKey],variedade=Number(req.body?.variedade||0)%20,aprofundado=["jurisprudencia","questao"].includes(tipoKey);
 const prompt=`Produza uma dica estendida, em português do Brasil, para candidato de ${area}. Formato: ${tipo}. Diversidade V${variedade}. Data: ${new Date().toISOString().slice(0,10)}. Use somente as fontes oficiais fornecidas no contexto. ${aprofundado?"Explique fundamento, requisitos, exceções e impacto para prova, sem inventar dados.":"Produza uma única dica objetiva sobre um único ponto."} Não inclua links no corpo. Termine com “Como pode cair na prova:” e uma aplicação prática.`;
 const searchDomains=tipoKey==="jurisprudencia"?COURT_HOSTS:OFFICIAL_HOSTS;
 let tavilySources=[],tavilyContext="",tavilyFallback="";
 try{
  if(tavilyKey){try{const q=tipoKey==="jurisprudencia"?`jurisprudência STF STJ CNJ ${area}`:`conteúdo oficial concursos ${area}`;const r=await fetch("https://api.tavily.com/search",{method:"POST",headers:{Authorization:`Bearer ${tavilyKey}`,"Content-Type":"application/json"},body:JSON.stringify({query:q,search_depth:aprofundado?"advanced":"basic",max_results:aprofundado?8:4,include_answer:"advanced",include_raw_content:false,include_domains:searchDomains,country:"brazil"})});const d=await r.json();if(r.ok){const valid=(d.results||[]).filter(x=>x?.url&&hostAllowed(x.url,tipoKey));tavilySources=valid.map(x=>({title:x.title||"Fonte oficial",url:x.url})).filter((x,i,a)=>a.findIndex(y=>y.url===x.url)===i).slice(0,4);tavilyContext=valid.map(x=>String(x.content||"").trim()).filter(Boolean).slice(0,aprofundado?6:3).join("\n\n").slice(0,aprofundado?9000:4500);tavilyFallback=String(d.answer||"").trim();if(!tavilyFallback&&tavilyContext)tavilyFallback=tavilyContext.slice(0,aprofundado?5000:2200)}else console.error("Tavily request failed",r.status)}catch(e){console.error("Tavily fallback error",e?.message)}}
  if(geminiKey&&!tavilyContext){try{const r=await fetch("https://generativelanguage.googleapis.com/v1beta/interactions",{method:"POST",headers:{"x-goog-api-key":geminiKey,"Content-Type":"application/json"},body:JSON.stringify({model:"gemini-3.6-flash",input:prompt,tools:[{type:"google_search"}]})});const d=await r.json();if(r.ok){const g=geminiResult(d,tipoKey);if(g.text&&g.sources.length){res.setHeader("Cache-Control","private, no-store");return res.status(200).json({...g,consultedAt:new Date().toISOString(),area:areaKey,tipo:tipoKey,provider:"gemini"})}}else console.error("Gemini request failed",r.status,String(d?.error?.message||"").slice(0,180))}catch(e){console.error("Gemini fallback error",e?.message)}}
  if(!groqKey){if(tavilyFallback&&tavilySources.length){res.setHeader("Cache-Control","private, no-store");return res.status(200).json(tavilyReply(tavilyFallback,tavilySources,areaKey,tipoKey))}return res.status(502).json({error:"A pesquisa principal está temporariamente indisponível."})}
  const context=tavilyContext?`\n\nFONTES OFICIAIS RECUPERADAS:\n${tavilyContext}`:"\n\nNão há contexto oficial suficiente; não invente dados jurídicos.";
  const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${groqKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:"openai/gpt-oss-20b",messages:[{role:"user",content:prompt+context}],max_completion_tokens:aprofundado?900:450})});
  const d=await r.json();
  if(!r.ok){console.error("Groq request failed",r.status,String(d?.error?.message||"").slice(0,180));if(tavilyFallback&&tavilySources.length){res.setHeader("Cache-Control","private, no-store");return res.status(200).json(tavilyReply(tavilyFallback,tavilySources,areaKey,tipoKey))}if(r.status===429)return res.status(429).json({error:"As IAs principais estão temporariamente no limite. Tente novamente em alguns segundos.",retryAfter:5});return res.status(502).json({error:"Não foi possível gerar a dica agora."})}
  const text=String(d?.choices?.[0]?.message?.content||"").trim();if(!text||!tavilySources.length){if(tavilyFallback&&tavilySources.length)return res.status(200).json(tavilyReply(tavilyFallback,tavilySources,areaKey,tipoKey));return res.status(502).json({error:"Não encontrei resposta com fonte oficial."})}
  res.setHeader("Cache-Control","private, no-store");return res.status(200).json({text,sources:tavilySources,consultedAt:new Date().toISOString(),area:areaKey,tipo:tipoKey,provider:"groq-gpt-oss-20b"});
 }catch(e){console.error("MCP AI error",e?.message||"unknown");if(tavilyFallback&&tavilySources.length)return res.status(200).json(tavilyReply(tavilyFallback,tavilySources,areaKey,tipoKey));return res.status(500).json({error:"Falha temporária na pesquisa. Tente novamente."})}
}
