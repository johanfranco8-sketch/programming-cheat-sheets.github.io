# Hoja de trucos: TypeScript

## Tipos básicos
```ts
let nombre: string = 'Ana';
let edad: number = 20;
let activo: boolean = true;
```

## Interfaces
```ts
interface Usuario {
  id: number;
  nombre: string;
  correo?: string;
}
const usuario: Usuario = { id: 1, nombre: 'Johan' };
```

## Funciones y uniones
```ts
function saludar(nombre: string): string {
  return `Hola ${nombre}`;
}
type Estado = 'cargando' | 'listo' | 'error';
```

## Genéricos
```ts
function primero<T>(items: T[]): T | undefined {
  return items[0];
}
```