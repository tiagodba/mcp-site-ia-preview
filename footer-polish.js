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

(()=>{
  if(document.getElementById('mcpGcmGoiasAnnouncement')) return;
  const css=document.createElement('style');
  css.textContent=`
    #mcpGcmGoiasAnnouncement{padding:58px 0;background:linear-gradient(135deg,#020b18,#062650 62%,#04334a);color:#fff;position:relative;overflow:hidden}
    #mcpGcmGoiasAnnouncement:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 78% 25%,rgba(31,211,200,.18),transparent 28%),linear-gradient(115deg,transparent 0 52%,rgba(239,189,38,.08) 52% 53%,transparent 53%);pointer-events:none}
    .mcp-gcm-wrap{width:min(1180px,calc(100% - 40px));margin:auto;position:relative;z-index:1}
    .mcp-gcm-card{display:grid;grid-template-columns:1.25fr .75fr;gap:34px;align-items:center;border:1px solid rgba(255,255,255,.16);border-radius:18px;background:linear-gradient(145deg,rgba(3,22,47,.94),rgba(6,45,99,.84));box-shadow:0 22px 65px rgba(0,0,0,.28);padding:42px}
    .mcp-gcm-kicker{display:inline-flex;align-items:center;gap:9px;color:#efbd26;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}.mcp-gcm-kicker:before{content:'●';font-size:9px}
    .mcp-gcm-card h2{font:700 42px/1.05 Georgia,serif;margin:0 0 18px;color:#fff}.mcp-gcm-card h2 span{display:block;color:#efbd26;margin-top:7px}.mcp-gcm-card h2 em{font-style:normal;color:#45d6d0}
    .mcp-gcm-card p{margin:0;color:#c1ccda;font-size:16px;line-height:1.7;max-width:680px}
    .mcp-gcm-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}.mcp-gcm-tags span{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);padding:9px 12px;border-radius:999px;font-size:11px;font-weight:800;color:#e5edf6}
    .mcp-gcm-side{display:flex;justify-content:center}.mcp-gcm-badge{width:min(320px,100%);aspect-ratio:1/1;border-radius:20px;border:1px solid rgba(239,189,38,.45);background:linear-gradient(145deg,#071b34,#0b3258);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px;box-shadow:inset 0 0 50px rgba(0,0,0,.25)}
    .mcp-gcm-icon{font-size:58px;margin-bottom:14px}.mcp-gcm-badge strong{font-size:28px;line-height:1.05;color:#efbd26}.mcp-gcm-badge small{display:block;margin-top:12px;color:#aebdce;letter-spacing:1.5px;font-weight:800}
    @media(max-width:820px){.mcp-gcm-card{grid-template-columns:1fr;padding:30px}.mcp-gcm-side{justify-content:flex-start}.mcp-gcm-badge{aspect-ratio:auto;width:100%;min-height:170px}.mcp-gcm-card h2{font-size:35px}}
    @media(max-width:520px){#mcpGcmGoiasAnnouncement{padding:38px 0}.mcp-gcm-wrap{width:min(100% - 24px,1180px)}.mcp-gcm-card{padding:24px 20px;border-radius:14px}.mcp-gcm-card h2{font-size:30px}.mcp-gcm-card p{font-size:14px}}
  `;
  document.head.appendChild(css);
  const section=document.createElement('section');
  section.id='mcpGcmGoiasAnnouncement';
  section.innerHTML=`<div class="mcp-gcm-wrap"><div class="mcp-gcm-card"><div><div class="mcp-gcm-kicker">Novidades MCP • Em produção</div><h2>Materiais para os concursos da GCM de <span>Caldas Novas <em>e Rio Verde</em></span></h2><p>A MCP está produzindo materiais estratégicos voltados aos concursos das Guardas Civis Municipais de Caldas Novas e Rio Verde, com conteúdo organizado para estudo, revisão e preparação direcionada.</p><div class="mcp-gcm-tags"><span>Conteúdo completo</span><span>Revisão estratégica</span><span>Mapas mentais</span><span>Material de alta qualidade</span></div></div><div class="mcp-gcm-side"><div class="mcp-gcm-badge"><div class="mcp-gcm-icon">🛡️</div><strong>EM<br>PRODUÇÃO</strong><small>MCP • CARREIRAS POLICIAIS</small></div></div></div></div>`;
  const hero=document.querySelector('.hero');
  if(hero) hero.insertAdjacentElement('afterend',section); else document.body.prepend(section);
})();
