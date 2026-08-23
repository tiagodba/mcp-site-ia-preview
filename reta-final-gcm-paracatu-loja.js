(()=>{
  if(window.__mcpGcmFreeEdition) return;
  window.__mcpGcmFreeEdition=true;

  const style=document.createElement('style');
  style.textContent=`
    .mcp-free-banner{margin:22px auto 0;width:min(1120px,92%);background:linear-gradient(135deg,#0f5132,#16734a);border:1px solid #4fd28c;color:#fff;border-radius:16px;padding:18px 20px;display:flex;justify-content:space-between;gap:18px;align-items:center;box-shadow:0 16px 38px #0003}
    .mcp-free-banner strong{display:block;font-size:1.15rem;margin-bottom:4px}.mcp-free-banner span{color:#d9f7e7;line-height:1.5}.mcp-free-banner a{background:#f5bf2f;color:#092039;padding:11px 14px;border-radius:9px;font-weight:900;text-decoration:none;white-space:nowrap}
    .tag.paid,.tag.test{background:#26b36b22!important;border-color:#26b36b66!important;color:#84e0ad!important}
    .price,.checkout .warning{display:none!important}
    .pack{grid-template-columns:1fr!important;border-color:#26b36b77!important;background:linear-gradient(180deg,#0c2d35,#08252e)!important}
    .checkout{display:none!important}
    @media(max-width:700px){.mcp-free-banner{flex-direction:column;align-items:flex-start}.mcp-free-banner a{width:100%;text-align:center}}
  `;
  document.head.appendChild(style);

  const hero=document.querySelector('.hero');
  if(hero && !document.getElementById('mcpFreeEditionBanner')){
    const banner=document.createElement('div');
    banner.id='mcpFreeEditionBanner';
    banner.className='mcp-free-banner';
    banner.innerHTML=`<div><strong>🎁 Edição Especial MCP — GCM Paracatu 100% GRATUITA</strong><span>Apostila, mapas mentais, Lei 13.022, Lei Orgânica, edital verticalizado, questões e simulados liberados sem checkout.</span></div><a href="#materiais">Acessar materiais grátis →</a>`;
    hero.insertAdjacentElement('afterend',banner);
  }

  document.querySelectorAll('.tag.paid').forEach(el=>{
    el.classList.remove('paid');el.classList.add('free');el.textContent='100% GRÁTIS';
  });
  document.querySelectorAll('.tag.test').forEach(el=>{
    el.classList.remove('test');el.classList.add('free');el.textContent='ACESSO LIVRE';
  });

  const materialSection=document.querySelector('#materiais .title p');
  if(materialSection) materialSection.textContent='Todos os materiais desta Reta Final estão liberados gratuitamente pela MCP.';

  document.querySelectorAll('#materiais .card').forEach(card=>{
    const h3=card.querySelector('h3')?.textContent||'';
    const btn=card.querySelector('.actions .btn');
    if(!btn) return;
    if(h3.includes('Edital Verticalizado')){
      btn.textContent='Acessar gratuitamente →';
      btn.href='#pacote';
      btn.classList.remove('ghost');btn.classList.add('green');
    }
    if(h3.includes('Simulado LC')){
      btn.textContent='Abrir questões grátis →';
      btn.classList.remove('ghost');btn.classList.add('green');
    }
    if(h3.includes('Lei Orgânica')){
      btn.textContent='Abrir gratuitamente →';
      btn.classList.remove('gold');btn.classList.add('green');
    }
  });

  const pack=document.getElementById('pacote');
  if(pack){
    const title=pack.querySelector('h2');
    if(title) title.textContent='Pacote Completo GCM Paracatu — acesso gratuito';
    const tag=pack.querySelector('.tag');
    if(tag){tag.className='tag free';tag.textContent='100% GRÁTIS';}
    const notice=pack.querySelector('.notice');
    if(notice) notice.textContent='Projeto especial MCP: todo o conteúdo desta Reta Final foi liberado gratuitamente para os candidatos da GCM Paracatu.';
    const list=pack.querySelector('.list');
    if(list){
      const first=list.querySelector('li');
      if(first) first.textContent='Edital verticalizado — plano de reta final';
    }
  }

  document.querySelectorAll('a[href="#pacote"]').forEach(a=>{
    if(/pacote|inclu[ií]do|conte[uú]do/i.test(a.textContent)) a.textContent='Acessar gratuitamente →';
  });

  const navPack=document.querySelector('.quicknav a[href="#pacote"]');
  if(navPack) navPack.textContent='Materiais grátis';

  document.querySelectorAll('.simbtn').forEach(btn=>{
    if(!btn.classList.contains('wait') && !btn.classList.contains('disabled')) btn.textContent='Abrir simulado grátis';
  });
})();