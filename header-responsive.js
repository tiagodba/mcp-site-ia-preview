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

  const oldMore=document.getElementById('mcpMoreWrap');
  if(oldMore){
    [...oldMore.querySelectorAll('.mcp-more-panel > a:not([data-social-clone])')].forEach(a=>nav.insertBefore(a,oldMore));
    oldMore.remove();
  }

  const style=document.createElement('style');
  style.textContent=`
    .header,.header-inner{max-width:100%}
    .header{overflow:visible}
    .header-inner{gap:14px;height:64px!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important}
    .brand{height:64px!important;align-items:center!important;flex:0 0 auto}
    .brand img{width:46px!important;height:46px!important;margin:0 9px 0 0!important;display:block}
    .nav{display:flex!important;align-items:center;justify-content:flex-start;min-width:0;gap:clamp(10px,1vw,18px);margin-left:clamp(18px,3vw,48px)!important;margin-right:auto;flex-wrap:nowrap}
    .nav>a{font-size:clamp(10px,.78vw,12px)!important;white-space:nowrap}
    .nav a[data-mcp-genival="1"]{color:#efbd26!important;font-weight:900}
    .mobile{background:#06172f;border-top:1px solid #203650}
    .mobile.show{display:flex!important;flex-wrap:wrap;gap:10px;padding:14px 20px 18px!important}
    .mobile.show a{display:block;color:#fff!important;margin:0!important;padding:10px 12px;text-decoration:none;border:1px solid #29415e;border-radius:5px}
    .mobile.show a[data-mcp-genival="1"]{color:#efbd26!important;border-color:#7b6318}
    @media(max-width:1450px){
      .brand{min-width:64px!important}.brand span{display:none}
      .social{display:none!important}
      .nav{margin-left:18px!important;gap:10px}
      .nav>a{font-size:10px!important}
    }
    @media(max-width:1180px){
      .header-inner{height:62px!important}.brand{height:62px!important}
      .nav,.social{display:none!important}
      .menu{display:block!important;margin-left:auto}
      .brand{min-width:0!important}.brand span{display:block}
    }
    @media(min-width:1181px){.mobile{display:none!important}}
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
