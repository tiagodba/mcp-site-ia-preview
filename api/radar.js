const OFFICIAL_HOST = (url) => {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h === 'gov.br' || h.endsWith('.gov.br');
  } catch { return false; }
};

function cleanKey(v){
  return String(v||'').trim().replace(/^Bearer\s+/i,'').replace(/^['\"]|['\"]$/g,'').trim();
}

function classify(text=''){
  const t = text.toLowerCase();
  if (/inscri[cç][oõ]es? abertas?|per[ií]odo de inscri[cç][aã]o|inscreva-se/.test(t)) return {status:'Inscrições abertas',rank:5};
  if (/edital publicado|publica[cç][aã]o do edital|edital n[ºo°]/.test(t)) return {status:'Edital publicado',rank:4};
  if (/banca (?:definida|contratada)|organizadora/.test(t)) return {status:'Banca definida',rank:3};
  if (/autorizad[oa]|autoriza[cç][aã]o/.test(t)) return {status:'Autorizado',rank:2};
  return {status:'Em acompanhamento',rank:1};
}

function category(text=''){
  const t=text.toLowerCase();
  if (/pol[ií]cia cient[ií]fica|per[ií]cia|perito|criminal[ií]stica|instituto geral de per[ií]cias|igp/.test(t)) return 'cientifica';
  if (/pol[ií]cia penal|agente penitenci[aá]rio|sistema prisional|penitenci[aá]ri/.test(t)) return 'penal';
  if (/guarda (civil )?municipal|gcm|guarda municipal/.test(t)) return 'gcm';
  if (/pol[ií]cia civil|delegad[oa]|investigador|escriv[aã]o|agente de pol[ií]cia/.test(t)) return 'civil';
  return 'geral';
}

function ufFrom(text=''){
  const m=(' '+text.toUpperCase()+' ').match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/);
  return m ? m[1] : 'BR';
}

function orgName(title='',content=''){
  const text=`${title} ${content}`;
  const patterns=[
    [/pol[ií]cia civil[^|—\-:,.]{0,45}/i,'Polícia Civil'],
    [/pol[ií]cia penal[^|—\-:,.]{0,45}/i,'Polícia Penal'],
    [/pol[ií]cia cient[ií]fica[^|—\-:,.]{0,45}/i,'Polícia Científica'],
    [/guarda (?:civil )?municipal[^|—\-:,.]{0,55}/i,'Guarda Municipal'],
    [/instituto geral de per[ií]cias[^|—\-:,.]{0,45}/i,'Instituto de Perícias']
  ];
  for(const [re,fallback] of patterns){const m=text.match(re);if(m)return m[0].trim().replace(/\s+/g,' ').slice(0,62)||fallback;}
  return String(title||'Concurso policial').split(/[|—]/)[0].trim().slice(0,62)||'Concurso policial';
}

function summary(content=''){
  return String(content||'').replace(/\s+/g,' ').trim().slice(0,210);
}

export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({error:'Método não permitido.'});
  const key=cleanKey(process.env.TAVILY_API_KEY||process.env.TAVLY_API_KEY);
  if(!key) return res.status(503).json({error:'Radar temporariamente indisponível.'});
  try{
    const year=new Date().getFullYear();
    const queries=[
      `concurso polícia civil polícia penal polícia científica edital inscrições abertas ${year}`,
      `concurso guarda municipal edital inscrições abertas ${year}`,
      `concurso policial edital publicado banca definida autorizado ${year}`
    ];
    const batches=await Promise.all(queries.map(async query=>{
      const r=await fetch('https://api.tavily.com/search',{
        method:'POST',
        headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
        body:JSON.stringify({query,search_depth:'advanced',max_results:8,topic:'general',include_answer:false,include_raw_content:false,include_domains:['gov.br'],time_range:'year',country:'brazil'})
      });
      const d=await r.json();
      if(!r.ok){console.error('Radar Tavily failed',r.status,String(d?.detail||'').slice(0,160));return[];}
      return d.results||[];
    }));

    const seen=new Set();
    const items=[];
    for(const r of batches.flat()){
      if(!r?.url||!OFFICIAL_HOST(r.url)||seen.has(r.url)) continue;
      const text=`${r.title||''} ${r.content||''}`;
      if(!/(concurso|edital|inscri[cç]|pol[ií]cia|guarda municipal|per[ií]cia)/i.test(text)) continue;
      const st=classify(text);
      const cat=category(text);
      if(cat==='geral' && !/(pol[ií]cia|guarda|per[ií]cia|penitenci)/i.test(text)) continue;
      seen.add(r.url);
      items.push({
        orgao:orgName(r.title,r.content),
        uf:ufFrom(text),
        categoria:cat,
        status:st.status,
        rank:st.rank,
        resumo:summary(r.content),
        titulo:String(r.title||'Fonte oficial').trim(),
        url:r.url,
        score:Number(r.score||0)
      });
    }
    items.sort((a,b)=>b.rank-a.rank||b.score-a.score);
    res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json({updatedAt:new Date().toISOString(),items:items.slice(0,12),source:'fontes oficiais .gov.br'});
  }catch(e){
    console.error('Radar error',e?.message||'unknown');
    return res.status(500).json({error:'Falha temporária ao atualizar o Radar.'});
  }
}
