(()=>{
  if(window.__mcpGcmFreeEdition) return;
  window.__mcpGcmFreeEdition=true;

  const style=document.createElement('style');
  style.textContent=`
    .mcp-free-banner{margin:22px auto 0;width:min(1120px,92%);background:linear-gradient(135deg,#0f5132,#16734a);border:1px solid #4fd28c;color:#fff;border-radius:16px;padding:18px 20px;display:flex;justify-content:space-between;gap:18px;align-items:center;box-shadow:0 16px 38px #0003}
    .mcp-free-banner strong{display:block;font-size:1.15rem;margin-bottom:4px}.mcp-free-banner span{color:#d9f7e7;line-height:1.5}.mcp-free-banner a{background:#f5bf2f;color:#092039;padding:11px 14px;border-radius:9px;font-weight:900;text-decoration:none;white-space:nowrap}
    .tag.paid,.tag.test{background:#26b36b22!important;border-color:#26b36b66!important;color:#84e0ad!important}
    .price,.checkout .warning{display:none!important}
    .pack{grid-template-columns:1fr!important;border-color:#26b36b77!important;background:linear-gradient(180deg,#0c2d35,#08252e)!important}
    .checkout{display:none!important}
    .mcp-ibgp{padding:8px 0 36px}.mcp-ibgp .wrap{width:min(1120px,92%);margin:auto}.mcp-ibgp-head{margin-bottom:18px}.mcp-ibgp-head span{color:#f5bf2f;font-size:.78rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.mcp-ibgp-head h2{margin:7px 0 6px;font-size:1.9rem}.mcp-ibgp-head p{margin:0;color:#aebccb;line-height:1.55}.mcp-ibgp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.mcp-ibgp-card{border:1px solid #31536d;border-top:4px solid #f5bf2f;border-radius:18px;background:linear-gradient(180deg,#102e47,#092033);padding:22px;box-shadow:0 16px 38px #0002}.mcp-ibgp-card .kicker{font-size:.72rem;color:#f5bf2f;font-weight:900;letter-spacing:.09em;text-transform:uppercase}.mcp-ibgp-card h3{font-size:1.45rem;margin:8px 0 12px}.mcp-ibgp-card p{color:#c9d5df;line-height:1.55}.mcp-ibgp-card ul{margin:16px 0 0;padding-left:18px;color:#d9e3ea;line-height:1.65}.mcp-ibgp-card li::marker{color:#f5bf2f}.mcp-ibgp-bizu{margin-top:16px;padding:12px 13px;border-radius:10px;background:#f5bf2f14;border:1px solid #f5bf2f4d;color:#f8dc86;font-size:.88rem;line-height:1.5}.mcp-ibgp-focus{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}.mcp-ibgp-focus span{font-size:.72rem;padding:6px 8px;border-radius:999px;background:#ffffff0c;border:1px solid #446783;color:#dce7ef}
    @media(max-width:700px){.mcp-free-banner{flex-direction:column;align-items:flex-start}.mcp-free-banner a{width:100%;text-align:center}.mcp-ibgp-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const hero=document.querySelector('.hero');
  if(hero && !document.getElementById('mcpFreeEditionBanner')){
    const banner=document.createElement('div');
    banner.id='mcpFreeEditionBanner';
    banner.className='mcp-free-banner';
    banner.innerHTML=`<div><strong>🎁 Edição Especial MCP — GCM Paracatu 100% GRATUITA</strong><span>Apostila, mapas mentais, Lei 13.022, Lei Orgânica, edital verticalizado, questões e simulados liberados sem checkout.</span></div><a href="#materiais">Acessar materiais grátis →</a>`;
    hero.insertAdjacentElement('afterend',banner);
  }

  document.querySelectorAll('.tag.paid').forEach(el=>{
    el.classList.remove('paid');el.classList.add('free');el.textContent='100% GRÁTIS';
  });
  document.querySelectorAll('.tag.test').forEach(el=>{
    el.classList.remove('test');el.classList.add('free');el.textContent='ACESSO LIVRE';
  });

  const materialSection=document.querySelector('#materiais .title p');
  if(materialSection) materialSection.textContent='Todos os materiais desta Reta Final estão liberados gratuitamente pela MCP.';

  document.querySelectorAll('#materiais .card').forEach(card=>{
    const h3=card.querySelector('h3')?.textContent||'';
    const btn=card.querySelector('.actions .btn');
    if(!btn) return;
    if(h3.includes('Edital Verticalizado')){
      btn.textContent='Acessar gratuitamente →';
      btn.href='/edital-verticalizado-gcm-paracatu.html';
      btn.classList.remove('ghost');btn.classList.add('green');
    }
    if(h3.includes('Simulado LC')){
      btn.textContent='Abrir questões grátis →';
      btn.classList.remove('ghost');btn.classList.add('green');
    }
    if(h3.includes('Lei Orgânica')){
      btn.textContent='Abrir gratuitamente →';
      btn.classList.remove('gold');btn.classList.add('green');
    }
  });

  const pack=document.getElementById('pacote');
  if(pack){
    const title=pack.querySelector('h2');
    if(title) title.textContent='Pacote Completo GCM Paracatu — acesso gratuito';
    const tag=pack.querySelector('.tag');
    if(tag){tag.className='tag free';tag.textContent='100% GRÁTIS';}
    const notice=pack.querySelector('.notice');
    if(notice) notice.textContent='Projeto especial MCP: todo o conteúdo desta Reta Final foi liberado gratuitamente para os candidatos da GCM Paracatu.';
    const list=pack.querySelector('.list');
    if(list){const first=list.querySelector('li');if(first) first.textContent='Edital verticalizado — plano de reta final';}
  }

  document.querySelectorAll('a[href="#pacote"]').forEach(a=>{
    if(/pacote|inclu[ií]do|conte[uú]do/i.test(a.textContent)) a.textContent='Acessar gratuitamente →';
  });

  const navPack=document.querySelector('.quicknav a[href="#pacote"]');
  if(navPack) navPack.textContent='Materiais grátis';

  document.querySelectorAll('.simbtn').forEach(btn=>{
    if(!btn.classList.contains('wait') && !btn.classList.contains('disabled')) btn.textContent='Abrir simulado grátis';
  });

  if(!document.getElementById('mcpIbpgCards')){
    const section=document.createElement('section');
    section.id='mcpIbpgCards';
    section.className='mcp-ibgp';
    section.innerHTML=`<div class="wrap"><div class="mcp-ibgp-head"><span>Perfil da banca • IBGP</span><h2>Como a IBGP costuma cobrar</h2><p>Use estes cards como guia de revisão rápida. O padrão pode variar conforme o edital e o cargo, então a prioridade final deve seguir o conteúdo programático da GCM Paracatu.</p></div><div class="mcp-ibgp-grid"><article class="mcp-ibgp-card"><div class="kicker">Língua Portuguesa</div><h3>Como a IBGP cobra Português</h3><p>A banca costuma combinar interpretação com gramática aplicada ao próprio texto, exigindo atenção ao sentido global e às relações entre as partes.</p><div class="mcp-ibgp-focus"><span>Interpretação</span><span>Inferência</span><span>Coesão</span><span>Semântica</span><span>Gramática contextualizada</span></div><ul><li>compreensão global e ideia central;</li><li>inferências e informações implícitas;</li><li>sentido de palavras e expressões no contexto;</li><li>coesão, conectivos e relações lógico-semânticas;</li><li>pontuação, concordância, regência e crase aplicadas ao texto.</li></ul><div class="mcp-ibgp-bizu"><strong>Bizu MCP:</strong> antes de marcar a alternativa, volte ao trecho citado. Na IBGP, a resposta muitas vezes depende menos de “decorar regra” e mais de aplicar a regra ao contexto.</div></article><article class="mcp-ibgp-card"><div class="kicker">Noções de Informática</div><h3>Como a IBGP cobra Informática</h3><p>O perfil tende a ser objetivo, com situações práticas de uso de computador, internet e ferramentas de escritório.</p><div class="mcp-ibgp-focus"><span>Windows</span><span>Arquivos e pastas</span><span>Internet</span><span>Segurança</span><span>Microsoft 365</span></div><ul><li>Windows: área de trabalho, janelas, menus e configurações;</li><li>criação, cópia, movimentação e exclusão de arquivos e pastas;</li><li>internet, intranet, navegadores, pesquisa e busca;</li><li>segurança da informação: phishing, antivírus, backup e boas práticas;</li><li>Word, Excel, PowerPoint, Outlook e recursos básicos de produtividade.</li></ul><div class="mcp-ibgp-bizu"><strong>Bizu MCP:</strong> faça revisão por questões e pratique os menus/comandos na ferramenta real. Informática costuma premiar quem reconhece a ação correta, não apenas quem decorou conceitos.</div></article></div></div>`;
    const materials=document.getElementById('materiais');
    if(materials) materials.insertAdjacentElement('afterend',section);
  }
})();

(()=>{if(document.querySelector('script[data-mcp-redacao]'))return;const s=document.createElement('script');s.src='/redacao-highlight.js?v=20260823-1';s.defer=true;s.dataset.mcpRedacao='1';document.body.appendChild(s)})();

(()=>{
  function addLc198Card(){
    const grid=document.querySelector('#materiais .grid');
    if(!grid||document.getElementById('mcpLc198ApostilaCard')) return false;
    const card=document.createElement('article');
    card.id='mcpLc198ApostilaCard';
    card.className='card freebox';
    card.innerHTML=`<span class="tag free">100% GRÁTIS</span><h3>Apostila LC nº 198/2025 — Artigo por Artigo</h3><p><strong>90 artigos comentados.</strong> Texto oficial, comentários MCP, foco de prova, pegadinhas e jurisprudência em edição de reta final.</p><div class="actions"><a class="btn green" href="/apostila-lc-198-2025-gcm-paracatu.html">Ler apostila LC 198/2025 →</a></div>`;
    const maps=[...grid.children].find(el=>/Mapas Mentais.*LC/i.test(el.querySelector('h3')?.textContent||''));
    if(maps) grid.insertBefore(card,maps); else grid.appendChild(card);
    return true;
  }
  if(!addLc198Card()){
    const obs=new MutationObserver(()=>{if(addLc198Card())obs.disconnect()});
    obs.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),10000);
  }
})();
