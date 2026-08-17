(()=>{
  if(document.getElementById('mcpCareerHub')) return;
  const q=s=>document.querySelector(s);
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const style=document.createElement('style');
  style.textContent=`
    #mcpCareerHub{background:#f6f8fb;padding:72px 0;color:#08203d}
    #mcpCareerHub .mcp-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
    .mcp-kicker{color:#b38708;font-size:12px;letter-spacing:2.5px;font-weight:900;text-transform:uppercase;margin-bottom:12px}
    .mcp-title{font:400 42px/1.1 Georgia,serif;margin:0 0 12px}.mcp-sub{color:#697585;line-height:1.7;margin:0 0 30px}
    .mcp-careers{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:54px}
    .mcp-career{background:#061c3c;color:#fff;border:1px solid #17375f;border-radius:10px;padding:24px;cursor:pointer;text-align:left;min-height:165px;transition:.2s}
    .mcp-career:hover{transform:translateY(-3px);border-color:#efbd26;box-shadow:0 16px 30px #08203d1f}.mcp-career b{display:block;color:#efbd26;font-size:13px;margin-bottom:12px}.mcp-career strong{font:400 25px Georgia,serif;display:block;margin-bottom:8px}.mcp-career span{color:#aeb8c6;font-size:13px;line-height:1.5}
    .mcp-train{background:#fff;border:1px solid #dce2e9;border-radius:12px;padding:28px;margin-bottom:54px;box-shadow:0 12px 30px #08203d0d}.mcp-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.mcp-action{border:1px solid #dce2e9;background:#fff;color:#062a5d;border-radius:8px;padding:20px;cursor:pointer;text-align:left;font-weight:900}.mcp-action:hover{border-color:#efbd26;background:#fff9e5}.mcp-action small{display:block;color:#7a8491;font-weight:400;margin-top:7px;line-height:1.45}
    .mcp-final{background:linear-gradient(135deg,#03162f,#082f64);color:#fff;border-radius:12px;padding:30px}.mcp-final-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:20px}.mcp-final h3{font:400 32px Georgia,serif;margin:0}.mcp-final p{color:#adbacb;margin:8px 0 0}.mcp-final-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.mcp-final-card{background:#fff;color:#08203d;border-top:3px solid #efbd26;border-radius:7px;padding:18px;min-height:150px}.mcp-final-card b{font-size:10px;letter-spacing:1px;color:#8c6d0b}.mcp-final-card h4{font:400 20px Georgia,serif;margin:12px 0 7px}.mcp-final-card p{color:#6f7884;font-size:13px;line-height:1.45;margin:0}.mcp-final-card a{display:inline-block;margin-top:12px;color:#062a5d;font-weight:900;text-decoration:none;font-size:12px}
    @media(max-width:900px){.mcp-careers,.mcp-actions{grid-template-columns:repeat(2,1fr)}.mcp-final-grid{grid-template-columns:1fr}}
    @media(max-width:560px){#mcpCareerHub{padding:48px 0}.mcp-title{font-size:34px}.mcp-careers,.mcp-actions{grid-template-columns:1fr}}
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
      <button class="mcp-career" data-area="penal"><b>EXECUÇÃO PENAL</b><strong>Polícia Penal</strong><span>LEP, sistema prisional, direitos e segurança penitenciária.</span></button>
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
    </div>

    <div class="mcp-final">
      <div class="mcp-final-head"><div><div class="mcp-kicker" style="color:#efbd26">Painel Reta Final</div><h3>Concursos em movimento agora</h3><p>Dados puxados do Radar MCP e de fontes oficiais.</p></div><a href="#editais" style="color:#efbd26;font-weight:900;text-decoration:none">Ver Radar completo →</a></div>
      <div class="mcp-final-grid" id="mcpFinalGrid"><div class="mcp-final-card"><b>ATUALIZANDO</b><h4>Consultando o Radar...</h4><p>Buscando movimentações recentes em fontes oficiais.</p></div></div>
    </div>
  </div>`;

  const hero=q('.hero');
  if(hero&&hero.parentNode) hero.insertAdjacentElement('afterend',block); else (q('main')||document.body).prepend(block);

  function openQuiz(area){
    const modal=document.getElementById('quizModal'),areaSel=document.getElementById('qArea');
    if(areaSel&&area) areaSel.value=area;
    if(modal) modal.style.display='flex'; else document.getElementById('quizFab')?.click();
  }
  block.querySelectorAll('.mcp-career').forEach(btn=>btn.onclick=()=>openQuiz(btn.dataset.area));
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
