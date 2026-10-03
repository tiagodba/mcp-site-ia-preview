// Keep essential navigation visible; place secondary destinations in the mobile menu.
(()=>{
  const header=document.querySelector('.header'),nav=header?.querySelector('.nav'),mobile=header?.querySelector('.mobile'),menu=header?.querySelector('.menu');
  if(!nav||!mobile||!menu)return;
  const primary=[['#materiais','Apostilas'],['/gcm-guarulhos.html','GCM Guarulhos'],['/questoes.html','Questões'],['/legislacao-jurisprudencia.html','Legislação'],['#editais','Editais'],['/plano-leitura-medicina-legal-genival.html','Cronograma de leitura'],['/resumos-direito-penal.html','Resumos de Penal']];
  const secondary=[['#produzidos','Medicina Legal e outros materiais'],['#mcpGcmParacatuSale','Kit Aprovação GCM Paracatu'],['/questoes-gcm-2026.html','Questões GCM 2026'],['https://www.instagram.com/materiaiscarreiraspoliciais/','Instagram MCP'],['https://wa.me/5561995699279','Atendimento pelo WhatsApp']];
  function links(root,items){root.replaceChildren(...items.map(([href,label])=>{const a=document.createElement('a');a.href=href;a.textContent=label;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer'}return a}))}
  links(nav,primary);links(mobile,[...primary,...secondary]);nav.setAttribute('aria-label','Navegação principal');mobile.id='mcpMobileNav';menu.setAttribute('aria-controls',mobile.id);
  const close=()=>{mobile.classList.remove('show');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')};
  menu.onclick=()=>{const open=mobile.classList.toggle('show');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')};
  mobile.addEventListener('click',e=>{if(e.target.closest('a'))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.classList.contains('show')){close();menu.focus()}});
})();
