(()=>{
  if(document.getElementById('mcpPurchasePreview')) return;
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style=document.createElement('style');
  style.textContent=`
    #mcpPurchasePreview{position:fixed;inset:0;z-index:180;background:rgba(2,9,20,.96);display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
    #mcpPurchasePreview.open{display:flex;animation:mcpModalIn .35s ease both}
    .mcp-pv-shell{width:min(860px,100%);background:#03162f;color:#fff;border:1px solid #17375f;border-radius:16px;overflow:hidden;box-shadow:0 30px 90px #000b;position:relative;animation:mcpShellIn .45s cubic-bezier(.2,.8,.2,1) both}
    .mcp-pv-top{padding:18px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #18375c}.mcp-pv-brand{font-weight:900;letter-spacing:.12em;color:#efbd26;font-size:12px}.mcp-pv-close{border:0;background:none;color:#fff;font-size:28px;cursor:pointer}
    .mcp-pv-stage{min-height:390px;padding:42px;display:grid;place-items:center;text-align:center;position:relative;overflow:hidden;background:radial-gradient(circle at 70% 30%,#0a3d78 0,#062650 28%,#03162f 62%,#020b18 100%)}
    .mcp-pv-stage:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(137,162,189,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(137,162,189,.08) 1px,transparent 1px);background-size:48px 48px;animation:mcpGridMove 16s linear infinite}
    .mcp-pv-stage:after{content:"";position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(239,189,38,.16),rgba(239,189,38,0) 68%);right:-80px;top:-90px;animation:mcpGlow 3.6s ease-in-out infinite}
    .mcp-pv-frame{position:relative;z-index:2;max-width:690px;opacity:1}.mcp-pv-frame.is-entering{animation:mcpPvIn .75s cubic-bezier(.2,.8,.2,1) both}.mcp-pv-frame.is-leaving{animation:mcpPvOut .24s ease both}
    .mcp-pv-kicker{color:#efbd26;font-size:13px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;margin-bottom:14px;opacity:0;animation:mcpRise .55s .08s ease forwards}
    .mcp-pv-title{font:400 42px/1.08 Georgia,serif;margin:0 0 18px;opacity:0;transform:translateY(16px);animation:mcpTitle .7s .18s cubic-bezier(.2,.8,.2,1) forwards;text-shadow:0 0 0 rgba(239,189,38,0)}
    .mcp-pv-text{color:#c5cfdb;font-size:18px;line-height:1.6;margin:0 auto;max-width:650px;opacity:0;animation:mcpRise .62s .34s ease forwards}
    .mcp-pv-bullets{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:24px;text-align:left}.mcp-pv-bullet{background:#ffffff0d;border:1px solid #ffffff19;border-radius:8px;padding:12px 14px;color:#d7dfe8;font-weight:700;opacity:0;transform:translateX(-14px);animation:mcpBullet .5s ease forwards}.mcp-pv-bullet:nth-child(1){animation-delay:.25s}.mcp-pv-bullet:nth-child(2){animation-delay:.38s}.mcp-pv-bullet:nth-child(3){animation-delay:.51s}.mcp-pv-bullet:nth-child(4){animation-delay:.64s}
    .mcp-pv-progress{height:4px;background:#ffffff17}.mcp-pv-bar{height:100%;width:0;background:linear-gradient(90deg,#efbd26,#ffe28a);box-shadow:0 0 14px rgba(239,189,38,.6);transition:width .45s ease}.mcp-pv-actions{display:flex;gap:12px;justify-content:flex-end;padding:18px 20px;background:#021027}.mcp-pv-actions button,.mcp-pv-actions a{border:0;border-radius:7px;padding:13px 18px;font-weight:900;text-decoration:none;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease}.mcp-pv-actions button:hover,.mcp-pv-actions a:hover{transform:translateY(-2px)}.mcp-pv-skip{background:#fff;color:#062a5d}.mcp-pv-buy{background:#efbd26;color:#062a5d;box-shadow:0 8px 22px rgba(239,189,38,.18)}
    @keyframes mcpModalIn{from{opacity:0}to{opacity:1}}
    @keyframes mcpShellIn{from{opacity:0;transform:translateY(22px) scale(.97)}to{opacity:1;transform:none}}
    @keyframes mcpPvIn{from{opacity:0;transform:translateY(20px) scale(.975);filter:blur(3px)}to{opacity:1;transform:none;filter:blur(0)}}
    @keyframes mcpPvOut{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-10px) scale(.99)}}
    @keyframes mcpRise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    @keyframes mcpTitle{0%{opacity:0;transform:translateY(18px) scale(.985);text-shadow:0 0 0 rgba(239,189,38,0)}65%{opacity:1;text-shadow:0 0 22px rgba(239,189,38,.22)}100%{opacity:1;transform:none;text-shadow:0 0 0 rgba(239,189,38,0)}}
    @keyframes mcpBullet{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
    @keyframes mcpGlow{0%,100%{transform:scale(.9);opacity:.55}50%{transform:scale(1.15);opacity:1}}
    @keyframes mcpGridMove{from{background-position:0 0,0 0}to{background-position:48px 48px,48px 48px}}
    @media(max-width:640px){.mcp-pv-stage{min-height:350px;padding:28px 20px}.mcp-pv-title{font-size:32px}.mcp-pv-text{font-size:16px}.mcp-pv-bullets{grid-template-columns:1fr}.mcp-pv-actions{flex-direction:column}.mcp-pv-actions button,.mcp-pv-actions a{text-align:center;width:100%}}
    @media(prefers-reduced-motion:reduce){#mcpPurchasePreview.open,.mcp-pv-shell,.mcp-pv-stage:before,.mcp-pv-stage:after,.mcp-pv-frame,.mcp-pv-kicker,.mcp-pv-title,.mcp-pv-text,.mcp-pv-bullet{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');modal.id='mcpPurchasePreview';
  modal.innerHTML=`<div class="mcp-pv-shell"><div class="mcp-pv-top"><div class="mcp-pv-brand">MCP • PRÉVIA DO MATERIAL</div><button class="mcp-pv-close" aria-label="Fechar">×</button></div><div class="mcp-pv-progress"><div class="mcp-pv-bar"></div></div><div class="mcp-pv-stage"><div class="mcp-pv-frame"></div></div><div class="mcp-pv-actions"><button class="mcp-pv-skip">Continuar vendo</button><a class="mcp-pv-buy" href="#">Comprar agora →</a></div></div>`;
  document.body.appendChild(modal);
  const frame=modal.querySelector('.mcp-pv-frame'),bar=modal.querySelector('.mcp-pv-bar'),buy=modal.querySelector('.mcp-pv-buy');
  let timer=null,step=0,currentHref='#',currentTitle='Apostila MCP',currentFrames=[],currentPreviewKey='';
  const checkoutByPreview={investigador:'https://pay.kiwify.com.br/E9EOoa7',lep:'https://pay.kiwify.com.br/0LSMLao',medicina:'https://pay.kiwify.com.br/9K3UzAY',pprn:'https://pay.kiwify.com.br/UmB7IhL',gcm:'https://pay.kiwify.com.br/q1jNiNL',tecnicoNecropsiaSP:'https://pay.kiwify.com.br/jOFZqE1',dossie:'https://pay.kiwify.com.br/X8QyVNY'};

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
  function drawFrame(f){
    frame.innerHTML=`<div class="mcp-pv-kicker">${esc(f.k)}</div><h2 class="mcp-pv-title">${esc(f.t)}</h2>${f.x?`<p class="mcp-pv-text">${esc(f.x)}</p>`:''}${f.b?`<div class="mcp-pv-bullets">${f.b.map(x=>`<div class="mcp-pv-bullet">✓ ${esc(x)}</div>`).join('')}</div>`:''}`;
    frame.classList.remove('is-leaving');void frame.offsetWidth;frame.classList.add('is-entering');
  }
  function render(frames){
    const f=frames[step];
    frame.classList.remove('is-entering');frame.classList.add('is-leaving');
    setTimeout(()=>drawFrame(f),180);
    bar.style.width=`${((step+1)/frames.length)*100}%`;
  }
  function open(el){
    const card=inferCard(el),onclick=el.getAttribute('onclick')||'',previewMatch=onclick.match(/openPreview\(['\"]([^'\"]+)['\"]\)/);currentPreviewKey=previewMatch?.[1]||'';currentFrames=framesFor(card);currentHref=(currentPreviewKey&&checkoutByPreview[currentPreviewKey])||el.href||el.dataset.href||'#';currentTitle=inferTitle(card);buy.href=currentHref;buy.style.display=currentHref==='#'?'none':'';buy.setAttribute('aria-label',`Comprar ${currentTitle}`);modal.querySelector('.mcp-pv-skip').textContent=currentPreviewKey?'Abrir prévia protegida →':'Continuar vendo';step=0;modal.classList.add('open');drawFrame(currentFrames[0]);bar.style.width=`${(1/currentFrames.length)*100}%`;
    clearInterval(timer);timer=setInterval(()=>{step++;if(step>=currentFrames.length){clearInterval(timer);return}render(currentFrames)},2200);
  }
  function close(){modal.classList.remove('open');clearInterval(timer)}
  modal.querySelector('.mcp-pv-close').onclick=close;modal.querySelector('.mcp-pv-skip').onclick=()=>{const key=currentPreviewKey;close();if(key&&typeof openPreview==='function')openPreview(key)};modal.addEventListener('click',e=>{if(e.target===modal)close()});

  function bind(){
    const candidates=[...document.querySelectorAll('a,button')];
    for(const el of candidates){
      if(el.dataset.mcpPreviewBound)continue;
      const txt=(el.textContent||'').trim();
      const href=el.getAttribute('href')||'';
      const card=inferCard(el);
      const cardText=(card?.textContent||'');
      const looksBuy=/\bcomprar\b|adquirir|garantir/i.test(txt);
      const looksPreview=/prévia protegida/i.test(txt);
      const skip=/comprar com ajuda/i.test(txt)||el.classList.contains('shop-fab')||el.closest('.shop-modal')||/whatsapp/i.test(href);
      const looksMaterial=!!card&&(/apostila|material|reta final|medicina legal|lep|pol[ií]cia|gcm|guarda/i.test(cardText));
      if((looksBuy||looksPreview)&&!skip&&looksMaterial){el.dataset.mcpPreviewBound='1';el.addEventListener('click',e=>{if(looksPreview){e.preventDefault();e.stopImmediatePropagation();open(el);return}if(el.tagName==='A'&&el.href){e.preventDefault();open(el)}},looksPreview)}
    }
  }
  bind();setTimeout(bind,1200);new MutationObserver(()=>bind()).observe(document.body,{childList:true,subtree:true});
})();
