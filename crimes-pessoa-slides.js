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
      .mcp-slide-copy{width:62%;position:relative;z-index:2}.mcp-slide-num{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#8c98ca;color:#071426;font-weight:900;margin-bottom:12px;font-size:14px}
      .mcp-native-slide h3{margin:0 0 12px;font:700 clamp(25px,3.2vw,46px)/1.04 Georgia,serif;color:#fff}.mcp-native-slide p{font-size:clamp(14px,1.35vw,18px);line-height:1.45;color:#d5dbea;margin:0 0 10px}.mcp-native-slide ul{margin:9px 0 0;padding-left:1.1em;color:#e6e9f3;font-size:clamp(13px,1.25vw,17px);line-height:1.42}.mcp-native-slide li{margin:4px 0}.mcp-slide-highlight{color:#efbd26;font-weight:800}
      .mcp-slide-visual{width:32%;min-height:52%;display:flex;align-items:center;justify-content:center;border-radius:20px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,rgba(140,152,202,.17),rgba(255,255,255,.035));font-size:clamp(58px,8vw,112px);box-shadow:inset 0 0 40px rgba(255,255,255,.025)}
      .mcp-slide-note{margin-top:12px;padding:10px 13px;border-left:4px solid #efbd26;background:rgba(239,189,38,.09);border-radius:7px;color:#fff;font-weight:700;font-size:13px}.mcp-slide-controls{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:#071426;border-top:1px solid rgba(255,255,255,.1)}.mcp-slide-btn,.mcp-slide-play{border:0;background:#15254d;color:#fff;border-radius:9px;padding:9px 13px;font-weight:800;cursor:pointer;min-height:38px}.mcp-slide-btn:hover,.mcp-slide-play:hover{background:#20366e}.mcp-slide-play[data-paused="true"]{background:#8b6b08;color:#fff}.mcp-slide-status{color:#b9c6d8;font-size:12px;font-weight:700;white-space:nowrap}.mcp-slide-dots{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:center}.mcp-slide-dot{width:8px;height:8px;border-radius:50%;background:#4d5c80;border:0;padding:0;cursor:pointer}.mcp-slide-dot.active{background:#efbd26;transform:scale(1.2)}.mcp-slide-progress{height:3px;background:#15254d;position:relative;overflow:hidden}.mcp-slide-progress-bar{height:100%;width:0;background:#efbd26;transition:width .15s linear}
      .mcp-slide-actions{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:14px 10px 0}.mcp-slide-actions:empty{display:none}.mcp-slide-actions>.mcp-docked-action,.mcp-slide-actions>.mcp-floating-ui{position:static!important;inset:auto!important;opacity:1!important;pointer-events:auto!important;transform:none!important;margin:0!important;z-index:auto!important;max-width:none!important}.mcp-slide-actions>.mcp-docked-action:not(.mcp-docked-robot){min-width:190px!important;width:auto!important;min-height:48px!important}.mcp-slide-actions>.mcp-docked-robot{width:54px!important;height:54px!important;min-width:54px!important;min-height:54px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:50%!important}
      @media(max-width:760px){#mcpCrimesPessoaGamma{padding:34px 0}#mcpCrimesPessoaGamma .mcp-gamma-head{display:block}#mcpCrimesPessoaGamma .mcp-gamma-head h2{font-size:28px}#mcpCrimesPessoaGamma .mcp-gamma-wrap{width:min(100% - 20px,1040px)}.mcp-slide-stage{height:390px}.mcp-native-slide{padding:6%;gap:4%}.mcp-slide-copy{width:68%}.mcp-slide-visual{width:28%;font-size:62px}.mcp-slide-controls{padding:9px}.mcp-slide-btn,.mcp-slide-play{padding:8px 10px;font-size:12px}.mcp-slide-actions{gap:8px}}
      @media(max-width:520px){.mcp-slide-stage{height:360px}.mcp-native-slide{align-items:flex-start;flex-direction:column;justify-content:center}.mcp-slide-copy{width:100%}.mcp-slide-visual{display:none}.mcp-native-slide h3{font-size:27px}.mcp-native-slide p,.mcp-native-slide ul{font-size:14px}.mcp-slide-status{display:none}.mcp-slide-dots{max-width:120px}}
      @media(prefers-reduced-motion:reduce){.mcp-native-slide{transition:none}.mcp-slide-progress{display:none}}
    `;
    document.head.appendChild(css);

    const temas=[
      {titulo:'Aplicação da Lei Penal',slides:[
        {icon:'📘',title:'Lei penal no tempo',body:'Regra: aplica-se a lei vigente no momento do fato.',list:['tempus regit actum','irretroatividade da lei penal mais gravosa','retroatividade da lei penal mais benéfica'],note:'Pegadinha clássica: a lei benéfica retroage inclusive após o trânsito em julgado.'},
        {icon:'⏱️',title:'Tempo do crime',body:'O Código Penal adota a <span class="mcp-slide-highlight">teoria da atividade</span>.',extra:'Considera-se praticado o crime no momento da ação ou omissão, ainda que o resultado ocorra depois.'},
        {icon:'🗺️',title:'Lugar do crime',body:'No lugar do crime, o CP adota a <span class="mcp-slide-highlight">teoria da ubiquidade</span>.',list:['local da ação ou omissão','local onde o resultado ocorreu ou deveria ocorrer']},
        {icon:'⚖️',title:'Abolitio criminis',body:'Lei posterior deixa de considerar o fato criminoso.',note:'Cessam a execução e os efeitos penais da condenação.'},
        {icon:'🎯',title:'Como cai em prova',body:'Compare sempre tempo do crime, lugar do crime e retroatividade.',list:['atividade = tempo','ubiquidade = lugar','lex mitior = retroage']}
      ]},
      {titulo:'Teoria do Crime',slides:[
        {icon:'🧩',title:'Estrutura do crime',body:'Na concepção tripartida, crime é fato típico, ilícito e culpável.',list:['fato típico','ilicitude','culpabilidade']},
        {icon:'⚙️',title:'Fato típico',body:'É formado por elementos essenciais.',list:['conduta','resultado, quando exigido','nexo causal','tipicidade']},
        {icon:'🚫',title:'Ilicitude',body:'É a contrariedade do fato típico ao ordenamento jurídico.',note:'As excludentes afastam a ilicitude.'},
        {icon:'🧠',title:'Culpabilidade',body:'É o juízo de reprovação pessoal sobre o autor.',list:['imputabilidade','potencial consciência da ilicitude','exigibilidade de conduta diversa']},
        {icon:'🎯',title:'Pegadinha',body:'Fato típico não é sinônimo de crime completo.',note:'Em regra, ainda é necessário verificar ilicitude e culpabilidade.'}
      ]},
      {titulo:'Dolo e Culpa',slides:[
        {icon:'🎯',title:'Dolo',body:'O agente quer o resultado ou assume o risco de produzi-lo.',list:['dolo direto','dolo eventual']},
        {icon:'⚠️',title:'Culpa',body:'O resultado decorre de violação do dever objetivo de cuidado.',list:['imprudência','negligência','imperícia']},
        {icon:'🔍',title:'Culpa consciente',body:'O agente prevê o resultado, mas acredita sinceramente que ele não ocorrerá.'},
        {icon:'🔥',title:'Dolo eventual',body:'O agente prevê o resultado e <span class="mcp-slide-highlight">assume o risco</span> de produzi-lo.'},
        {icon:'🎯',title:'Diferença de prova',body:'Culpa consciente: prevê e confia que não ocorrerá. Dolo eventual: prevê e aceita o risco.'}
      ]},
      {titulo:'Tentativa e Consumação',slides:[
        {icon:'🏁',title:'Consumação',body:'O crime se consuma quando se reúnem todos os elementos de sua definição legal.'},
        {icon:'⏳',title:'Tentativa',body:'A execução começa, mas o crime não se consuma por circunstâncias alheias à vontade do agente.'},
        {icon:'↩️',title:'Desistência voluntária',body:'O agente, voluntariamente, interrompe a execução.',note:'Responde pelos atos já praticados.'},
        {icon:'🛟',title:'Arrependimento eficaz',body:'Após esgotar os atos executórios, o agente impede o resultado.'},
        {icon:'🚫',title:'Crime impossível',body:'Não se pune a tentativa quando há ineficácia absoluta do meio ou impropriedade absoluta do objeto.'}
      ]},
      {titulo:'Excludentes de Ilicitude',slides:[
        {icon:'🛡️',title:'Excludentes legais',body:'O art. 23 do CP traz hipóteses clássicas.',list:['estado de necessidade','legítima defesa','estrito cumprimento do dever legal','exercício regular de direito']},
        {icon:'⚔️',title:'Legítima defesa',body:'Reação moderada a agressão injusta, atual ou iminente.',list:['meios necessários','uso moderado','direito próprio ou alheio']},
        {icon:'🚨',title:'Estado de necessidade',body:'Sacrifício de bem jurídico para salvar direito próprio ou alheio de perigo atual.'},
        {icon:'👮',title:'Estrito cumprimento',body:'O agente atua no limite de um dever imposto pela lei.'},
        {icon:'🎯',title:'Excesso',body:'O excesso doloso ou culposo pode gerar responsabilização.',note:'Excludente não protege atuação além dos limites necessários.'}
      ]},
      {titulo:'Erro de Tipo e Erro de Proibição',slides:[
        {icon:'🔎',title:'Erro de tipo',body:'Recai sobre elemento constitutivo do tipo penal.',note:'Pode excluir o dolo; a culpa subsiste se prevista e se o erro for evitável.'},
        {icon:'📚',title:'Erro de proibição',body:'Recai sobre a consciência da ilicitude do fato.'},
        {icon:'✅',title:'Erro inevitável',body:'Se inevitável, pode isentar de pena no erro de proibição.'},
        {icon:'⚠️',title:'Erro evitável',body:'Se evitável, permite redução de pena no erro de proibição.'},
        {icon:'🎯',title:'Mapa mental',body:'Erro de tipo → tipicidade subjetiva. Erro de proibição → culpabilidade.'}
      ]},
      {titulo:'Concurso de Crimes',slides:[
        {icon:'➕',title:'Concurso material',body:'Mais de uma ação ou omissão, produzindo dois ou mais crimes.',note:'As penas são somadas.'},
        {icon:'🔗',title:'Concurso formal',body:'Uma só ação ou omissão produz dois ou mais crimes.',note:'Em regra, aplica-se a pena mais grave com aumento.'},
        {icon:'🔁',title:'Crime continuado',body:'Crimes da mesma espécie, em condições semelhantes, podem ser tratados como continuação do primeiro.'},
        {icon:'🧮',title:'Sistema de penas',body:'Material = cúmulo material. Formal e continuado = exasperação, observadas as hipóteses legais.'},
        {icon:'🎯',title:'Como diferenciar',body:'Conte o número de condutas e observe a relação entre os delitos.'}
      ]}
    ];

    const partes=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const get=t=>partes.find(p=>p.type===t)?.value||'';
    const chave=`${get('year')}-${get('month')}-${get('day')}`;
    const indice=Math.floor(Date.UTC(Number(get('year')),Number(get('month'))-1,Number(get('day')))/86400000)%temas.length;
    const tema=temas[indice];
    const slides=[{icon:'⚖️',title:tema.titulo,body:'Revisão diária de Direito Penal para concursos policiais.',extra:`Conteúdo do dia ${get('day')}/${get('month')}/${get('year')}. O tema muda automaticamente a cada nova data em São Paulo.`},...tema.slides];

    section.dataset.dailyTopic=chave;
    section.innerHTML=`<div class="mcp-gamma-wrap"><div class="mcp-gamma-head"><div><div class="mcp-gamma-kicker">Aula em slides • Direito Penal • Atualização diária</div><h2>${tema.titulo}</h2><p>Tema do dia ${get('day')}/${get('month')}/${get('year')}. Os slides passam automaticamente e o conteúdo muda diariamente.</p></div></div><div class="mcp-slide-shell"><div class="mcp-slide-stage">${slides.map((s,i)=>`<article class="mcp-native-slide ${i===0?'active':''}" data-slide="${i}"><div class="mcp-slide-copy"><div class="mcp-slide-num">${i+1}</div><h3>${s.title}</h3><p>${s.body}</p>${s.extra?`<p>${s.extra}</p>`:''}${s.list?`<ul>${s.list.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${s.note?`<div class="mcp-slide-note">${s.note}</div>`:''}</div><div class="mcp-slide-visual" aria-hidden="true">${s.icon}</div></article>`).join('')}</div><div class="mcp-slide-progress"><div class="mcp-slide-progress-bar" data-progress></div></div><div class="mcp-slide-controls"><button class="mcp-slide-btn" type="button" data-prev>←</button><button class="mcp-slide-play" type="button" data-play aria-label="Pausar reprodução">⏸ Pausar</button><div class="mcp-slide-dots">${slides.map((_,i)=>`<button class="mcp-slide-dot ${i===0?'active':''}" type="button" data-dot="${i}" aria-label="Ir para slide ${i+1}"></button>`).join('')}</div><span class="mcp-slide-status"><b data-current>1</b> / ${slides.length}</span><button class="mcp-slide-btn" type="button" data-next>→</button></div></div><div class="mcp-slide-actions" id="mcpSlideActions" aria-label="Ações rápidas"></div></div>`;

    const dock=section.querySelector('#mcpSlideActions');
    const dockActions=()=>{
      const all=[...document.querySelectorAll('button,a,div')];
      const findAction=matcher=>all.find(el=>!section.contains(el)&&!el.dataset.mcpDocked&&matcher(el)&&getComputedStyle(el).position==='fixed');
      const q=findAction(el=>el.id==='quizFab'||/Questões IA/i.test((el.textContent||'').trim()));
      const buy=findAction(el=>/Comprar com ajuda/i.test((el.textContent||'').trim()));
      const robot=findAction(el=>(el.textContent||'').trim()==='🤖');
      [q,buy,robot].forEach((el,i)=>{if(!el)return;el.dataset.mcpDocked='1';el.classList.add('mcp-docked-action');if(i===2)el.classList.add('mcp-docked-robot');dock.appendChild(el)});
      return dock.children.length;
    };
    dockActions();
    let dockTries=0;const dockTimer=setInterval(()=>{dockTries++;dockActions();if(dock.children.length>=3||dockTries>20)clearInterval(dockTimer)},300);

    let current=0,paused=false,timer=null,startedAt=0,elapsed=0;
    const interval=6500,els=[...section.querySelectorAll('.mcp-native-slide')],dots=[...section.querySelectorAll('.mcp-slide-dot')],currentLabel=section.querySelector('[data-current]'),progress=section.querySelector('[data-progress]'),playBtn=section.querySelector('[data-play]');
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const updatePlay=()=>{playBtn.dataset.paused=String(paused);playBtn.textContent=paused?'▶ Continuar':'⏸ Pausar';playBtn.setAttribute('aria-label',paused?'Continuar reprodução':'Pausar reprodução')};
    const show=n=>{current=(n+slides.length)%slides.length;els.forEach((el,i)=>el.classList.toggle('active',i===current));dots.forEach((el,i)=>el.classList.toggle('active',i===current));currentLabel.textContent=String(current+1);elapsed=0;startedAt=performance.now();progress.style.width='0%'};
    const tick=now=>{if(!paused&&!reduced){const passed=elapsed+(now-startedAt);progress.style.width=Math.min(100,(passed/interval)*100)+'%';if(passed>=interval)show(current+1)}timer=requestAnimationFrame(tick)};
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
    if(reduced){paused=true;updatePlay();progress.style.width='0%'}
    return true;
  };
  if(!mount()){let tries=0;const t=setInterval(()=>{tries++;if(mount()||tries>30)clearInterval(t)},200)}
})();