# Hoja de trucos: JavaScript

## Variables y funciones
```js
const nombre = 'Johan';
let contador = 0;
const sumar = (a, b) => a + b;
```

## Arreglos
```js
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);
const pares = numeros.filter(n => n % 2 === 0);
const suma = numeros.reduce((acc, n) => acc + n, 0);
```

## Objetos y desestructuración
```js
const usuario = { nombre: 'Ana', edad: 20 };
const { nombre, edad } = usuario;
const copia = { ...usuario, activo: true };
```

## DOM y eventos
```js
const boton = document.querySelector('#mi-boton');
boton.addEventListener('click', () => {
  document.querySelector('#salida').textContent = 'Hola';
});
```

## JSON y peticiones
```js
const respuesta = await fetch('/api/datos');
const datos = await respuesta.json();
```