# Hoja de trucos: SQL

## Consultar datos
```sql
SELECT nombre, correo
FROM usuarios
WHERE activo = TRUE
ORDER BY nombre ASC;
```

## Insertar y actualizar
```sql
INSERT INTO usuarios (nombre, correo)
VALUES ('Ana', 'ana@ejemplo.com');

UPDATE usuarios
SET activo = FALSE
WHERE id = 10;
```

## Eliminar
```sql
DELETE FROM usuarios
WHERE id = 10;
```

## Agregaciones
```sql
SELECT categoria, COUNT(*) AS total, AVG(precio) AS promedio
FROM productos
GROUP BY categoria
HAVING COUNT(*) > 1;
```

## Join
```sql
SELECT pedidos.id, usuarios.nombre
FROM pedidos
INNER JOIN usuarios ON usuarios.id = pedidos.usuario_id;
```