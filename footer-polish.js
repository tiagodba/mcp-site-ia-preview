(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .footer{padding:64px 0 28px!important;}
    .footer .wrap{max-width:1180px!important;margin:0 auto!important;padding:0 28px!important;}
    .footer-top{display:grid!important;grid-template-columns:1.15fr 1.35fr .9fr!important;align-items:center!important;gap:48px!important;padding-bottom:34px!important;}
    .footer-top>img{width:76px!important;height:auto!important;justify-self:start!important;}
    .footer-title{font-size:22px!important;line-height:1.08!important;letter-spacing:.04em!important;margin:0!important;}
    .footer-top>p{margin:0!important;text-align:center!important;max-width:560px!important;justify-self:center!important;font-size:18px!important;line-height:1.55!important;}
    .footer-links{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:22px!important;flex-wrap:wrap!important;}
    .footer-links a{white-space:nowrap!important;}
    .copyright{padding-top:24px!important;border-top:1px solid rgba(255,255,255,.16)!important;text-align:left!important;}
    .mcp-floating-ui{transition:opacity .22s ease,transform .22s ease!important;}
    body.mcp-footer-visible .mcp-floating-ui{opacity:0!important;pointer-events:none!important;transform:translateY(18px)!important;}
    @media(max-width:980px){
      .footer-top{grid-template-columns:1fr!important;text-align:center!important;gap:22px!important;}
      .footer-top>img,.footer-title,.footer-top>p,.footer-links{justify-self:center!important;}
      .footer-links{justify-content:center!important;}
      .copyright{text-align:center!important;}
    }
    @media(max-width:640px){
      .footer{padding:46px 0 22px!important;}
      .footer .wrap{padding:0 18px!important;}
      .footer-links{gap:14px!important;}
      .footer-top>p{font-size:16px!important;}
    }
  `;
  document.head.appendChild(style);

  const footer=document.querySelector('.footer, footer');
  if(!footer)return;

  const markFloating=()=>{
    const all=[...document.querySelectorAll('button,a,div')];
    for(const el of all){
      const txt=(el.textContent||'').trim();
      const cs=getComputedStyle(el);
      if(cs.position!=='fixed')continue;
      if(el.id==='quizFab'||/Questões IA/i.test(txt)||/Comprar com ajuda/i.test(txt)||txt==='🤖') el.classList.add('mcp-floating-ui');
    }
  };
  markFloating();
  setTimeout(markFloating,800);

  const io=new IntersectionObserver(entries=>{
    document.body.classList.toggle('mcp-footer-visible',entries.some(e=>e.isIntersecting));
  },{threshold:.08});
  io.observe(footer);
})();
