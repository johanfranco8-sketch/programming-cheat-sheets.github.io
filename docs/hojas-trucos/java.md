# Hoja de trucos: Java

## Clase y método principal
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

## Métodos
```java
static int sumar(int a, int b) {
  return a + b;
}
```

## Clases y objetos
```java
class Persona {
  String nombre;
  Persona(String nombre) { this.nombre = nombre; }
}
Persona persona = new Persona("Johan");
```

## Colecciones
```java
import java.util.ArrayList;
ArrayList<String> nombres = new ArrayList<>();
nombres.add("Ana");
```