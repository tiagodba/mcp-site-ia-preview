// ==UserScript==
// @name         MCP Enquete Helper - WhatsApp Web
// @namespace    https://materiais-carreiras-policiais.vercel.app/
// @version      0.1.0
// @description  Ajuda a preencher enquetes do WhatsApp Web com dados preparados no painel MCP.
// @match        https://web.whatsapp.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const BTN_ID = 'mcp-poll-helper-btn';
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const textOf = el => (el?.innerText || el?.textContent || '').trim();

  function toast(msg, ok=true) {
    const old = document.getElementById('mcp-poll-toast');
    if (old) old.remove();
    const t = document.createElement('div');
    t.id = 'mcp-poll-toast';
    t.textContent = msg;
    Object.assign(t.style,{position:'fixed',right:'18px',bottom:'86px',zIndex:'999999',padding:'12px 16px',borderRadius:'12px',fontFamily:'system-ui,sans-serif',fontWeight:'700',boxShadow:'0 10px 30px #0008',background:ok?'#075e54':'#8b1e2d',color:'#fff'});
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),3500);
  }

  async function readPollData() {
    let raw = '';
    try { raw = await navigator.clipboard.readText(); } catch {}
    if (!raw) raw = localStorage.getItem('mcp_poll_payload') || '';
    raw = raw.trim();
    if (raw.startsWith('MCP_POLL:')) raw = raw.slice(9);
    try {
      const data = JSON.parse(raw);
      if (!data || !data.question || !Array.isArray(data.options) || data.options.length < 2) throw new Error('payload inválido');
      return data;
    } catch {
      throw new Error('Copie primeiro os dados da enquete no painel MCP.');
    }
  }

  function allClickable() {
    return [...document.querySelectorAll('button,[role="button"],div[tabindex="0"],span[role="button"]')].filter(el=>el.offsetParent!==null);
  }

  function findClickableByText(words) {
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const targets = words.map(norm);
    return allClickable().find(el => {
      const t = norm(textOf(el) + ' ' + (el.getAttribute('aria-label')||'') + ' ' + (el.getAttribute('title')||''));
      return targets.some(w => t.includes(w));
    });
  }

  async function openAttachmentMenu() {
    const candidates = [...document.querySelectorAll('button,[role="button"]')].filter(el=>el.offsetParent!==null);
    let btn = candidates.find(el => {
      const s = ((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')).toLowerCase();
      return /anex|attach|adicionar|plus|mais/.test(s);
    });
    if (!btn) {
      btn = candidates.find(el => el.querySelector('svg') && /clip|plus/.test((el.innerHTML||'').toLowerCase()));
    }
    if (!btn) throw new Error('Não encontrei o botão de anexos. Abra uma conversa/grupo e tente novamente.');
    btn.click();
    await sleep(500);
  }

  async function openPollComposer() {
    let poll = findClickableByText(['Enquete','Poll']);
    if (!poll) {
      await openAttachmentMenu();
      poll = findClickableByText(['Enquete','Poll']);
    }
    if (!poll) throw new Error('Não encontrei a opção Enquete.');
    poll.click();
    await sleep(700);
  }

  function visibleEditors() {
    return [...document.querySelectorAll('[contenteditable="true"],textarea,input[type="text"]')].filter(el=>el.offsetParent!==null);
  }

  function setEditor(el, value) {
    el.focus();
    if ('value' in el) {
      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el),'value')?.set;
      if (setter) setter.call(el,value); else el.value=value;
      el.dispatchEvent(new Event('input',{bubbles:true}));
      el.dispatchEvent(new Event('change',{bubbles:true}));
      return;
    }
    document.execCommand('selectAll',false,null);
    document.execCommand('insertText',false,value);
    el.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:value}));
  }

  async function fillPoll(data) {
    await openPollComposer();
    await sleep(500);
    let editors = visibleEditors();
    if (editors.length < 3) throw new Error('A janela da enquete abriu, mas não encontrei os campos para preencher.');

    setEditor(editors[0], data.question);
    await sleep(150);

    for (let i=0;i<data.options.length;i++) {
      editors = visibleEditors();
      if (editors[i+1]) {
        setEditor(editors[i+1], data.options[i]);
        await sleep(120);
      } else {
        const add = findClickableByText(['Adicionar opção','Add option']);
        if (add) { add.click(); await sleep(180); editors = visibleEditors(); }
        if (editors[i+1]) setEditor(editors[i+1], data.options[i]);
      }
    }
    toast('Enquete MCP preenchida. Revise e toque em enviar.');
  }

  async function run() {
    try {
      const data = await readPollData();
      await fillPoll(data);
    } catch (e) {
      console.error('[MCP Enquete Helper]',e);
      toast(e.message || 'Falha ao preparar enquete.',false);
    }
  }

  function mount() {
    if (document.getElementById(BTN_ID)) return;
    const b = document.createElement('button');
    b.id = BTN_ID;
    b.textContent = 'MCP ENQUETE';
    b.title = 'Preencher enquete com dados copiados do painel MCP';
    Object.assign(b.style,{position:'fixed',right:'18px',bottom:'18px',zIndex:'999999',background:'#25d366',color:'#062a14',border:'0',borderRadius:'999px',padding:'12px 16px',fontFamily:'system-ui,sans-serif',fontWeight:'900',cursor:'pointer',boxShadow:'0 8px 28px #0007'});
    b.addEventListener('click',run);
    document.body.appendChild(b);
  }

  mount();
  new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});
})();