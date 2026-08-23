(()=>{
  const COVER='/assets/capas/gcm-paracatu-card.jpg';
  function patch(){
    const cards=[...document.querySelectorAll('#materialsGrid .material')];
    const card=cards.find(c=>/GCM Paracatu/i.test(c.querySelector('h3')?.textContent||''));
    if(!card) return false;
    const visual=card.querySelector('.visual');
    if(visual){
      visual.classList.add('promo');
      visual.innerHTML=`<img src="${COVER}" alt="Capa GCM Paracatu">`;
      visual.style.height='330px';
    }
    let links=card.querySelector('.card-links');
    if(!links){links=document.createElement('div');links.className='card-links';card.appendChild(links)}
    const items=[
      ['/reta-final-gcm-paracatu.html','Central Reta Final'],
      ['/gcm-paracatu-mapas.html','Mapas mentais'],
      ['/questoes-lc-198-2025-gcm-paracatu.html','Questões LC 198/2025'],
      ['/lei-organica-paracatu-estudo-dirigido.html','Lei Orgânica'],
      ['/treino-discursiva-gcm-paracatu.html','Treino discursivo'],
      ['/simulado-gcm-paracatu-reta-final-01.html','Simulado Reta Final'],
      ['/estatuto-geral-guardas-municipais.html','Estatuto Geral das Guardas']
    ];
    links.innerHTML=items.map(([href,label])=>`<a href="${href}">${label} <span>→</span></a>`).join('');
    return true;
  }
  if(!patch()){
    const obs=new MutationObserver(()=>{if(patch())obs.disconnect()});
    obs.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),10000);
  }
})();
