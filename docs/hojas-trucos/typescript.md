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

## Uniones y narrowing
```ts
type Estado = 'cargando' | 'listo' | 'error';
function mostrar(valor: string | number) {
  return typeof valor === 'string' ? valor.toUpperCase() : valor.toFixed(2);
}
```

## Genéricos
```ts
function primero<T>(items: T[]): T | undefined {
  return items[0];
}
```

## Utilitarios
```ts
type UsuarioParcial = Partial<Usuario>;
type UsuarioSoloNombre = Pick<Usuario, 'nombre'>;
```

## Buenas prácticas
- Evita `any`; usa `unknown` cuando el tipo no sea confiable.
- Activa `strict` en `tsconfig.json` para detectar errores temprano.
- Modela datos externos con interfaces y valida en tiempo de ejecución.