function cleanKey(v){return String(v||'').trim().replace(/^Bearer\s+/i,'').replace(/^['"]|['"]$/g,'').trim()}

function parseJson(text){
  const cleaned=String(text||'').trim().replace(/^\`\`\`json\s*/i,'').replace(/\`\`\`$/,'').trim();
  const data=JSON.parse(cleaned);
  const limits={tema:4,estrutura:3,argumentacao:4,coesao:3,norma:4,clareza:2};
  if(!data?.notas)throw new Error('Resposta incompleta');
  for(const [key,max] of Object.entries(limits))data.notas[key]=Math.max(0,Math.min(max,Number(data.notas[key])||0));
  data.total=Object.values(data.notas).reduce((a,b)=>a+b,0);
  return data;
}

function heuristic(text){
  const words=text.trim().split(/\s+/).filter(Boolean);
  const paragraphs=text.split(/\n\s*\n|\n/).map(x=>x.trim()).filter(Boolean);
  const sentences=text.split(/[.!?]+/).filter(x=>x.trim());
  const connectors=(text.match(/\b(portanto|contudo|além disso|assim|desse modo|porém|todavia|logo|consequentemente|nesse sentido)\b/gi)||[]).length;
  const notas={
    tema:Math.min(4,words.length>=140?3.5:words.length>=80?2.5:1.5),
    estrutura:Math.min(3,paragraphs.length>=3?2.5:paragraphs.length===2?1.5:1),
    argumentacao:Math.min(4,words.length>=180?3:words.length>=110?2.5:1.5),
    coesao:Math.min(3,connectors>=4?2.5:connectors>=2?2:1),
    norma:Math.min(4,sentences.length>=5?3:2),
    clareza:Math.min(2,words.length>=100?1.5:1)
  };
  return {notas,total:Object.values(notas).reduce((a,b)=>a+b,0),resumo:'Avaliação preliminar automática. A IA detalhada não estava disponível neste momento.',pontosFortes:['Texto enviado e estrutura básica identificada.'],melhorias:['Revise a aderência ao comando, a divisão em parágrafos e a norma-padrão.','Use argumentos específicos e conectivos variados.'],errosProvaveis:['Faça uma revisão manual de concordância, regência, pontuação e repetições.'],versaoSugerida:'Releia o texto e reescreva os trechos apontados, preservando sua autoria.',provider:'mcp-local'};
}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Método não permitido.'});
  const texto=String(req.body?.texto||'').trim();
  const tema=String(req.body?.tema||'').slice(0,800);
  const comando=String(req.body?.comando||'').slice(0,1000);
  if(texto.length<300)return res.status(400).json({error:'Escreva pelo menos 300 caracteres antes de solicitar a correção.'});
  if(texto.length>12000)return res.status(400).json({error:'O texto excedeu o limite de 12.000 caracteres.'});
  const key=cleanKey(process.env.OPENAI_API_KEY);
  if(!key)return res.status(200).json(heuristic(texto));
  const prompt=`Você é corretor de redação para concurso público brasileiro. Avalie com rigor, sem inventar erros e sem reescrever toda a redação. Tema: ${tema}. Comando: ${comando}. Texto do candidato: ${texto}

Retorne SOMENTE JSON válido:
{"notas":{"tema":0,"estrutura":0,"argumentacao":0,"coesao":0,"norma":0,"clareza":0},"resumo":"avaliação geral objetiva","pontosFortes":["..."],"melhorias":["..."],"errosProvaveis":["trecho — explicação e correção"],"versaoSugerida":"um parágrafo curto demonstrando como melhorar o trecho mais fraco"}
Limites: tema 0–4; estrutura 0–3; argumentação 0–4; coesão 0–3; norma-padrão 0–4; clareza 0–2. Use notas em múltiplos de 0,5. Penalize fuga ao tema, ausência de estrutura, argumentos genéricos, incoerência e erros linguísticos. Não atribua nota por opinião política.`;
  try{
    const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-5-mini',input:prompt,max_output_tokens:1800})});
    const d=await r.json();
    if(!r.ok)throw new Error(d?.error?.message||'Falha na IA');
    const raw=String(d.output_text||d.output?.flatMap(x=>x.content||[]).map(x=>x.text||'').join('')||'');
    const result=parseJson(raw);
    res.setHeader('Cache-Control','private, no-store');
    return res.status(200).json({...result,provider:'openai'});
  }catch(e){
    console.error('Discursive correction error',e?.message);
    return res.status(200).json(heuristic(texto));
  }
}
