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
  markFloating();setTimeout(markFloating,800);
  const io=new IntersectionObserver(entries=>document.body.classList.toggle('mcp-footer-visible',entries.some(e=>e.isIntersecting)),{threshold:.08});io.observe(footer);
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
    .mcp-gcm-card>div>div>p{margin:0;color:#c1ccda;font-size:16px;line-height:1.7;max-width:680px}
    .mcp-gcm-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}.mcp-gcm-tags span{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);padding:9px 12px;border-radius:999px;font-size:11px;font-weight:800;color:#e5edf6}
    .mcp-gcm-side{display:flex;justify-content:center}.mcp-gcm-badge{width:min(390px,100%);border-radius:20px;border:1px solid rgba(239,189,38,.55);background:#071a35;padding:15px;box-shadow:inset 0 0 50px rgba(0,0,0,.22),0 15px 35px rgba(0,0,0,.24)}
    .mcp-gcm-notice{background:#fff;color:#17324f;border-radius:14px;padding:22px 22px 18px;box-shadow:0 8px 24px rgba(0,0,0,.22);font-family:Arial,Helvetica,sans-serif}
    .mcp-gcm-notice h3{margin:0;color:#1765a8;font-size:19px;line-height:1.3;font-weight:900}.mcp-gcm-notice .notice-sub{margin:10px 0 18px;color:#657181;font-size:13px;line-height:1.45}
    .mcp-caldas-brand{text-align:center;padding:14px 8px 18px;border-bottom:1px dashed #cdd8e3}.mcp-caldas-crest{font-size:31px;line-height:1}.mcp-caldas-brand strong{display:block;color:#07938e;font-size:27px;line-height:1;margin-top:5px}.mcp-caldas-brand small{display:block;color:#159d73;font-size:9px;font-weight:900;letter-spacing:.45px;margin-top:4px}
    .mcp-notice-access{display:inline-block;background:#1765a8;color:#fff;font-size:11px;font-weight:900;padding:5px 10px;margin:14px 0 10px}
    .mcp-notice-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px 14px}.mcp-notice-item{display:grid;grid-template-columns:28px 1fr;gap:7px;align-items:start}.mcp-notice-icon{font-size:20px;color:#10a85d}.mcp-notice-item span{display:block;color:#758293;font-size:10px}.mcp-notice-item b{display:block;color:#1765a8;font-size:12px;margin-top:2px}.mcp-notice-soon{margin-top:15px;background:#22aa45;color:#fff;text-align:center;font-size:12px;font-weight:900;padding:10px;border-radius:2px}
    @media(max-width:820px){.mcp-gcm-card{grid-template-columns:1fr;padding:30px}.mcp-gcm-side{justify-content:flex-start}.mcp-gcm-badge{width:min(430px,100%)}.mcp-gcm-card h2{font-size:35px}}
    @media(max-width:520px){#mcpGcmGoiasAnnouncement{padding:38px 0}.mcp-gcm-wrap{width:min(100% - 24px,1180px)}.mcp-gcm-card{padding:24px 20px;border-radius:14px}.mcp-gcm-card h2{font-size:30px}.mcp-gcm-card>div>div>p{font-size:14px}.mcp-gcm-badge{padding:9px;border-radius:14px}.mcp-gcm-notice{padding:17px 15px}.mcp-gcm-notice h3{font-size:16px}.mcp-caldas-brand strong{font-size:23px}.mcp-notice-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(css);
  const section=document.createElement('section');section.id='mcpGcmGoiasAnnouncement';
  section.innerHTML=`<div class="mcp-gcm-wrap"><div class="mcp-gcm-card"><div><div class="mcp-gcm-kicker">Novidades MCP • Em produção</div><h2>Materiais para o concurso da <span>GCM de Caldas Novas</span></h2><p>A MCP está produzindo materiais estratégicos voltados ao concurso da Guarda Civil Municipal de Caldas Novas, com conteúdo organizado para estudo, revisão e preparação direcionada.</p><div class="mcp-gcm-tags"><span>Conteúdo completo</span><span>Revisão estratégica</span><span>Mapas mentais</span><span>Material de alta qualidade</span></div></div><div class="mcp-gcm-side"><div class="mcp-gcm-badge"><div class="mcp-gcm-notice"><h3>Superintendência Municipal de Segurança e Mobilidade de Caldas Novas - GO</h3><div class="notice-sub">GUARDA CIVIL MUNICIPAL - Em breve, divulgação do Edital de Abertura do Concurso Público.</div><div class="mcp-caldas-brand"><div class="mcp-caldas-crest">🏛️</div><strong>CALDAS NOVAS</strong><small>O SEU DESTINO É SER FELIZ AQUI!</small></div><div class="mcp-notice-access">ACESSAR</div><div class="mcp-notice-grid"><div class="mcp-notice-item"><div class="mcp-notice-icon">🏛</div><div><span>Tipo de Processo</span><b>Concurso público</b></div></div><div class="mcp-notice-item"><div class="mcp-notice-icon">💵</div><div><span>Remuneração</span><b>Até: R$ 0,00</b></div></div><div class="mcp-notice-item"><div class="mcp-notice-icon">📋</div><div><span>Edital de Abertura</span><b>001/2026</b></div></div><div class="mcp-notice-item"><div class="mcp-notice-icon">👥</div><div><span>Vagas</span><b>0</b></div></div><div class="mcp-notice-item"><div class="mcp-notice-icon">🎓</div><div><span>Nível</span><b>Não informado</b></div></div><div class="mcp-notice-item"><div class="mcp-notice-icon">💼</div><div><span>Cargos</span><b>0</b></div></div></div><div class="mcp-notice-soon">INSCRIÇÕES EM BREVE</div></div></div></div></div></div>`;
  const hero=document.querySelector('.hero');if(hero) hero.insertAdjacentElement('afterend',section);else document.body.prepend(section);
})();

(()=>{if(document.querySelector('script[data-mcp-susp]'))return;const s=document.createElement('script');s.src='/susp-study.js?v=20260818-1';s.defer=true;s.dataset.mcpSusp='1';document.body.appendChild(s)})();
