(()=>{
  const main=document.querySelector('main');
  function organize(){
    if(!main)return;
    const ids=['inicio','materiais','materiais-2026','produzidos','mcpCareerHub','mcpGcmGoiasAnnouncement','mcpSuspStudy','mcpCrimesPessoaGamma','editais','vantagens'];
    let previous=null;
    for(const id of ids){const section=document.getElementById(id);if(!section)continue;if(previous&&previous.nextElementSibling!==section)previous.after(section);previous=section}
    document.querySelectorAll('img').forEach(img=>{if(!img.closest('.header,.hero'))img.loading='lazy';img.decoding='async'});
    document.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noopener noreferrer');
    const whatsapp=document.querySelector('a.whatsapp');if(whatsapp){whatsapp.textContent='WhatsApp MCP';whatsapp.setAttribute('aria-label','Conversar com a MCP pelo WhatsApp')}
    const lead=document.querySelector('.mcp-lead-trigger');const cta=document.querySelector('.cta');if(lead&&cta&&!cta.contains(lead)){cta.append(lead);lead.classList.add('mcp-lead-inline')}
    const footer=document.querySelector('.footer-top>div');if(footer&&!footer.querySelector('.footer-links')){const links=document.createElement('div');links.className='footer-links';links.innerHTML='<a href="https://www.instagram.com/materiaiscarreiraspoliciais/" target="_blank" rel="noopener noreferrer">Siga @materiaiscarreiraspoliciais</a><a href="https://open.spotify.com/show/0346uOO4gZCKFpd7dQoQdL" target="_blank" rel="noopener noreferrer">Podcast MCP</a>';footer.append(links)}
  }
  organize();window.addEventListener('load',organize,{once:true});
  // Legacy add-ons insert sections asynchronously. Watch only structural additions.
  let scheduled=false;
  const observer=new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.tagName==='SECTION'||n.tagName==='SCRIPT')))&&!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;organize()})}});
  observer.observe(document.body,{childList:true,subtree:true});
})();
