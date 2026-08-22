(()=>{
  const $=id=>document.getElementById(id);
  const topics=['Lei de Execução Penal','Direito Penal','Processo Penal','Direito Constitucional','Direito Administrativo','Direitos Humanos','Cadeia de Custódia','Medicina Legal'];
  const historyKey='mcpQuestionErrorsV1';
  let mode='quiz',target=1,done=0,observer=null;

  function modal(){return $('quizModal')}
  function open(){if(modal())modal().style.display='flex'}
  function title(text){const h=modal()?.querySelector('h2');if(h)h.textContent=text}
  function status(text){if($('qStatus'))$('qStatus').textContent=text||''}
  function box(html){if($('qBox'))$('qBox').innerHTML=html||''}
  function errors(){try{return JSON.parse(localStorage.getItem(historyKey)||'[]')}catch{return[]}}
  function saveError(item){const list=errors();list.unshift(item);localStorage.setItem(historyKey,JSON.stringify(list.slice(0,60)))}
  function todayTopic(){const d=new Date();return topics[Math.floor(d.getTime()/86400000)%topics.length]}

  function reset(){mode='quiz';target=1;done=0;title('Banco de Questões IA MCP');status('');box('')}
  function generate(){status(mode==='sim'?`Gerando questão ${done+1} de ${target}...`:'Gerando questão com IA e consultando fontes oficiais...');$('qGerar')?.click()}

  function chooseSimulation(){
    mode='sim';done=0;open();title('Simulado IA MCP');status('Escolha a quantidade de questões.');
    box('<div class="mcp-sim-choices"><button data-n="10">10 questões</button><button data-n="20">20 questões</button><button data-n="50">50 questões</button></div>');
    $('qBox')?.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{target=Number(b.dataset.n);box('');generate()});
  }

  function daily(){
    reset();mode='daily';open();title('Questão do Dia MCP');
    if($('qAssunto'))$('qAssunto').value=todayTopic();
    status('Tema diário: '+todayTopic());setTimeout(generate,80);
  }

  function review(){
    reset();mode='review';open();title('Caderno de Erros MCP');status('');
    const list=errors();
    if(!list.length){box('<div class="mcp-empty-errors"><strong>Nenhum erro registrado ainda.</strong><p>Resolva questões ou simulados. As respostas incorretas aparecerão automaticamente aqui.</p></div>');return}
    box('<div class="mcp-error-list">'+list.map((x,i)=>`<article><b>Erro ${i+1} • ${x.date}</b><h3>${escapeHtml(x.question)}</h3><p><strong>Gabarito:</strong> ${escapeHtml(x.answer)}</p><p>${escapeHtml(x.comment)}</p></article>`).join('')+'</div>');
  }

  function escapeHtml(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

  document.addEventListener('click',e=>{
    const action=e.target.closest?.('.mcp-action');if(!action)return;
    const act=action.dataset.act;if(!['quiz','daily','sim','review'].includes(act))return;
    e.preventDefault();e.stopImmediatePropagation();
    if(act==='daily')daily();else if(act==='sim')chooseSimulation();else if(act==='review')review();else{reset();open()}
  },true);

  function watchAnswers(){
    const qb=$('qBox');if(!qb||observer)return;
    observer=new MutationObserver(()=>{
      const feedback=$('qFeedback');if(!feedback||feedback.dataset.mcpHandled||!feedback.textContent.trim())return;
      feedback.dataset.mcpHandled='1';
      const wrong=feedback.textContent.includes('Incorreto');
      if(wrong)saveError({date:new Date().toLocaleDateString('pt-BR'),question:qb.querySelector('h3')?.textContent||'Questão',answer:(feedback.textContent.match(/Gabarito:\s*([A-E])/i)||[])[1]||'Confira o comentário',comment:feedback.querySelector('p')?.textContent||feedback.textContent});
      if(mode==='sim'){
        done++;
        const next=document.createElement('button');next.className='mcp-next-question';
        if(done<target){next.textContent=`Próxima questão • ${done}/${target}`;next.onclick=()=>{box('');generate()}}
        else{next.textContent=`Finalizar simulado • ${done}/${target}`;next.onclick=()=>{status(`Simulado concluído: ${done} questões. Os erros foram enviados ao Caderno de Erros.`);next.remove()}}
        feedback.appendChild(next);
      }
    });observer.observe(qb,{childList:true,subtree:true});
  }

  const style=document.createElement('style');style.textContent=`
    .mcp-sim-choices{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.mcp-sim-choices button,.mcp-next-question{border:0;border-radius:7px;background:#062a5d;color:#fff;padding:15px;font-weight:900;cursor:pointer}.mcp-next-question{display:block;width:100%;margin-top:14px;background:#efbd26;color:#062a5d}.mcp-empty-errors{padding:22px;background:#f4f6f9;border-left:4px solid #efbd26}.mcp-error-list{display:grid;gap:12px}.mcp-error-list article{padding:17px;border:1px solid #dce2e9;border-left:4px solid #c33;background:#fff}.mcp-error-list article b{color:#9a1f1f;font-size:11px}.mcp-error-list h3{font-size:16px}.mcp-error-list p{font-size:13px;line-height:1.5}@media(max-width:600px){.mcp-sim-choices{grid-template-columns:1fr}}
  `;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watchAnswers);else watchAnswers();
})();
