(()=>{
  const header=document.querySelector('.header');
  const inner=header?.querySelector('.header-inner');
  const nav=header?.querySelector('.nav');
  const social=header?.querySelector('.social');
  const mobile=header?.querySelector('.mobile');
  const menuButton=header?.querySelector('.menu');
  if(!header||!inner||!nav) return;

  const norm=s=>(s||'').replace(/\s+/g,' ').trim();
  const isWhatsapp=a=>/whatsapp/i.test(norm(a.textContent))||/wa\.me/i.test(a.getAttribute('href')||'');
  const isReta=a=>{const t=norm(a.textContent);const h=a.getAttribute('href')||'';return /^Reta Final GCM(?: Paracatu)?(?:\s*[↗→])?$/i.test(t)||/reta-final-gcm-paracatu/i.test(h)};
  const isPprn=a=>/^PP-RN 2026$/i.test(norm(a.textContent))||/legislacao-pprn-2026\.html/i.test(a.getAttribute('href')||'');

  [nav,social,mobile].filter(Boolean).forEach(root=>{[...root.querySelectorAll('a')].forEach(a=>{if(isWhatsapp(a)||/plano genival/i.test(norm(a.textContent)))a.remove()})});
  inner.querySelector('.mcp-header-whatsapp')?.remove();

  const meds=[];
  [nav,social,mobile].filter(Boolean).forEach(root=>{[...root.querySelectorAll('a')].forEach(a=>{if(/^Medicina Legal$/i.test(norm(a.textContent))||/plano-leitura-medicina-legal-genival/i.test(a.getAttribute('href')||''))meds.push(a)})});
  let medicina=meds.find(a=>a.parentElement===nav)||meds[0]||document.createElement('a');
  meds.forEach(a=>{if(a!==medicina)a.remove()});
  medicina.textContent='Medicina Legal';medicina.href='/plano-leitura-medicina-legal-genival.html';medicina.title='Medicina Legal — cronograma de leitura Genival Veloso de França';medicina.dataset.mcpMedicina='1';
  if(medicina.parentElement!==nav)nav.appendChild(medicina);

  const penalLinks=[];
  [nav,social,mobile].filter(Boolean).forEach(root=>{[...root.querySelectorAll('a')].forEach(a=>{if(/^Resumos Direito Penal$/i.test(norm(a.textContent))||/resumos-direito-penal\.html/i.test(a.getAttribute('href')||''))penalLinks.push(a)})});
  let penal=penalLinks.find(a=>a.parentElement===nav)||penalLinks[0]||document.createElement('a');
  penalLinks.forEach(a=>{if(a!==penal)a.remove()});
  penal.textContent='Resumos Direito Penal';penal.href='/resumos-direito-penal.html';penal.title='Resumos táticos de Direito Penal — MCP';penal.dataset.mcpPenal='1';
  if(penal.parentElement!==nav)nav.appendChild(penal);

  [nav,social,mobile].filter(Boolean).forEach(root=>{[...root.querySelectorAll('a')].forEach(a=>{if(isReta(a))a.remove()})});
  const reta=document.createElement('a');reta.href='/reta-final-gcm-paracatu.html';reta.textContent='Reta Final GCM Paracatu';reta.title='Reta Final GCM Paracatu';reta.dataset.mcpRetaFinal='1';

  // Nova aba dedicada à legislação estadual do RN para o PPRN 2026.
  [nav,social,mobile].filter(Boolean).forEach(root=>{[...root.querySelectorAll('a')].forEach(a=>{if(isPprn(a))a.remove()})});
  const pprn=document.createElement('a');pprn.href='/legislacao-pprn-2026.html';pprn.textContent='Legislação PPRN';pprn.title='Legislação Estadual do RN — PPRN 2026';pprn.dataset.mcpPprn='1';

  const questions=[...nav.querySelectorAll(':scope > a')].find(a=>/^Questões$/i.test(norm(a.textContent)));
  if(questions){questions.href='/questoes.html';questions.title='Central de Questões MCP'}
  const law=[...nav.querySelectorAll(':scope > a')].find(a=>/^Legislação$/i.test(norm(a.textContent)));
  if(law){law.href='/legislacao-jurisprudencia.html';law.title='Legislação recente e jurisprudência do STF e STJ'}

  // Ordem principal: Legislação > Resumos Direito Penal > Medicina Legal > Reta Final GCM > Legislação PPRN.
  if(law){law.insertAdjacentElement('afterend',penal);penal.insertAdjacentElement('afterend',medicina);medicina.insertAdjacentElement('afterend',reta);reta.insertAdjacentElement('afterend',pprn)}
  else{nav.appendChild(penal);nav.appendChild(medicina);nav.appendChild(reta);nav.appendChild(pprn)}

  let instagram=[...nav.querySelectorAll(':scope > a')].find(a=>/instagram/i.test(norm(a.textContent)));
  if(!instagram&&social)instagram=[...social.querySelectorAll('a')].find(a=>/instagram/i.test(norm(a.textContent)));
  if(instagram)nav.appendChild(instagram);
  // PP-RN 2026 já existente passa a apontar para a nova aba, se encontrado.
  const legacyPprn=[...nav.querySelectorAll(':scope > a')].find(a=>isPprn(a)&&a!==pprn);
  if(legacyPprn)legacyPprn.remove();
  [...nav.querySelectorAll(':scope > a')].forEach(a=>{if(/^Editais$/i.test(norm(a.textContent)))a.dataset.mcpLowPriority='1'});

  const finalRetas=[...nav.querySelectorAll(':scope > a')].filter(isReta);finalRetas.forEach(a=>{if(a!==reta)a.remove()});

  const style=document.createElement('style');style.id='mcp-header-fix-final';style.textContent=`
    .header,.header-inner{max-width:100%}.header{overflow:visible}
    .header-inner{gap:12px;height:68px!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important}
    .brand{height:68px!important;align-items:center!important;flex:0 0 auto}.brand img{width:48px!important;height:48px!important;margin:0 10px 0 0!important;display:block}
    .brand strong{font-size:15px!important;line-height:1.1!important;font-weight:800!important;color:#fff!important}.brand small{font-size:8px!important;letter-spacing:3px!important;color:#d8b34a!important}
    .nav{display:flex!important;align-items:center;justify-content:flex-start;min-width:0;gap:clamp(8px,.68vw,14px);margin-left:clamp(10px,1.4vw,24px)!important;margin-right:6px!important;flex:1 1 auto;flex-wrap:nowrap;overflow:visible!important}
    .nav>a{font-size:clamp(11px,.80vw,13px)!important;font-weight:800!important;line-height:1!important;letter-spacing:.05px!important;color:#f6f8fb!important;text-shadow:0 1px 1px rgba(0,0,0,.3);white-space:nowrap;flex:0 0 auto;text-decoration:none!important;padding-left:0!important;padding-right:0!important}
    .nav>a:first-child{color:#efbd26!important;border-bottom:2px solid #efbd26!important}.nav>a:hover{color:#efbd26!important}
    .nav a[data-mcp-penal="1"],.nav a[data-mcp-pprn="1"]{color:#efbd26!important;font-weight:900!important}.nav a[data-mcp-medicina="1"]{color:#f6f8fb!important;font-weight:900!important}.nav a[data-mcp-reta-final="1"]{color:#efbd26!important;font-weight:900!important}
    .nav>a[href*="wa.me"],.social>a[href*="wa.me"],.mcp-header-whatsapp{display:none!important}
    .social{display:flex;align-items:center;gap:8px;margin-left:4px!important;flex:0 0 auto}.social a{font-size:12px!important;font-weight:800!important;color:#f6f8fb!important}
    .mobile{background:#06172f;border-top:1px solid #203650}.mobile.show{display:flex!important;flex-wrap:wrap;gap:10px;padding:14px 20px 18px!important}.mobile.show a{display:block;color:#fff!important;margin:0!important;padding:11px 13px;text-decoration:none;border:1px solid #29415e;border-radius:5px;font-size:14px!important;font-weight:800!important}
    @media(max-width:1740px){.brand{min-width:58px!important}.brand span{display:none}.social{display:none!important}.nav{margin-left:7px!important;margin-right:4px!important;gap:7px!important}.nav>a{font-size:11.5px!important}}
    @media(max-width:1510px){.nav>a[data-mcp-low-priority="1"]{display:none!important}.nav{gap:8px!important}.nav>a{font-size:11.5px!important}}
    @media(max-width:1950px){.header-inner{height:64px!important}.brand{height:64px!important;min-width:0!important}.brand span{display:block}.social{display:none!important}.nav{display:flex!important;align-items:center;gap:12px!important;margin-left:24px!important;overflow:hidden!important}.nav>a{display:none!important}.nav>a[href="#inicio"],.nav>a[href="#materiais"]:first-of-type,.nav>a[href="/questoes-gcm-2026.html"],.nav>a[href="/questoes.html"],.nav>a[data-mcp-reta-final="1"],.nav>a[data-mcp-pprn="1"]{display:inline-flex!important}.menu{display:block!important;margin-left:auto;flex:0 0 auto}}
    @media(max-width:1220px){.nav>a[href="/questoes.html"],.nav>a[data-mcp-reta-final="1"],.nav>a[data-mcp-pprn="1"]{display:none!important}}
    @media(max-width:980px){.nav{display:none!important}}
    @media(min-width:1951px){.mobile{display:none!important}}
  `;
  document.getElementById('mcp-header-fix-final')?.remove();document.head.appendChild(style);

  function rebuildMobile(){if(!mobile)return;mobile.innerHTML='';[...nav.querySelectorAll(':scope > a')].forEach(a=>mobile.appendChild(a.cloneNode(true)))}
  rebuildMobile();menuButton?.addEventListener('click',()=>menuButton.setAttribute('aria-expanded',String(mobile?.classList.contains('show'))));

  const observer=new MutationObserver(()=>{
    const all=[...nav.querySelectorAll(':scope > a')].filter(isReta);all.forEach(a=>{if(a!==reta)a.remove()});
    if(reta.parentElement!==nav){if(medicina.parentElement===nav)medicina.insertAdjacentElement('afterend',reta);else nav.appendChild(reta)}
    if(penal.parentElement!==nav){if(law?.parentElement===nav)law.insertAdjacentElement('afterend',penal);else nav.insertBefore(penal,nav.firstChild)}
    const pprnLinks=[...nav.querySelectorAll(':scope > a')].filter(isPprn);pprnLinks.forEach(a=>{if(a!==pprn)a.remove()});
    if(pprn.parentElement!==nav){if(reta.parentElement===nav)reta.insertAdjacentElement('afterend',pprn);else nav.appendChild(pprn)}
  });
  observer.observe(nav,{childList:true,subtree:false});
})();

(()=>{if(document.querySelector('script[data-mcp-analysis-carousel]'))return;const s=document.createElement('script');s.src='/analysis-carousel.js?v=20260823-3';s.defer=true;s.dataset.mcpAnalysisCarousel='1';document.body.appendChild(s)})();
(()=>{if(document.querySelector('script[data-mcp-gcm-card]'))return;const s=document.createElement('script');s.src='/gcm-card-enhancements.js?v=20260823-1';s.defer=true;s.dataset.mcpGcmCard='1';document.body.appendChild(s)})();
