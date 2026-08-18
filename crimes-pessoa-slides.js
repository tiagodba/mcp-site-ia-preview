(()=>{
  const mount=()=>{
    const section=document.getElementById('mcpCrimesPessoaGamma');
    if(!section)return false;
    const css=document.createElement('style');
    css.textContent=`
      #mcpCrimesPessoaGamma{padding:42px 0;background:linear-gradient(180deg,#061226,#0a1730);color:#fff}
      #mcpCrimesPessoaGamma .mcp-gamma-wrap{width:min(1040px,calc(100% - 32px));margin:auto}
      #mcpCrimesPessoaGamma .mcp-gamma-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:16px}
      #mcpCrimesPessoaGamma .mcp-gamma-kicker{font-size:11px;font-weight:900;letter-spacing:1.6px;text-transform:uppercase;color:#efbd26;margin-bottom:6px}
      #mcpCrimesPessoaGamma .mcp-gamma-head h2{margin:0;font:700 32px/1.08 Georgia,serif;color:#fff}
      #mcpCrimesPessoaGamma .mcp-gamma-head p{margin:7px 0 0;color:#b9c6d8;max-width:700px;line-height:1.5;font-size:14px}
      .mcp-slide-shell{position:relative;border:1px solid rgba(255,255,255,.15);border-radius:18px;overflow:hidden;box-shadow:0 18px 45px rgba(0,0,0,.28);background:#080e26}
      .mcp-slide-stage{height:clamp(300px,46vw,460px);position:relative;overflow:hidden;background:radial-gradient(circle at 80% 20%,rgba(140,152,202,.22),transparent 30%),linear-gradient(135deg,#080e26,#111d43 60%,#0c1b38)}
      .mcp-native-slide{position:absolute;inset:0;padding:5.2% 6.5%;display:flex;align-items:center;gap:5.5%;box-sizing:border-box;opacity:0;transform:translateX(32px) scale(.99);pointer-events:none;transition:opacity .48s ease,transform .48s ease}
      .mcp-native-slide.active{opacity:1;transform:translateX(0) scale(1);pointer-events:auto}
      .mcp-slide-copy{width:62%;position:relative;z-index:2}
      .mcp-slide-num{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#8c98ca;color:#071426;font-weight:900;margin-bottom:12px;font-size:14px}
      .mcp-native-slide h3{margin:0 0 12px;font:700 clamp(25px,3.2vw,46px)/1.04 Georgia,serif;color:#fff}
      .mcp-native-slide p{font-size:clamp(14px,1.35vw,18px);line-height:1.45;color:#d5dbea;margin:0 0 10px}
      .mcp-native-slide ul{margin:9px 0 0;padding-left:1.1em;color:#e6e9f3;font-size:clamp(13px,1.25vw,17px);line-height:1.42}
      .mcp-native-slide li{margin:4px 0}
      .mcp-slide-highlight{color:#efbd26;font-weight:800}
      .mcp-slide-visual{width:32%;min-height:52%;display:flex;align-items:center;justify-content:center;border-radius:20px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,rgba(140,152,202,.17),rgba(255,255,255,.035));font-size:clamp(58px,8vw,112px);box-shadow:inset 0 0 40px rgba(255,255,255,.025)}
      .mcp-slide-note{margin-top:12px;padding:10px 13px;border-left:4px solid #efbd26;background:rgba(239,189,38,.09);border-radius:7px;color:#fff;font-weight:700;font-size:13px}
      .mcp-slide-controls{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:#071426;border-top:1px solid rgba(255,255,255,.1)}
      .mcp-slide-btn,.mcp-slide-play{border:0;background:#15254d;color:#fff;border-radius:9px;padding:9px 13px;font-weight:800;cursor:pointer;min-height:38px}
      .mcp-slide-btn:hover,.mcp-slide-play:hover{background:#20366e}
      .mcp-slide-play[data-paused="true"]{background:#8b6b08;color:#fff}
      .mcp-slide-status{color:#b9c6d8;font-size:12px;font-weight:700;white-space:nowrap}
      .mcp-slide-dots{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:center}
      .mcp-slide-dot{width:8px;height:8px;border-radius:50%;background:#4d5c80;border:0;padding:0;cursor:pointer}
      .mcp-slide-dot.active{background:#efbd26;transform:scale(1.2)}
      .mcp-slide-progress{height:3px;background:#15254d;position:relative;overflow:hidden}
      .mcp-slide-progress-bar{height:100%;width:0;background:#efbd26;transition:width .15s linear}
      @media(max-width:760px){#mcpCrimesPessoaGamma{padding:34px 0}#mcpCrimesPessoaGamma .mcp-gamma-head{display:block}#mcpCrimesPessoaGamma .mcp-gamma-head h2{font-size:28px}#mcpCrimesPessoaGamma .mcp-gamma-wrap{width:min(100% - 20px,1040px)}.mcp-slide-stage{height:390px}.mcp-native-slide{padding:6% 6%;gap:4%}.mcp-slide-copy{width:68%}.mcp-slide-visual{width:28%;font-size:62px}.mcp-slide-controls{padding:9px}.mcp-slide-btn,.mcp-slide-play{padding:8px 10px;font-size:12px}}
      @media(max-width:520px){.mcp-slide-stage{height:360px}.mcp-native-slide{align-items:flex-start;flex-direction:column;justify-content:center}.mcp-slide-copy{width:100%}.mcp-slide-visual{display:none}.mcp-native-slide h3{font-size:27px}.mcp-native-slide p,.mcp-native-slide ul{font-size:14px}.mcp-slide-status{display:none}.mcp-slide-dots{max-width:120px}.mcp-slide-btn,.mcp-slide-play{min-height:36px}}
      @media(prefers-reduced-motion:reduce){.mcp-native-slide{transition:none}.mcp-slide-progress{display:none}}
    `;
    document.head.appendChild(css);

    const slides=[
      {icon:'⚖️',title:'Crimes Contra a Pessoa',body:'Revisão objetiva para concursos policiais.',extra:'Título I do Código Penal — visão geral e pontos mais cobrados em provas de Direito Penal.'},
      {icon:'🧍',title:'Conceito geral',body:'São crimes voltados à proteção da pessoa humana em seus aspectos essenciais.',list:['vida','integridade corporal','honra','liberdade individual'],note:'Tema recorrente em provas de Direito Penal.'},
      {icon:'🧩',title:'Divisão do tema',body:'Os crimes contra a pessoa são estudados em blocos.',list:['Crimes contra a vida','Lesões corporais','Periclitação da vida e da saúde','Rixa','Crimes contra a honra','Crimes contra a liberdade individual']},
      {icon:'❤️',title:'Crimes contra a vida',body:'Entre os principais delitos estão:',list:['Homicídio','Induzimento, instigação ou auxílio ao suicídio ou à automutilação','Infanticídio','Aborto'],note:'Em prova, atenção às diferenças entre as figuras típicas.'},
      {icon:'⚔️',title:'Homicídio — art. 121',body:'O núcleo do tipo é simples: <span class="mcp-slide-highlight">matar alguém</span>.',list:['homicídio simples','homicídio privilegiado','homicídio qualificado','feminicídio','causas de aumento de pena'],note:'Bem jurídico central: vida humana.'},
      {icon:'🩹',title:'Lesão corporal — art. 129',body:'Consiste em ofender a integridade corporal ou a saúde de outra pessoa.',list:['lesão leve','lesão grave','lesão gravíssima','lesão corporal seguida de morte'],note:'A classificação depende do resultado previsto em lei.'},
      {icon:'⚠️',title:'Periclitação da vida e da saúde',body:'Aqui o foco está na criação de uma situação de perigo para a vítima.',list:['perigo de contágio venéreo','perigo de contágio de moléstia grave','perigo para a vida ou saúde de outrem','abandono de incapaz','maus-tratos']},
      {icon:'🗣️',title:'Crimes contra a honra',body:'As três figuras clássicas são:',list:['Calúnia: imputação falsa de fato definido como crime','Difamação: imputação de fato ofensivo à reputação','Injúria: ofensa à dignidade ou ao decoro'],note:'Pegadinha: calúnia exige fato criminoso.'},
      {icon:'🔒',title:'Liberdade individual',body:'Protegem a liberdade de autodeterminação da pessoa.',list:['constrangimento ilegal','ameaça','sequestro e cárcere privado','redução à condição análoga à de escravo'],note:'As bancas gostam de cobrar o núcleo do tipo e as diferenças entre os delitos.'},
      {icon:'🎯',title:'Resumo final',body:'Crimes contra a pessoa protegem bens jurídicos essenciais.',list:['vida','integridade física e saúde','honra','liberdade'],note:'Priorize homicídio, lesão corporal, crimes contra a honra, ameaça e sequestro/cárcere privado.'}
    ];

    section.innerHTML=`<div class="mcp-gamma-wrap"><div class="mcp-gamma-head"><div><div class="mcp-gamma-kicker">Aula em slides • Direito Penal</div><h2>Crimes Contra a Pessoa</h2><p>Os slides passam automaticamente. O aluno pode pausar, voltar ou avançar quando quiser ler com calma.</p></div></div><div class="mcp-slide-shell"><div class="mcp-slide-stage">${slides.map((s,i)=>`<article class="mcp-native-slide ${i===0?'active':''}" data-slide="${i}"><div class="mcp-slide-copy"><div class="mcp-slide-num">${i+1}</div><h3>${s.title}</h3><p>${s.body}</p>${s.extra?`<p>${s.extra}</p>`:''}${s.list?`<ul>${s.list.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${s.note?`<div class="mcp-slide-note">${s.note}</div>`:''}</div><div class="mcp-slide-visual" aria-hidden="true">${s.icon}</div></article>`).join('')}</div><div class="mcp-slide-progress"><div class="mcp-slide-progress-bar" data-progress></div></div><div class="mcp-slide-controls"><button class="mcp-slide-btn" type="button" data-prev>←</button><button class="mcp-slide-play" type="button" data-play aria-label="Pausar reprodução">⏸ Pausar</button><div class="mcp-slide-dots">${slides.map((_,i)=>`<button class="mcp-slide-dot ${i===0?'active':''}" type="button" data-dot="${i}" aria-label="Ir para slide ${i+1}"></button>`).join('')}</div><span class="mcp-slide-status"><b data-current>1</b> / ${slides.length}</span><button class="mcp-slide-btn" type="button" data-next>→</button></div></div></div>`;

    let current=0,paused=false,timer=null,startedAt=0,elapsed=0;
    const interval=6500;
    const els=[...section.querySelectorAll('.mcp-native-slide')];
    const dots=[...section.querySelectorAll('.mcp-slide-dot')];
    const currentLabel=section.querySelector('[data-current]');
    const progress=section.querySelector('[data-progress]');
    const playBtn=section.querySelector('[data-play]');
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const updatePlay=()=>{playBtn.dataset.paused=String(paused);playBtn.textContent=paused?'▶ Continuar':'⏸ Pausar';playBtn.setAttribute('aria-label',paused?'Continuar reprodução':'Pausar reprodução')};
    const show=n=>{current=(n+slides.length)%slides.length;els.forEach((el,i)=>el.classList.toggle('active',i===current));dots.forEach((el,i)=>el.classList.toggle('active',i===current));currentLabel.textContent=String(current+1);elapsed=0;startedAt=performance.now();progress.style.width='0%'};
    const tick=now=>{if(!paused&&!reduced){const passed=elapsed+(now-startedAt);progress.style.width=Math.min(100,(passed/interval)*100)+'%';if(passed>=interval){show(current+1)}}timer=requestAnimationFrame(tick)};
    startedAt=performance.now();timer=requestAnimationFrame(tick);
    const pause=()=>{if(paused)return;elapsed+=performance.now()-startedAt;paused=true;updatePlay()};
    const resume=()=>{if(!paused)return;paused=false;startedAt=performance.now();updatePlay()};
    playBtn.addEventListener('click',()=>paused?resume():pause());
    section.querySelector('[data-prev]').addEventListener('click',()=>{show(current-1);pause()});
    section.querySelector('[data-next]').addEventListener('click',()=>{show(current+1);pause()});
    dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.dot));pause()}));
    section.querySelector('.mcp-slide-stage').addEventListener('mouseenter',pause);
    section.querySelector('.mcp-slide-stage').addEventListener('mouseleave',()=>{if(playBtn.dataset.paused!=='true')resume()});
    section.querySelector('.mcp-slide-stage').addEventListener('click',pause);
    section.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){show(current-1);pause()}if(e.key==='ArrowRight'){show(current+1);pause()}if(e.key===' '){e.preventDefault();paused?resume():pause()}});
    if(reduced){paused=true;updatePlay();progress.style.width='0%'}
    return true;
  };
  if(!mount()){let tries=0;const t=setInterval(()=>{tries++;if(mount()||tries>30)clearInterval(t)},200)}
})();
