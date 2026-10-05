const buscador = document.querySelector('#buscador');
const tarjetas = [...document.querySelectorAll('.card')];
const resultado = document.querySelector('#resultado');
const sinResultados = document.querySelector('#sin-resultados');
const botonesAgregar = [...document.querySelectorAll('.agregar-carrito')];
const listaCarrito = document.querySelector('#lista-carrito');
const carritoVacio = document.querySelector('#carrito-vacio');
const totalElemento = document.querySelector('#total');
const contadorCarrito = document.querySelector('#contador-carrito');
const botonVaciar = document.querySelector('#vaciar-carrito');

let total = 0;
let cantidadRecursos = 0;
const formatoCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function distanciaLevenshtein(a, b) {
  const filas = a.length + 1;
  const columnas = b.length + 1;
  const matriz = Array.from({ length: filas }, (_, i) => [i]);
  for (let j = 0; j < columnas; j += 1) matriz[0][j] = j;
  for (let i = 1; i < filas; i += 1) {
    for (let j = 1; j < columnas; j += 1) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      matriz[i][j] = Math.min(matriz[i - 1][j] + 1, matriz[i][j - 1] + 1, matriz[i - 1][j - 1] + costo);
    }
  }
  return matriz[a.length][b.length];
}

function coincideBusqueda(textoTarjeta, consulta) {
  if (!consulta) return true;
  const palabrasConsulta = consulta.split(/\s+/).filter(Boolean);
  const palabrasTarjeta = textoTarjeta.split(/\s+/).filter(Boolean);
  return palabrasConsulta.every((palabra) => {
    if (textoTarjeta.includes(palabra)) return true;
    return palabrasTarjeta.some((candidata) => {
      const limite = palabra.length <= 4 ? 1 : 2;
      return candidata.startsWith(palabra) || palabra.startsWith(candidata) || distanciaLevenshtein(candidata, palabra) <= limite;
    });
  });
}

function filtrar() {
  const termino = normalizar(buscador.value);
  let visibles = 0;
  tarjetas.forEach((tarjeta) => {
    const texto = normalizar(`${tarjeta.dataset.search} ${tarjeta.textContent}`);
    const coincide = coincideBusqueda(texto, termino);
    tarjeta.hidden = !coincide;
    if (coincide) visibles += 1;
  });
  resultado.textContent = `${visibles} ${visibles === 1 ? 'tecnología disponible' : 'tecnologías disponibles'}`;
  sinResultados.hidden = visibles !== 0;
}

function actualizarCarrito() {
  totalElemento.textContent = formatoCOP.format(total);
  contadorCarrito.textContent = `${cantidadRecursos} ${cantidadRecursos === 1 ? 'recurso' : 'recursos'}`;
  carritoVacio.hidden = cantidadRecursos > 0;
}

function agregarProducto(boton) {
  const producto = {
    id: boton.dataset.id,
    nombre: boton.dataset.nombre,
    precio: Number(boton.dataset.precio),
    documento: boton.dataset.documento
  };
  const item = document.createElement('li');
  item.className = 'cart-item';
  item.dataset.id = producto.id;
  item.dataset.precio = String(producto.precio);

  const informacion = document.createElement('div');
  const titulo = document.createElement('h3');
  const detalle = document.createElement('p');
  titulo.textContent = producto.nombre;
  detalle.textContent = producto.precio === 0 ? 'Recurso gratuito · documento incluido' : formatoCOP.format(producto.precio);
  informacion.appendChild(titulo);
  informacion.appendChild(detalle);

  const acciones = document.createElement('div');
  acciones.className = 'cart-actions';
  const descarga = document.createElement('a');
  descarga.href = producto.documento;
  descarga.download = producto.documento.split('/').pop();
  descarga.className = 'download-link';
  descarga.textContent = 'Descargar';

  const eliminar = document.createElement('button');
  eliminar.type = 'button';
  eliminar.className = 'remove-button';
  eliminar.textContent = 'Eliminar';
  eliminar.addEventListener('click', () => eliminarProducto(item));

  acciones.appendChild(descarga);
  acciones.appendChild(eliminar);
  item.appendChild(informacion);
  item.appendChild(acciones);
  listaCarrito.appendChild(item);

  total += producto.precio;
  cantidadRecursos += 1;
  actualizarCarrito();
}

function eliminarProducto(item) {
  total -= Number(item.dataset.precio);
  cantidadRecursos -= 1;
  item.remove();
  actualizarCarrito();
}

function vaciarCarrito() {
  listaCarrito.replaceChildren();
  total = 0;
  cantidadRecursos = 0;
  actualizarCarrito();
}

buscador.addEventListener('input', filtrar);
botonesAgregar.forEach((boton) => boton.addEventListener('click', () => agregarProducto(boton)));
botonVaciar.addEventListener('click', vaciarCarrito);
filtrar();
actualizarCarrito();