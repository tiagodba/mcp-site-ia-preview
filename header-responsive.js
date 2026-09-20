(()=>{
  const header=document.querySelector('.header');
  const nav=header?.querySelector('.nav');
  const mobile=header?.querySelector('.mobile');
  const social=header?.querySelector('.social');
  if(!header||!nav)return;

  const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
  const isLegacy=a=>{
    const t=norm(a.textContent);
    const h=a.getAttribute('href')||'';
    return /Reta Final GCM Paracatu/i.test(t) ||
           /Legisla[cç][aã]o PPRN/i.test(t) ||
           /reta-final-gcm-paracatu/i.test(h) ||
           /legislacao-pprn-2026/i.test(h);
  };
  [nav,mobile,social].filter(Boolean).forEach(root=>{
    [...root.querySelectorAll('a')].forEach(a=>{if(isLegacy(a))a.remove()});
  });

  // Corrige os destinos principais sem alterar o visual original.
  const questions=[...nav.querySelectorAll(':scope > a')].find(a=>/^Questões$/i.test(norm(a.textContent)));
  if(questions){questions.href='/questoes.html';questions.title='Central de Questões MCP'}
  const law=[...nav.querySelectorAll(':scope > a')].find(a=>/^Legislação$/i.test(norm(a.textContent)));
  if(law){law.href='/legislacao-jurisprudencia.html';law.title='Legislação e jurisprudência MCP'}

  // Restaura o atalho antigo de Resumos de Direito Penal.
  [...nav.querySelectorAll(':scope > a')].forEach(a=>{
    if(/Resumos? (de )?Direito Penal/i.test(norm(a.textContent)) || /resumos-direito-penal\.html/i.test(a.getAttribute('href')||'')) a.remove();
  });
  const penal=document.createElement('a');
  penal.href='/resumos-direito-penal.html';
  penal.textContent='Resumos Direito Penal';
  penal.title='Resumos de Direito Penal MCP';

  // Garante uma única aba GCM Guarulhos.
  [...nav.querySelectorAll(':scope > a')].forEach(a=>{
    if(/GCM Guarulhos/i.test(norm(a.textContent)) || /gcm-guarulhos\.html/i.test(a.getAttribute('href')||'')) a.remove();
  });
  const guarulhos=document.createElement('a');
  guarulhos.href='/gcm-guarulhos.html';
  guarulhos.textContent='GCM Guarulhos';
  guarulhos.title='Central de materiais GCM Guarulhos';
  guarulhos.style.color='#efbd26';
  guarulhos.style.fontWeight='900';

  const editais=[...nav.querySelectorAll(':scope > a')].find(a=>/^Editais$/i.test(norm(a.textContent)));
  if(law){
    law.insertAdjacentElement('afterend',penal);
    penal.insertAdjacentElement('afterend',guarulhos);
  }else if(editais){
    editais.insertAdjacentElement('afterend',penal);
    penal.insertAdjacentElement('afterend',guarulhos);
  }else{
    nav.appendChild(penal);
    nav.appendChild(guarulhos);
  }

  // Mantém o menu móvel sincronizado com o menu principal.
  if(mobile){
    mobile.innerHTML='';
    [...nav.querySelectorAll(':scope > a')].forEach(a=>mobile.appendChild(a.cloneNode(true)));
    if(social){
      [...social.querySelectorAll('a')].forEach(a=>{
        if(!/wa\.me/i.test(a.getAttribute('href')||'')) mobile.appendChild(a.cloneNode(true));
      });
    }
  }

  // Ajuste leve para o cabeçalho caber em desktop sem esconder Guarulhos.
  const style=document.createElement('style');
  style.id='mcp-header-guarulhos-fix';
  style.textContent=`
    @media (min-width:1551px){
      .header .nav{gap:12px!important}
      .header .nav>a{font-size:12px!important}
      .header .nav>a[href="/resumos-direito-penal.html"]{display:inline-flex!important}
      .header .nav>a[href="/gcm-guarulhos.html"]{display:inline-flex!important;color:#efbd26!important;font-weight:900!important}
    }
    @media (max-width:1550px){
      .header .nav{display:none!important}
      .header .menu{display:block!important;margin-left:auto}
    }
  `;
  document.getElementById('mcp-header-guarulhos-fix')?.remove();
  document.head.appendChild(style);
})();