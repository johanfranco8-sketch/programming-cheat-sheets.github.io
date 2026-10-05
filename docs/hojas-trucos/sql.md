# Hoja de trucos: SQL

## Consultar y filtrar
```sql
SELECT nombre, correo
FROM usuarios
WHERE activo = TRUE
ORDER BY nombre ASC
LIMIT 20;
```

## Agregaciones
```sql
SELECT categoria, COUNT(*) AS total, AVG(precio) AS promedio
FROM productos
GROUP BY categoria
HAVING COUNT(*) > 1;
```

## Joins
```sql
SELECT pedidos.id, usuarios.nombre
FROM pedidos
INNER JOIN usuarios ON usuarios.id = pedidos.usuario_id;
```

## Cambiar datos
```sql
INSERT INTO usuarios (nombre, correo) VALUES ('Ana', 'ana@ejemplo.com');
UPDATE usuarios SET activo = FALSE WHERE id = 10;
DELETE FROM usuarios WHERE id = 10;
```

## Transacciones
```sql
BEGIN;
UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;
```

## Buenas prácticas
- Usa consultas parametrizadas desde tu aplicación para prevenir inyección SQL.
- Evita `DELETE` o `UPDATE` sin `WHERE` salvo que sea intencional.
- Prueba consultas de modificación en una base de datos de desarrollo.