Es un ejemplo similar al de preparar cafe.

La idea es ver que el codigo NO se detiene mientras se ejecuta la busqueda del producto. Es decir, con la promesa se hace una operacion asincrona.

La salida del programa muestra la secuencia:
Si revisamos el script vemos que en las ultimas 7 lineas de hace y llama la ejecucion del script.

---
```bash
1. Buscando en el inventario
☕ Buscando si hay articulo pelota... (esperando)
2. Haciendo otras cosas mientras espero...
✅ ¡Hay pelotas en el Almacen.
3. Proceso finalizado (Cerrando el almacen)
```
---

Si revisamos el script 



Script :

---
```js
const verificarInventario = (articulo) => {
    return new Promise((resolve, reject) => {
        console.log(`☕ Buscando si hay articulo= ${articulo}... (esperando)`);
        
        setTimeout(() => {
            const producto = articulo; // Simulación de que no se quemó la cafetera
            if (producto=="pelota") {
                resolve("✅ ¡Hay pelotas en el Almacen."); // Internamente JS asigna a  mensajeDeResolve="✅ ¡Hay pelotas"  ( Mensaje)
            } else {
                reject(`❌ No buscas pelotas, buscas ${articulo}...`);// Internamente javaScript asigna errorReject="❌ No buscas pelotas..."  
            }
        }, 1000);
    });
};

// Uso con .then() y .catch()
console.log("1. Buscando en el inventario");
let articulo = "pelota";  // Por ejemplo, articulo="bate" caera en else y tomara el reject que asignara el mensaje  ❌ No buscas pelotas, buscas bate...
verificarInventario(articulo)
    .then((mensajeDeResolve) => console.log(mensajeDeResolve))
    .catch((errorReject) => console.error(errorReject))
    .finally(() => console.log("3. Proceso finalizado (Cerrando el almacen)"));
console.log("2. Haciendo otras cosas mientras espero...");
```
---

## Revisemos la secuencia de ejecucion:
1. Imprime el mensaje `1. Buscando en el inventario`

2. Asigna a la variable articulo ="pelota" 

3. LLama la funcion asignada a la variable `verificarInventario` que se definió como función anonima con un parametro que tiene el nombre de `articulo`. 
   `const verificarInventario = (articulo) =>`  y crea y retorna una promesa `return new Promise((resolve, reject) =>` que a su vez esta construida como funciona anonima.

4. Lo primero que hace es imprimir `☕ Buscando si hay articulo= ${articulo}... (esperando)`, que es la 2do linea de la salida del Script.

5. Luego nos encontramos son la funcion SetTimeout([Parametro 1], [Parametro 2]); , QUE SE USA PARA DEMOSTRAR LA ASINCRONIA, PUES EL 2DO PARAMETRO ES 1000, QUE REPRESENTA EL TIEMPO DE ESPERA ANTES DE EJECUTAR ( SIMULA COMO QUE ESTAMS BUSCANDO EL articulo EN UNA BASE DE DATOS).

6. Podemos ver que la secuencia siguio pues se muestra el mensaje "2. Haciendo otras cosas mientras espero...", **que es la última linea del Script.**

7. Mientras tanto el programa continuò dentro de SetTimeout:
    Asigna a la constante producto el parametro recibido `(const producto = articulo;)`. 
8. Luego verificamos si el producto es igual a pelota y si es, al resolve se le asigna el mensaje "✅ ¡Hay pelotas en el Almacen.", que a su vez este mensaaje sera usado dentro del **.then()** mas abajo.

if (producto=="pelota") {resolve("✅ ¡Hay pelotas en el Almacen.");} 

que luego se usa en    `verificarInventario(articulo).then((mensajeDeResolve) => console.log(mensajeDeResolve)));`

Es decir, si la promesa tuvo exito se ejecuta el .then(). Si no tuvo exito se ejecuta el .catch().

En otras palabras, si en el if (producto=="pelota") fue false se ejecuta **reject(`❌ No buscas pelotas, buscas ${articulo}...`);** que asignara lo que esta dentro de parentisis al **mensaje** de error que se muestra en el `verificarInventario(articulo).catch((errorReject) => console.error(errorReject))` 

9. INTERESANTE : Los nombres de las variables **mensajeResolve** y **errorReject** son arbitrarios y en ningún lugar podemos ver su creacion o ver explicitamente la asignacion. 
Simplemente, javaScript al usar el .then o .catch se trae lo que coloquemos entre parentisis en el `resolve` ó en el `reject` y se aplica la funcion anonima que acompaña al then ó catch .
10. Siempre el finally se ejecutará ( `verificarInventario(articulo).finally(() => console.log("3. Proceso finalizado (Cerrando el almacen)"));`)

# COMENTARIOS SOBRE LA EXPLICACION ANTERIOR.

Se identificaron los puntos "críticos" que suelen confundir a los programadores al principio, especialmente el punto 9 (la naturaleza arbitraria de los nombres de las variables) y el punto 6 (la prueba de fuego de la asincronía).

Sobre el punto 6 y 7 (El salto temporal):   
Hay que recordar que el setTimeout no es que "detenga" esa parte del código, sino que registra esa tarea en una lista de espera (llamada Web APIs) y le dice a JS: "Sigue con lo tuyo, yo te aviso en 1 segundo". Por eso la última línea del script (console.log("2...")) le gana la carrera a la respuesta del almacén.

Sobre el punto 9 (El "Túnel" de datos): JavaScript utiliza un patrón llamado Inyección de Dependencias o simplemente paso de argumentos por Callback.

resolve(X) → hace que then(f) ejecute f(X).

reject(Y) → hace que catch(g) ejecute g(Y).

Es como si el resolve fuera el cargador de un muelle y el parámetro del then fuera el camionero que recibe la mercancía. No necesitan conocer sus nombres, solo el punto de entrega.

Una sutileza técnica:
En tu punto 3 , donde indico : "retorna una promesa... que a su vez está construida como funciona anónima".
Para ser técnicamente exactos: la Promesa es un objeto, y lo que tiene dentro (la función anónima) se llama técnicamente "Executor Function". Esta función es la que tiene el "poder" de decidir el destino de la promesa.






