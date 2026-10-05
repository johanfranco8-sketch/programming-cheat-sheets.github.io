# Hoja de trucos: CSS

## Base y modelo de caja
```css
* { box-sizing: border-box; }
.tarjeta { padding: 1rem; margin: 1rem; border: 1px solid #dbeafe; }
```

## Flexbox
```css
.fila {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
```

## Grid adaptable
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
```

## Variables y responsive
```css
:root { --primario: #2563eb; }
.boton { background: var(--primario); }
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
```

## Estados accesibles
```css
.boton:hover { filter: brightness(1.1); }
.boton:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
```

## Buenas prácticas
- Diseña primero para pantallas pequeñas y mejora progresivamente.
- Evita depender solo del color para comunicar estados.
- Reutiliza variables para colores, espacios y tipografía.