# Hoja de trucos: Python

## Inicio rápido
```python
print('Hola, mundo')
nombre = 'Johan'
edad = 20
activo = True
```

## Colecciones
```python
numeros = [1, 2, 3]
numeros.append(4)
usuario = {'nombre': 'Ana', 'edad': 20}
usuario['ciudad'] = 'Bogotá'
for numero in numeros:
    print(numero)
```

## Comprensiones
```python
cuadrados = [n ** 2 for n in range(10)]
pares = [n for n in numeros if n % 2 == 0]
```

## Funciones
```python
def saludar(nombre='mundo'):
    return f'Hola, {nombre}'

resultado = saludar('Ana')
```

## Errores y archivos
```python
try:
    with open('datos.txt', encoding='utf-8') as archivo:
        contenido = archivo.read()
except FileNotFoundError:
    print('Archivo no encontrado')
```

## Entornos y paquetes
```bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install requests
```

## Buenas prácticas
- Usa nombres descriptivos y `snake_case` para variables y funciones.
- Evita capturar excepciones genéricas si puedes manejar errores específicos.
- Guarda dependencias con `pip freeze > requirements.txt`.