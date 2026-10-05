# Hoja de trucos: CSS

## Selector y caja
```css
* { box-sizing: border-box; }
.tarjeta { padding: 1rem; margin: 1rem; border: 1px solid #ddd; }
```

## Flexbox
```css
.contenedor {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
```

## Grid
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
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
```

## Estados
```css
.boton:hover { filter: brightness(1.1); }
.entrada:focus { outline: 3px solid #93c5fd; }
```