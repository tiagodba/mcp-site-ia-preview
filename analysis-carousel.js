(()=>{
  if(document.getElementById('mcpAnalysisCarousel')) return;

  const cards=[
    {
      badge:'PM-SC 2026 • SOLDADO',
      title:'Português na PM-SC 2026',
      subtitle:'Panorama geral x perfil AOCP',
      stats:[['Morfologia','18,30%'],['Interpretação de textos','15,97%'],['Sintaxe','10,56%'],['Semântica','6,85%'],['Pontuação','5,91%'],['Coerência e coesão','5,62%']],
      highlights:['AOCP: Sintaxe — 35,5%','AOCP: Interpretação + Coesão + Gêneros — 31,0%','AOCP: Morfologia / Classes — 17,0%'],
      focus:'Foco prático: Sintaxe + Interpretação/Coesão + Morfologia.'
    },
    {
      badge:'PC-BA 2026 • AOCP',
      title:'Português na PC-BA 2026',
      subtitle:'Panorama geral x perfil da banca',
      stats:[['Morfologia','18,30%'],['Interpretação de textos','15,97%'],['Sintaxe','10,56%'],['Semântica','6,85%'],['Pontuação','5,91%'],['Coerência e coesão','5,62%']],
      highlights:['AOCP: Sintaxe — 35,5%','AOCP: Interpretação + Coesão + Gêneros — 31,0%','AOCP: Morfologia / Classes — 17,0%'],
      focus:'Leitura estratégica: a banca puxa mais leitura e sintaxe do que a média geral.'
    },
    {
      badge:'PC-BA 2026 • ESCRIVÃO',
      title:'Direito Penal na PC-BA 2026',
      subtitle:'Raio-x da banca AOCP • base de 384 questões',
      stats:[['Teoria do Crime','25,00%'],['Crimes contra a Administração Pública','19,27%'],['Lei Penal','9,38%'],['Das Penas','7,81%'],['Crimes contra a Pessoa','7,81%'],['Crimes contra o Patrimônio','7,29%']],
      highlights:['Teoria do Crime + Administração Pública = 44,27%','Jurisprudência dos Tribunais Superiores — 6,77%','Extinção da Punibilidade — 4,95%'],
      focus:'Prioridade máxima: Teoria do Crime e Crimes contra a Administração Pública.'
    }
  ];

  const css=document.createElement('style');
  css.textContent=`
    #mcpAnalysisCarousel{padding:66px 0;background:linear-gradient(135deg,#020914,#071a35 58%,#031025);color:#fff;border-top:1px solid #1a3555;border-bottom:1px solid #1a3555;overflow:hidden}
    #mcpAnalysisCarousel .mcp-ac-wrap{width:min(1180px,calc(100% - 36px));margin:auto}
    #mcpAnalysisCarousel .mcp-ac-head{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:30px}
    #mcpAnalysisCarousel .mcp-ac-kicker{color:#efbd26;font-size:11px;font-weight:900;letter-spacing:2.4px;text-transform:uppercase;margin-bottom:10px}
    #mcpAnalysisCarousel h2{font:400 42px/1.08 Georgia,serif;margin:0;color:#fff}
    #mcpAnalysisCarousel h2 em{color:#efbd26;font-style:normal}
    #mcpAnalysisCarousel .mcp-ac-head p{max-width:430px;margin:0;color:#aeb9c8;line-height:1.6;font-size:14px}
    #mcpAnalysisCarousel .mcp-ac-viewport{overflow:hidden}
    #mcpAnalysisCarousel .mcp-ac-track{display:flex;transition:transform .5s ease}
    #mcpAnalysisCarousel .mcp-ac-slide{flex:0 0 100%;padding:4px}
    #mcpAnalysisCarousel .mcp-ac-card{display:grid;grid-template-columns:1.15fr .85fr;gap:0;background:#06162d;border:1px solid #2d4a69;border-radius:14px;overflow:hidden;box-shadow:0 20px 55px #0006;min-height:500px}
    #mcpAnalysisCarousel .mcp-ac-main{padding:34px 36px;border-right:1px solid #2d4a69;background:linear-gradient(150deg,#06162d,#071d3c)}
    #mcpAnalysisCarousel .mcp-ac-side{padding:34px 30px;background:linear-gradient(160deg,#071a35,#031126)}
    #mcpAnalysisCarousel .mcp-ac-badge{display:inline-flex;background:#efbd26;color:#07182e;font-size:10px;font-weight:900;letter-spacing:1.5px;padding:8px 10px;border-radius:4px;margin-bottom:18px}
    #mcpAnalysisCarousel .mcp-ac-title{font:700 34px/1.08 Georgia,serif;margin:0;color:#fff}
    #mcpAnalysisCarousel .mcp-ac-sub{color:#efbd26;font-weight:800;margin:8px 0 26px;font-size:14px}
    #mcpAnalysisCarousel .mcp-ac-table{border-top:1px solid #294564}
    #mcpAnalysisCarousel .mcp-ac-row{display:grid;grid-template-columns:1fr auto;gap:20px;padding:15px 0;border-bottom:1px solid #294564;align-items:center}
    #mcpAnalysisCarousel .mcp-ac-row span{color:#dbe4ef;font-size:15px}
    #mcpAnalysisCarousel .mcp-ac-row strong{color:#efbd26;font-size:21px}
    #mcpAnalysisCarousel .mcp-ac-side h3{margin:0 0 18px;color:#efbd26;font:700 24px Georgia,serif}
    #mcpAnalysisCarousel .mcp-ac-highlight{padding:16px 0;border-bottom:1px solid #294564;color:#dce5ef;line-height:1.45;font-size:15px}
    #mcpAnalysisCarousel .mcp-ac-highlight:before{content:'◆';color:#efbd26;margin-right:10px;font-size:10px}
    #mcpAnalysisCarousel .mcp-ac-focus{margin-top:24px;background:#efbd26;color:#07182e;padding:17px 18px;border-radius:7px;font-weight:900;line-height:1.45}
    #mcpAnalysisCarousel .mcp-ac-nav{display:flex;justify-content:center;align-items:center;gap:14px;margin-top:22px}
    #mcpAnalysisCarousel .mcp-ac-arrow{width:44px;height:44px;border-radius:50%;border:1px solid #385777;background:#061a36;color:#efbd26;font-size:24px;cursor:pointer}
    #mcpAnalysisCarousel .mcp-ac-dots{display:flex;gap:9px}
    #mcpAnalysisCarousel .mcp-ac-dot{width:9px;height:9px;border-radius:50%;border:0;background:#536277;padding:0;cursor:pointer}
    #mcpAnalysisCarousel .mcp-ac-dot.active{background:#efbd26;transform:scale(1.25)}
    #mcpAnalysisCarousel .mcp-ac-foot{margin-top:14px;text-align:center;color:#8798aa;font-size:11px;letter-spacing:.3px}
    @media(max-width:820px){#mcpAnalysisCarousel .mcp-ac-head{flex-direction:column;align-items:flex-start}#mcpAnalysisCarousel h2{font-size:33px}#mcpAnalysisCarousel .mcp-ac-card{grid-template-columns:1fr}#mcpAnalysisCarousel .mcp-ac-main{border-right:0;border-bottom:1px solid #2d4a69;padding:26px 22px}#mcpAnalysisCarousel .mcp-ac-side{padding:25px 22px}#mcpAnalysisCarousel .mcp-ac-title{font-size:28px}}
    @media(max-width:520px){#mcpAnalysisCarousel{padding:48px 0}#mcpAnalysisCarousel .mcp-ac-wrap{width:calc(100% - 24px)}#mcpAnalysisCarousel h2{font-size:29px}#mcpAnalysisCarousel .mcp-ac-row span{font-size:13px}#mcpAnalysisCarousel .mcp-ac-row strong{font-size:18px}#mcpAnalysisCarousel .mcp-ac-card{min-height:0}}
  `;
  document.head.appendChild(css);

  const section=document.createElement('section');
  section.id='mcpAnalysisCarousel';
  section.innerHTML=`
    <div class="mcp-ac-wrap">
      <div class="mcp-ac-head">
        <div><div class="mcp-ac-kicker">Análises estratégicas • atualização contínua</div><h2>Raio-x de provas <em>até o dia da prova</em></h2></div>
        <p>Cards de incidência e perfil de banca para orientar revisão, priorização e reta final das carreiras policiais.</p>
      </div>
      <div class="mcp-ac-viewport"><div class="mcp-ac-track"></div></div>
      <div class="mcp-ac-nav"><button class="mcp-ac-arrow prev" aria-label="Card anterior">‹</button><div class="mcp-ac-dots"></div><button class="mcp-ac-arrow next" aria-label="Próximo card">›</button></div>
      <div class="mcp-ac-foot">MCP • Materiais Carreiras Policiais • dados organizados para estudo estratégico</div>
    </div>`;

  const hero=document.querySelector('.hero');
  if(hero) hero.insertAdjacentElement('afterend',section); else document.body.prepend(section);

  const track=section.querySelector('.mcp-ac-track');
  const dots=section.querySelector('.mcp-ac-dots');
  cards.forEach((card,i)=>{
    const slide=document.createElement('div');
    slide.className='mcp-ac-slide';
    slide.innerHTML=`<article class="mcp-ac-card"><div class="mcp-ac-main"><span class="mcp-ac-badge">${card.badge}</span><h3 class="mcp-ac-title">${card.title}</h3><div class="mcp-ac-sub">${card.subtitle}</div><div class="mcp-ac-table">${card.stats.map(([name,value])=>`<div class="mcp-ac-row"><span>${name}</span><strong>${value}</strong></div>`).join('')}</div></div><div class="mcp-ac-side"><h3>Leitura estratégica</h3>${card.highlights.map(v=>`<div class="mcp-ac-highlight">${v}</div>`).join('')}<div class="mcp-ac-focus">${card.focus}</div></div></article>`;
    track.appendChild(slide);
    const dot=document.createElement('button');
    dot.className='mcp-ac-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label','Ir para análise '+(i+1));
    dot.addEventListener('click',()=>go(i));
    dots.appendChild(dot);
  });

  let current=0;
  let timer;
  function go(i){current=(i+cards.length)%cards.length;track.style.transform=`translateX(-${current*100}%)`;[...dots.children].forEach((d,n)=>d.classList.toggle('active',n===current));}
  function start(){clearInterval(timer);timer=setInterval(()=>go(current+1),7000)}
  section.querySelector('.prev').addEventListener('click',()=>{go(current-1);start()});
  section.querySelector('.next').addEventListener('click',()=>{go(current+1);start()});
  section.addEventListener('mouseenter',()=>clearInterval(timer));
  section.addEventListener('mouseleave',start);
  start();
})();
