function cleanKey(v){return String(v||'').trim().replace(/^Bearer\s+/i,'').replace(/^['\"]|['\"]$/g,'').trim()}
const AREAS={geral:'carreiras policiais',civil:'Polícia Civil',penal:'Polícia Penal',cientifica:'Polícia Científica',gcm:'Guardas Municipais'};
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Método não permitido.'});
  const key=cleanKey(process.env.GEMINI_API_KEY); if(!key) return res.status(503).json({error:'Gemini indisponível.'});
  const area=AREAS[req.body?.area]||AREAS.geral, assunto=String(req.body?.assunto||'conteúdo jurídico relevante').slice(0,120), banca=String(req.body?.banca||'estilo concursos policiais').slice(0,80), dificuldade=['fácil','médio','difícil'].includes(req.body?.dificuldade)?req.body.dificuldade:'médio';
  const prompt=`Crie UMA questão AUTORAL para concurso de ${area}. Assunto: ${assunto}. Estilo: ${banca}. Dificuldade: ${dificuldade}. Pesquise fontes oficiais brasileiras antes de formular. Não copie questões existentes. Retorne SOMENTE JSON válido, sem markdown, no formato {"enunciado":"...","alternativas":["A) ...","B) ...","C) ...","D) ...","E) ..."],"correta":"A","comentario":"explicação completa do gabarito e por que as demais estão erradas","pegadinha":"...","fundamento":"lei/jurisprudência oficial usada"}. Não revele o gabarito no enunciado.`;
  try{
    const r=await fetch('https://generativelanguage.googleapis.com/v1beta/interactions',{method:'POST',headers:{'x-goog-api-key':key,'Content-Type':'application/json'},body:JSON.stringify({model:'gemini-3.6-flash',input:prompt,tools:[{type:'google_search'}]})});
    const d=await r.json(); if(!r.ok) return res.status(502).json({error:'Falha ao gerar questão.'});
    let text=''; for(const step of d?.steps||[]) if(step?.type==='model_output') for(const b of step.content||[]) if(b?.type==='text'&&b.text) text+=b.text;
    text=text.trim().replace(/^```json\s*/i,'').replace(/```$/,'').trim();
    let q; try{q=JSON.parse(text)}catch{return res.status(502).json({error:'A IA não retornou a questão no formato esperado.'})}
    if(!q?.enunciado||!Array.isArray(q.alternativas)||q.alternativas.length<2||!q?.correta) return res.status(502).json({error:'Questão incompleta.'});
    res.setHeader('Cache-Control','private, no-store'); return res.status(200).json({...q,provider:'gemini'});
  }catch(e){console.error('Question bank error',e?.message); return res.status(500).json({error:'Erro ao gerar questão.'})}
}
