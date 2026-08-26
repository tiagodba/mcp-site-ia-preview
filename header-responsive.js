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

  if(!nav.querySelector('[data-mcp-genival="1"]')){
    const genival=document.createElement('a');
    genival.href='/plano-leitura-medicina-legal-genival.html';
    genival.textContent='Plano Genival';
    genival.title='Plano de leitura Medicina Legal — PC-BA e PC-MA';
    genival.dataset.mcpGenival='1';
    nav.appendChild(genival);
  }

  // Evita o WhatsApp misturado entre os links do menu e cria um CTA próprio.
  [...nav.querySelectorAll(':scope > a')].forEach(a=>{
    const href=a.getAttribute('href')||'';
    const label=(a.textContent||'').trim();
    if(/whatsapp/i.test(label)||/wa\.me/i.test(href)) a.remove();
  });
  if(social){
    [...social.querySelectorAll('a')].forEach(a=>{
      const href=a.getAttribute('href')||'';
      const label=(a.textContent||'').trim();
      if(/whatsapp/i.test(label)||/wa\.me/i.test(href)) a.dataset.mcpWhatsappLegacy='1';
    });
  }
  let headerWhatsapp=inner.querySelector('.mcp-header-whatsapp');
  if(!headerWhatsapp){
    headerWhatsapp=document.createElement('a');
    headerWhatsapp.className='mcp-header-whatsapp';
    headerWhatsapp.href='https://wa.me/5561995699279';
    headerWhatsapp.target='_blank';
    headerWhatsapp.rel='noopener noreferrer';
    headerWhatsapp.setAttribute('aria-label','Conversar com a MCP pelo WhatsApp');
    headerWhatsapp.innerHTML='<span class="mcp-wa-icon" aria-hidden="true">✆</span><span class="mcp-wa-text">WhatsApp</span>';
    inner.insertBefore(headerWhatsapp,menuButton||null);
  }

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
    .header-inner{gap:14px;height:64px!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important}
    .brand{height:64px!important;align-items:center!important;flex:0 0 auto}
    .brand img{width:46px!important;height:46px!important;margin:0 9px 0 0!important;display:block}
    .nav{display:flex!important;align-items:center;justify-content:flex-start;min-width:0;gap:clamp(12px,1.2vw,26px);margin-left:clamp(16px,2vw,32px)!important;margin-right:clamp(12px,1.5vw,24px)!important;flex:1 1 auto;flex-wrap:nowrap;overflow:hidden}
    .nav>a{font-size:clamp(10px,.78vw,12px)!important;white-space:nowrap;flex:0 0 auto}
    .nav a[data-mcp-genival="1"]{color:#efbd26!important;font-weight:900}
    .nav>a[href*="wa.me"]{display:none!important}
    .social{display:flex;align-items:center;gap:10px;margin-left:0!important;flex:0 0 auto}
    .social a{display:inline-flex!important;align-items:center;justify-content:center;min-height:40px;padding:0 12px!important;white-space:nowrap;line-height:1!important}
    .social a[data-mcp-whatsapp-legacy="1"],.social a[href*="wa.me"]{display:none!important}
    .mcp-header-whatsapp{display:inline-flex!important;align-items:center;justify-content:center;gap:7px;min-height:40px;padding:0 15px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:#25d366;color:#062016!important;text-decoration:none;font-size:12px;font-weight:900;line-height:1;white-space:nowrap;flex:0 0 auto;box-shadow:0 8px 20px rgba(0,0,0,.22);transition:transform .18s ease,box-shadow .18s ease}
    .mcp-header-whatsapp:hover{transform:translateY(-1px);box-shadow:0 10px 24px rgba(0,0,0,.3)}
    .mcp-wa-icon{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#fff;color:#168a43;font-size:15px;font-weight:900}
    .mcp-wa-text{display:inline-block}
    .mobile{background:#06172f;border-top:1px solid #203650}
    .mobile.show{display:flex!important;flex-wrap:wrap;gap:10px;padding:14px 20px 18px!important}
    .mobile.show a{display:block;color:#fff!important;margin:0!important;padding:10px 12px;text-decoration:none;border:1px solid #29415e;border-radius:5px}
    .mobile.show a[data-mcp-genival="1"]{color:#efbd26!important;border-color:#7b6318}
    @media(max-width:1740px){
      .brand{min-width:64px!important}.brand span{display:none}
      .social{display:none!important}
      .nav{margin-left:14px!important;margin-right:10px!important;gap:10px}
      .nav>a{font-size:10px!important}
      .mcp-header-whatsapp{margin-left:auto}
    }
    @media(max-width:1650px){
      .header-inner{height:62px!important;gap:10px}.brand{height:62px!important}
      .nav,.social{display:none!important}
      .menu{display:block!important;margin-left:0!important;flex:0 0 auto}
      .brand{min-width:0!important;margin-right:auto}.brand span{display:block}
      .mcp-header-whatsapp{margin-left:auto;min-height:38px;padding:0 13px}
    }
    @media(max-width:700px){
      .header-inner{gap:8px!important}
      .mcp-header-whatsapp{min-height:38px;padding:0 11px;font-size:11px}
      .mcp-wa-icon{width:20px;height:20px;font-size:14px}
    }
    @media(max-width:520px){
      .brand span{display:none!important}.brand img{margin-right:0!important}
      .mcp-header-whatsapp{padding:0 10px}
      .menu{padding:7px 10px!important}
    }
    @media(min-width:1651px){.mobile{display:none!important}}
  `;
  document.head.appendChild(style);

  function ensureMobileLinks(){
    if(!mobile) return;
    const items=[...nav.querySelectorAll(':scope > a'),...(social?[...social.querySelectorAll('a')]:[])];
    items.forEach(a=>{
      const href=a.getAttribute('href')||'#';
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