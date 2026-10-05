# Hoja de trucos: JavaScript

## Variables y funciones
```js
const nombre = 'Johan';
let contador = 0;
const sumar = (a, b) => a + b;
```

## Arreglos
```js
const numeros = [1, 2, 3, 4];
const pares = numeros.filter(n => n % 2 === 0);
const dobles = numeros.map(n => n * 2);
const suma = numeros.reduce((total, n) => total + n, 0);
```

## Objetos y desestructuración
```js
const usuario = { nombre: 'Ana', edad: 20 };
const { nombre, edad } = usuario;
const actualizado = { ...usuario, activo: true };
```

## DOM y eventos
```js
const boton = document.querySelector('#enviar');
boton.addEventListener('click', () => {
  document.querySelector('#salida').textContent = 'Acción realizada';
});
```

## Asincronía
```js
async function cargarUsuarios() {
  const respuesta = await fetch('/api/usuarios');
  if (!respuesta.ok) throw new Error('Error de red');
  return respuesta.json();
}
```

## Buenas prácticas
- Usa `const` por defecto y `let` solo cuando el valor cambie.
- Valida que elementos del DOM existan antes de usarlos.
- Trata los datos externos como no confiables y maneja errores de red.