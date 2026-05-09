# MODAL: COMO SE HACE Y FUNCIONA?

Un modal parece algo sencillo, pero en realidad es una pequeña "aplicación dentro de la aplicación" que requiere coordinar HTML, CSS y JS a la perfección.

## Pilaresdel Modal
Tiene 3 pilares  (también llamado Lightbox en este caso):

1. El Pilar Estructural (HTML): "La Cebolla"
Imagina el modal como una cebolla con capas. Si no las estructuras bien, los elementos se amontonan.

La Capa Base (#lightbox): Es el contenedor que ocupa toda la pantalla. Es el "vidrio" que oscurece el fondo.

El Botón de Cierre (.lightbox__close): Debe estar fuera del contenedor de la imagen para que siempre sea accesible.

El Contenedor de Contenido (.lightbox__content): Es el que centra la imagen y los botones de navegación.

Los Elementos Dinámicos: La etiqueta `<img>` vacía y el loader. No les ponemos contenido en el HTML porque el JS se encargará de "inyectarlo".

2. El Pilar Visual (CSS): "Invisibilidad y Capas"
Aquí es donde decidimos cómo se ve y, más importante, cómo se esconde.

position: fixed: Es vital. A diferencia de absolute, fixed asegura que aunque el usuario haga scroll, el modal se quede pegado a la pantalla.

El estado oculto (.lightbox--hidden):

Usamos display: none para que el modal no solo sea invisible, sino que no exista para el mouse (así el usuario puede clicar en las portadas).

Al quitar esta clase con JS, el modal "nace" instantáneamente.

El Z-index: Como aprendimos con el error de la "X", el modal debe tener un z-index superior a cualquier cosa en la página (ej. 1000), y sus botones internos (la X) aún más (ej. 5000).

3. El Pilar Lógico (JS): "El Interruptor"
El JavaScript actúa como el electricista que conecta los cables.

Mostrarlo (classList.remove):

```js
lightbox.classList.remove('lightbox--hidden');
```


Esto es como abrir una cortina. Lo primero que hacemos es mostrar el fondo oscuro para que el usuario sepa que algo está cargando.

Ocultarlo (classList.add):

```
lightbox.classList.add('lightbox--hidden');
    ```
    **Punto clave**: Al ocultarlo, siempre debemos limpiar la imagen (`img.src = ""`). Si no lo haces, la próxima vez que abras el modal verás la foto anterior por un milisegundo antes de que cargue la nueva.

---

### El Concepto Crítico: El Bucle Infinito (El operador `%`)
Mencionaste que querías entender el operador de módulo (`%`). Es el truco matemático que hace que la galería nunca se detenga.

**La lógica**: `(posición + 1) % total`

*   Si tienes **4 fotos** (total = 4) y estás en la **foto 2**:
    *   `(2 + 1) = 3`. 
    *   `3 % 4 = 3` (El resto de dividir 3 entre 4 es 3). Vamos a la foto 3.
*   Si estás en la **última foto (la 3)** (recuerda que empezamos en 0, 1, 2, 3):
    *   `(3 + 1) = 4`.
    *   `4 % 4 = 0` (El resto de dividir 4 entre 4 es **cero**). 
    *   **¡Magia!** El sistema te devuelve automáticamente a la primera foto.



¿Te queda más claro por qué el modal necesita ese `z-index` tan alto y cómo el operador `%` nos ahorra tener que escribir mil `if/else`?
```