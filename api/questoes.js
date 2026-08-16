function cleanKey(v){return String(v||'').trim().replace(/^Bearer\s+/i,'').replace(/^['\"]|['\"]$/g,'').trim()}
const AREAS={geral:'carreiras policiais',civil:'Polícia Civil',penal:'Polícia Penal',cientifica:'Polícia Científica',gcm:'Guardas Municipais'};
function parseQuestion(text){
  const cleaned=String(text||'').trim().replace(/^```json\s*/i,'').replace(/```$/,'').trim();
  const q=JSON.parse(cleaned);
  if(!q?.enunciado||!Array.isArray(q.alternativas)||q.alternativas.length<2||!q?.correta) throw new Error('Questão incompleta');
  return q;
}
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Método não permitido.'});
  const geminiKey=cleanKey(process.env.GEMINI_API_KEY);
  const groqKey=cleanKey(process.env.GROQ_API_KEY);
  if(!geminiKey&&!groqKey) return res.status(503).json({error:'IA de questões indisponível.'});
  const area=AREAS[req.body?.area]||AREAS.geral, assunto=String(req.body?.assunto||'conteúdo jurídico relevante').slice(0,120), banca=String(req.body?.banca||'estilo concursos policiais').slice(0,80), dificuldade=['fácil','médio','difícil'].includes(req.body?.dificuldade)?req.body.dificuldade:'médio';
  const prompt=`Crie UMA questão AUTORAL para concurso de ${area}. Assunto: ${assunto}. Estilo: ${banca}. Dificuldade: ${dificuldade}. Pesquise fontes oficiais brasileiras antes de formular. Não copie questões existentes. Retorne SOMENTE JSON válido, sem markdown, no formato {"enunciado":"...","alternativas":["A) ...","B) ...","C) ...","D) ...","E) ..."],"correta":"A","comentario":"explicação completa do gabarito e por que as demais estão erradas","pegadinha":"...","fundamento":"lei/jurisprudência oficial usada"}. Não revele o gabarito no enunciado.`;

  if(geminiKey){
    try{
      const r=await fetch('https://generativelanguage.googleapis.com/v1beta/interactions',{method:'POST',headers:{'x-goog-api-key':geminiKey,'Content-Type':'application/json'},body:JSON.stringify({model:'gemini-3.6-flash',input:prompt,tools:[{type:'google_search'}]})});
      const d=await r.json();
      if(r.ok){
        let text=''; for(const step of d?.steps||[]) if(step?.type==='model_output') for(const b of step.content||[]) if(b?.type==='text'&&b.text) text+=b.text;
        try{const q=parseQuestion(text);res.setHeader('Cache-Control','private, no-store');return res.status(200).json({...q,provider:'gemini'})}catch(e){console.error('Gemini question parse failed',e?.message)}
      }else{
        console.error('Gemini question failed',r.status,String(d?.error?.message||'unknown').slice(0,180));
      }
    }catch(e){console.error('Gemini question error',e?.message)}
  }

  if(groqKey){
    try{
      const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${groqKey}`,'Content-Type':'application/json'},body:JSON.stringify({
        model:'groq/compound-mini',
        messages:[{role:'user',content:prompt}],
        max_completion_tokens:1200,
        compound_custom:{tools:{enabled_tools:['web_search']}},
        search_settings:{include_domains:['stf.jus.br','portal.stf.jus.br','stj.jus.br','cnj.jus.br','planalto.gov.br','gov.br','senado.leg.br','camara.leg.br'],country:'brazil'}
      })});
      const d=await r.json();
      if(!r.ok){console.error('Groq question failed',r.status,String(d?.error?.message||'unknown').slice(0,180));return res.status(502).json({error:'Falha ao gerar questão com as IAs disponíveis.'})}
      const text=String(d?.choices?.[0]?.message?.content||'').trim();
      try{const q=parseQuestion(text);res.setHeader('Cache-Control','private, no-store');return res.status(200).json({...q,provider:'groq'})}catch(e){console.error('Groq question parse failed',e?.message);return res.status(502).json({error:'A IA não retornou a questão no formato esperado.'})}
    }catch(e){console.error('Groq question error',e?.message);return res.status(500).json({error:'Erro ao gerar questão.'})}
  }
  return res.status(502).json({error:'Falha ao gerar questão com as IAs disponíveis.'});
}
