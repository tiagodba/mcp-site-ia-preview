(()=>{
  if(document.getElementById('mcpPurchasePreview')) return;
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style=document.createElement('style');
  style.textContent=`
    #mcpPurchasePreview{position:fixed;inset:0;z-index:180;background:rgba(2,9,20,.96);display:none;align-items:center;justify-content:center;padding:20px}
    #mcpPurchasePreview.open{display:flex}
    .mcp-pv-shell{width:min(860px,100%);background:#03162f;color:#fff;border:1px solid #17375f;border-radius:16px;overflow:hidden;box-shadow:0 30px 90px #000b;position:relative}
    .mcp-pv-top{padding:18px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #18375c}.mcp-pv-brand{font-weight:900;letter-spacing:.12em;color:#efbd26;font-size:12px}.mcp-pv-close{border:0;background:none;color:#fff;font-size:28px;cursor:pointer}
    .mcp-pv-stage{min-height:390px;padding:42px;display:grid;place-items:center;text-align:center;position:relative;overflow:hidden;background:radial-gradient(circle at 70% 30%,#0a3d78 0,#062650 28%,#03162f 62%,#020b18 100%)}
    .mcp-pv-stage:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(137,162,189,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(137,162,189,.08) 1px,transparent 1px);background-size:48px 48px}
    .mcp-pv-frame{position:relative;z-index:2;max-width:690px;animation:mcpPvIn .55s ease both}.mcp-pv-kicker{color:#efbd26;font-size:13px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;margin-bottom:14px}.mcp-pv-title{font:400 42px/1.08 Georgia,serif;margin:0 0 18px}.mcp-pv-text{color:#c5cfdb;font-size:18px;line-height:1.6;margin:0 auto;max-width:650px}.mcp-pv-bullets{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:24px;text-align:left}.mcp-pv-bullet{background:#ffffff0d;border:1px solid #ffffff19;border-radius:8px;padding:12px 14px;color:#d7dfE8;font-weight:700}
    .mcp-pv-progress{height:4px;background:#ffffff17}.mcp-pv-bar{height:100%;width:0;background:#efbd26;transition:width .35s linear}.mcp-pv-actions{display:flex;gap:12px;justify-content:flex-end;padding:18px 20px;background:#021027}.mcp-pv-actions button,.mcp-pv-actions a{border:0;border-radius:7px;padding:13px 18px;font-weight:900;text-decoration:none;cursor:pointer}.mcp-pv-skip{background:#fff;color:#062a5d}.mcp-pv-buy{background:#efbd26;color:#062a5d}
    @keyframes mcpPvIn{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
    @media(max-width:640px){.mcp-pv-stage{min-height:350px;padding:28px 20px}.mcp-pv-title{font-size:32px}.mcp-pv-text{font-size:16px}.mcp-pv-bullets{grid-template-columns:1fr}.mcp-pv-actions{flex-direction:column}.mcp-pv-actions button,.mcp-pv-actions a{text-align:center;width:100%}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');modal.id='mcpPurchasePreview';
  modal.innerHTML=`<div class="mcp-pv-shell"><div class="mcp-pv-top"><div class="mcp-pv-brand">MCP • PRÉVIA DO MATERIAL</div><button class="mcp-pv-close" aria-label="Fechar">×</button></div><div class="mcp-pv-progress"><div class="mcp-pv-bar"></div></div><div class="mcp-pv-stage"><div class="mcp-pv-frame"></div></div><div class="mcp-pv-actions"><button class="mcp-pv-skip">Continuar vendo</button><a class="mcp-pv-buy" href="#">Comprar agora →</a></div></div>`;
  document.body.appendChild(modal);
  const frame=modal.querySelector('.mcp-pv-frame'),bar=modal.querySelector('.mcp-pv-bar'),buy=modal.querySelector('.mcp-pv-buy');
  let timer=null,step=0,currentHref='#',currentTitle='Apostila MCP';

  function inferCard(el){return el.closest('.material,.produced-card,article,.card')||el.parentElement}
  function inferTitle(card){return (card?.querySelector('h3,h2,.title,strong')?.textContent||'Apostila MCP').trim()}
  function inferText(card){const p=[...(card?.querySelectorAll('p')||[])].map(x=>x.textContent.trim()).filter(Boolean);return p.join(' ').slice(0,280)}
  function inferBullets(card){
    const txt=(card?.textContent||'').toLowerCase(),out=[];
    const add=(cond,t)=>{if(cond&&!out.includes(t))out.push(t)};
    add(/mapa mental|mapas mentais/.test(txt),'Mapas mentais e revisão visual');
    add(/quest/.test(txt),'Questões e comentários de prova');
    add(/jurisprud/.test(txt),'Jurisprudência aplicada');
    add(/legisla|lei/.test(txt),'Legislação direcionada');
    add(/medicina legal/.test(txt),'Medicina Legal aprofundada');
    add(/criminal[ií]stica|cadeia de cust[oó]dia/.test(txt),'Criminalística e cadeia de custódia');
    add(/portugu/.test(txt),'Português direcionado para prova');
    add(/racioc[ií]nio|l[oó]gica/.test(txt),'Raciocínio Lógico');
    if(out.length<4) out.push('Conteúdo organizado para revisão','Material direcionado ao edital');
    return out.slice(0,4);
  }
  function framesFor(card){
    const title=inferTitle(card),text=inferText(card),bullets=inferBullets(card);
    return [
      {k:'PREPARAÇÃO MCP',t:title,x:'Veja em poucos segundos o que você encontra neste material.'},
      {k:'CONTEÚDO DIRECIONADO',t:'Estude o que realmente importa',x:text||'Teoria objetiva, organizada e focada no perfil das provas policiais.'},
      {k:'DENTRO DA APOSTILA',t:'Recursos para acelerar sua revisão',b:bullets},
      {k:'RETA FINAL',t:'Da teoria à prova',x:'Use o material para revisar, resolver questões e identificar pontos de atenção antes da prova.'},
      {k:'MATERIAIS CARREIRAS POLICIAIS',t:'Pronto para começar?',x:'Acesse agora o material completo e continue sua preparação.'}
    ];
  }
  function render(frames){
    const f=frames[step];
    frame.style.animation='none'; void frame.offsetWidth; frame.style.animation='mcpPvIn .55s ease both';
    frame.innerHTML=`<div class="mcp-pv-kicker">${esc(f.k)}</div><h2 class="mcp-pv-title">${esc(f.t)}</h2>${f.x?`<p class="mcp-pv-text">${esc(f.x)}</p>`:''}${f.b?`<div class="mcp-pv-bullets">${f.b.map(x=>`<div class="mcp-pv-bullet">✓ ${esc(x)}</div>`).join('')}</div>`:''}`;
    bar.style.width=`${((step+1)/frames.length)*100}%`;
  }
  function open(el){
    const card=inferCard(el),frames=framesFor(card);currentHref=el.href||el.dataset.href||'#';currentTitle=inferTitle(card);buy.href=currentHref;buy.setAttribute('aria-label',`Comprar ${currentTitle}`);step=0;modal.classList.add('open');render(frames);
    clearInterval(timer);timer=setInterval(()=>{step++;if(step>=frames.length){clearInterval(timer);return}render(frames)},1900);
  }
  function close(){modal.classList.remove('open');clearInterval(timer)}
  modal.querySelector('.mcp-pv-close').onclick=close;modal.querySelector('.mcp-pv-skip').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});

  function bind(){
    const candidates=[...document.querySelectorAll('a,button')];
    for(const el of candidates){
      if(el.dataset.mcpPreviewBound)return;
      const txt=(el.textContent||'').trim();
      const href=el.getAttribute('href')||'';
      const card=inferCard(el);
      const cardText=(card?.textContent||'');
      const looksBuy=/\bcomprar\b|adquirir|garantir/i.test(txt);
      const skip=/comprar com ajuda/i.test(txt)||el.classList.contains('shop-fab')||el.closest('.shop-modal')||/whatsapp/i.test(href);
      const looksMaterial=!!card&&(/apostila|material|reta final|medicina legal|lep|pol[ií]cia|gcm|guarda/i.test(cardText));
      if(looksBuy&&!skip&&looksMaterial){el.dataset.mcpPreviewBound='1';el.addEventListener('click',e=>{if(el.tagName==='A'&&el.href){e.preventDefault();open(el)}})}
    }
  }
  bind();setTimeout(bind,1200);new MutationObserver(()=>bind()).observe(document.body,{childList:true,subtree:true});
})();
