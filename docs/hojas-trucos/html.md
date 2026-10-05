# Hoja de trucos: HTML

## Estructura base
```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página</title>
</head>
<body></body>
</html>
```

## Semántica
```html
<header>Encabezado</header>
<nav>Navegación</nav>
<main><section><article>Contenido</article></section></main>
<footer>Pie de página</footer>
```

## Enlaces e imágenes
```html
<a href="https://ejemplo.com" target="_blank" rel="noopener">Visitar</a>
<img src="foto.jpg" alt="Descripción útil de la imagen">
```

## Formularios
```html
<form>
  <label for="correo">Correo</label>
  <input id="correo" type="email" required>
  <button type="submit">Enviar</button>
</form>
```