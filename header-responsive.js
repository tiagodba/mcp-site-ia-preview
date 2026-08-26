(()=>{
  const header=document.querySelector('.header');
  const inner=header?.querySelector('.header-inner');
  const nav=header?.querySelector('.nav');
  const social=header?.querySelector('.social');
  const mobile=header?.querySelector('.mobile');
  const menuButton=header?.querySelector('.menu');
  if(!header||!inner||!nav||document.getElementById('mcpHeaderDirectLinks')) return;

  const marker=document.createElement('span');
  marker.id='mcpHeaderDirectLinks';
  marker.hidden=true;
  header.appendChild(marker);

  // Remove WhatsApp do cabeçalho para não disputar espaço com os atalhos de estudo.
  const removeWhatsappLinks=root=>{
    if(!root) return;
    [...root.querySelectorAll('a')].forEach(a=>{
      const href=a.getAttribute('href')||'';
      const label=(a.textContent||'').trim();
      if(/whatsapp/i.test(label)||/wa\.me/i.test(href)) a.remove();
    });
  };
  removeWhatsappLinks(nav);
  removeWhatsappLinks(social);
  removeWhatsappLinks(mobile);
  inner.querySelector('.mcp-header-whatsapp')?.remove();

  let genival=nav.querySelector('[data-mcp-genival="1"]');
  if(!genival){
    genival=document.createElement('a');
    genival.href='/plano-leitura-medicina-legal-genival.html';
    genival.textContent='Plano Genival';
    genival.title='Plano de leitura Medicina Legal — PC-BA e PC-MA';
    genival.dataset.mcpGenival='1';
    nav.appendChild(genival);
  }

  let retaFinal=[...nav.querySelectorAll(':scope > a')].find(a=>/reta final.*gcm.*paracatu/i.test((a.textContent||'').trim()));
  if(!retaFinal){
    retaFinal=document.createElement('a');
    retaFinal.href='/reta-final-gcm-paracatu.html';
    retaFinal.textContent='Reta Final GCM Paracatu';
    retaFinal.title='Reta Final GCM Paracatu';
    nav.insertBefore(retaFinal,genival);
  }
  retaFinal.dataset.mcpRetaFinal='1';

  const oldMore=document.getElementById('mcpMoreWrap');
  if(oldMore){
    [...oldMore.querySelectorAll('.mcp-more-panel > a:not([data-social-clone])')].forEach(a=>nav.insertBefore(a,oldMore));
    oldMore.remove();
  }

  const questionsLink=[...nav.querySelectorAll(':scope > a')].find(a=>/^Questões$/i.test((a.textContent||'').trim()));
  if(questionsLink){
    questionsLink.href='/questoes.html';
    questionsLink.title='Central de Questões MCP';
  }

  const lawLink=[...nav.querySelectorAll(':scope > a')].find(a=>/^Legislação$/i.test((a.textContent||'').trim()));
  if(lawLink){
    lawLink.href='/legislacao-jurisprudencia.html';
    lawLink.title='Legislação recente e jurisprudência do STF e STJ';
  }

  const style=document.createElement('style');
  style.textContent=`
    .header,.header-inner{max-width:100%}
    .header{overflow:visible}
    .header-inner{gap:18px;height:68px!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important}
    .brand{height:68px!important;align-items:center!important;flex:0 0 auto}
    .brand img{width:48px!important;height:48px!important;margin:0 10px 0 0!important;display:block}
    .brand strong{font-size:15px!important;line-height:1.1!important;font-weight:800!important;color:#fff!important}
    .brand small{font-size:8px!important;letter-spacing:3px!important;color:#d8b34a!important}
    .nav{display:flex!important;align-items:center;justify-content:flex-start;min-width:0;gap:clamp(12px,1vw,20px);margin-left:clamp(16px,2vw,32px)!important;margin-right:clamp(12px,1.5vw,22px)!important;flex:1 1 auto;flex-wrap:nowrap;overflow:hidden}
    .nav>a{font-size:clamp(12px,.86vw,13px)!important;font-weight:800!important;line-height:1!important;letter-spacing:.15px!important;color:#f6f8fb!important;text-shadow:0 1px 1px rgba(0,0,0,.3);white-space:nowrap;flex:0 0 auto;text-decoration:none!important}
    .nav>a:hover{color:#efbd26!important}
    .nav a[data-mcp-genival="1"],.nav a[data-mcp-reta-final="1"]{color:#efbd26!important;font-weight:900!important}
    .nav>a[href*="wa.me"],.social>a[href*="wa.me"],.mcp-header-whatsapp{display:none!important}
    .social{display:flex;align-items:center;gap:10px;margin-left:8px!important;flex:0 0 auto}
    .social a{display:inline-flex!important;align-items:center;justify-content:center;min-height:40px;padding:0 10px!important;white-space:nowrap;line-height:1!important;font-size:13px!important;font-weight:800!important;color:#f6f8fb!important}
    .mobile{background:#06172f;border-top:1px solid #203650}
    .mobile.show{display:flex!important;flex-wrap:wrap;gap:10px;padding:14px 20px 18px!important}
    .mobile.show a{display:block;color:#fff!important;margin:0!important;padding:11px 13px;text-decoration:none;border:1px solid #29415e;border-radius:5px;font-size:14px!important;font-weight:800!important}
    .mobile.show a[data-mcp-genival="1"],.mobile.show a[data-mcp-reta-final="1"]{color:#efbd26!important;border-color:#7b6318}
    @media(max-width:1740px){
      .brand{min-width:64px!important}.brand span{display:none}
      .social{display:none!important}
      .nav{margin-left:14px!important;margin-right:14px!important;gap:12px}
      .nav>a{font-size:12px!important}
    }
    @media(max-width:1650px){
      .header-inner{height:64px!important}.brand{height:64px!important}
      .nav,.social{display:none!important}
      .menu{display:block!important;margin-left:auto}
      .brand{min-width:0!important}.brand span{display:block}
    }
    @media(min-width:1651px){.mobile{display:none!important}}
  `;
  document.head.appendChild(style);

  function ensureMobileLinks(){
    if(!mobile) return;
    const items=[...nav.querySelectorAll(':scope > a'),...(social?[...social.querySelectorAll('a')]:[])];
    items.forEach(a=>{
      const href=a.getAttribute('href')||'#';
      if(/wa\.me/i.test(href)||/whatsapp/i.test((a.textContent||'').trim())) return;
      if(![...mobile.querySelectorAll('a')].some(x=>x.getAttribute('href')===href)){
        const clone=a.cloneNode(true);
        clone.removeAttribute('style');
        mobile.appendChild(clone);
      }
    });
  }

  ensureMobileLinks();
  menuButton?.addEventListener('click',()=>menuButton.setAttribute('aria-expanded',String(mobile?.classList.contains('show'))));
})();

(()=>{
  if(document.querySelector('script[data-mcp-analysis-carousel]')) return;
  const script=document.createElement('script');
  script.src='/analysis-carousel.js?v=20260823-3';
  script.defer=true;
  script.dataset.mcpAnalysisCarousel='1';
  document.body.appendChild(script);
})();

(()=>{
  const grid=document.getElementById('materialsGrid');
  if(!grid) return;
  const links=[
    ['Central Reta Final','/reta-final-gcm-paracatu.html'],
    ['Mapas mentais','/gcm-paracatu-mapas.html'],
    ['Questões LC 198/2025','/questoes-lc-198-2025-gcm-paracatu.html'],
    ['Lei Orgânica','/lei-organica-paracatu-estudo-dirigido.html'],
    ['Treino discursivo','/treino-discursiva-gcm-paracatu.html'],
    ['Simulado Reta Final','/simulado-gcm-paracatu-reta-final-01.html'],
    ['Estatuto Geral das Guardas','/estatuto-geral-guardas-municipais.html']
  ];
  const apply=()=>{
    [...grid.querySelectorAll('.material')].forEach(card=>{
      const title=card.querySelector('h3')?.textContent?.trim();
      if(title!=='GCM Paracatu'||card.dataset.gcmLinks==='1') return;
      card.dataset.gcmLinks='1';
      const box=card.querySelector('.card-links')||card.appendChild(document.createElement('div'));
      box.classList.add('card-links');
      links.forEach(([label,href])=>{
        const a=document.createElement('a');
        a.href=href;
        a.innerHTML=`${label} <span>→</span>`;
        box.appendChild(a);
      });
    });
  };
  apply();
  new MutationObserver(apply).observe(grid,{childList:true,subtree:true});
})();

(()=>{
  if(document.querySelector('script[data-mcp-gcm-card]')) return;
  const script=document.createElement('script');
  script.src='/gcm-card-enhancements.js?v=20260823-1';
  script.defer=true;
  script.dataset.mcpGcmCard='1';
  document.body.appendChild(script);
})();

(()=>{
  const grid=document.getElementById('materialsGrid');
  if(!grid) return;
  const href='/ambientes/direito_penal_questoes.html';
  const apply=()=>{
    [...grid.querySelectorAll('.material')].forEach(card=>{
      const title=(card.querySelector('h3')?.textContent||'').trim();
      if(!/^Questões$/i.test(title)) return;
      const box=card.querySelector('.card-links')||card.appendChild(document.createElement('div'));
      box.classList.add('card-links');
      if(!box.querySelector(`a[href="${href}"]`)){
        const a=document.createElement('a');
        a.href=href;
        a.innerHTML='<strong>Direito Penal — 320 questões</strong> <span>→</span>';
        a.style.color='#062a5d';
        a.style.borderTop='2px solid #efbd26';
        box.prepend(a);
      }
    });
  };
  apply();
  new MutationObserver(apply).observe(grid,{childList:true,subtree:true});
})();

(()=>{
  const addLegislacaoCard=()=>{
    const grid=document.querySelector('#materiais-2026 .mcp-2026-grid');
    if(!grid||grid.querySelector('[data-mcp-legislacao-13022="1"]')) return;
    const card=document.createElement('article');
    card.className='mcp-2026-card';
    card.dataset.mcpLegislacao13022='1';
    card.innerHTML=`<div class="mcp-2026-cover" style="background:linear-gradient(145deg,#061827,#0b315f);display:flex;align-items:center;justify-content:center;padding:28px"><div style="color:#fff;text-align:center"><div style="color:#efbd26;font-size:13px;font-weight:900;letter-spacing:2px">MCP • LEGISLAÇÃO</div><div style="font:700 38px/1.05 Georgia,serif;margin:18px 0 8px">LEI Nº<br>13.022/2014</div><div style="font-weight:900;color:#efbd26">COMENTADA</div><div style="margin-top:14px;font-size:12px;color:#c9d6e2">Estatuto Geral das Guardas Municipais</div></div></div><div class="mcp-2026-content"><span class="mcp-2026-badge">NOVO • 100% GRATUITO</span><small>GCM • LEGISLAÇÃO + JURISPRUDÊNCIA</small><h3>Lei nº 13.022/2014 Comentada</h3><p>Lei seca comentada, jurisprudência do STF e do STJ, Tema 656, ADPF 995, busca pessoal, quadros de reta final, questões comentadas e revisão no padrão MCP.</p><div class="mcp-2026-links"><a class="gold" href="/estatuto-geral-guardas-municipais.html">Abrir material gratuitamente <b>↗</b></a><a class="light" href="/reta-final-gcm-paracatu.html#lei13022">Ler a lei completa <b>→</b></a></div></div>`;
    grid.appendChild(card);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addLegislacaoCard); else addLegislacaoCard();
})();