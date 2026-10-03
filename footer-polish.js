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
    .mcp-floating-ui{opacity:0!important;pointer-events:none!important;transform:translateY(18px)!important;transition:opacity .22s ease,transform .22s ease!important;}
    body.mcp-footer-visible .mcp-floating-ui{opacity:1!important;pointer-events:auto!important;transform:translateY(0)!important;}
    @media(max-width:980px){.footer-top{grid-template-columns:1fr!important;text-align:center!important;gap:14px!important}.footer-top>img,.footer-title,.footer-top>p{justify-self:center!important}.footer-top>p{grid-column:1!important;text-align:center!important;margin-top:4px!important}.copyright{text-align:center!important}}
    @media(max-width:640px){.footer{padding:34px 0 18px!important}.footer .wrap{padding:0 18px!important}.footer-top>img{width:60px!important;height:60px!important}.footer-title{font-size:21px!important}.footer-top>p{font-size:15px!important}}
  `;
  document.head.appendChild(style);
  const footer=document.querySelector('.footer, footer');
  if(!footer)return;
  const links=footer.querySelector('.footer-links'); if(links) links.remove();
  const top=footer.querySelector('.footer-top');
  if(top){const img=top.querySelector('img'),title=top.querySelector('.footer-title'),p=top.querySelector('p');if(img&&title&&p){top.innerHTML='';top.appendChild(img);const group=document.createElement('div');group.style.minWidth='0';group.appendChild(title);group.appendChild(p);top.appendChild(group)}}
  const markFloating=()=>{for(const el of document.querySelectorAll('button,a,div')){const txt=(el.textContent||'').trim(),cs=getComputedStyle(el);if(cs.position==='fixed'&&(el.id==='quizFab'||/Questões IA/i.test(txt)||/Comprar com ajuda/i.test(txt)||txt==='🤖'))el.classList.add('mcp-floating-ui')}};
  markFloating();setTimeout(markFloating,800);setTimeout(markFloating,1800);
  const io=new IntersectionObserver(entries=>document.body.classList.toggle('mcp-footer-visible',entries.some(e=>e.isIntersecting)),{threshold:.03,rootMargin:'120px 0px 0px 0px'});io.observe(footer);
})();

(()=>{
  if(document.getElementById('mcpGcmGoiasAnnouncement'))return;
  const section=document.createElement('section');section.id='mcpGcmGoiasAnnouncement';section.className='mcp-caldas-refresh';
  section.innerHTML='<div class="wrap"><div><h2>Estude para a GCM de Caldas Novas</h2><p>Edital verticalizado e cronograma de estudos disponíveis gratuitamente.</p></div><a class="btn" href="#gcm-caldas-novas">Ver material gratuito</a></div>';
  document.querySelector('.hero')?.after(section);
})();

(()=>{if(document.querySelector('script[data-mcp-susp]'))return;const s=document.createElement('script');s.src='/susp-study.js?v=20260818-1';s.defer=true;s.dataset.mcpSusp='1';document.body.appendChild(s)})();

(()=>{
  if(document.getElementById('mcpCrimesPessoaGamma')) return;
  const css=document.createElement('style');
  css.textContent=`
    #mcpCrimesPessoaGamma{padding:62px 0;background:#061226;color:#fff}
    .mcp-gamma-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
    .mcp-gamma-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:22px}
    .mcp-gamma-kicker{font-size:12px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase;color:#efbd26;margin-bottom:8px}
    .mcp-gamma-head h2{margin:0;font:700 38px/1.08 Georgia,serif;color:#fff}
    .mcp-gamma-head p{margin:8px 0 0;color:#b9c6d8;max-width:760px;line-height:1.6}
    .mcp-gamma-open{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;text-decoration:none;background:#efbd26;color:#071426;font-weight:900;padding:12px 18px;border-radius:10px}
    .mcp-gamma-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.14);box-shadow:0 20px 55px rgba(0,0,0,.32);background:#0b1730}
    .mcp-gamma-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#0b1730}
    @media(max-width:760px){#mcpCrimesPessoaGamma{padding:42px 0}.mcp-gamma-head{display:block}.mcp-gamma-head h2{font-size:31px}.mcp-gamma-open{margin-top:16px}.mcp-gamma-wrap{width:min(100% - 24px,1180px)}}
  `;
  document.head.appendChild(css);
  const section=document.createElement('section');
  section.id='mcpCrimesPessoaGamma';
  section.innerHTML=`<div class="mcp-gamma-wrap"><div class="mcp-gamma-head"><div><div class="mcp-gamma-kicker">Aula em slides • Direito Penal</div><h2>Crimes Contra a Pessoa</h2><p>Revisão visual em slides para concursos policiais. Navegue pelo conteúdo diretamente no site.</p></div><a class="mcp-gamma-open" href="https://gamma.app/docs/7vswa1v5u40wz2p" target="_blank" rel="noopener">Abrir em tela cheia</a></div><div class="mcp-gamma-frame"><iframe src="https://gamma.app/embed/7vswa1v5u40wz2p" title="Crimes Contra a Pessoa — Slides" allow="fullscreen" loading="lazy"></iframe></div></div>`;
  const susp=document.getElementById('mcpSuspStudy');
  const footer=document.querySelector('.footer, footer');
  if(susp) susp.insertAdjacentElement('afterend',section); else if(footer) footer.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
})();

(()=>{if(document.querySelector('script[data-mcp-crimes-slides]'))return;const s=document.createElement('script');s.src='/crimes-pessoa-slides.js?v=20260818-2';s.defer=true;s.dataset.mcpCrimesSlides='1';document.body.appendChild(s)})();

(()=>{if(document.querySelector('script[data-mcp-paracatu-free]'))return;const s=document.createElement('script');s.src='/gcm-paracatu-free.js?v=20260818-1';s.defer=true;s.dataset.mcpParacatuFree='1';document.body.appendChild(s)})();

(()=>{if(document.querySelector('script[data-mcp-redacao]'))return;const s=document.createElement('script');s.src='/redacao-highlight.js?v=20260823-1';s.defer=true;s.dataset.mcpRedacao='1';document.body.appendChild(s)})();
