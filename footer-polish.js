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
    .mcp-gcm-card h2{font:700 42px/1.05 Georgia,serif;margin:0 0 18px;color:#fff}.mcp-gcm-card h2 span{display:block;color:#efbd26;margin-top:7px}
    .mcp-gcm-card p{margin:0;color:#c1ccda;font-size:16px;line-height:1.7;max-width:680px}
    .mcp-gcm-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}.mcp-gcm-tags span{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);padding:9px 12px;border-radius:999px;font-size:11px;font-weight:800;color:#e5edf6}
    .mcp-gcm-side{display:flex;justify-content:center}.mcp-gcm-badge{width:min(360px,100%);border-radius:18px;border:1px solid rgba(239,189,38,.55);background:#071a35;padding:14px;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 50px rgba(0,0,0,.22),0 15px 35px rgba(0,0,0,.24);overflow:hidden}.mcp-gcm-badge img{display:block;width:100%;height:auto;max-height:440px;object-fit:contain;border-radius:12px;background:#fff}
    @media(max-width:820px){.mcp-gcm-card{grid-template-columns:1fr;padding:30px}.mcp-gcm-side{justify-content:flex-start}.mcp-gcm-badge{width:min(420px,100%)}.mcp-gcm-card h2{font-size:35px}}
    @media(max-width:520px){#mcpGcmGoiasAnnouncement{padding:38px 0}.mcp-gcm-wrap{width:min(100% - 24px,1180px)}.mcp-gcm-card{padding:24px 20px;border-radius:14px}.mcp-gcm-card h2{font-size:30px}.mcp-gcm-card p{font-size:14px}.mcp-gcm-badge{padding:9px;border-radius:14px}}
  `;
  document.head.appendChild(css);
  const section=document.createElement('section');
  section.id='mcpGcmGoiasAnnouncement';
  const notice='data:image/jpeg;base64,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sq4Ct7tWcJVrMCt8fhTThNfgIuFpOs6VKgHPGddMsV/xuq9WCduH61KavCiO/U3Wi4J8KacJr8XWthTUQ00mKmYrMFaYqIEWdazqT5E04TX76acJr99NOD6mopFeuV7PUCZ+ogq+oMf1FZD6aq1X7SacP8A2U6yJT7KdhVpwVqYFZw7eh+0mnCa/hkt5f3LBfsJpwms7LzO0BuHBiq0dGL4XmDzBpi0S+P0004TWEjIkYD+M27PIFu/27vfyBjUq4R60NYzuiNmv0U04TWYCYCAWBoqW6Et0JFpKp6ElSlm3Qk6FnQsVQi/RTThNfwyEBBl4DeZD66acJrGJvdhwVaYNArYIrBijQI98GEVWD/TTThNYfditlhqMKvZU63LQ1alneopotdfqppwmsKgnAcdS5igoVqYZTRUzpWIgQfVTThNYSBAwPBYhu0ynp9hNOE1i3Vn94mvYuYZSLgE1VvkszWF1srhh9NNOE1hX3xiriGok1Oh7VaZaCg0Si2QoNOh4lFg/wBNNOE1+AVZ2LOxZ2LOwRXB/Imw8pZ5SzylnlLPKWeUs8pZ5SzylnlLPKWeUs8pZ5S8JpwmsGWPuYnuvWJ1idaiYKJhYqio1wfxfSU1ybx51LY0LQUlDdAi0wanR+q0b0+gZCgDD7HhNOE1gVgtmsosrQOe31EXEVKn/IqEGt6f+z8H0iNie4zvM7zDW9+687f37jitUqveTBWIh/nhNOE1+G1vy/mePTnj0549OePTnj0549OePTnj0549OePTnj0549OePTnj0549OePTnj0+E04TWFvcPczMrO0xGy+ymnCay4uPYxaiu4RRP4+ymnCakXGJv+8UWWnTZan2k04TX8AwP2004TWZM0GYINxi2JBEVWH2U04TWKv+MKZT0WqGf7SacJrMBMYPaU6bLU+0mnHawne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne072ne0TT/xAAlEQACAgECBgIDAAAAAAAAAAAAARESAiFAAxAgIjAxMkFQYGH/2gAIAQMBAT8B2lixYsWJLFixJJYsW6GWLFiSSxIsiUNifgggggggggj9pzyhaHBl/I4mWk4mGUrXzWG17LIsiUWXloVKFSpTdTqSN/0x9bCy2VXy1NTU18s7KBiTIYvNJO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N5b3FhNEb8CLtguUeM45Wq6p15ovFx1wVZdE640Xi464KsuiX9sil4WVLnMTfOKD08d1qZHFv8oMWbWq5YEGnJtwYFnCoq5xEBwoDDy1Eht1OvBJjvAOLn94GL+i6nYP4LOp2DyZ71DMJaHM3MhapajctfLgLvGpmXbovCIRmcLO03IpSrlOWsLdeMSoqrhiHBanOcwDT0uJRXjX4hYl/oqLVaUc5e1k44eRKArA5cWMVGBfSNoLy6GprsOJ6XGDVs/uHRV2yiEN75QQHTfvN+d1OweTIJSWTBAdtYlHKaQV6QO6ybxECwPCcAXzqUBaxqLbD7S3VSLd9BqBQoVwqZCVuBgC+OI0G6rcdingxAAoKJgAPrKciUqqK5TWoOBibsM7xEqtQFFGjzup2DyZFweIDCqGQUX+ZqLc5X+Yjo8laZikBMPGAV4evGU7Tdt2wkY5OSm9EGFHja9x0ZwarUsUYXZlTErrxlYmyp+Y3tgdX0jw+6ymlgeTEzbhWSFSpyC3pl3IHV+ZkUrL/wAiobXllioDIcM23bAVVt1FpgGLPVANgtA6iaBwZX+JZ0dbXUQcnIXxdTsHkyoAPU1AI0cbm3kLUz2BDirMKw9oAFBX3Lqdg8mZWXJMhYFFPScQ0prpcwsBthTTx+H3Tqdg8mBlpiSLDg4/of8jEuE5ZEp3b906nYPoZNLE+6dTsHlyBWmbs1FkE6pCMaY4/Ixd+sZ2kvPWPXMH7g6nYPJnUXMJGOEyrq6v98E6AbpeNfdOp2Dy6jSPdK8/zwAA0TlkSndv3Tqdg8TFFBnQnoT0J6E9CehPQnoT0J6E9CehPQnoT0J6E9CehPQnoT0J6E9CehPQnoT0J6E9CehPQnsE//9oADAMBAAIAAwAAABDwAAAAAAAAAAAAAAADDz0ROmaO8j0y8sEdiMDygcQQt0gQeleY8wwgDy5zyx1wy/zz/wD888oA88cEgXYoykYwsc88oA8sXKusMs8M8s88ccoA888Mc88888888888oA8888888888888888oA8888888884888888oA8888888t2jS88888oA888888y9ayE30888oA88888sRkMpol9888oA8888888888888888oA8xeh088888888888oA8c3wC44088888888oA88Ekis0qX8888888oA88z4jI4888888888oA8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';
  section.innerHTML=`<div class="mcp-gcm-wrap"><div class="mcp-gcm-card"><div><div class="mcp-gcm-kicker">Novidades MCP • Em produção</div><h2>Materiais para o concurso da <span>GCM de Caldas Novas</span></h2><p>A MCP está produzindo materiais estratégicos voltados ao concurso da Guarda Civil Municipal de Caldas Novas, com conteúdo organizado para estudo, revisão e preparação direcionada.</p><div class="mcp-gcm-tags"><span>Conteúdo completo</span><span>Revisão estratégica</span><span>Mapas mentais</span><span>Material de alta qualidade</span></div></div><div class="mcp-gcm-side"><div class="mcp-gcm-badge"><img src="${notice}" alt="Divulgação do concurso da Guarda Civil Municipal de Caldas Novas"></div></div></div></div>`;
  const hero=document.querySelector('.hero');
  if(hero) hero.insertAdjacentElement('afterend',section); else document.body.prepend(section);
})();

(()=>{
  if(document.querySelector('script[data-mcp-susp]')) return;
  const s=document.createElement('script');
  s.src='/susp-study.js?v=20260818-1';
  s.defer=true;
  s.dataset.mcpSusp='1';
  document.body.appendChild(s);
})();
