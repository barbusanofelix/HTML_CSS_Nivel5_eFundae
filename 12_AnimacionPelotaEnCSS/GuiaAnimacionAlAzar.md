# Como implementar la animacion al azar 

# Paso 1: Preparar el HTML
Añadimos un elemento (en este caso la pelota de voleibol) en el HTML ( en este caso en index.html ).   
También vinculamos el archivo de script al final del documento.

Explicacion del HTML:
1. Elegimos un objeto a animar. En este caso elegí una pelota de voleibal que previamente habia descargado como archivo voleibol.png  y le colocamos una clase ( class="main__img--pelotaVoleibol-azar" . Use BEM para el nombre de la clase)
---
```html

<!-- PELOTA VOLEIBOL -->
<h2>Genera trayectoria al azar - Ver GuiaAnimacionAlAzar.md</h2>
<img class="main__img--pelotaVoleibol-azar" src="voleibol.png" alt="Pelota Voleibol">

```
---

2. Al final del body colocamos nuestra etiqueta `<script src="pelotaVoleibolAzar.js"></script>` , que esta claro que decidí lamar el archivo con el nombre `pelotaVoleibolAzar.js`.

Falta definir el codigo `pelotaVoleibolAzar.js`

```html
...otro codigo
     <script src="pelotaVoleibolAzar.js"></script>
</body>

```

3. Configurar el CSS Base
En el archivo style.css, definimos las propiedades físicas constantes. Es vital usar position: relative (o absolute) para que los movimientos de traslación funcionen, y asignamos el nombre de la animación que JS creará después.

---
```CSS
.main__img--pelotaVoleibol {
    width: 100px;
    position: relative; /* Permite el movimiento respecto a su origen */
    z-index: 10;        /* Asegura que pase por encima de ciertos elementos */
    
    /* Nombre coincide con el @keyframes que creará JS */
    animation: superReboteAzar 5s linear infinite alternate;
}
```
---

4. Crear la Lógica en JavaScript
En el archivo script.js, realizamos tres acciones clave: definir la función de azar, generar los valores y "fabricar" la etiqueta de estilo para @keyframes superReboteAzar


---
```js
// 1. La función para generar números
// Version original
// const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Para ver el random generado 
const random = (min, max) => { // <--- Abrimos llaves: ahora mandamos nosotros
    const resultado = Math.floor(Math.random() * (max - min)) + min; // 1. Calculamos y guardamos
    console.log("Resultado: "+resultado);                                          // 2. Espiamos
    return resultado;                                               // 3. Entregamos (Salida única)
};


// 2. Creamos la "hoja de estilos" dinámica
const style = document.createElement('style');

// 3. Escribimos el @keyframes con valores al azar usando las comillas locas ``
style.innerHTML = `
@keyframes superReboteAzar {
    0%   { transform: translate(${random(0, 10)}vw, ${random(0, 10)}vh) scale(1); }
    25%  { transform: translate(${random(10, 30)}vw, ${random(10, 30)}vh) scale(1); }
    50%  { transform: translate(${random(40, 60)}vw, ${random(60, 80)}vh) scale(1.3, 0.7); }
    75%  { transform: translate(${random(70, 80)}vw, ${random(20, 40)}vh) scale(1); }
    100% { transform: translate(${random(85, 95)}vw, ${random(60, 80)}vh) scale(1.3, 0.7); }
}`;

// 4. Lo inyectamos en el html, la etiqueta style, del head, con el @keyframes superReboteAzar
document.head.appendChild(style);
```
---

A. Función de azar con "espejo" en consola
Usamos una función de flecha con cuerpo completo para poder imprimir los valores y depurar.
El valor obtenido por la funcion se guarda en la variable random y es usado , mas abajo, para las coordenadas de traslación de la pelota.

B. Inyección del @keyframes al DOM
Creamos una etiqueta `<style>` dinámicamente y la llenamos con las coordenadas al azar usando template strings (las comillas `).


Conceptos Clave Aprendidos:
Unidades de Visualización (vh/vw): Hacen que la animación se adapte al tamaño de la ventana del navegador.
`vh: view hight.  vw : view wide.`

Modificación del DOM: JavaScript puede "escribir" CSS en la memoria del navegador sin alterar tus archivos físicos.
Al crear la etiqueta style en el head lo hace en la memoria y "combina" los estilos de archivos fisicos con archivos en memoria, que al final todos son cargados en la memoria.

Interpolación ${}: Permite meter resultados de funciones directamente dentro de cadenas de texto.

Depuración: El uso de console.log para entender qué valores está procesando el motor de JavaScript. La consola se refiera a la pestaña consola en el navegar, despues de oprimir `[F12]`

Con esta estructura, puedes crear tantas "pelotas mágicas" como quieras, simplemente cambiando los rangos de la función random