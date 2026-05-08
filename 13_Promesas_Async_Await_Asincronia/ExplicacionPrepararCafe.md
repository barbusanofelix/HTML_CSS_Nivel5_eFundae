
Vamos a diseccionar la anatomía de esta Promesa paso a paso.

1. La Anatomía de la Promesa
Veremos que hay 2 funciones.   
Una Promesa es un objeto que envuelve una función.

---
```js
const prepararCafe = () => { // <--- 1. Función flecha (anónima asignada a una constante)
    return new Promise((resolve, reject) => { // <--- 2. El "Executor"
        // ... lógica ...
    });
};
```
---

El "Executor": Es la función que ves dentro de new Promise(...). Es anónima y JavaScript la ejecuta inmediatamente.

resolve y reject: **No son valores (ó  parametros) , son funciones que el motor de JavaScript te regala para que tú decidas cuándo terminó bien la tarea o cuándo falló.**



2. El rompecabezas del setTimeout
Aquí es donde se complica porque tenemos una función dentro de otra. El setTimeout recibe dos parámetros:

Una función (qué hacer).

Un número (cuándo hacerlo).
---
```js
JavaScript
setTimeout(() => { // <--- Función anónima 1 (el "qué hacer")
    const exito = true;
    if (exito) {
        resolve("✅ ¡Café listo!"); // <--- Llamamos a la función de éxito
    } else {
        reject("❌ No hay agua");    // <--- Llamamos a la función de error
    }
}, 2000); // <--- Parámetro 2: El tiempo

```
---


¿Por qué otra función anónima aquí?
Porque si pusiéramos el resolve() directamente, se ejecutaría ya mismo. Al envolverlo en una función anónima, le decimos al navegador: "Guarda este código y ejecútalo solo cuando pasen 2 segundos".

3. ¿De dónde sale "mensaje"? (El viaje de los datos)
Esta es la duda más común. El valor de mensaje se asigna en el momento en que tú llamas a resolve().

Sigue el camino del dato:

Dentro de la Promesa: Tú escribes resolve("✅ ¡Café listo!"). Aquí estás "enviando" el paquete.

En el .then(): Tú escribes .then((mensaje) => ... ).

mensaje es solo un nombre de variable (podrías llamarlo papasConChorizo si quisieras).

JavaScript toma lo que pusiste dentro de los paréntesis del resolve y lo inyecta automáticamente en ese primer parámetro del .then.

Es como un tubo:
resolve("Dato")  ───▶  .then( variable => ... )
reject("Error")   ───▶  .catch( variable => ... )

4. Resumen de la Lógica
Para que no queden dudas| aquí tienes el flujo completo:

|Paso|Instrucción|Qué hace realmente
| :---|:---|:---|
1|"new Promise((res, rej) => {...})"|"Crea el ""beeper"" del restaurante."
2|"setTimeout(fn, 2000)"|Programa una alarma para dentro de 2 segundos.
3|"resolve(""Listo"")"|"""Cumple"" la promesa y guarda el texto ""Listo"" en el resultado."
4|.then(mensaje => ...)|"Se activa porque llamaste a resolve. El parámetro mensaje recibe el texto ""Listo""."
5|.catch(error => ...)|Solo se activa si en el paso 3 hubieras llamado a reject.