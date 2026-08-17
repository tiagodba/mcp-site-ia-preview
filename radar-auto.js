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
 function formatDate(iso){try{return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date(iso))}catch{return new Date().toLocaleString('pt-BR')}}
 function card(x){
   const statusClass=/abertas|publicado/i.test(x.status)?'':' gold';
   return `<article class="job" data-cat="${esc(x.categoria)}">
     <div class="job-top"><span class="status${statusClass}">${esc(x.status)}</span><span class="state">${esc(x.uf)}</span></div>
     <div class="type">FONTE OFICIAL</div>
     <h3>${esc(x.orgao)}</h3>
     <p>${esc(x.resumo||x.titulo)}</p>
     <div class="facts"><div><span>Situação</span><strong>${esc(x.status)}</strong></div><div><span>UF</span><strong>${esc(x.uf)}</strong></div></div>
     <a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Ver fonte oficial <span>→</span></a>
   </article>`;
 }
 async function refresh(){
   if(updated)updated.textContent='Atualizando Radar...';
   try{
     const r=await fetch('/api/radar',{headers:{Accept:'application/json'}}),d=await r.json();
     if(!r.ok)throw new Error(d.error||'Falha');
     if(Array.isArray(d.items)&&d.items.length){
       jobs.innerHTML=d.items.map(card).join('');
       radar.dataset.dynamicRadar='1';
       const result=radar.querySelector('.result');if(result)result.textContent=`${d.items.length} oportunidades/movimentações encontradas em fontes oficiais`;
     }else jobs.innerHTML=original;
     if(updated)updated.textContent=`Última consulta: ${formatDate(d.updatedAt||new Date().toISOString())}`;
   }catch(e){
     jobs.innerHTML=original;
     if(updated)updated.textContent=`Radar ativo • última tentativa: ${formatDate(new Date().toISOString())}`;
   }
 }
 refresh();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
 setInterval(refresh,6*60*60*1000);
})();
