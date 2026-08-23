(()=>{
  const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const aliases=[
    {keys:['portugues','lingua portuguesa'],tec:'lingua-portuguesa-portugues',qc:'letras-portugues'},
    {keys:['direito administrativo'],tec:'direito-administrativo-doutrina-e-leis-federais',qc:'direito-direito-administrativo'},
    {keys:['direito constitucional'],tec:'direito-constitucional-cf1988-e-doutrina',qc:'direito-direito-constitucional'},
    {keys:['direito penal'],tec:'direito-penal',qc:'direito-direito-penal'},
    {keys:['direito processual penal','processo penal'],tec:'direito-processual-penal',qc:'direito-direito-processual-penal'},
    {keys:['informatica','nocoes de informatica'],tec:'informatica',qc:'tecnologia-da-informacao-nocoes-de-informatica'},
    {keys:['raciocinio logico','logica'],tec:'raciocinio-logico',qc:'matematica-raciocinio-logico'},
    {keys:['direitos humanos'],tec:'direitos-humanos',qc:'direito-direitos-humanos'},
    {keys:['matematica'],tec:'matematica',qc:'matematica-matematica'},
    {keys:['medicina legal'],tec:'criminalistica-e-medicina-legal',qc:'criminalistica-medicina-legal'},
    {keys:['criminalistica'],tec:'criminalistica-e-medicina-legal',qc:'criminalistica-criminalistica'}
  ];
  const match=v=>{const n=norm(v);return aliases.find(x=>x.keys.some(k=>n===k||n.includes(k)))||null};

  function install(){
    const hub=document.getElementById('mcpQuestionHub');
    const disc=document.getElementById('mcpQDisc');
    if(!hub||!disc)return false;

    if(!document.getElementById('mcpDiscList')){
      const dl=document.createElement('datalist'); dl.id='mcpDiscList';
      ['Português','Direito Administrativo','Direito Constitucional','Direito Penal','Direito Processual Penal','Informática','Raciocínio Lógico','Direitos Humanos','Matemática','Medicina Legal','Criminalística'].forEach(v=>{const o=document.createElement('option');o.value=v;dl.appendChild(o)});
      document.body.appendChild(dl); disc.setAttribute('list','mcpDiscList'); disc.placeholder='Matéria/Disciplina: ex. Direito Penal';
    }

    const quizModal=document.getElementById('quizModal');
    if(quizModal&&!document.getElementById('qDisciplina')){
      const assunto=document.getElementById('qAssunto');
      if(assunto){const inp=document.createElement('input');inp.id='qDisciplina';inp.placeholder='Matéria/Disciplina: ex. Direito Penal';inp.style.padding='12px';inp.setAttribute('list','mcpDiscList');assunto.parentNode.insertBefore(inp,assunto)}
    }

    hub.querySelectorAll('.mcp-platform').forEach(btn=>{
      btn.onclick=async()=>{
        const platform=btn.dataset.platform;
        const area=document.getElementById('mcpQArea')?.value||'geral';
        const materia=document.getElementById('mcpQDisc')?.value.trim()||'';
        const assunto=document.getElementById('mcpQAssunto')?.value.trim()||'';
        const banca=document.getElementById('mcpQBanca')?.value.trim()||'';
        const ano=document.getElementById('mcpQAno')?.value.trim()||'';
        const cargo=document.getElementById('mcpQCargo')?.value.trim()||'';
        const item=match(materia);
        const resumo=[materia&&`Matéria: ${materia}`,assunto&&`Assunto: ${assunto}`,banca&&`Banca: ${banca}`,ano&&`Ano: ${ano}`,cargo&&`Cargo/órgão: ${cargo}`].filter(Boolean).join(' • ');

        if(platform==='mcp'){
          hub.style.display='none';document.body.style.overflow='';
          const areaSel=document.getElementById('qArea');if(areaSel)areaSel.value=area;
          const modal=document.getElementById('quizModal');if(modal)modal.style.display='flex';else document.getElementById('quizFab')?.click();
          setTimeout(()=>{
            const d=document.getElementById('qDisciplina'),a=document.getElementById('qAssunto'),b=document.getElementById('qBanca');
            if(d)d.value=materia;if(a)a.value=[assunto,cargo,ano].filter(Boolean).join(' | ');if(b)b.value=banca;
          },80);
          return;
        }

        let url='';
        if(platform==='tec') url=item?.tec?`https://www.tecconcursos.com.br/materias/${item.tec}`:'https://www.tecconcursos.com.br/materias/';
        if(platform==='qconcursos') url=item?.qc?`https://www.qconcursos.com/questoes-de-concursos/disciplinas/${item.qc}/questoes`:'https://www.qconcursos.com/questoes-de-concursos/questoes';
        if(platform==='estrategia') url='https://concursos.estrategia.com/questoes/buscar';
        if(resumo){try{await navigator.clipboard.writeText(resumo)}catch{}}
        const note=document.getElementById('mcpQNote');
        if(note){
          if(item&&(platform==='tec'||platform==='qconcursos')) note.textContent=`Matéria reconhecida: ${materia}. Abrindo diretamente a página dessa disciplina. Os demais filtros foram copiados para facilitar o refinamento.`;
          else if(platform==='estrategia') note.textContent=`O Estratégia não expõe um link público estável por texto para pré-aplicar todos os filtros. Os filtros foram copiados; a busca oficial será aberta para você selecionar a matéria.`;
          else note.textContent=`Não reconheci uma página direta para “${materia||'essa matéria'}”. Abrindo a busca oficial e copiando os filtros.`;
        }
        if(url)window.open(url,'_blank','noopener,noreferrer');
      };
    });

    if(!window.__mcpDisciplineFetchPatched){
      window.__mcpDisciplineFetchPatched=true;
      const nativeFetch=window.fetch.bind(window);
      window.fetch=(input,init)=>{
        try{
          const u=typeof input==='string'?input:input?.url;
          if(u&&u.includes('/api/questoes')&&init?.body){
            const data=JSON.parse(init.body);const d=document.getElementById('qDisciplina')?.value.trim();
            if(d)data.assunto=[`Disciplina: ${d}`,data.assunto].filter(Boolean).join(' | ');
            init={...init,body:JSON.stringify(data)};
          }
        }catch{}
        return nativeFetch(input,init);
      };
    }
    return true;
  }
  if(!install()){
    let tries=0;const t=setInterval(()=>{tries++;if(install()||tries>40)clearInterval(t)},250);
  }
})();

(()=>{
  function addReadingCards(){
    if(document.getElementById('mcpReadingTips'))return true;
    const hub=document.getElementById('mcpCareerHub');
    if(!hub)return false;
    const wrap=hub.querySelector('.mcp-wrap');
    const final=hub.querySelector('.mcp-final');
    if(!wrap||!final)return false;
    const style=document.createElement('style');
    style.textContent=`#mcpReadingTips{margin:0 0 38px}.mcp-reading-head{margin-bottom:18px}.mcp-reading-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.mcp-reading-card{position:relative;overflow:hidden;background:#fff;border:1px solid #dce2e9;border-top:4px solid #efbd26;border-radius:12px;padding:26px;box-shadow:0 12px 30px #08203d0d;min-height:250px;display:flex;flex-direction:column}.mcp-reading-card:after{content:'MCP';position:absolute;right:-14px;top:14px;font:900 62px Georgia,serif;color:#062a5d08}.mcp-reading-icon{width:48px;height:48px;border-radius:9px;background:#062a5d;color:#efbd26;display:grid;place-items:center;font-size:24px;margin-bottom:18px}.mcp-reading-card small{color:#9a7407;font-weight:900;letter-spacing:1.5px;text-transform:uppercase}.mcp-reading-card h3{font:400 27px/1.15 Georgia,serif;margin:9px 0}.mcp-reading-card p{color:#697585;line-height:1.6;font-size:14px;margin:0 0 18px}.mcp-reading-card a{margin-top:auto;display:inline-flex;align-items:center;justify-content:space-between;background:#062a5d;color:#fff;text-decoration:none;font-weight:900;padding:14px 16px;border-radius:7px}.mcp-reading-card a:hover{background:#0b315f}.mcp-reading-card.cronica{background:linear-gradient(145deg,#fff,#fffaf0)}@media(max-width:700px){.mcp-reading-grid{grid-template-columns:1fr}}`;
    document.head.appendChild(style);
    const section=document.createElement('section');
    section.id='mcpReadingTips';
    section.innerHTML=`<div class="mcp-reading-head"><div class="mcp-kicker">Leitura estratégica</div><h2 class="mcp-title" style="font-size:34px">Dicas para estudar melhor além da apostila.</h2><p class="mcp-sub" style="margin-bottom:0">Curadorias rápidas para aprofundar Medicina Legal e fortalecer interpretação de texto.</p></div><div class="mcp-reading-grid"><article class="mcp-reading-card"><div class="mcp-reading-icon">⚕️</div><small>Medicina Legal</small><h3>Dicas de livros para concursos e perícia</h3><p>Genival Veloso, Fundamentos, Hércules e outras referências organizadas por nível, objetivo e melhor forma de usar cada obra.</p><a href="/dicas-livros-medicina-legal.html"><span>Ver indicações</span><span>→</span></a></article><article class="mcp-reading-card cronica"><div class="mcp-reading-icon">📖</div><small>Português • Interpretação</small><h3>Crônicas para melhorar interpretação de texto</h3><p>Rubem Braga, Verissimo, Clarice e Fernando Sabino com um método de 15 minutos para treinar inferência, ironia e ideia central.</p><a href="/cronicas-interpretacao-texto.html"><span>Começar leitura</span><span>→</span></a></article></div>`;
    final.insertAdjacentElement('beforebegin',section);
    return true;
  }
  if(!addReadingCards()){let n=0,t=setInterval(()=>{n++;if(addReadingCards()||n>40)clearInterval(t)},250)}
})();
