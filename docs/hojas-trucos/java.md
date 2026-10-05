# Hoja de trucos: Java

## Clase principal
```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hola, mundo");
  }
}
```

## Variables y condiciones
```java
int edad = 20;
String nombre = "Ana";
if (edad >= 18) {
  System.out.println("Mayor de edad");
}
```

## Métodos y objetos
```java
class Persona {
  private String nombre;
  Persona(String nombre) { this.nombre = nombre; }
  public String getNombre() { return nombre; }
}
```

## Colecciones
```java
import java.util.ArrayList;
ArrayList<String> nombres = new ArrayList<>();
nombres.add("Ana");
for (String item : nombres) System.out.println(item);
```

## Excepciones
```java
try {
  int valor = Integer.parseInt("10");
} catch (NumberFormatException error) {
  System.out.println("Número inválido");
}
```

## Buenas prácticas
- Usa nombres claros para clases, métodos y variables.
- Mantén campos privados y expón solo lo necesario.
- Cierra recursos con `try-with-resources` cuando trabajes con archivos.