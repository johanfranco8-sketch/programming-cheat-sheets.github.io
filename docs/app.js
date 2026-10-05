(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const savedTheme = (() => { try { return localStorage.getItem('codesheets-theme'); } catch { return null; } })();
  let theme = savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const setTheme = (value) => { theme = value; root.dataset.theme = value; if (themeButton) themeButton.setAttribute('aria-label', `Cambiar a tema ${value === 'dark' ? 'claro' : 'oscuro'}`); try { localStorage.setItem('codesheets-theme', value); } catch {} };
  setTheme(theme);
  themeButton?.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));

  const search = document.querySelector('#buscador');
const cards = [...document.querySelectorAll('[data-guide-grid] .guide-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const result = document.querySelector('[data-result-count]');
const empty = document.querySelector('[data-empty-guides]');
const resetFilters = document.querySelector('[data-reset-filters]');
const searchStatus = document.querySelector('[data-search-status]');
let activeFilter = 'todos';
let indexReady = false;

const normalizeText = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es')
  .replace(/\s+/g, ' ')
  .trim();



const setSearchStatus = (message) => {
  if (searchStatus) searchStatus.textContent = message;
};

const filterGuides = () => {
  const terms = normalizeText(search?.value).split(' ').filter(Boolean);
  const category = normalizeText(activeFilter);
  let visible = 0;

  cards.forEach((card) => {
    const guideText = normalizeText(card.dataset.guideContent || '');

// Si el campo está vacío, la guía aún no se indexó o falló su carga.
// Mientras exista una búsqueda activa, se oculta para no generar falsos positivos.
const matchesText = !terms.length || (
  Boolean(guideText) &&
  terms.every((term) => guideText.includes(term))
);
    const matchesCategory = category === 'todos' || normalizeText(card.dataset.category) === category;
    card.hidden = !(matchesText && matchesCategory);
    if (!card.hidden) visible += 1;
  });

  if (result) result.textContent = `${visible} ${visible === 1 ? 'guía disponible' : 'guías disponibles'}`;
  if (empty) empty.hidden = visible !== 0;
};

const selectFilter = (filter) => {
  activeFilter = filter;
  filters.forEach((item) => {
    const isActive = item.dataset.filter === filter;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
  filterGuides();
};

const resetGuideFilters = () => {
  if (search) search.value = '';
  selectFilter('todos');
  search?.focus();
};

const indexGuides = async () => {
  const cardsWithSource = cards.filter((card) => card.dataset.guideSource);
  if (!cardsWithSource.length) return;

  setSearchStatus('Preparando búsqueda dentro de las guías…');
  search?.setAttribute('aria-busy', 'true');

  const results = await Promise.allSettled(cardsWithSource.map(async (card) => {
    const response = await fetch(card.dataset.guideSource, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar ${card.dataset.guideSource}`);
    const text = await response.text();
    card.dataset.guideContent = text;
  }));

  const indexed = results.filter((item) => item.status === 'fulfilled').length;
  indexReady = indexed === cardsWithSource.length;
  search?.removeAttribute('aria-busy');
  setSearchStatus(indexReady
    ? 'Búsqueda lista: también encuentra palabras dentro de cada guía.'
    : `Búsqueda lista en ${indexed} de ${cardsWithSource.length} guías.`);
  filterGuides();
};

filters.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
  button.addEventListener('click', () => selectFilter(button.dataset.filter));
});

search?.addEventListener('input', filterGuides);
resetFilters?.addEventListener('click', resetGuideFilters);

document.addEventListener('keydown', (event) => {
  const target = event.target;
  const isEditable = target instanceof HTMLElement && (
    target.matches('input, textarea, select') || target.isContentEditable
  );

  if (event.key === '/' && !isEditable) {
    event.preventDefault();
    search?.focus();
    return;
  }

  if (document.activeElement !== search) return;

  if (event.key === 'Escape') {
    if (search?.value) {
      search.value = '';
      filterGuides();
    } else {
      search?.blur();
    }
    return;
  }

  if (event.key === 'Enter') {
    const firstGuide = cards.find((card) => !card.hidden)?.querySelector('a[href]');
    if (firstGuide) firstGuide.click();
  }
});

filterGuides();
indexGuides();

const cartPanel = document.querySelector('[data-cart-open]') ? document.querySelector('#carrito') : null;
  const backdrop = document.querySelector('[data-cart-backdrop]');
  const itemsNode = document.querySelector('[data-cart-items]');
  const emptyCart = document.querySelector('[data-cart-empty]');
  const totalNode = document.querySelector('[data-cart-total]');
  const countNodes = document.querySelectorAll('[data-cart-count]');
  const toast = document.querySelector('[data-toast]');
  let cart = (() => { try { return JSON.parse(localStorage.getItem('codesheets-cart')) || []; } catch { return []; } })();
  const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const saveCart = () => { try { localStorage.setItem('codesheets-cart', JSON.stringify(cart)); } catch {} };
  const notify = (message) => { if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(notify.timer); notify.timer = setTimeout(() => toast.classList.remove('show'), 2200); };
  const renderCart = () => {
    if (!itemsNode) return;
    itemsNode.replaceChildren();
    let total = 0;
    let count = 0;
    cart.forEach((item) => {
      total += item.precio * item.cantidad;
      count += item.cantidad;
      const row = document.createElement('article'); row.className = 'cart-item';
      const copy = document.createElement('div');
      const name = document.createElement('strong'); name.textContent = item.nombre;
      const detail = document.createElement('p'); detail.textContent = `${money.format(item.precio)} · Cantidad ${item.cantidad}`;
      const remove = document.createElement('button'); remove.className = 'remove-item'; remove.type = 'button'; remove.textContent = 'Eliminar'; remove.setAttribute('aria-label', `Eliminar ${item.nombre}`); remove.dataset.removeId = item.id;
      copy.appendChild(name); copy.appendChild(detail); row.appendChild(copy); row.appendChild(remove); itemsNode.appendChild(row);
    });
    if (emptyCart) emptyCart.hidden = cart.length > 0;
    if (totalNode) totalNode.textContent = money.format(total);
    countNodes.forEach((node) => { node.textContent = count; });
    saveCart();
  };
  const openCart = () => { if (!cartPanel) return; cartPanel.classList.add('open'); cartPanel.setAttribute('aria-hidden', 'false'); if (backdrop) backdrop.hidden = false; document.body.style.overflow = 'hidden'; document.querySelector('[data-cart-close]')?.focus(); };
  const closeCart = () => { if (!cartPanel) return; cartPanel.classList.remove('open'); cartPanel.setAttribute('aria-hidden', 'true'); if (backdrop) backdrop.hidden = true; document.body.style.overflow = ''; };
  document.querySelector('[data-cart-open]')?.addEventListener('click', openCart);
  document.querySelector('[data-cart-close]')?.addEventListener('click', closeCart);
  backdrop?.addEventListener('click', closeCart);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCart(); });
  document.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => {
    const id = button.dataset.id;
    const current = cart.find((item) => item.id === id);
    if (current) current.cantidad += 1;
    else cart.push({ id, nombre: button.dataset.nombre, precio: Number(button.dataset.precio), cantidad: 1 });
    renderCart(); notify(`${button.dataset.nombre} agregado`); openCart();
  }));
  itemsNode?.addEventListener('click', (event) => { const button = event.target.closest('[data-remove-id]'); if (!button) return; cart = cart.filter((item) => item.id !== button.dataset.removeId); renderCart(); notify('Recurso eliminado'); });
  document.querySelector('[data-cart-clear]')?.addEventListener('click', () => { cart = []; renderCart(); notify('Carrito vaciado'); });
  renderCart();
})();

(() => {
  const content = document.querySelector('[data-guide-content]');
  const nav = document.querySelector('[data-guide-nav]');
  if (!content || !nav) return;
  const guides = {
    python: ['python.md', 'Python', 'Datos'], javascript: ['javascript.md', 'JavaScript', 'Web'],
    html: ['html.md', 'HTML', 'Web'], css: ['css.md', 'CSS', 'Web'], git: ['git.md', 'Git', 'Herramientas'],
    sql: ['sql.md', 'SQL', 'Datos'], java: ['java.md', 'Java', 'Backend'],
    typescript: ['typescript.md', 'TypeScript', 'Web'], terminal: ['bash-powershell.md', 'Bash y PowerShell', 'Herramientas']
  };
  const key = new URLSearchParams(location.search).get('tema');
  const guide = guides[key];
  const slug = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const addCopy = (wrapper, code) => {
    const button = document.createElement('button'); button.className = 'copy-code'; button.type = 'button'; button.textContent = 'Copiar';
    button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(code.textContent); button.textContent = 'Copiado'; setTimeout(() => button.textContent = 'Copiar', 1500); } catch { button.textContent = 'Selecciona y copia'; } });
    wrapper.appendChild(button);
  };
  const render = (markdown) => {
    content.replaceChildren(); nav.replaceChildren();
    let section = null, list = null, code = null, inCode = false;
    markdown.split(/\r?\n/).forEach((line) => {
      if (line.startsWith('```')) {
        if (!inCode) { const wrap = document.createElement('div'); wrap.className = 'code-block'; const pre = document.createElement('pre'); code = document.createElement('code'); pre.appendChild(code); addCopy(wrap, code); wrap.appendChild(pre); (section || content).appendChild(wrap); inCode = true; }
        else inCode = false;
        return;
      }
      if (inCode) { code.textContent += `${line}\n`; return; }
      if (line.startsWith('# ')) { const header = document.createElement('header'); const kicker = document.createElement('p'); kicker.className = 'kicker'; kicker.textContent = `${guide[2]} · Hoja de trucos`; const h1 = document.createElement('h1'); h1.textContent = guide[1]; const lead = document.createElement('p'); lead.className = 'lead'; lead.textContent = 'Referencia breve, práctica y lista para consultar mientras construyes.'; header.append(kicker, h1, lead); content.appendChild(header); document.title = `${guide[1]} — CodeSheets`; return; }
      if (line.startsWith('## ')) { const title = line.slice(3); section = document.createElement('section'); section.className = 'guide-section'; section.id = slug(title); const h2 = document.createElement('h2'); h2.textContent = title; section.appendChild(h2); content.appendChild(section); const link = document.createElement('a'); link.href = `#${section.id}`; link.textContent = title; nav.appendChild(link); list = null; return; }
      if (line.startsWith('- ')) { if (!list) { list = document.createElement('ul'); (section || content).appendChild(list); } const item = document.createElement('li'); item.textContent = line.slice(2).replace(/`/g, ''); list.appendChild(item); return; }
      if (line.trim()) { const p = document.createElement('p'); p.textContent = line.replace(/`/g, ''); (section || content).appendChild(p); }
    });
  };
  if (!guide) { content.innerHTML = '<header><p class="kicker">Guía no encontrada</p><h1>Esta referencia no existe.</h1><p class="lead"><a href="./#guias">Volver al catálogo</a></p></header>'; return; }
  fetch(`hojas-trucos/${guide[0]}`).then((response) => { if (!response.ok) throw new Error(); return response.text(); }).then(render).catch(() => { content.innerHTML = '<header><p class="kicker">Error de carga</p><h1>No pudimos abrir la guía.</h1><p class="lead"><a href="./#guias">Volver al catálogo</a></p></header>'; });
})();
