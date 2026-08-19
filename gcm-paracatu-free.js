(()=>{
  if(document.getElementById('mcpGcmParacatuFree')) return;
  const css=document.createElement('style');
  css.textContent=`
    #mcpGcmParacatuFree{padding:46px 0;background:linear-gradient(180deg,#07152d,#0a1b38);color:#fff}
    .mcp-paracatu-wrap{width:min(1080px,calc(100% - 32px));margin:auto}
    .mcp-paracatu-card{display:grid;grid-template-columns:1.1fr .9fr;gap:26px;align-items:center;border:1px solid rgba(239,189,38,.38);border-radius:20px;background:linear-gradient(145deg,rgba(8,30,61,.98),rgba(10,49,94,.9));box-shadow:0 18px 45px rgba(0,0,0,.28);padding:34px;overflow:hidden;position:relative}
    .mcp-paracatu-card:before{content:'';position:absolute;inset:auto -70px -90px auto;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(239,189,38,.18),transparent 68%)}
    .mcp-paracatu-kicker{display:inline-flex;align-items:center;gap:8px;color:#efbd26;font-size:11px;font-weight:900;letter-spacing:1.7px;text-transform:uppercase;margin-bottom:10px}
    .mcp-paracatu-kicker:before{content:'●';font-size:8px}
    .mcp-paracatu-card h2{margin:0 0 12px;font:700 38px/1.04 Georgia,serif;color:#fff}.mcp-paracatu-card h2 span{color:#efbd26}
    .mcp-paracatu-card p{margin:0;color:#c6d1df;font-size:15px;line-height:1.65;max-width:620px}
    .mcp-paracatu-tags{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}.mcp-paracatu-tags span{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);padding:8px 11px;border-radius:999px;font-size:11px;font-weight:800;color:#edf3fb}
    .mcp-paracatu-cta{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;background:#efbd26;color:#071426;font-weight:900;padding:12px 18px;border-radius:10px;box-shadow:0 8px 20px rgba(239,189,38,.18)}
    .mcp-paracatu-side{display:flex;justify-content:center}.mcp-paracatu-preview{width:min(390px,100%);border-radius:18px;background:#f7f9fc;color:#0b2442;padding:22px;border:1px solid rgba(255,255,255,.22);box-shadow:0 14px 34px rgba(0,0,0,.25)}
    .mcp-paracatu-preview .free{display:inline-block;background:#1e9c53;color:#fff;padding:6px 10px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
    .mcp-paracatu-preview h3{margin:0 0 12px;font-size:21px;color:#0b2442}.mcp-paracatu-preview ul{margin:0;padding-left:19px;color:#4c5b6d;line-height:1.65;font-size:13px}
    .mcp-paracatu-preview li{margin:4px 0}.mcp-paracatu-note{margin-top:13px;padding-top:12px;border-top:1px solid #dde5ee;color:#6d7987;font-size:11px}
    @media(max-width:800px){.mcp-paracatu-card{grid-template-columns:1fr;padding:28px}.mcp-paracatu-side{justify-content:flex-start}.mcp-paracatu-card h2{font-size:32px}}
    @media(max-width:520px){#mcpGcmParacatuFree{padding:34px 0}.mcp-paracatu-wrap{width:min(100% - 20px,1080px)}.mcp-paracatu-card{padding:22px 18px;border-radius:15px}.mcp-paracatu-card h2{font-size:28px}.mcp-paracatu-card p{font-size:14px}.mcp-paracatu-preview{padding:17px}}
  `;
  document.head.appendChild(css);

  const section=document.createElement('section');
  section.id='mcpGcmParacatuFree';
  section.innerHTML=`<div class="mcp-paracatu-wrap"><div class="mcp-paracatu-card"><div><div class="mcp-paracatu-kicker">Conteúdo gratuito MCP</div><h2>Mapas Mentais <span>GCM Paracatu</span></h2><p>Acesse gratuitamente uma seleção de mapas mentais da LC 198/2025, organizada para revisão rápida e estudo direcionado para a Guarda Civil Municipal de Paracatu/MG.</p><div class="mcp-paracatu-tags"><span>LC 198/2025</span><span>Revisão visual</span><span>Carreira GCM</span><span>Acesso gratuito</span></div><a class="mcp-paracatu-cta" href="/gcm-paracatu-mapas.html">Acessar mapas gratuitamente →</a></div><div class="mcp-paracatu-side"><div class="mcp-paracatu-preview"><div class="free">Grátis</div><h3>O que você encontra</h3><ul><li>Avaliação para progressão</li><li>Capacitação continuada</li><li>Jornada e escalas</li><li>Vencimentos e vantagens</li><li>Trabalho extraordinário</li><li>Adicional noturno e periculosidade</li><li>Cargos em comissão</li></ul><div class="mcp-paracatu-note">Material de apoio para estudo e revisão. Consulte sempre o texto legal atualizado.</div></div></div></div></div>`;

  const crimes=document.getElementById('mcpCrimesPessoaGamma');
  const susp=document.getElementById('mcpSuspStudy');
  const footer=document.querySelector('.footer, footer');
  if(crimes) crimes.insertAdjacentElement('beforebegin',section); else if(susp) susp.insertAdjacentElement('afterend',section); else if(footer) footer.insertAdjacentElement('beforebegin',section); else document.body.appendChild(section);
})();
