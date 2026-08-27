(()=>{
 const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const findRadar=()=>{
   const candidates=[...document.querySelectorAll('section')];
   return candidates.find(s=>/radar\s+(de\s+)?concursos/i.test(s.textContent||''))||document.querySelector('.editais');
 };
 const radar=findRadar(); if(!radar)return;
 const updated=radar.querySelector('.updated');
 const jobs=radar.querySelector('.jobs');
 if(!jobs)return;
 const original=jobs.innerHTML;
 const destaqueQueimados={
   orgao:'Guarda Municipal de Queimados',
   uf:'RJ',
   categoria:'gcm',
   status:'Banca contratada',
   resumo:'Novo concurso com banca IAN e Guarda Municipal prevista. A MCP já levantou o concurso anterior de 2015 e preparou um comparativo com prova, disciplinas, etapas e prioridades pré-edital para 2026.',
   titulo:'GCM Queimados RJ — concurso anterior x 2026',
   url:'/gcm-queimados-rj-2015-2026.html',
   sourceLabel:'RAIO-X MCP • 2015 x 2026',
   actionLabel:'Ver análise completa',
   featured:true
 };
 function formatDate(iso){try{return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date(iso))}catch{return new Date().toLocaleString('pt-BR')}}
 function card(x){
   const statusClass=/abertas|publicado/i.test(x.status)?'':' gold';
   const featuredClass=x.featured?' featured-news':'';
   return `<article class="job${featuredClass}" data-cat="${esc(x.categoria)}">
     <div class="job-top"><span class="status${statusClass}">${esc(x.status)}</span><span class="state">${esc(x.uf)}</span></div>
     <div class="type">${esc(x.sourceLabel||'FONTE OFICIAL')}</div>
     <h3>${esc(x.orgao)}</h3>
     <p>${esc(x.resumo||x.titulo)}</p>
     <div class="facts"><div><span>Situação</span><strong>${esc(x.status)}</strong></div><div><span>UF</span><strong>${esc(x.uf)}</strong></div></div>
     <a href="${esc(x.url)}"${/^https?:/i.test(x.url)?' target="_blank" rel="noopener noreferrer"':''}>${esc(x.actionLabel||'Ver fonte oficial')} <span>→</span></a>
   </article>`;
 }
 function renderWithHighlight(items=[]){
   const safeItems=Array.isArray(items)?items:[];
   const filtered=safeItems.filter(x=>!/queimados/i.test(`${x?.orgao||''} ${x?.titulo||''} ${x?.resumo||''}`));
   return [destaqueQueimados,...filtered].map(card).join('');
 }
 async function refresh(){
   if(updated)updated.textContent='Atualizando Radar...';
   try{
     const r=await fetch('/api/radar',{headers:{Accept:'application/json'}}),d=await r.json();
     if(!r.ok)throw new Error(d.error||'Falha');
     jobs.innerHTML=renderWithHighlight(d.items);
     radar.dataset.dynamicRadar='1';
     const total=1+(Array.isArray(d.items)?d.items.filter(x=>!/queimados/i.test(`${x?.orgao||''} ${x?.titulo||''} ${x?.resumo||''}`)).length:0);
     const result=radar.querySelector('.result');if(result)result.textContent=`${total} oportunidades/movimentações em acompanhamento`;
     if(updated)updated.textContent=`Última consulta: ${formatDate(d.updatedAt||new Date().toISOString())}`;
   }catch(e){
     jobs.innerHTML=card(destaqueQueimados)+original;
     if(updated)updated.textContent=`Radar ativo • última tentativa: ${formatDate(new Date().toISOString())}`;
   }
 }
 refresh();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
 setInterval(refresh,6*60*60*1000);
})();
// MCP Radar: trigger de instalação automática no index.html
