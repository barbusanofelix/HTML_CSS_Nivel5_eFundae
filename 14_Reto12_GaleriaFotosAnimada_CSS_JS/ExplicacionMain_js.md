# VEAMOS EL DATALLE DEL MAIN.JS

$ste archivo es el "Director de Orquesta": no contiene las imágenes, pero sabe dónde están, cómo pedirlas y cómo hacer que bailen.

Aquí tienes el desglose por funciones, siguiendo el orden en que se ejecutan:

1. Las Variables de Estado (El GPS)

---
```JS
let galeriaActiva = null;
let indiceImagenActual = 0;
```
---

Qué hacen:   
Guardan la "memoria" de la aplicación. Sin ellas, cuando hagas clic en "Siguiente", el programa no sabría de qué galería estamos hablando ni en qué número de foto íbamos. Son variables globales dentro del módulo para que todas las funciones puedan leerlas y modificarlas.

2. Función cargarImagenAsync(url) (La Promesa)

---
```
function cargarImagenAsync(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(`Error al cargar: ${url}`);
    });
}
```
---

Instrucción Clave: new Promise.

Explicación: Internet es incierto. Esta función le dice al navegador: "Te prometo que te avisaré cuando la imagen esté lista".

img.onload: Si los píxeles llegan bien, se ejecuta resolve.

img.onerror: Si el link está roto, se ejecuta reject.

Por qué es vital: Evita que el usuario vea una imagen cargándose a trozos o un cuadro blanco.

3. Función mostrarImagen(index) (La Inteligencia)
Es la función más compleja porque usa async/await.

---
```js
async function mostrarImagen(index) {
    try {
        const url = galeriaActiva.imagenes[index];
        // 1. Mostrar loader y ocultar imagen anterior
        loader.style.display = 'block'; 
        lightboxImg.style.display = 'none';

        // 2. Esperar a que la imagen descargue realmente
        await cargarImagenAsync(url); 

        // 3. Cuando llega, la mostramos y aplicamos WAAPI
        lightboxImg.src = url;
        loader.style.display = 'none';
        lightboxImg.style.display = 'block';
        
        aplicarEfectoWAAPI(lightboxImg); // La animación
    } catch (error) {
        console.error(error);
    }
}
```
---
Instrucción Clave: await. Detiene la ejecución de esta función hasta que la promesa de cargarImagenAsync se cumpla.

Instrucción Clave: aplicarEfectoWAAPI. Llama al motor de animaciones justo cuando la imagen aparece.

4. Función abrirGaleria(idTema) (El Iniciador)

---
```js
function abrirGaleria(idTema) {
    galeriaActiva = galerias.find(g => g.id === idTema);
    indiceImagenActual = 0;
    lightbox.classList.remove('lightbox--hidden');
    mostrarImagen(indiceImagenActual);
}
```
---
Instrucción Clave: .find(). Busca en tu archivo data.js el objeto que coincida con el clic del usuario.

Punto Crítico: Resetea indiceImagenActual = 0 para que siempre que abras una galería comience por la primera foto.

5. Navegación: siguienteImagen() y anteriorImagen()
Aquí usamos el famoso Módulo que acabamos de explicar.

---
```js
function siguienteImagen() {
    indiceImagenActual = (indiceImagenActual + 1) % galeriaActiva.imagenes.length;
    mostrarImagen(indiceImagenActual);
}
```
---

Instrucción Clave: %. Garantiza que si estás en la última foto, la siguiente sea la primera. Es el "bucle infinito".

6. El Motor de Animación: aplicarEfectoWAAPI(elemento)


---
```js
function aplicarEfectoWAAPI(elemento) {
    const efecto = efectosEspeciales[galeriaActiva.id] || efectosEspeciales.default;
    elemento.animate(efecto.keyframe, efecto.options);
}
```
---

Instrucción Clave: .animate(). Es el método nativo del navegador (WAAPI).

Lógica: Busca en un objeto de configuración (que definimos aparte) qué animación le toca a esta galería según su id. Si no hay una específica, usa la default.

7. Inicialización: renderizarPortadas()
Esta función se ejecuta apenas carga la web.

---
```js
function renderizarPortadas() {
    galerias.forEach(galeria => {
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.innerHTML = `
            <img src="${galeria.imagenes[0]}" class="gallery-item__img">
            <div class="gallery-item__info"><h3>${galeria.titulo}</h3></div>
        `;
        card.onclick = () => abrirGaleria(galeria.id);
        grid.appendChild(card);
    });
}
```
---

Instrucción Clave: innerHTML. Crea el esqueleto visual de cada tarjeta de forma dinámica.

Instrucción Clave: card.onclick. Le pega un "oído" a cada tarjeta para que sepa que debe abrir el modal al recibir un clic.

Resumen del flujo:
Carga: renderizarPortadas crea los botones.

Clic: abrirGaleria identifica cuál pulsaste y "abre las cortinas" del modal.

Carga Invisible: mostrarImagen descarga la foto en secreto (await).

Espectáculo: Cuando la foto está lista, se muestra y aplicarEfectoWAAPI le da el toque visual.