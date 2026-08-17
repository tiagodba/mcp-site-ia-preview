(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .footer{padding:42px 0 22px!important;}
    .footer .wrap{max-width:1180px!important;margin:0 auto!important;padding:0 28px!important;}
    .footer-top{display:grid!important;grid-template-columns:auto 1fr!important;align-items:center!important;gap:28px!important;padding-bottom:26px!important;min-height:0!important;}
    .footer-top>img{width:68px!important;height:68px!important;object-fit:contain!important;justify-self:start!important;margin:0!important;}
    .footer-title{font-size:24px!important;line-height:1.05!important;letter-spacing:.035em!important;margin:0!important;max-width:420px!important;}
    .footer-top>p{grid-column:2!important;margin:10px 0 0!important;text-align:left!important;max-width:620px!important;justify-self:start!important;font-size:17px!important;line-height:1.55!important;color:#aeb8c6!important;}
    .footer-links{display:none!important;}
    .copyright{padding-top:20px!important;border-top:1px solid rgba(255,255,255,.16)!important;text-align:left!important;color:#8fa0b5!important;}
    .mcp-floating-ui{transition:opacity .22s ease,transform .22s ease!important;}
    body.mcp-footer-visible .mcp-floating-ui{opacity:0!important;pointer-events:none!important;transform:translateY(18px)!important;}
    @media(max-width:980px){
      .footer-top{grid-template-columns:1fr!important;text-align:center!important;gap:14px!important;}
      .footer-top>img,.footer-title,.footer-top>p{justify-self:center!important;}
      .footer-top>p{grid-column:1!important;text-align:center!important;margin-top:4px!important;}
      .copyright{text-align:center!important;}
    }
    @media(max-width:640px){
      .footer{padding:34px 0 18px!important;}
      .footer .wrap{padding:0 18px!important;}
      .footer-top>img{width:60px!important;height:60px!important;}
      .footer-title{font-size:21px!important;}
      .footer-top>p{font-size:15px!important;}
    }
  `;
  document.head.appendChild(style);

  const footer=document.querySelector('.footer, footer');
  if(!footer)return;

  const links=footer.querySelector('.footer-links');
  if(links) links.remove();

  const top=footer.querySelector('.footer-top');
  if(top){
    const img=top.querySelector('img');
    const title=top.querySelector('.footer-title');
    const p=top.querySelector('p');
    if(img&&title&&p){
      top.innerHTML='';
      top.appendChild(img);
      const group=document.createElement('div');
      group.style.minWidth='0';
      group.appendChild(title);
      group.appendChild(p);
      top.appendChild(group);
    }
  }

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
