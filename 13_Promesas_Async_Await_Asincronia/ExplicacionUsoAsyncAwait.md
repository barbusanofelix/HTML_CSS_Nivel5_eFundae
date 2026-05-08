# Haremos el mismo ejercicio de verificar el inventario con async y await

Transformar verificarInventario.js  a Async/Await

Usar async y await es la forma moderna y PREFERIDA, mira cómo quedaría tu mismo ejercicio sin tanto "punto y paréntesis" anidado. Es exactamente lo mismo, pero se lee como un libro:

---
```js
async function procesoAlmacen() {
    try {
        console.log("1. Buscando en el inventario");
        
        // El programa se "pausa" aquí (solo dentro de esta función)
        const mensaje = await verificarInventario("pelota"); 
        
        // Esta línea no se ejecuta hasta que la anterior termine
        console.log(mensaje); 

    } catch (error) {
        // Si la promesa cae en 'reject', saltamos directo aquí
        console.error(error);
    } finally {
        console.log("3. Proceso finalizado (Cerrando el almacen)");
    }
}


const verificarInventario = (articulo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            articulo === "pelota" ? resolve(true) : reject("Agotado");
        }, 1000);
    });
};

// Aqui la ejecucion de las funciones anteriores
procesoAlmacen();
console.log("2. Haciendo otras cosas mientras espero...");
```
---

Secuencia de Ejecución (El orden del tiempo)
Aunque el código se lee de arriba hacia abajo, el orden de salida en la consola será el siguiente:

Imprime: 1. Buscando en el inventario. (Entra en la función async).

Encuentra el await: La función procesoAlmacen se "suspende" temporalmente. JS sale de la función para ver si hay más trabajo pendiente.

Imprime: 2. Haciendo otras cosas mientras espero.... (Ejecuta la última línea del script global).

Pasa 1 segundo: El setTimeout de la promesa termina y ejecuta el resolve(true).

Reanuda la función: El await recibe ese true y **lo guarda en la constante mensaje**. En vez de true se puede escribir cualquier mensaje, como resolve(`El articulo ${articulo} esta en stock`)

Imprime: true. (Resultado de la búsqueda).

Imprime: 3. Proceso finalizado.... (Bloque finally).

2. Detalles de las Instrucciones Clave
async function: Al poner async, le avisas a JavaScript: "Prepárate, porque dentro de esta función voy a usar pausas (await) y no quiero que bloquees todo el navegador".

await verificarInventario("pelota"):

Es el "freno de mano". Le dice al programa: "No pases a la siguiente línea hasta que la promesa de verificarInventario se resuelva (ya sea con éxito o error)".

Lo más importante: Extrae el valor directamente del resolve. Ya no necesitas una función anónima como en el .then(), el valor "cae" directamente en tu variable mensaje.

try { ... } catch (error):

Es el guardián. Si la promesa ejecuta un reject(), el código dentro del try se interrumpe inmediatamente y el control salta al bloque catch.

Aquí, la variable error recibirá lo que hayas puesto dentro del reject("Agotado").

3. Puntos Críticos a Considerar (Lo que no puedes olvidar)
El await solo funciona dentro de async: Si intentas usar await en el cuerpo principal del script (fuera de una función marcada como async), JavaScript te dará un error de sintaxis.

No bloquea el hilo principal:   
Es vital entender que await no detiene el mundo, solo detiene el progreso dentro de esa función específica. El resto de tu código (como las animaciones de la pelota o otros logs) sigue funcionando perfectamente.

Manejo obligatorio de errores:   
Con .then(), el error se iba al .catch(). Aquí, si olvidas el bloque try/catch y la promesa falla (reject), tu programa podría lanzar una excepción no controlada ("Uncaught in Promise").   
**Siempre usa try/catch con await.**

El valor de retorno:    
Recuerda que await devuelve lo que está en el resolve. En el código, mensaje será un booleano (true). Si en el resolve hubieramos puesto un objeto {stock: 10}, la variable mensaje sería ese objeto.

Resumen de la Evolución:
Pasaste de: "Toma este mensaje y dáselo a esta función anónima cuando puedas" (.then)
A: "Espera aquí, toma el resultado y guárdalo en esta variable para que yo pueda seguir trabajando abajo" (await).