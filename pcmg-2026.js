(() => {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('#catalog-grid .resource')];
  const input = document.getElementById('material-search');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  let category = 'todos';
  function filter() {
    const query = normalize(input.value);
    let count = 0;
    for (const card of cards) {
      const visible = (category === 'todos' || card.dataset.category === category) && normalize(card.textContent).includes(query);
      card.hidden = !visible;
      if (visible) count++;
    }
    buttons.forEach(button => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('catalog-count').textContent = `${count} ${count === 1 ? 'material ou recurso' : 'materiais e recursos'}`;
    document.getElementById('catalog-empty').hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filter(); }));
  input.addEventListener('input', filter);
  document.getElementById('clear-search').addEventListener('click', () => { category = 'todos'; input.value = ''; filter(); input.focus(); });
  const dialog = document.getElementById('preview-dialog');
  const image = document.getElementById('preview-image');
  let previousFocus;
  const titles = { capa: 'Capa da apostila', 'previa-lei-organica': 'Prévia - Lei Orgânica PCMG', 'previa-processo-penal': 'Prévia - Direito Processual Penal' };
  document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.preview;
    if (!Object.hasOwn(titles, key)) return;
    previousFocus = button;
    document.getElementById('preview-title').textContent = titles[key];
    image.src = `/assets/pcmg-2026/${key}.jpg`;
    image.alt = titles[key];
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.getElementById('close-preview').focus();
  }));
  document.getElementById('close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; previousFocus?.focus(); });
  filter();
})();
