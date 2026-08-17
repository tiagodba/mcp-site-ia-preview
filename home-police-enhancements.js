(()=>{
  if(document.getElementById('mcpCareerHub')) return;
  const $=s=>document.querySelector(s);
  const esc=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const careerMap={civil:'Polícia Civil',penal:'Polícia Penal',cientifica:'Polícia Científica',gcm:'Guarda Municipal',geral:'Todas as carreiras'};

  const style=document.createElement('style');
  style.textContent=`
  .m