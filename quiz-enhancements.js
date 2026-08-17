(()=>{
  const $=id=>document.getElementById(id);
  const modal=$('quizModal'), gerar=$('qGerar'), box=$('qBox'), status=$('qStatus');
  if(!modal||!gerar||!box||!status)return;

  const K={hist:'mcpQuizHistoryV1',err:'mcpQuizErrorsV1',fav:'mcpQuizFavsV1',daily:'mcpQuizDailyV1'};
  const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch{return[]}};
  const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const providerName=p=>p==='gemini'?'Gemini':p==='groq'?'Groq':p==='tavily-fallback'?'Tavily':(p||'IA MCP');

  let current=null,sim={active:false,total:1,index:0,correct:0,wrong:0,answered:false};

  const panel=document.createElement('div');
  panel.innerHTML=`
    <div style="margin:16px 0;padding:14px;background:#f4f6f9;border:1px solid #dce2e9;border-radius:8px">
      <div style="display:grid;grid-template-columns:1.2fr .8fr;gap:10px">
        <select id="qModo" style="padding:11px"><option value="unica">Questão única</option><option value="simulado">Simulado</option></select>
        <select id="qTotal" style="padding:11px" disabled><option value="10">10 questões</option><option value="20">20 questões</option><option value="50">50 questões</option></select>
      </div>
      <div id="qStats" style="display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-size:13px;font-weight:800;color:#062a5d"></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
        <button id="qDaily" type="button" style="padding:9px 12px;border:1px solid #d5dce5;background:#fff;cursor:pointer;font-weight:800">📅 Questão do dia</button>
        <button id="qReview" type="button" style="padding:9px 12px;border:1px solid #d5dce5;background:#fff;cursor:pointer;font-weight:800">🔁 Revisar erros</button>
        <button id="qHistory" type="button" style="padding:9px 12px;border:1px solid #d5dce5;background:#fff;cursor:pointer;font-weight:800">📊 Histórico</button>
        <button id="qFav" type="button" style="padding:9px 12px;border:1px solid #d5dce5;background:#fff;cursor:pointer;font-weight:800">⭐ Favoritar</button>
      </div>
    </div>`;
  gerar.parentNode.insertBefore(panel,gerar);

  const modo=$('qModo'),total=$('qTotal'),stats=$('qStats');
  modo.onchange=()=>{total.disabled=modo.value!=='simulado'; gerar.textContent=modo.value==='simulado'?'Iniciar simulado':'Gerar questão'};

  function updateStats(){
    const h=load(K.hist),e=load(K.err),f=load(K.fav);
    const ac=h.reduce((n,x)=>n+(x.ok?1:0),0),pct=h.length?Math.round(ac/h.length*100):0;
    const live=sim.active?`Simulado: ${sim.index}/${sim.total} • ✅ ${sim.correct} • ❌ ${sim.wrong}`:`Desempenho: ${pct}% (${ac}/${h.length})`;
    stats.innerHTML=`<span>${live}</span><span>Erros para revisar: ${e.length}</span><span>Favoritos: ${f.length}</span>`;
  }

  async function fetchQuestion(extra={}){
    status.textContent='Gerando questão com IA e consultando fontes oficiais...';box.innerHTML='';
    const r=await fetch('/api/questoes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({area:$('qArea').value,dificuldade:$('qDif').value,assunto:$('qAssunto').value,banca:$('qBanca').value,...extra})});
    const d=await r.json();if(!r.ok)throw new Error(d.error||'Erro ao gerar questão');
    current=d;status.textContent='';sim.answered=false;renderQuestion(d);return d;
  }

  function renderQuestion(d,review=false){
    box.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><h3 style="margin-top:0">${esc(d.enunciado)}</h3>${sim.active?`<strong style="white-space:nowrap;color:#a17b0e">${sim.index}/${sim.total}</strong>`:''}</div>`+
      (d.alternativas||[]).map(a=>`<button class="qAlt" data-l="${esc(a.charAt(0))}" style="display:block;width:100%;text-align:left;margin:8px 0;padding:12px;border:1px solid #d5dce5;background:#fff;cursor:pointer;border-radius:6px">${esc(a)}</button>`).join('')+
      `<div id="qFeedback"></div>`;
    box.querySelectorAll('.qAlt').forEach(b=>b.onclick=()=>answer(b,d,review));
  }

  function answer(btn,d,review){
    if(sim.answered)return;sim.answered=true;box.querySelectorAll('.qAlt').forEach(x=>x.disabled=true);
    const ok=btn.dataset.l.toUpperCase()===String(d.correta).toUpperCase();
    const rec={ts:Date.now(),ok,area:$('qArea').value,dificuldade:$('qDif').value,assunto:$('qAssunto').value,banca:$('qBanca').value,enunciado:d.enunciado,correta:d.correta};
    const h=load(K.hist);h.unshift(rec);save(K.hist,h.slice(0,300));
    if(!ok&&!review){const e=load(K.err);e.unshift({...d,ts:Date.now()});save(K.err,e.slice(0,100));}
    if(sim.active){ok?sim.correct++:sim.wrong++;}
    const next=sim.active&&sim.index<sim.total?`<button id="qNext" style="margin-top:12px;background:#062a5d;color:#fff;border:0;padding:11px 16px;font-weight:900;cursor:pointer">Próxima questão →</button>`:'';
    $('qFeedback').innerHTML=`<div style="margin-top:16px;padding:16px;background:#f4f6f9;border-left:4px solid ${ok?'#2eaf65':'#efbd26'}"><strong>${ok?'✅ Correto!':'❌ Incorreto. Gabarito: '+esc(d.correta)}</strong><p>${esc(d.comentario)}</p><p><b>Pegadinha:</b> ${esc(d.pegadinha||'—')}</p><p><b>Fundamento:</b> ${esc(d.fundamento||'—')}</p><small>Gerado por ${esc(providerName(d.provider))} • questão autoral</small>${next}</div>`;
    updateStats();
    const n=$('qNext');if(n)n.onclick=async()=>{sim.index++;try{await fetchQuestion()}catch(e){status.textContent=e.message}};
    if(sim.active&&sim.index===sim.total){sim.active=false;setTimeout(()=>{status.innerHTML=`<strong>Simulado concluído:</strong> ${sim.correct} acertos e ${sim.wrong} erros — ${Math.round(sim.correct/sim.total*100)}%.`;updateStats()},50)}
  }

  gerar.onclick=async()=>{
    try{
      if(modo.value==='simulado'){sim={active:true,total:Number(total.value),index:1,correct:0,wrong:0,answered:false};gerar.textContent='Reiniciar simulado';}
      else sim={active:false,total:1,index:0,correct:0,wrong:0,answered:false};
      await fetchQuestion();updateStats();
    }catch(e){status.textContent=e.message}
  };

  $('qFav').onclick=()=>{if(!current){status.textContent='Gere uma questão antes de favoritar.';return}const f=load(K.fav);f.unshift({...current,ts:Date.now()});save(K.fav,f.slice(0,100));status.textContent='⭐ Questão adicionada aos favoritos.';updateStats()};
  $('qReview').onclick=()=>{const e=load(K.err);if(!e.length){status.textContent='Nenhum erro salvo para revisar.';return}current=e[0];status.textContent='Revisão de erro anterior';renderQuestion(current,true);e.shift();save(K.err,e);updateStats()};
  $('qHistory').onclick=()=>{const h=load(K.hist);if(!h.length){status.textContent='Ainda não há histórico.';return}const ac=h.filter(x=>x.ok).length;box.innerHTML=`<div style="padding:16px;background:#f4f6f9;border-radius:8px"><h3>Seu histórico</h3><p><b>${h.length}</b> questões respondidas • <b>${ac}</b> acertos • <b>${h.length-ac}</b> erros • <b>${Math.round(ac/h.length*100)}%</b> de aproveitamento</p>${h.slice(0,12).map(x=>`<div style="border-top:1px solid #dce2e9;padding:9px 0">${x.ok?'✅':'❌'} ${esc(x.enunciado).slice(0,120)}</div>`).join('')}</div>`;status.textContent=''};
  $('qDaily').onclick=async()=>{const day=new Date().toISOString().slice(0,10);let d;try{const raw=JSON.parse(localStorage.getItem(K.daily)||'{}');if(raw.day===day&&raw.q){d=raw.q;current=d;status.textContent='📅 Questão do dia';renderQuestion(d);return}d=await fetchQuestion({assunto:$('qAssunto').value||'tema relevante para concursos policiais'});localStorage.setItem(K.daily,JSON.stringify({day,q:d}));status.textContent='📅 Questão do dia'}catch(e){status.textContent=e.message}};
  updateStats();
})();
