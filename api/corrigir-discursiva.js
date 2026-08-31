function cleanKey(v){return String(v||'').trim().replace(/^Bearer\s+/i,'').replace(/^['"]|['"]$/g,'').trim()}

function parseJson(text){
  const cleaned=String(text||'').trim().replace(/^```json\s*/i,'').replace(/```$/,'').trim();
  const data=JSON.parse(cleaned);
  const limits={tema:4,estrutura:3,argumentacao:4,coesao:3,norma:4,clareza:2};
  if(!data?.notas)throw new Error('Resposta incompleta');
  for(const [key,max] of Object.entries(limits)){
    const value=Math.round((Number(data.notas[key])||0)*2)/2;
    data.notas[key]=Math.max(0,Math.min(max,value));
  }
  data.total=Object.values(data.notas).reduce((a,b)=>a+b,0);
  data.resumo=String(data.resumo||'').slice(0,1800);
  data.pontosFortes=Array.isArray(data.pontosFortes)?data.pontosFortes.slice(0,6):[];
  data.melhorias=Array.isArray(data.melhorias)?data.melhorias.slice(0,8):[];
  data.errosProvaveis=Array.isArray(data.errosProvaveis)?data.errosProvaveis.slice(0,12):[];
  data.versaoSugerida=String(data.versaoSugerida||'').slice(0,2400);
  return data;
}

function heuristic(text){
  const words=text.trim().split(/\s+/).filter(Boolean);
  const paragraphs=text.split(/\n\s*\n|\n/).map(x=>x.trim()).filter(Boolean);
  const sentences=text.split(/[.!?]+/).filter(x=>x.trim());
  const connectors=(text.match(/\b(portanto|contudo|além disso|assim|desse modo|porém|todavia|logo|consequentemente|nesse sentido|ademais|dessa forma|por conseguinte)\b/gi)||[]).length;
  const notas={
    tema:Math.min(4,words.length>=140?3.5:words.length>=80?2.5:1.5),
    estrutura:Math.min(3,paragraphs.length>=3?2.5:paragraphs.length===2?1.5:1),
    argumentacao:Math.min(4,words.length>=180?3:words.length>=110?2.5:1.5),
    coesao:Math.min(3,connectors>=4?2.5:connectors>=2?2:1),
    norma:Math.min(4,sentences.length>=5?3:2),
    clareza:Math.min(2,words.length>=100?1.5:1)
  };
  return {notas,total:Object.values(notas).reduce((a,b)=>a+b,0),resumo:'Avaliação automática básica concluída. A análise avançada por IA não estava disponível neste momento.',pontosFortes:['Texto recebido e estrutura geral identificada.'],melhorias:['Revise a aderência ao comando, a divisão em parágrafos e a norma-padrão.','Fortaleça os argumentos com explicações específicas e conectivos variados.'],errosProvaveis:['Faça uma revisão manual de concordância, regência, pontuação, crase e repetições.'],versaoSugerida:'Revise os trechos mais genéricos e explicite a relação entre tese, argumentos e conclusão.',provider:'mcp-local'};
}

function extractOutputText(data){
  if(typeof data?.output_text==='string'&&data.output_text.trim())return data.output_text.trim();
  const parts=[];
  for(const item of data?.output||[]){for(const content of item?.content||[]){if(typeof content?.text==='string')parts.push(content.text)}}
  return parts.join('\n').trim();
}

async function callGroq(key,prompt){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),45000);
  try{
    const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',signal:controller.signal,
      headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
      body:JSON.stringify({model:'openai/gpt-oss-20b',messages:[{role:'system',content:'Você é um corretor rigoroso de redação para concursos públicos brasileiros. Responda apenas JSON válido.'},{role:'user',content:prompt}],temperature:0.2,max_completion_tokens:2200,response_format:{type:'json_object'}})
    });
    const d=await r.json();
    if(!r.ok)throw new Error(d?.error?.message||`Falha no Groq (${r.status})`);
    const raw=String(d?.choices?.[0]?.message?.content||'').trim();
    if(!raw)throw new Error('Groq retornou resposta vazia.');
    return parseJson(raw);
  }finally{clearTimeout(timeout)}
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','private, no-store');
  if(req.method!=='POST')return res.status(405).json({error:'Método não permitido.'});

  const texto=String(req.body?.texto||'').trim();
  const tema=String(req.body?.tema||'').slice(0,800);
  const comando=String(req.body?.comando||'').slice(0,1000);
  if(texto.length<300)return res.status(400).json({error:'Escreva pelo menos 300 caracteres antes de solicitar a correção.'});
  if(texto.length>12000)return res.status(400).json({error:'O texto excedeu o limite de 12.000 caracteres.'});

  const openaiKey=cleanKey(process.env.OPENAI_API_KEY);
  const groqKey=cleanKey(process.env.GROQ_API_KEY);

  const prompt=`Você é um corretor de redação para concurso público brasileiro. Corrija com rigor técnico, linguagem pedagógica e sem inventar erros. Avalie somente o texto apresentado, respeitando o tema e o comando.\n\nTEMA: ${tema}\nCOMANDO: ${comando}\n\nTEXTO DO CANDIDATO:\n${texto}\n\nAnalise: aderência ao tema; estrutura dissertativo-argumentativa; qualidade dos argumentos; coesão e coerência; norma-padrão; clareza e objetividade. Quando apontar erro linguístico, cite apenas um trecho curto do candidato e explique a correção. Não penalize opinião política ou posicionamento ideológico.\n\nRetorne SOMENTE JSON válido exatamente neste formato:\n{"notas":{"tema":0,"estrutura":0,"argumentacao":0,"coesao":0,"norma":0,"clareza":0},"resumo":"avaliação geral objetiva","pontosFortes":["..."],"melhorias":["..."],"errosProvaveis":["trecho — explicação e forma recomendada"],"versaoSugerida":"um parágrafo curto demonstrando como melhorar o trecho mais fraco"}\n\nLimites: tema 0–4; estrutura 0–3; argumentação 0–4; coesão 0–3; norma-padrão 0–4; clareza 0–2. Use notas em múltiplos de 0,5.`;

  if(openaiKey){
    try{
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),45000);
      const r=await fetch('https://api.openai.com/v1/responses',{
        method:'POST',signal:controller.signal,
        headers:{Authorization:`Bearer ${openaiKey}`,'Content-Type':'application/json'},
        body:JSON.stringify({model:'gpt-5-mini',input:prompt,max_output_tokens:2200})
      });
      clearTimeout(timeout);
      const d=await r.json();
      if(!r.ok)throw new Error(d?.error?.message||`Falha na IA (${r.status})`);
      const raw=extractOutputText(d);
      if(!raw)throw new Error('A IA retornou resposta vazia.');
      return res.status(200).json({...parseJson(raw),provider:'openai'});
    }catch(e){console.error('OpenAI correction error',e?.name,e?.message)}
  }

  if(groqKey){
    try{return res.status(200).json({...await callGroq(groqKey,prompt),provider:'groq'})}
    catch(e){console.error('Groq correction error',e?.name,e?.message)}
  }

  return res.status(200).json({...heuristic(texto),warning:'A análise avançada falhou; foi aplicada a correção local básica.'});
}
