(()=>{
  const startedAt=Date.now();
  const LETTERS=['A','B','C','D','E'];
  const ranges=[
    ['Português',0,9],['RLM',10,14],['Informática',15,19],['Conhecimentos Gerais',20,24],['Conhecimentos Específicos',25,999]
  ];

  function disciplineFor(i){
    const r=ranges.find(([,a,b])=>i>=a&&i<=b);
    return r?r[0]:'Conhecimentos Específicos';
  }

  function elapsed(){
    const total=Math.max(0,Math.floor((Date.now()-startedAt)/1000));
    const h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;
    return h?`${h}h ${m}min`:`${m}min ${String(s).padStart(2,'0')}s`;
  }

  function loadJsPDF(){
    return new Promise((resolve,reject)=>{
      if(window.jspdf?.jsPDF) return resolve(window.jspdf.jsPDF);
      const s=document.createElement('script');
      s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload=()=>resolve(window.jspdf.jsPDF);
      s.onerror=()=>reject(new Error('Falha ao carregar o gerador de PDF.'));
      document.head.appendChild(s);
    });
  }

  function addButton(){
    const actions=document.querySelector('.finalActions');
    if(!actions||document.getElementById('mcpPdfBtn')) return;
    const b=document.createElement('button');
    b.id='mcpPdfBtn';
    b.type='button';
    b.textContent='Baixar correção em PDF';
    b.style.background='#2fbf71';
    b.style.color='#04111d';
    b.onclick=generatePDF;
    actions.prepend(b);
  }

  function progressKey(){
    return `mcp:simulado-progress:${location.pathname}`;
  }

  function setSaveIndicator(text){
    let el=document.getElementById('mcpSaveIndicator');
    if(!el){
      const side=document.querySelector('.side');
      if(!side) return;
      el=document.createElement('div');
      el.id='mcpSaveIndicator';
      el.style.marginTop='14px';
      el.style.padding='10px 11px';
      el.style.border='1px solid #2f6f5b';
      el.style.borderRadius='10px';
      el.style.background='#0a2b2a';
      el.style.color='#9ee6c2';
      el.style.fontSize='.82rem';
      el.style.lineHeight='1.35';
      side.appendChild(el);
    }
    el.textContent=text;
  }

  function saveProgress(){
    try{
      if(typeof Q==='undefined'||typeof state==='undefined'||typeof idx==='undefined') return;
      const payload={
        version:1,
        state:Array.from(state),
        idx:Number(idx)||0,
        updatedAt:Date.now()
      };
      localStorage.setItem(progressKey(),JSON.stringify(payload));
      const answered=payload.state.filter(v=>v!=null).length;
      setSaveIndicator(answered?`✓ Progresso salvo automaticamente • ${answered}/${Q.length} respondidas`:'✓ Salvamento automático ativado neste dispositivo');
    }catch(e){
      console.warn('MCP: não foi possível salvar o progresso do simulado.',e);
    }
  }

  function restoreProgress(){
    try{
      if(typeof Q==='undefined'||typeof state==='undefined'||typeof idx==='undefined') return false;
      const raw=localStorage.getItem(progressKey());
      if(!raw) return false;
      const saved=JSON.parse(raw);
      if(!saved||!Array.isArray(saved.state)||saved.state.length!==Q.length) return false;
      state=saved.state.map(v=>Number.isInteger(v)&&v>=0&&v<5?v:null);
      idx=Number.isInteger(saved.idx)?Math.min(Math.max(saved.idx,0),Q.length-1):0;
      return state.some(v=>v!=null);
    }catch(e){
      console.warn('MCP: não foi possível restaurar o progresso do simulado.',e);
      return false;
    }
  }

  function installProgressPersistence(){
    try{
      if(typeof Q==='undefined'||typeof state==='undefined'||typeof idx==='undefined'||typeof render!=='function') return;
      const restored=restoreProgress();
      const originalRender=render;
      render=function(){
        originalRender();
        saveProgress();
      };
      render();
      if(restored){
        setSaveIndicator(`↻ Progresso restaurado automaticamente • ${state.filter(v=>v!=null).length}/${Q.length} respondidas`);
      }
      window.addEventListener('pagehide',saveProgress);
      document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden') saveProgress();});
    }catch(e){
      console.warn('MCP: persistência do simulado indisponível.',e);
    }
  }

  async function generatePDF(){
    const btn=document.getElementById('mcpPdfBtn');
    try{
      if(typeof Q==='undefined'||typeof state==='undefined') throw new Error('Dados do simulado não encontrados.');
      if(state.some(v=>v==null)){alert('Finalize todas as questões antes de gerar o PDF.');return;}
      if(btn){btn.disabled=true;btn.textContent='Gerando PDF...';}
      const jsPDF=await loadJsPDF();
      const doc=new jsPDF({unit:'mm',format:'a4'});
      const W=210,H=297,M=15,CW=W-M*2;
      let y=18;
      const sim=(document.title.match(/Simulado\s*(\d+)/i)||[])[1]||'';
      const correct=state.reduce((n,v,i)=>n+(v===Q[i][2]?1:0),0);
      const wrong=Q.length-correct;
      const pct=Math.round(correct/Q.length*100);
      const points=correct*2;
      const now=new Date();

      const line=(txt,size=10,bold=false,space=5)=>{
        doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);
        const lines=doc.splitTextToSize(String(txt),CW);
        const need=lines.length*space;
        if(y+need>H-16){doc.addPage();y=18;}
        doc.text(lines,M,y);y+=need;
      };
      const sep=()=>{doc.setDrawColor(180);doc.line(M,y,W-M,y);y+=5;};

      doc.setFillColor(6,24,39);doc.rect(0,0,W,55,'F');
      doc.setTextColor(245,191,47);doc.setFont('helvetica','bold');doc.setFontSize(20);doc.text('MCP • RETA FINAL',M,20);
      doc.setTextColor(255,255,255);doc.setFontSize(16);doc.text(`GCM Paracatu — Simulado ${sim}`,M,31);
      doc.setFontSize(10);doc.text('Relatório personalizado de correção e caderno de erros',M,41);
      doc.setTextColor(25,25,25);y=66;

      line('RESULTADO GERAL',14,true,6);
      line(`Acertos: ${correct}/${Q.length}   |   Erros: ${wrong}   |   Aproveitamento: ${pct}%   |   Pontos: ${points}/80`,10,true,6);
      line(`Tempo desta tentativa: ${elapsed()}   |   Emitido em: ${now.toLocaleString('pt-BR')}`,9,false,5);
      sep();

      line('DESEMPENHO POR DISCIPLINA',13,true,6);
      ranges.forEach(([name,a,b])=>{
        const ids=Q.map((_,i)=>i).filter(i=>i>=a&&i<=b);
        if(!ids.length) return;
        const c=ids.reduce((n,i)=>n+(state[i]===Q[i][2]?1:0),0);
        line(`${name}: ${c}/${ids.length} (${Math.round(c/ids.length*100)}%)`,10,false,5);
      });
      sep();

      line('CORREÇÃO COMPLETA',13,true,7);
      Q.forEach((q,i)=>{
        const ok=state[i]===q[2];
        line(`Questão ${i+1} • ${disciplineFor(i)} • ${ok?'ACERTO':'ERRO'}`,11,true,5);
        line(q[0],9,false,4.3);
        line(`Sua resposta: ${LETTERS[state[i]]}) ${q[1][state[i]]}`,9,false,4.3);
        line(`Gabarito: ${LETTERS[q[2]]}) ${q[1][q[2]]}`,9,true,4.3);
        line(`Comentário MCP: ${q[3]}`,9,false,4.3);
        y+=2;
      });

      doc.addPage();y=18;
      line('CADERNO DE ERROS',15,true,7);
      const errs=Q.map((q,i)=>({q,i})).filter(({q,i})=>state[i]!==q[2]);
      if(!errs.length) line('Nenhum erro nesta tentativa. Excelente desempenho.',11,true,6);
      errs.forEach(({q,i})=>{
        line(`Questão ${i+1} • ${disciplineFor(i)}`,11,true,5);
        line(q[0],9,false,4.3);
        line(`Você marcou ${LETTERS[state[i]]}; correta: ${LETTERS[q[2]]}.`,9,false,4.3);
        line(`Revisão MCP: ${q[3]}`,9,false,4.3);
        y+=2;
      });

      const weak=ranges.map(([name,a,b])=>{
        const ids=Q.map((_,i)=>i).filter(i=>i>=a&&i<=b); if(!ids.length)return null;
        const c=ids.reduce((n,i)=>n+(state[i]===Q[i][2]?1:0),0);
        return {name,p:Math.round(c/ids.length*100)};
      }).filter(Boolean).sort((x,z)=>x.p-z.p);
      sep();line('PRIORIDADE DE REVISÃO',13,true,6);
      weak.slice(0,3).forEach((d,j)=>line(`${j+1}. ${d.name} — ${d.p}% de aproveitamento`,10,j===0,5));
      line('Orientação: revise primeiro os comentários das questões erradas e, em seguida, refaça os itens sem consultar o gabarito.',9,false,5);

      const filename=`MCP_GCM_Paracatu_Simulado_${String(sim).padStart(2,'0')}_Correcao.pdf`;
      doc.save(filename);
    }catch(e){
      console.error(e);alert('Não foi possível gerar o PDF agora. Tente novamente.');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='Baixar correção em PDF';}
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>{addButton();installProgressPersistence();});
  }else{
    addButton();
    installProgressPersistence();
  }
  window.mcpGenerateSimulationPDF=generatePDF;
  window.mcpSaveSimulationProgress=saveProgress;
})();
