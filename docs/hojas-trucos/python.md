# Hoja de trucos: Python

## Inicio rápido
```python
print('Hola, mundo')
numero = 10
texto = 'Python'
```

## Colecciones
```python
lista = [1, 2, 3]
diccionario = {'nombre': 'Ana', 'edad': 20}
lista.append(4)
valor = diccionario.get('nombre')
```

## Condiciones y ciclos
```python
if numero > 0:
    print('positivo')

for item in lista:
    print(item)

while numero > 0:
    numero -= 1
```

## Funciones
```python
def saludar(nombre='mundo'):
    return f'Hola, {nombre}'
```

## Archivos
```python
with open('datos.txt', 'r', encoding='utf-8') as archivo:
    contenido = archivo.read()
```

## Entorno virtual
```bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install paquete
```