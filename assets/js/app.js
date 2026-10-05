const lenguajes = [
  { id: 'python', nombre: 'Python', precio: 0, archivo: 'docs/hojas-trucos/python.md', descripcion: 'Sintaxis, colecciones, funciones y comandos básicos para empezar con Python.', icono: '🐍' },
  { id: 'javascript', nombre: 'JavaScript', precio: 0, archivo: 'docs/hojas-trucos/javascript.md', descripcion: 'DOM, eventos, arreglos, funciones y herramientas clave de JavaScript.', icono: '🟨' },
  { id: 'git', nombre: 'Git', precio: 0, archivo: 'docs/hojas-trucos/git.md', descripcion: 'Flujo de trabajo, ramas, commits y colaboración con Git.', icono: '🔀' },
  { id: 'css', nombre: 'CSS', precio: 0, archivo: 'docs/hojas-trucos/css.md', descripcion: 'Selectores, Flexbox, Grid y diseño adaptable.', icono: '🎨' },
  { id: 'html', nombre: 'HTML', precio: 0, archivo: 'docs/hojas-trucos/html.md', descripcion: 'Estructura semántica, formularios y etiquetas fundamentales.', icono: '📄' },
  { id: 'java', nombre: 'Java', precio: 0, archivo: 'docs/hojas-trucos/java.md', descripcion: 'Clases, objetos, colecciones y estructura de programas Java.', icono: '☕' },
  { id: 'sql', nombre: 'SQL', precio: 0, archivo: 'docs/hojas-trucos/sql.md', descripcion: 'Consultas, filtros, joins y operaciones con bases de datos.', icono: '🗃️' },
  { id: 'typescript', nombre: 'TypeScript', precio: 0, archivo: 'docs/hojas-trucos/typescript.md', descripcion: 'Tipos, interfaces y desarrollo JavaScript más seguro.', icono: '🔷' },
  { id: 'bash-powershell', nombre: 'Bash y PowerShell', precio: 0, archivo: 'docs/hojas-trucos/bash-powershell.md', descripcion: 'Comandos de terminal, archivos, procesos y automatización.', icono: '⌨️' }
];

const listaLenguajes = document.getElementById('lista-lenguajes');
const nombreSeleccionado = document.getElementById('lenguaje-nombre');
const descripcionSeleccionada = document.getElementById('lenguaje-descripcion');
const precioSeleccionado = document.getElementById('lenguaje-precio');
const botonAgregar = document.getElementById('agregar-carrito');
const enlaceDescarga = document.getElementById('descargar-hoja');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const carritoVacio = document.getElementById('carrito-vacio');
const botonVaciar = document.getElementById('vaciar-carrito');

let seleccionado = null;
let carrito = [];
const formatoCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function renderizarLenguajes() {
  listaLenguajes.innerHTML = '';
  lenguajes.forEach((lenguaje) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'language-card';
    tarjeta.innerHTML = `
      <span class="language-icon" aria-hidden="true">${lenguaje.icono}</span>
      <h3>${lenguaje.nombre}</h3>
      <p>${lenguaje.descripcion}</p>
      <button type="button" class="button button-secondary">Seleccionar</button>
    `;
    tarjeta.querySelector('button').addEventListener('click', () => seleccionarLenguaje(lenguaje.id));
    listaLenguajes.appendChild(tarjeta);
  });
}

function seleccionarLenguaje(id) {
  seleccionado = lenguajes.find((lenguaje) => lenguaje.id === id);
  nombreSeleccionado.textContent = seleccionado.nombre;
  descripcionSeleccionada.textContent = seleccionado.descripcion;
  precioSeleccionado.textContent = seleccionado.precio === 0 ? 'Gratis' : formatoCOP.format(seleccionado.precio);
  botonAgregar.disabled = false;
  enlaceDescarga.href = seleccionado.archivo;
  enlaceDescarga.download = `hoja-trucos-${seleccionado.id}.md`;
  enlaceDescarga.classList.remove('disabled');
  enlaceDescarga.setAttribute('aria-disabled', 'false');
  document.getElementById('detalle').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function agregarAlCarrito() {
  if (!seleccionado) return;
  const item = { ...seleccionado, uid: `${seleccionado.id}-${Date.now()}` };
  carrito.push(item);
  renderizarCarrito();
}

function eliminarDelCarrito(uid) {
  carrito = carrito.filter((item) => item.uid !== uid);
  renderizarCarrito();
}

function renderizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach((item) => {
    total += item.precio;
    const fila = document.createElement('li');
    fila.className = 'cart-item';
    const texto = document.createElement('div');
    const titulo = document.createElement('strong');
    const detalle = document.createElement('span');
    titulo.textContent = item.nombre;
    detalle.textContent = `${item.precio === 0 ? 'Gratis' : formatoCOP.format(item.precio)} · descarga incluida`;
    texto.append(titulo, detalle);
    const eliminar = document.createElement('button');
    eliminar.type = 'button';
    eliminar.className = 'remove-button';
    eliminar.textContent = 'Eliminar';
    eliminar.addEventListener('click', () => eliminarDelCarrito(item.uid));
    fila.append(texto, eliminar);
    listaCarrito.appendChild(fila);
  });
  totalCarrito.textContent = formatoCOP.format(total);
  contadorCarrito.textContent = carrito.length;
  carritoVacio.hidden = carrito.length > 0;
}

botonAgregar.addEventListener('click', agregarAlCarrito);
botonVaciar.addEventListener('click', () => {
  carrito = [];
  renderizarCarrito();
});

enlaceDescarga.addEventListener('click', (evento) => {
  if (!seleccionado) evento.preventDefault();
});

renderizarLenguajes();
renderizarCarrito();