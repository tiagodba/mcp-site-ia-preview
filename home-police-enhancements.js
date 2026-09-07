(()=>{
  if(document.getElementById('mcpCareerHub')) return;
  const q=s=>document.querySelector(s);
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));

  const style=document.createElement('style');
  style.textContent=`
    #mcpCareerHub{background:#f6f8fb;padding:72px 0;color:#08203d}
    #mcpCareerHub .mcp-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
    .mcp-kicker{color:#b38708;font-size:12px;letter-spacing:2.5px;font-weight:900;text-transform:uppercase;margin-bottom:12px}
    .mcp-title{font:400 42px/1.1 Georgia,serif;margin:0 0 12px}.mcp-sub{color:#697585;line-height:1.7;margin:0 0 30px}
    .mcp-careers{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:54px}
    .mcp-career{background:#061c3c;color:#fff;border:1px solid #17375f;border-radius:10px;padding:24px;cursor:pointer;text-align:left;min-height:165px;transition:.2s}
    .mcp-career:hover{transform:translateY(-3px);border-color:#efbd26;box-shadow:0 16px 30px #08203d1f}.mcp-career b{display:block;color:#efbd26;font-size:13px;margin-bottom:12px}.mcp-career strong{font:400 25px Georgia,serif;display:block;margin-bottom:8px}.mcp-career span{color:#aeb8c6;font-size:13px;line-height:1.5}
    .mcp-train{background:#fff;border:1px solid #dce2e9;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 12px 30px #08203d0d}.mcp-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.mcp-action{border:1px solid #dce2e9;background:#fff;color:#062a5d;border-radius:8px;padding:20px;cursor:pointer;text-align:left;font-weight:900}.mcp-action:hover{border-color:#efbd26;background:#fff9e5}.mcp-action small{display:block;color:#7a8491;font-weight:400;margin-top:7px;line-height:1.45}
    .mcp-central{margin-top:18px;padding:22px;border-radius:10px;background:linear-gradient(135deg,#03162f,#082f64);color:#fff}.mcp-central-head{display:flex;justify-content:space-between;gap:16px;align-items:center}.mcp-central h3{margin:0;font:400 26px Georgia,serif}.mcp-central p{margin:7px 0 0;color:#b9c5d5;font-size:13px}.mcp-central button{border:0;background:#efbd26;color:#062a5d;padding:13px 18px;border-radius:7px;font-weight:900;cursor:pointer;white-space:nowrap}
    .mcp-custody{margin:0 0 54px;background:linear-gradient(135deg,#061c3c,#0b3965);border:1px solid #174d79;border-top:4px solid #efbd26;border-radius:12px;padding:28px;color:#fff;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;box-shadow:0 14px 34px #08203d22}.mcp-custody h3{font:400 30px/1.15 Georgia,serif;margin:0 0 8px}.mcp-custody p{margin:0;color:#c1ccda;line-height:1.6}.mcp-custody-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.mcp-custody-meta span{background:#ffffff10;border:1px solid #ffffff24;color:#eef5fb;padding:7px 9px;border-radius:20px;font-size:10px;font-weight:900}.mcp-custody a{display:inline-flex;align-items:center;justify-content:center;background:#efbd26;color:#062a5d;text-decoration:none;padding:15px 19px;border-radius:7px;font-weight:900;white-space:nowrap}.mcp-admin-links{margin:-34px 0 42px;text-align:right;font-size:11px;color:#8b96a3}.mcp-admin-links a{color:#718091;text-decoration:none;margin-left:12px}.mcp-admin-links a:hover{text-decoration:underline}
    .mcp-final{background:linear-gradient(135deg,#03162f,#082f64);color:#fff;border-radius:12px;padding:30px}.mcp-final-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:20px}.mcp-final h3{font:400 32px Georgia,serif;margin:0}.mcp-final p{color:#adbacb;margin:8px 0 0}.mcp-final-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.mcp-final-card{background:#fff;color:#08203d;border-top:3px solid #efbd26;border-radius:7px;padding:18px;min-height:150px}.mcp-final-card b{font-size:10px;letter-spacing:1px;color:#8c6d0b}.mcp-final-card h4{font:400 20px Georgia,serif;margin:12px 0 7px}.mcp-final-card p{color:#6f7884;font-size:13px;line-height:1.45;margin:0}.mcp-final-card a{display:inline-block;margin-top:12px;color:#062a5d;font-weight:900;text-decoration:none;font-size:12px}
    .mcp-pcpr{margin:0 0 54px;background:#fff;border:1px solid #dce2e9;border-top:4px solid #efbd26;border-radius:12px;padding:28px;box-shadow:0 12px 30px #08203d0d;display:grid;grid-template-columns:150px 1fr auto;gap:24px;align-items:center}
    .mcp-pcpr-cover{height:190px;border-radius:8px;background:linear-gradient(145deg,#102a43,#1f5a7a);color:#fff;padding:22px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 24px #08203d26}.mcp-pcpr-cover small{color:#d9a441;font-weight:900;letter-spacing:1.5px}.mcp-pcpr-cover strong{font:700 21px/1.2 Georgia,serif}.mcp-pcpr h3{font:400 29px/1.15 Georgia,serif;margin:0 0 9px}.mcp-pcpr p{color:#697585;line-height:1.6;margin:0}.mcp-pcpr-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.mcp-pcpr-meta span{background:#eef4f7;color:#1f5a7a;padding:7px 9px;border-radius:20px;font-size:10px;font-weight:900}.mcp-pcpr a{display:inline-flex;align-items:center;justify-content:center;background:#efbd26;color:#062a5d;text-decoration:none;padding:15px 18px;border-radius:7px;font-weight:900;white-space:nowrap}
    #mcpQuestionHub{position:fixed;inset:0;z-index:160;background:#020914e8;display:none;align-items:center;justify-content:center;padding:20px}.mcp-q-shell{width:min(900px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:14px;box-shadow:0 25px 80px #0008}.mcp-q-head{background:#03162f;color:#fff;padding:20px 24px;display:flex;justify-content:space-between;align-items:center}.mcp-q-head h2{margin:0;font:400 28px Georgia,serif}.mcp-q-close{border:1px solid #49617e;background:transparent;color:#fff;width:38px;height:38px;border-radius:50%;font-size:21px;cursor:pointer}.mcp-q-body{padding:24px}.mcp-q-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.mcp-q-grid input,.mcp-q-grid select{padding:12px;border:1px solid #d5dce5;border-radius:6px;background:#fff;color:#08203d}.mcp-platforms{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}.mcp-platform{border:1px solid #dce2e9;border-radius:9px;padding:18px;background:#fff;text-align:left;cursor:pointer;color:#062a5d}.mcp-platform:hover{border-color:#efbd26;background:#fff9e5}.mcp-platform strong{display:block;font-size:15px}.mcp-platform small{display:block;color:#6f7884;margin-top:7px;line-height:1.4}.mcp-q-note{margin-top:18px;padding:13px 15px;background:#fff8df;border-left:4px solid #efbd26;color:#6f5709;font-size:12px;line-height:1.5}
    @media(max-width:900px){.mcp-careers,.mcp-actions{grid-template-columns:repeat(2,1fr)}.mcp-final-grid{grid-template-columns:1fr}.mcp-platforms{grid-template-columns:repeat(2,1fr)}.mcp-q-grid{grid-template-columns:1fr 1fr}.mcp-custody{grid-template-columns:1fr}}
    @media(max-width:560px){.mcp-pcpr{grid-template-columns:1fr}.mcp-pcpr-cover{height:220px}.mcp-pcpr a,.mcp-custody a{width:100%}#mcpCareerHub{padding:48px 0}.mcp-title{font-size:34px}.mcp-careers,.mcp-actions,.mcp-platforms,.mcp-q-grid{grid-template-columns:1fr}.mcp-central-head{align-items:flex-start;flex-direction:column}.mcp-admin-links{text-align:center;margin-top:-32px}}
  `;
  document.head.appendChild(style);

  const block=document.createElement('section');
  block.id='mcpCareerHub';
  block.innerHTML=`<div class="mcp-wrap">
    <div class="mcp-kicker">Comece pela sua carreira</div>
    <h2 class="mcp-title">Escolha sua carreira e estude com direção.</h2>
    <p class="mcp-sub">Selecione a área para abrir o Banco de Questões já direcionado e acompanhar oportunidades relacionadas.</p>
    <div class="mcp-careers">
      <button class="mcp-career" data-area="civil"><b>INVESTIGAÇÃO</b><strong>Polícia Civil</strong><span>Questões, processo penal, investigação e legislação.</span></button>
      <button class="mcp-career" data-area="penal"><b>PÓS-EDITAL • RN 2026</b><strong>Polícia Penal</strong><span>Central exclusiva, edital verticalizado, progresso e treino Instituto Avalia.</span></button>
      <button class="mcp-career" data-area="cientifica"><b>PERÍCIA</b><strong>Polícia Científica</strong><span>Criminalística, cadeia de custódia e medicina legal.</span></button>
      <button class="mcp-career" data-area="gcm"><b>SEGURANÇA MUNICIPAL</b><strong>Guarda Municipal</strong><span>Legislação, uso da força e conteúdos para GCM.</span></button>
    </div>

    <div class="mcp-train">
      <div class="mcp-kicker">Treine agora</div><h2 class="mcp-title" style="font-size:34px">Transforme estudo em prática.</h2>
      <div class="mcp-actions">
        <button class="mcp-action" data-act="quiz">🧠 Banco de Questões<small>Gere uma questão autoral com correção comentada.</small></button>
        <button class="mcp-action" data-act="daily">📅 Questão do Dia<small>Resolva uma questão rápida para manter constância.</small></button>
        <button class="mcp-action" data-act="sim">🎯 Simulado IA<small>Inicie uma sequência de 10, 20 ou 50 questões.</small></button>
        <button class="mcp-action" data-act="review">🔁 Revisar erros<small>Volte às questões que você errou anteriormente.</small></button>
      </div>
      <div class="mcp-central"><div class="mcp-central-head"><div><h3>Central de Questões MCP</h3><p>Use um único painel para escolher filtros e seguir para IA MCP, TEC Concursos, Qconcursos ou Estratégia.</p></div><button id="mcpOpenQuestionHub" type="button">Abrir Central →</button></div></div>
    </div>

    <article class="mcp-custody" aria-label="Banco de Questões de Cadeia de Custódia"><div><div class="mcp-kicker" style="color:#efbd26">Banco conectado ao Supabase</div><h3>Cadeia de Custódia — Questões e Simulados</h3><p>Treine com questões MCP e do caderno TecConcursos, filtros por banca e ano, correção comentada, caderno de erros e carregamento sob demanda.</p><div class="mcp-custody-meta"><span>233 questões</span><span>40 MCP</span><span>193 TecConcursos</span><span>FGV • Cebraspe • IDECAN e mais</span><span>Supabase</span></div></div><a href="/ambientes/cadeia_questoes_simulados.html">Abrir banco →</a></article>
    <div class="mcp-admin-links">Acesso restrito MCP: <a href="/painel-admin-questoes.html">Painel de questões</a><a href="/painel-importar-pdf-questoes.html">Importar PDF</a></div>

    <div class="mcp-final">
      <div class="mcp-final-head"><div><div class="mcp-kicker" style="color:#efbd26">Painel Reta Final</div><h3>Concursos em movimento agora</h3><p>Dados puxados do Radar MCP e de fontes oficiais.</p></div><a href="#editais" style="color:#efbd26;font-weight:900;text-decoration:none">Ver Radar completo →</a></div>
      <div class="mcp-final-grid" id="mcpFinalGrid"><div class="mcp-final-card"><b>ATUALIZANDO</b><h4>Consultando o Radar...</h4><p>Buscando movimentações recentes em fontes oficiais.</p></div></div>
    </div>
  </div>`;

  const pcprSpot=document.createElement('article');
  pcprSpot.className='mcp-pcpr';
  pcprSpot.setAttribute('aria-label','Nova apostila da Lei Orgânica da Polícia Civil do Paraná');
  pcprSpot.innerHTML=`<div class="mcp-pcpr-cover"><small>PCPR • FGV • 2026</small><strong>LEI ORGÂNICA<br>DO PARANÁ</strong><span>Lei nº 23.213/2026</span></div><div><div class="mcp-kicker">Novo material gratuito</div><h3>Lei Orgânica da Polícia Civil do Paraná</h3><p>Apostila comentada artigo por artigo, com 71 dispositivos, pegadinhas FGV, 6 mapas mentais, 30 questões inéditas e gabarito comentado.</p><div class="mcp-pcpr-meta"><span>47 páginas</span><span>Delegado</span><span>Agente</span><span>Papiloscopista</span></div></div><a href="/assets/materiais/Apostila_Lei_23213_2026_Lei_Organica_PCPR_Comentada_MCP.pdf" target="_blank" rel="noopener">Abrir apostila →</a>`;
  block.querySelector('.mcp-final').insertAdjacentElement('beforebegin',pcprSpot);

  const hub=document.createElement('div');
  hub.id='mcpQuestionHub';
  hub.innerHTML=`<div class="mcp-q-shell"><div class="mcp-q-head"><h2>Central de Questões MCP</h2><button class="mcp-q-close" type="button" aria-label="Fechar">×</button></div><div class="mcp-q-body">
    <p style="margin-top:0;color:#697585;line-height:1.6">Defina o foco do treino e escolha onde resolver. O MCP não armazena sua senha nem compartilha sua assinatura com terceiros.</p>
    <div class="mcp-q-grid">
      <select id="mcpQArea"><option value="geral">Todas as carreiras</option><option value="civil">Polícia Civil</option><option value="penal">Polícia Penal</option><option value="cientifica">Polícia Científica</option><option value="gcm">GCM</option></select>
      <input id="mcpQDisc" placeholder="Disciplina: ex. Direito Penal">
      <input id="mcpQAssunto" placeholder="Assunto: ex. cadeia de custódia">
      <input id="mcpQBanca" placeholder="Banca: ex. Cebraspe, FGV">
      <input id="mcpQAno" placeholder="Ano: ex. 2025, 2026">
      <input id="mcpQCargo" placeholder="Cargo/órgão: ex. Investigador PC-BA">
    </div>
    <div class="mcp-platforms">
      <button class="mcp-platform" data-platform="mcp"><strong>🤖 IA MCP</strong><small>Leva os filtros para o gerador autoral do próprio site.</small></button>
      <button class="mcp-platform" data-platform="tec"><strong>🟡 TEC Concursos</strong><small>Abre a plataforma oficial para usar sua conta e seus cadernos.</small></button>
      <button class="mcp-platform" data-platform="qconcursos"><strong>🔵 Qconcursos</strong><small>Abre o banco oficial para aplicar filtros e resolver questões.</small></button>
      <button class="mcp-platform" data-platform="estrategia"><strong>🟢 Estratégia</strong><small>Abre o Sistema de Questões oficial para aplicar seus filtros.</small></button>
    </div>
    <div class="mcp-q-note" id="mcpQNote">As plataformas externas permanecem responsáveis pelo conteúdo, login e permissões da conta. A Central apenas organiza o direcionamento dos filtros.</div>
  </div></div>`;

  const hero=q('.hero');
  if(hero&&hero.parentNode) hero.insertAdjacentElement('afterend',block); else (q('main')||document.body).prepend(block);
  const mainNav=q('.nav');if(mainNav&&!document.getElementById('navPprn')){const link=document.createElement('a');link.id='navPprn';link.href='/policia-penal-rn-2026.html';link.textContent='PP-RN 2026';mainNav.appendChild(link)}
  document.body.appendChild(hub);

  function openQuiz(area){
    const modal=document.getElementById('quizModal'),areaSel=document.getElementById('qArea');
    if(areaSel&&area) areaSel.value=area;
    if(modal) modal.style.display='flex'; else document.getElementById('quizFab')?.click();
  }
  function openHub(area){
    if(area) document.getElementById('mcpQArea').value=area;
    hub.style.display='flex';document.body.style.overflow='hidden';
  }
  function closeHub(){hub.style.display='none';document.body.style.overflow=''}
  document.getElementById('mcpOpenQuestionHub').onclick=()=>openHub();
  hub.querySelector('.mcp-q-close').onclick=closeHub;
  hub.addEventListener('click',e=>{if(e.target===hub)closeHub()});

  block.querySelectorAll('.mcp-career').forEach(btn=>btn.onclick=()=>{if(btn.dataset.area==='penal'){location.href='/policia-penal-rn-2026.html';return}openQuiz(btn.dataset.area)});
  block.querySelectorAll('.mcp-action').forEach(btn=>btn.onclick=()=>{
    const act=btn.dataset.act; openQuiz();
    setTimeout(()=>{
      if(act==='daily') document.getElementById('qDaily')?.click();
      if(act==='review') document.getElementById('qReview')?.click();
      if(act==='sim'){
        const m=document.getElementById('qModo'); if(m){m.value='simulado';m.dispatchEvent(new Event('change'));}
      }
    },120);
  });

  hub.querySelectorAll('.mcp-platform').forEach(btn=>btn.onclick=async()=>{
    const platform=btn.dataset.platform;
    const area=document.getElementById('mcpQArea').value;
    const disc=document.getElementById('mcpQDisc').value.trim();
    const assunto=document.getElementById('mcpQAssunto').value.trim();
    const banca=document.getElementById('mcpQBanca').value.trim();
    const ano=document.getElementById('mcpQAno').value.trim();
    const cargo=document.getElementById('mcpQCargo').value.trim();
    const resumo=[disc,assunto,banca,ano,cargo].filter(Boolean).join(' • ');
    if(platform==='mcp'){
      closeHub();openQuiz(area);
      setTimeout(()=>{const a=document.getElementById('qAssunto'),b=document.getElementById('qBanca');if(a)a.value=[disc,assunto,cargo,ano].filter(Boolean).join(' | ');if(b)b.value=banca;},80);
      return;
    }
    const urls={tec:'https://www.tecconcursos.com.br/questoes',qconcursos:'https://www.qconcursos.com/questoes-de-concursos/questoes',estrategia:'https://www.estrategiaconcursos.com.br/sistema-de-questoes/'};
    if(resumo){try{await navigator.clipboard.writeText(resumo);document.getElementById('mcpQNote').textContent='Filtros copiados: '+resumo+'. A plataforma será aberta em nova aba para você aplicar na sua conta.'}catch{document.getElementById('mcpQNote').textContent='A plataforma será aberta em nova aba. Use os filtros informados acima dentro da sua conta.'}}
    window.open(urls[platform],'_blank','noopener,noreferrer');
  });

  async function loadFinal(){
    const grid=document.getElementById('mcpFinalGrid'); if(!grid)return;
    try{
      const r=await fetch('/api/radar',{headers:{Accept:'application/json'}}),d=await r.json();
      if(!r.ok||!Array.isArray(d.items)||!d.items.length) throw new Error('sem dados');
      grid.innerHTML=d.items.slice(0,3).map(x=>`<article class="mcp-final-card"><b>${esc(x.status||'EM ACOMPANHAMENTO')}</b><h4>${esc(x.orgao||x.titulo||'Concurso policial')}</h4><p>${esc((x.resumo||x.titulo||'').slice(0,145))}</p><a href="${esc(x.url||'#editais')}" target="_blank" rel="noopener noreferrer">Fonte oficial →</a></article>`).join('');
    }catch{
      grid.innerHTML='<article class="mcp-final-card"><b>RADAR MCP</b><h4>Acompanhe os editais</h4><p>Veja concursos abertos e previstos no Radar Nacional de Concursos.</p><a href="#editais">Abrir Radar →</a></article>';
    }
  }
  loadFinal();
})();


;(()=>{
  if(document.getElementById('mcpLeadCapture')) return;

  const style=document.createElement('style');
  style.textContent=`
    #mcpLeadCapture{position:fixed;inset:0;z-index:170;background:#020914d9;display:none;align-items:center;justify-content:center;padding:18px}
    #mcpLeadCapture.open{display:flex}
    .mcp-lead-card{width:min(520px,100%);background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 28px 90px #0008}
    .mcp-lead-head{background:linear-gradient(115deg,#020a18,#072650);color:#fff;padding:22px 24px;display:flex;gap:16px;align-items:flex-start}
    .mcp-lead-badge{width:48px;height:48px;border:1px solid #efbd26;border-radius:50%;display:grid;place-items:center;color:#efbd26;font-size:22px;flex:0 0 auto}
    .mcp-lead-head h2{margin:0;font:400 28px Georgia,serif}.mcp-lead-head p{margin:7px 0 0;color:#b8c5d4;font-size:13px;line-height:1.5}
    .mcp-lead-close{margin-left:auto;border:0;background:transparent;color:#fff;font-size:26px;cursor:pointer}
    .mcp-lead-body{padding:24px}
    .mcp-lead-grid{display:grid;gap:12px}.mcp-lead-grid input,.mcp-lead-grid select{width:100%;padding:13px 14px;border:1px solid #d7dee8;border-radius:8px;color:#08203d;background:#fff;font:inherit}
    .mcp-lead-consent{display:flex;gap:9px;align-items:flex-start;color:#697585;font-size:11px;line-height:1.45;margin:2px 0 4px}.mcp-lead-consent input{margin-top:2px}
    .mcp-lead-submit{width:100%;border:0;border-radius:8px;background:#efbd26;color:#062a5d;padding:14px 18px;font-weight:900;cursor:pointer}
    .mcp-lead-submit:disabled{opacity:.65;cursor:not-allowed}.mcp-lead-status{min-height:20px;margin-top:11px;font-size:12px;line-height:1.45}.mcp-lead-status.ok{color:#126a43}.mcp-lead-status.err{color:#9a2b2b}
    .mcp-lead-trigger{position:fixed;left:24px;bottom:24px;z-index:42;border:0;border-radius:28px;background:#fff;color:#062a5d;padding:13px 17px;font-weight:900;box-shadow:0 12px 28px #0003;cursor:pointer;border:1px solid #dfe5ec}
    @media(max-width:560px){.mcp-lead-trigger{left:14px;bottom:14px}.mcp-lead-head h2{font-size:24px}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');
  modal.id='mcpLeadCapture';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`
    <div class="mcp-lead-card" role="dialog" aria-modal="true" aria-labelledby="mcpLeadTitle">
      <div class="mcp-lead-head">
        <div class="mcp-lead-badge">✉</div>
        <div><h2 id="mcpLeadTitle">Receba materiais e novidades do MCP</h2><p>Informe seu concurso de interesse e receba conteúdos, mapas, avisos e acesso aos materiais disponíveis para a sua preparação.</p></div>
        <button class="mcp-lead-close" type="button" aria-label="Fechar">×</button>
      </div>
      <form class="mcp-lead-body" id="mcpLeadForm">
        <div class="mcp-lead-grid">
          <input name="nome" autocomplete="name" placeholder="Seu nome" required>
          <input name="email" type="email" autocomplete="email" placeholder="Seu melhor e-mail" required>
          <select name="concurso" required>
            <option value="">Concurso de interesse</option>
            <option>GCM Caldas Novas</option>
            <option>GCM Paracatu</option>
            <option>PC-BA</option>
            <option>Polícia Civil</option>
            <option>Polícia Penal</option>
            <option>Polícia Científica</option>
            <option>PM / Bombeiros</option>
            <option>Outro concurso policial</option>
          </select>
          <label class="mcp-lead-consent"><input name="consentimento" type="checkbox" required><span>Autorizo o MCP a usar meu e-mail para enviar o material solicitado e comunicações relacionadas ao concurso informado.</span></label>
          <button class="mcp-lead-submit" type="submit">Quero receber material</button>
        </div>
        <div class="mcp-lead-status" id="mcpLeadStatus" aria-live="polite"></div>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const trigger=document.createElement('button');
  trigger.className='mcp-lead-trigger';
  trigger.type='button';
  trigger.textContent='📩 Receber material';
  document.body.appendChild(trigger);

  const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};
  const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
  trigger.onclick=open;
  modal.querySelector('.mcp-lead-close').onclick=close;
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

  const key='mcpLeadPromptSeenV1';
  try{
    if(!localStorage.getItem(key)){
      setTimeout(()=>{open();localStorage.setItem(key,String(Date.now()))},9000);
    }
  }catch{}

  const form=modal.querySelector('#mcpLeadForm');
  const status=modal.querySelector('#mcpLeadStatus');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.className='mcp-lead-status';
    status.textContent='Enviando sua solicitação...';
    const button=form.querySelector('.mcp-lead-submit');
    button.disabled=true;
    const fd=new FormData(form);
    const payload={
      nome:fd.get('nome'),
      email:fd.get('email'),
      concurso:fd.get('concurso'),
      consentimento:fd.get('consentimento')==='on',
      pagina:location.href
    };
    try{
      const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const d=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(d.error||'Não foi possível enviar agora.');
      status.className='mcp-lead-status ok';
      status.textContent='Cadastro enviado. Confira seu e-mail em alguns instantes.';
      form.reset();
      try{localStorage.setItem('mcpLeadConvertedV1','1')}catch{}
      setTimeout(close,2200);
    }catch(err){
      status.className='mcp-lead-status err';
      status.textContent=err.message||'Não foi possível enviar agora.';
    }finally{button.disabled=false}
  });
})();
