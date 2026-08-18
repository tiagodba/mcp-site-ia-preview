(()=>{
  const mount=()=>{
    const section=document.getElementById('mcpCrimesPessoaGamma');
    if(!section)return false;
    const css=document.createElement('style');
    css.textContent=`
      #mcpCrimesPessoaGamma{padding:62px 0;background:linear-gradient(180deg,#061226,#0a1730);color:#fff}
      #mcpCrimesPessoaGamma .mcp-gamma-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
      #mcpCrimesPessoaGamma .mcp-gamma-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:22px}
      #mcpCrimesPessoaGamma .mcp-gamma-kicker{font-size:12px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase;color:#efbd26;margin-bottom:8px}
      #mcpCrimesPessoaGamma .mcp-gamma-head h2{margin:0;font:700 38px/1.08 Georgia,serif;color:#fff}
      #mcpCrimesPessoaGamma .mcp-gamma-head p{margin:8px 0 0;color:#b9c6d8;max-width:760px;line-height:1.6}
      .mcp-slide-shell{position:relative;border:1px solid rgba(255,255,255,.15);border-radius:20px;overflow:hidden;box-shadow:0 22px 60px rgba(0,0,0,.34);background:#080e26}
      .mcp-slide-stage{aspect-ratio:16/9;position:relative;overflow:hidden;background:radial-gradient(circle at 80% 20%,rgba(140,152,202,.22),transparent 30%),linear-gradient(135deg,#080e26,#111d43 60%,#0c1b38)}
      .mcp-native-slide{position:absolute;inset:0;padding:7% 8%;display:none;align-items:center;gap:7%;box-sizing:border-box}
      .mcp-native-slide.active{display:flex}
      .mcp-slide-copy{width:58%;position:relative;z-index:2}
      .mcp-slide-num{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:#8c98ca;color:#071426;font-weight:900;margin-bottom:18px}
      .mcp-native-slide h3{margin:0 0 18px;font:700 clamp(30px,4vw,58px)/1.02 Georgia,serif;color:#fff}
      .mcp-native-slide p{font-size:clamp(15px,1.6vw,22px);line-height:1.55;color:#d5dbea;margin:0 0 14px}
      .mcp-native-slide ul{margin:12px 0 0;padding-left:1.15em;color:#e6e9f3;font-size:clamp(15px,1.5vw,21px);line-height:1.55}
      .mcp-native-slide li{margin:6px 0}
      .mcp-slide-highlight{color:#efbd26;font-weight:800}
      .mcp-slide-visual{width:35%;min-height:58%;display:flex;align-items:center;justify-content:center;border-radius:24px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,rgba(140,152,202,.17),rgba(255,255,255,.035));font-size:clamp(74px,10vw,150px);box-shadow:inset 0 0 50px rgba(255,255,255,.025)}
      .mcp-slide-note{margin-top:18px;padding:13px 16px;border-left:4px solid #efbd26;background:rgba(239,189,38,.09);border-radius:8px;color:#fff;font-weight:700}
      .mcp-slide-controls{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 16px;background:#071426;border-top:1px solid rgba(255,255,255,.1)}
      .mcp-slide-btn{border:0;background:#15254d;color:#fff;border-radius:10px;padding:11px 16px;font-weight:800;cursor:pointer}
      .mcp-slide-btn:hover{background:#20366e}
      .mcp-slide-status{color:#b9c6d8;font-size:13px;font-weight:700}
      .mcp-slide-dots{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
      .mcp-slide-dot{width:8px;height:8px;border-radius:50%;background:#4d5c80;border:0;padding:0;cursor:pointer}
      .mcp-slide-dot.active{background:#efbd26;transform:scale(1.25)}
      @media(max-width:760px){#mcpCrimesPessoaGamma{padding:42px 0}#mcpCrimesPessoaGamma .mcp-gamma-head{display:block}#mcpCrimesPessoaGamma .mcp-gamma-head h2{font-size:31px}#mcpCrimesPessoaGamma .mcp-gamma-wrap{width:min(100% - 24px,1180px)}.mcp-native-slide{padding:8% 7%;gap:4%}.mcp-slide-copy{width:66%}.mcp-slide-visual{width:30%;font-size:70px}.mcp-slide-controls{padding:10px}.mcp-slide-btn{padding:10px 12px;font-size:13px}}
      @media(max-width:520px){.mcp-slide-stage{aspect-ratio:4/5}.mcp-native-slide{display:none;align-items:flex-start;flex-direction:column;justify-content:center}.mcp-native-slide.active{display:flex}.mcp-slide-copy{width:100%}.mcp-slide-visual{display:none}.mcp-native-slide h3{font-size:29px}.mcp-native-slide p,.mcp-native-slide ul{font-size:15px}.mcp-slide-status{display:none}}
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

    section.innerHTML=`<div class="mcp-gamma-wrap"><div class="mcp-gamma-head"><div><div class="mcp-gamma-kicker">Aula em slides • Direito Penal</div><h2>Crimes Contra a Pessoa</h2><p>Agora o conteúdo abre diretamente no site, sem tela de login e sem depender do Gamma para visualização.</p></div></div><div class="mcp-slide-shell"><div class="mcp-slide-stage">${slides.map((s,i)=>`<article class="mcp-native-slide ${i===0?'active':''}" data-slide="${i}"><div class="mcp-slide-copy"><div class="mcp-slide-num">${i+1}</div><h3>${s.title}</h3><p>${s.body}</p>${s.extra?`<p>${s.extra}</p>`:''}${s.list?`<ul>${s.list.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${s.note?`<div class="mcp-slide-note">${s.note}</div>`:''}</div><div class="mcp-slide-visual" aria-hidden="true">${s.icon}</div></article>`).join('')}</div><div class="mcp-slide-controls"><button class="mcp-slide-btn" type="button" data-prev>← Anterior</button><div class="mcp-slide-dots">${slides.map((_,i)=>`<button class="mcp-slide-dot ${i===0?'active':''}" type="button" data-dot="${i}" aria-label="Ir para slide ${i+1}"></button>`).join('')}</div><span class="mcp-slide-status"><b data-current>1</b> / ${slides.length}</span><button class="mcp-slide-btn" type="button" data-next>Próximo →</button></div></div></div>`;

    let current=0;
    const els=[...section.querySelectorAll('.mcp-native-slide')];
    const dots=[...section.querySelectorAll('.mcp-slide-dot')];
    const currentLabel=section.querySelector('[data-current]');
    const show=n=>{current=(n+slides.length)%slides.length;els.forEach((el,i)=>el.classList.toggle('active',i===current));dots.forEach((el,i)=>el.classList.toggle('active',i===current));currentLabel.textContent=String(current+1)};
    section.querySelector('[data-prev]').addEventListener('click',()=>show(current-1));
    section.querySelector('[data-next]').addEventListener('click',()=>show(current+1));
    dots.forEach(d=>d.addEventListener('click',()=>show(Number(d.dataset.dot))));
    document.addEventListener('keydown',e=>{if(!section.matches(':hover'))return;if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});
    return true;
  };
  if(!mount()){let tries=0;const t=setInterval(()=>{tries++;if(mount()||tries>30)clearInterval(t)},200)}
})();
