(()=>{
  if(document.getElementById('mcpRedacaoHighlight')) return;
  const isGcm=/reta-final-gcm-paracatu\.html/i.test(location.pathname);
  const style=document.createElement('style');
  style.textContent=`
    #mcpRedacaoHighlight{padding:34px 0 42px;background:${isGcm?'transparent':'#f6f8fb'};color:#08203d}
    #mcpRedacaoHighlight .mcp-red-wrap{width:min(1120px,92%);margin:auto}
    .mcp-red-card{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;border:1px solid ${isGcm?'#31536d':'#dce2e9'};border-top:4px solid #efbd26;border-radius:18px;padding:26px;background:${isGcm?'linear-gradient(135deg,#102e47,#092033)':'linear-gradient(135deg,#ffffff,#f8fbff)'};box-shadow:0 16px 38px #08203d14}
    .mcp-red-kicker{font-size:11px;letter-spacing:1.7px;text-transform:uppercase;font-weight:900;color:#b38708;margin-bottom:8px}
    .mcp-red-card h2{margin:0 0 9px;font:700 30px/1.1 Georgia,serif;color:${isGcm?'#fff':'#08203d'}}
    .mcp-red-card p{margin:0;color:${isGcm?'#c9d5df':'#687585'};line-height:1.6;max-width:760px}
    .mcp-red-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}.mcp-red-tags span{font-size:10px;font-weight:900;padding:7px 9px;border-radius:999px;background:${isGcm?'#ffffff0c':'#eef3f8'};border:1px solid ${isGcm?'#446783':'#d5dee7'};color:${isGcm?'#e4edf5':'#31506e'}}
    .mcp-red-btn{display:inline-flex;align-items:center;justify-content:center;min-width:190px;padding:14px 18px;border-radius:9px;background:#efbd26;color:#08203d;text-decoration:none;font-weight:900;white-space:nowrap}
    .mcp-red-btn:hover{filter:brightness(1.05);transform:translateY(-1px)}
    .quicknav .mcp-red-nav{background:#efbd26!important;color:#08203d!important;border-color:#efbd26!important}
    .quicknav .mcp-red-nav:hover{filter:brightness(1.05);color:#08203d!important}
    @media(max-width:760px){.mcp-red-card{grid-template-columns:1fr}.mcp-red-btn{width:100%}}
  `;
  document.head.appendChild(style);

  if(isGcm){
    const quicknav=document.querySelector('.quicknav');
    if(quicknav&&!document.getElementById('mcpRedacaoNav')){
      const navLink=document.createElement('a');
      navLink.id='mcpRedacaoNav';
      navLink.className='mcp-red-nav';
      navLink.href='/treino-discursiva-gcm-paracatu.html';
      navLink.textContent='✍️ Redação';
      const back=quicknav.querySelector('a[href="/"]');
      if(back) quicknav.insertBefore(navLink,back); else quicknav.appendChild(navLink);
    }
  }

  const section=document.createElement('section');section.id='mcpRedacaoHighlight';
  section.innerHTML=`<div class="mcp-red-wrap"><article class="mcp-red-card"><div><div class="mcp-red-kicker">✍️ Treino de redação • MCP</div><h2>${isGcm?'Treino de Discursiva — GCM Paracatu':'Treine redação direto no site'}</h2><p>${isGcm?'Pratique temas ligados à segurança urbana, cidadania e atuação municipal com cronômetro, rascunho, folha definitiva, contador de linhas e autocorreção.':'Abra o ambiente de treino de redação da MCP e pratique com cronômetro, rascunho, folha definitiva, contador de linhas, checklist e autocorreção.'}</p><div class="mcp-red-tags"><span>20–30 linhas</span><span>Cronômetro</span><span>Rascunho</span><span>Folha definitiva</span><span>Autocorreção</span><span>Salvamento local</span></div></div><a class="mcp-red-btn" href="/treino-discursiva-gcm-paracatu.html">Começar treino →</a></article></div>`;
  if(isGcm){
    const ibgp=document.getElementById('mcpIbpgCards'),law=document.getElementById('lei13022'),materials=document.getElementById('materiais');
    if(ibgp) ibgp.insertAdjacentElement('afterend',section); else if(law) law.insertAdjacentElement('beforebegin',section); else if(materials) materials.insertAdjacentElement('afterend',section); else document.querySelector('main')?.prepend(section);
  }else{
    const career=document.getElementById('mcpCareerHub'),footer=document.querySelector('.footer, footer');
    if(career) career.insertAdjacentElement('afterend',section); else if(footer) footer.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
  }
})();
