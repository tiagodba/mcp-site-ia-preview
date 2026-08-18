(()=>{
  if(document.getElementById('mcpSuspStudy')) return;
  const style=document.createElement('style');
  style.textContent=`
    #mcpSuspStudy{padding:64px 0;background:#fff3cd;color:#2b2100}
    .susp-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
    .susp-card{display:grid;grid-template-columns:1.15fr .85fr;gap:28px;align-items:center;background:linear-gradient(135deg,#ffcc00,#ff7a00);border:3px solid #2a1600;border-radius:18px;padding:38px;box-shadow:0 18px 45px rgba(91,54,0,.22)}
    .susp-alert{display:inline-flex;background:#2a1600;color:#fff;padding:8px 12px;border-radius:999px;font-size:11px;letter-spacing:1.6px;font-weight:900;text-transform:uppercase;margin-bottom:15px}
    .susp-card h2{font:900 48px/1 Arial,Helvetica,sans-serif;margin:0 0 13px;color:#1d1200;letter-spacing:-1px}.susp-card h2 span{display:block;font-size:24px;margin-top:9px;letter-spacing:0}
    .susp-card p{font-size:16px;line-height:1.6;margin:0;color:#3d2800;max-width:720px;font-weight:600}
    .susp-points{display:flex;flex-wrap:wrap;gap:8px;margin-top:19px}.susp-points span{background:rgba(255,255,255,.75);border:1px solid rgba(42,22,0,.22);padding:8px 10px;border-radius:7px;font-size:11px;font-weight:900}
    .susp-side{background:#071a35;color:#fff;border-radius:14px;padding:28px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,.18)}.susp-side strong{display:block;color:#ffd43b;font-size:24px;line-height:1.12;margin:9px 0}.susp-side small{color:#c4d0df;line-height:1.45}.susp-open{margin-top:20px;border:0;border-radius:8px;background:#fff;color:#081a34;padding:14px 20px;font-weight:900;cursor:pointer;width:100%}.susp-open:hover{transform:translateY(-1px)}
    #suspModal{position:fixed;inset:0;z-index:220;background:rgba(2,9,20,.88);display:none;align-items:center;justify-content:center;padding:18px}.susp-modal-shell{width:min(980px,100%);max-height:92vh;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 28px 90px rgba(0,0,0,.5)}.susp-modal-head{background:#061b3b;color:#fff;padding:19px 24px;display:flex;justify-content:space-between;align-items:center}.susp-modal-head h2{margin:0;font:400 28px Georgia,serif}.susp-close{width:40px;height:40px;border-radius:50%;border:1px solid #55708f;background:transparent;color:#fff;font-size:22px;cursor:pointer}.susp-body{padding:26px;max-height:78vh;overflow:auto;color:#17324f;line-height:1.65}.susp-body h3{font:700 24px Georgia,serif;color:#062a5d;margin:25px 0 10px}.susp-body h3:first-child{margin-top:0}.susp-body h4{color:#8b5d00;margin:19px 0 8px}.susp-note,.susp-trap{padding:15px 17px;border-radius:8px;margin:15px 0}.susp-note{background:#eef5ff;border-left:4px solid #0b5cad}.susp-trap{background:#fff5cf;border-left:4px solid #ff9f00}.susp-list{padding-left:21px}.susp-list li{margin:7px 0}.susp-source{margin-top:24px;padding-top:18px;border-top:1px solid #dde4ec}.susp-source a{display:inline-block;background:#efbd26;color:#062a5d;text-decoration:none;font-weight:900;padding:12px 15px;border-radius:7px;margin:6px 8px 0 0}
    @media(max-width:820px){.susp-card{grid-template-columns:1fr}.susp-card h2{font-size:39px}.susp-side{text-align:left}.susp-open{width:auto}}
    @media(max-width:520px){#mcpSuspStudy{padding:40px 0}.susp-wrap{width:min(100% - 24px,1180px)}.susp-card{padding:24px 20px}.susp-card h2{font-size:34px}.susp-card h2 span{font-size:20px}.susp-body{padding:19px}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.id='mcpSuspStudy';
  section.innerHTML=`<div class="susp-wrap"><div class="susp-card"><div><div class="susp-alert">⚠ Tema de alta relevância para GCM</div><h2>LEI DO SUSP<span>Lei nº 13.675/2018</span></h2><p>O Sistema Único de Segurança Pública organiza a atuação integrada dos órgãos de segurança pública e defesa social. Para quem estuda para Guarda Municipal, é um tema especialmente importante porque as guardas integram o SUSP e aparecem diretamente na lógica de cooperação entre União, Estados, Distrito Federal e Municípios.</p><div class="susp-points"><span>PNSPDS</span><span>Integração</span><span>Guardas Municipais</span><span>Princípios e diretrizes</span><span>Objetivos</span></div></div><div class="susp-side"><div style="font-size:42px">📚</div><strong>LEIA NO PRÓPRIO SITE</strong><small>Resumo estratégico voltado para prova, com pontos de atenção e pegadinhas.</small><button class="susp-open" id="openSuspStudy">Ler conteúdo →</button></div></div></div>`;

  const modal=document.createElement('div');
  modal.id='suspModal';
  modal.innerHTML=`<div class="susp-modal-shell"><div class="susp-modal-head"><h2>Lei do SUSP — Estudo direcionado para GCM</h2><button class="susp-close" aria-label="Fechar">×</button></div><div class="susp-body">
    <h3>1. O que é o SUSP?</h3>
    <p>O Sistema Único de Segurança Pública foi instituído pela Lei nº 13.675/2018. A lei também criou a Política Nacional de Segurança Pública e Defesa Social (PNSPDS). A finalidade é preservar a ordem pública e a incolumidade das pessoas e do patrimônio por meio de atuação conjunta, coordenada, sistêmica e integrada entre os órgãos de segurança pública e defesa social.</p>
    <div class="susp-note"><strong>Para memorizar:</strong> a lógica central do SUSP é <b>integração + coordenação + cooperação + compartilhamento</b>.</div>

    <h3>2. Por que isso importa para GCM?</h3>
    <p>As guardas municipais fazem parte da estrutura do SUSP. Por isso, questões de concursos municipais podem explorar a participação dos Municípios, a integração operacional, o compartilhamento de informações, a cooperação federativa e as diretrizes da política nacional de segurança pública.</p>
    <div class="susp-trap"><strong>Pegadinha:</strong> o SUSP não transforma a Guarda Municipal em Polícia Civil ou Polícia Militar. A integração ocorre respeitando as competências legais de cada instituição.</div>

    <h3>3. PNSPDS</h3>
    <p>A Política Nacional de Segurança Pública e Defesa Social orienta a atuação dos entes federativos em segurança pública. Entre os eixos que merecem atenção em prova estão prevenção, atuação integrada, proteção de direitos, produção e compartilhamento de informações e fortalecimento das instituições.</p>

    <h3>4. Princípios e diretrizes — como estudar</h3>
    <ul class="susp-list">
      <li>Respeito aos direitos fundamentais e promoção da cidadania.</li>
      <li>Proteção dos direitos humanos e valorização dos profissionais de segurança pública.</li>
      <li>Eficiência na prevenção e no controle das infrações penais.</li>
      <li>Integração das ações de segurança pública e defesa social.</li>
      <li>Planejamento estratégico, avaliação e produção de conhecimento.</li>
      <li>Participação e cooperação entre União, Estados, Distrito Federal e Municípios.</li>
    </ul>
    <div class="susp-note"><strong>Dica de prova:</strong> bancas costumam trocar palavras como “integração”, “coordenação” e “cooperação” por ideias de subordinação absoluta. Desconfie dessa troca.</div>

    <h3>5. Objetivos que merecem revisão</h3>
    <ul class="susp-list">
      <li>Fomentar a integração entre os órgãos de segurança pública e defesa social.</li>
      <li>Estimular o intercâmbio de informações e conhecimentos.</li>
      <li>Fortalecer ações de prevenção e enfrentamento da violência e criminalidade.</li>
      <li>Promover planejamento, acompanhamento e avaliação das políticas de segurança pública.</li>
      <li>Aprimorar a formação, capacitação e valorização dos profissionais.</li>
    </ul>

    <h3>6. Como funciona a integração</h3>
    <p>O SUSP prevê atuação cooperativa entre os integrantes por meio de operações integradas, compartilhamento de informações, inteligência, capacitação, planejamento e ações conjuntas. A estrutura busca permitir uma atuação harmônica sem eliminar a autonomia e as atribuições legais próprias de cada órgão.</p>

    <h3>7. Guarda Municipal dentro do SUSP</h3>
    <p>Para a preparação de GCM, associe a Lei do SUSP ao art. 144 da Constituição Federal, ao Estatuto Geral das Guardas Municipais (Lei nº 13.022/2014) e às normas locais cobradas no edital. A Lei nº 13.675/2018 é importante para compreender a inserção municipal no sistema de segurança pública e a lógica de atuação integrada.</p>

    <h3>8. Revisão rápida</h3>
    <ul class="susp-list">
      <li><b>Lei:</b> nº 13.675/2018.</li>
      <li><b>Institui:</b> SUSP.</li>
      <li><b>Cria:</b> PNSPDS.</li>
      <li><b>Ideia-chave:</b> atuação conjunta, coordenada, sistêmica e integrada.</li>
      <li><b>Municípios:</b> participam da arquitetura do sistema.</li>
      <li><b>GCM:</b> integra o SUSP e deve ser estudada dentro da lógica de cooperação federativa.</li>
    </ul>
    <div class="susp-trap"><strong>Questão mental:</strong> se a alternativa disser que o SUSP exclui os Municípios ou as Guardas Municipais da integração nacional, a tendência é estar errada.</div>

    <div class="susp-source"><strong>Fontes oficiais para conferência:</strong><br><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm" target="_blank" rel="noopener">Texto da Lei no Planalto ↗</a><a href="https://www.gov.br/mj/pt-br/acesso-a-informacao/acoes-e-programas/susp/susp/" target="_blank" rel="noopener">SUSP no MJSP ↗</a></div>
  </div></div>`;

  const gcm=document.getElementById('mcpGcmGoiasAnnouncement');
  if(gcm) gcm.insertAdjacentElement('afterend',section); else document.body.appendChild(section);
  document.body.appendChild(modal);
  const open=()=>{modal.style.display='flex';document.body.style.overflow='hidden'};
  const close=()=>{modal.style.display='none';document.body.style.overflow=''};
  document.getElementById('openSuspStudy').onclick=open;
  modal.querySelector('.susp-close').onclick=close;
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.style.display==='flex')close()});
})();
