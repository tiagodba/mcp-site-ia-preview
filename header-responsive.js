(()=>{
  const header=document.querySelector('.header');
  const inner=header?.querySelector('.header-inner');
  const nav=header?.querySelector('.nav');
  const social=header?.querySelector('.social');
  const mobile=header?.querySelector('.mobile');
  const menuButton=header?.querySelector('.menu');
  if(!header||!inner||!nav||document.getElementById('mcpMoreWrap')) return;

  const style=document.createElement('style');
  style.textContent=`
    .header,.header-inner{max-width:100%}
    .header{overflow:visible}
    .header-inner{gap:18px}
    .nav{min-width:0;gap:18px}
    .nav a{font-size:12px}
    .mcp-more{position:relative;display:none;align-self:stretch}
    .mcp-more.show{display:flex}
    .mcp-more-btn{border:0;background:transparent;color:#efbd26;font-weight:900;font-size:12px;padding:0 5px;cursor:pointer;white-space:nowrap}
    .mcp-more-panel{position:absolute;right:0;top:66px;width:245px;padding:9px;background:#06172f;border:1px solid #28415f;border-top:3px solid #efbd26;border-radius:0 0 8px 8px;box-shadow:0 18px 42px #0008;display:none;z-index:80}
    .mcp-more.open .mcp-more-panel{display:grid}
    .mcp-more-panel a{display:block!important;color:#fff!important;border:0!important;padding:12px 13px!important;font-size:12px!important;text-decoration:none;white-space:normal}
    .mcp-more-panel a:hover{background:#102c50;color:#efbd26!important}
    .mcp-more-divider{height:1px;background:#29415e;margin:6px 4px}
    .mobile{background:#06172f;border-top:1px solid #203650}
    .mobile.show{display:flex!important;flex-wrap:wrap;gap:10px;padding:14px 20px 18px!important}
    .mobile.show a{display:block;color:#fff!important;margin:0!important;padding:10px 12px;text-decoration:none;border:1px solid #29415e;border-radius:5px}
    @media(max-width:1450px){
      .brand{min-width:64px!important}
      .brand span{display:none}
      .social{display:none!important}
    }
    @media(max-width:1180px){
      .nav,.social{display:none!important}
      .menu{display:block!important;margin-left:auto}
      .brand{min-width:0!important}
      .brand span{display:block}
      .mcp-more{display:none!important}
    }
    @media(min-width:1181px){.mobile{display:none!important}}
  `;
  document.head.appendChild(style);

  const more=document.createElement('div');
  more.id='mcpMoreWrap';
  more.className='mcp-more';
  more.innerHTML='<button class="mcp-more-btn" type="button" aria-expanded="false">Mais ▾</button><div class="mcp-more-panel"></div>';
  nav.appendChild(more);
  const panel=more.querySelector('.mcp-more-panel');
  const button=more.querySelector('.mcp-more-btn');
  let fitting=false;

  function ensureMobileLinks(){
    if(!mobile) return;
    const items=[...nav.querySelectorAll(':scope > a'),...panel.querySelectorAll('a'),...(social?[...social.querySelectorAll('a')]:[])];
    items.forEach(a=>{
      const href=a.getAttribute('href')||'#';
      if(![...mobile.querySelectorAll('a')].some(x=>x.getAttribute('href')===href)){
        const clone=a.cloneNode(true);clone.removeAttribute('style');mobile.appendChild(clone);
      }
    });
  }

  function fit(){
    if(fitting) return; fitting=true;
    try{
      const direct=[...nav.children].filter(x=>x.tagName==='A');
      direct.forEach(a=>nav.insertBefore(a,more));
      panel.innerHTML='';
      const width=window.innerWidth;
      if(width<=1180){more.classList.remove('show','open');ensureMobileLinks();return}
      const keep=width<=1550?6:8;
      const links=[...nav.querySelectorAll(':scope > a')];
      links.slice(keep).forEach(a=>panel.appendChild(a));
      if(width<=1450&&social){
        const divider=document.createElement('div');divider.className='mcp-more-divider';panel.appendChild(divider);
        [...social.querySelectorAll('a')].forEach(a=>panel.appendChild(a.cloneNode(true)));
      }
      more.classList.toggle('show',panel.querySelectorAll('a').length>0);
      ensureMobileLinks();
    }finally{fitting=false}
  }

  button.onclick=e=>{e.stopPropagation();const open=more.classList.toggle('open');button.setAttribute('aria-expanded',String(open))};
  document.addEventListener('click',()=>{more.classList.remove('open');button.setAttribute('aria-expanded','false')});
  menuButton?.addEventListener('click',()=>menuButton.setAttribute('aria-expanded',String(mobile?.classList.contains('show'))));
  const observer=new MutationObserver(()=>requestAnimationFrame(fit));
  observer.observe(nav,{childList:true});
  window.addEventListener('resize',fit,{passive:true});
  setTimeout(fit,0);setTimeout(fit,600);setTimeout(fit,1600);
})();