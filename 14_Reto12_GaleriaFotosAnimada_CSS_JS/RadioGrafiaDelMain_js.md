# RADIOGRAFIA DEL MAIN POR BLOQUES.

## IMPORTACIONES Y VARIABLES DE ESTADO.

Bloque 1: Importación y Variables de Estado
Estas líneas preparan el terreno antes de que ocurra cualquier acción.

```JS
import { galeriasEstructura } from './data.js';
```

Qué hace: Trae la variable galeriasEstructura desde el otro archivo.

Propósito: Mantener los datos separados de la lógica para que el código sea ordenado.

```JS
let galeriaActiva = null;
let indiceImagenActual = 0;
```

Qué hace: Crea dos variables "vacías" o con valor inicial.

Propósito: Son la memoria a corto plazo del programa. Necesitamos saber qué galería clickeó el usuario (galeriaActiva) y por qué número de foto va (indiceImagenActual) para que los botones de "Siguiente" funcionen.


## CARGADOR ASINCRONO - LA PROMESA

Bloque 2: El Cargador Asíncrono (La Promesa)
Esta es la parte más técnica del proyecto.

```JS
const cargarImagenAsync = (url) => {
    return new Promise((resolve, reject) => {
```  

Qué hace: Define una función que devuelve una Promise.

Propósito: Las imágenes tardan en descargar. Una "Promesa" le dice a JavaScript: "No sigas con la siguiente instrucción hasta que yo te avise si esto salió bien (resolve) o mal (reject)".

---
```JS
        const img = new Image(); 
        img.src = url;

```
---

Qué hace: Crea un objeto de imagen invisible en la memoria del navegador y le asigna la ruta (url).

Propósito: Forzar al navegador a empezar la descarga de la imagen antes de mostrarla en el modal.

---
```JS
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`No se pudo cargar: ${url}`));
```
---

Qué hace: Escucha eventos del navegador. onload ocurre cuando la descarga termina; onerror cuando falla (link roto).

Propósito: Confirmar que la imagen ya está "en las manos" del navegador para evitar que el usuario vea cómo la foto aparece de a poco.

Bloque 3: Renderizado de Portadas
Aquí es donde se "dibuja" la pantalla inicial.

```JS
galeriasEstructura.forEach((tema) => {
```

Qué hace: Un ciclo que recorre cada tema que definí en data.js.

Propósito: No escribir HTML a mano. Si tienes 3 temas, el ciclo corre 3 veces.

```js
    const card = document.createElement('article');
    card.className = 'gallery-item';

```
Qué hace: Crea una etiqueta `<article>` en memoria y le pone la clase de CSS.

Propósito: Construir la "tarjeta" visual de cada galería dinámicamente.

```js
    card.addEventListener('click', () => abrirGaleria(tema.id));
```
---
Qué hace: Le pone un "oído" a la tarjeta para detectar clics.

Propósito: Que al hacer clic en una portada, el programa sepa exactamente qué ID de galería debe abrir.

Bloque 4: Control del Modal (Abrir y Mostrar)

---
```js

async function abrirGaleria(temaId) {
    galeriaActiva = galeriasEstructura.find(t => t.id === temaId);

```
---
Qué hace: async indica que habrá esperas. .find busca el objeto completo del tema usando el ID.

Propósito: Cargar en nuestra "memoria" (galeriaActiva) toda la información de la galería seleccionada.

```js
    lightbox.classList.remove('lightbox--hidden');
```
Qué hace: Quita la clase CSS que tiene el display: none.

Propósito: Hacer que el modal aparezca visualmente en pantalla.

---
```js
async function mostrarImagen(index) {
    const url = galeriaActiva.imagenes[index];
    loader.style.display = 'block';
```
---     
Qué hace: Obtiene la dirección de la foto del array. Muestra el texto o icono de "Cargando".

Propósito: Dar feedback al usuario para que sepa que la aplicación está trabajando.

```js
    await cargarImagenAsync(url);
```

Qué hace: Aquí está el truco. El await hace que la función se detenga ahí mismo.

Propósito: Esperar a que la función del Bloque 2 diga "¡Ya cargué!". Sin esto, la animación ocurriría sobre una imagen vacía.

Bloque 5: Navegación (Bucle Infinito)

```js
indiceImagenActual = (indiceImagenActual + 1) % galeriaActiva.imagenes.length;
```
Qué hace: Suma 1 al índice y aplica el módulo (%).

Propósito: Es el "girar el disco". Si llegas al final del array, el módulo te devuelve al 0.

```js
lightboxImg.animate(efectosEspeciales[galeriaActiva.id], { duration: 600 });
```

Qué hace: Ejecuta el método WAAPI sobre la imagen.

Propósito: Aplicar la animación (escala, rotación, etc.) que definimos para ese tema específico.

Resumen de Propósitos
Variables globales: Controlar el estado.

Promesas/Async: Controlar el tiempo (esperar a internet).

Módulos/Import: Controlar el orden de los archivos.

Event Listeners: Controlar la interacción del usuario.

Puntos clave para recordar mañana:
El "Cerebro" (main.js): No tiene las fotos, solo sabe cómo pedirlas basándose en lo que dice el archivo de datos.

La "Promesa": Es el guardia de seguridad que dice "alto" hasta que la imagen llegue completa desde internet.

El "Módulo" (%): Es el truco matemático que dobla una lista de fotos para que nunca tenga un final.

El "Z-index": Es el que decide quién está arriba en la pila de papeles de la pantalla.

Un pequeño "Tip" para tu estudio:
Cuando revises el código, intenta cambiarle el nombre a una variable (por ejemplo, cambia galeriaActiva por miGaleria) y busca todos los lugares donde aparece. Verás cómo todo está conectado como un hilo invisible.