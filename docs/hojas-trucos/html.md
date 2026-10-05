# Hoja de trucos: HTML

## Documento base
```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descripción de la página">
  <title>Mi sitio</title>
</head>
<body></body>
</html>
```

## Estructura semántica
```html
<header>Encabezado</header>
<nav aria-label="Principal">Navegación</nav>
<main><section><article>Contenido</article></section></main>
<footer>Pie de página</footer>
```

## Enlaces e imágenes
```html
<a href="https://ejemplo.com" target="_blank" rel="noopener">Visitar</a>
<img src="foto.jpg" alt="Descripción útil de la imagen">
```

## Formularios accesibles
```html
<form>
  <label for="correo">Correo electrónico</label>
  <input id="correo" type="email" autocomplete="email" required>
  <button type="submit">Enviar</button>
</form>
```

## Buenas prácticas
- Usa una etiqueta semántica según el significado, no por apariencia.
- Cada imagen informativa necesita texto alternativo útil.
- Relaciona cada `input` con su `label`.