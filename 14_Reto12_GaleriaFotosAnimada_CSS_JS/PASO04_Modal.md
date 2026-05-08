🖼️ PASO 4: El Controlador del Modal (Lightbox)
Aquí gestionamos el estado de la galería abierta: qué tema es, qué imagen estamos viendo y cómo navegar.


```JS

let galeriaActiva = null;
let indiceImagenActual = 0;

// Referencias al DOM del Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__image');
const loader = lightbox.querySelector('.lightbox__loader');

/**
 * Abre el modal y prepara el tema seleccionado
 */
async function abrirGaleria(temaId) {
    // Buscamos los datos del tema en nuestro Array de objetos
    galeriaActiva = galeriasEstructura.find(t => t.id === temaId);
    indiceImagenActual = 0;
    
    lightbox.classList.remove('lightbox--hidden');
    await mostrarImagen(indiceImagenActual);
}

/**
 * Función central asíncrona para cambiar de imagen
 */
async function mostrarImagen(index) {
    const url = galeriaActiva.imagenes[index];
    
    // 1. Preparar UI
    loader.style.display = 'block'; // Mostrar "Cargando..."
    lightboxImg.style.opacity = '0'; // Ocultar imagen anterior
    
    try {
        // 2. ESPERAR a que la imagen descargue (Asincronía pura)
        await cargarImagenAsync(url);
        
        // 3. Éxito: Colocar la imagen y mostrarla
        lightboxImg.src = url;
        loader.style.display = 'none';
        
        // Aplicamos la animación de entrada (esto lo puliremos con WAAPI en el siguiente paso)
        lightboxImg.style.opacity = '1';
        
    } catch (error) {
        console.error(error);
        loader.textContent = "❌ Error al cargar la imagen";
    }
}

```
🧠 Puntos Críticos de esta Fase
Estado Global Temporal: Usamos galeriaActiva e indiceImagenActual para saber en todo momento qué está viendo el usuario sin tener que leerlo del HTML (usamos el JS como "fuente de verdad").

Try/Catch: Es fundamental al usar await cargarImagenAsync. Si un link de los que me pasaste falla, la aplicación no se detiene; simplemente muestra el mensaje de error en el modal.

Transiciones Visuales: Al poner opacity = '0' antes del await y '1' después, evitamos el "parpadeo" brusco de cambiar una foto por otra.

## Conectando los botones (JavaScript) - SIN ESTO LOS BOTONES DE SALIR, AVANZAR O RETROCEDER NO FUNCIONAN.
AñadI este bloque al final de tu main.js. 
Nota: incluÍ el objeto de efectos WAAPI para que ya empiece a verse el movimiento:

---
```JS
// --- NUEVO: DICCIONARIO DE ANIMACIONES ---
const efectosEspeciales = {
    "transiciones": [{ opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }],
    "transformaciones": [{ transform: 'rotate(-15deg)', opacity: 0 }, { transform: 'rotate(0)', opacity: 1 }],
    "waapi": [{ transform: 'translateY(50px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }]
};

// --- ESCUCHADORES DE EVENTOS DEL MODAL ---

// Botón Siguiente
const btnNext = lightbox.querySelector('.lightbox__nav--next');
btnNext.addEventListener('click', () => {
    // Bucle infinito: si llegamos al final, vuelve al 0
    indiceImagenActual = (indiceImagenActual + 1) % galeriaActiva.imagenes.length;
    aplicarEfectoYMostrar();
});

// Botón Anterior
const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
btnPrev.addEventListener('click', () => {
    // Bucle infinito hacia atrás
    indiceImagenActual = (indiceImagenActual - 1 + galeriaActiva.imagenes.length) % galeriaActiva.imagenes.length;
    aplicarEfectoYMostrar();
});

// Botón Cerrar (La X)
const btnClose = lightbox.querySelector('.lightbox__close');
btnClose.addEventListener('click', () => {
    lightbox.classList.add('lightbox--hidden');
    lightboxImg.src = ""; // Liberar memoria
});

// Función auxiliar para aplicar el efecto WAAPI al cambiar
async function aplicarEfectoYMostrar() {
    await mostrarImagen(indiceImagenActual);
    const fotogramas = efectosEspeciales[galeriaActiva.id];
    lightboxImg.animate(fotogramas, { duration: 500, easing: 'ease-out' });
}

```
---

2. Sin ajustar el CSS los botones se ven pequeños y mal ubicados. 
 Necesitamos forzarlos a que se posicionen sobre el fondo oscuro, con CSS. 
 Actualizamos  estas clases en style.css:


 ```css
/* Asegurar que el contenedor del modal sea un Flexbox centrado */
.lightbox {
    display: flex; /* Esto ya lo tenías, pero asegúrate */
    position: fixed;
    z-index: 2000;
}

/* Posicionamiento de la X de cierre */
.lightbox__close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 50px; /* ¡Hazla grande! */
    color: white;
    background: none;
    border: none;
    cursor: pointer;
}

/* Botones laterales de navegación */
.lightbox__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 40px;
    padding: 20px;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
    z-index: 2100;
}

.lightbox__nav:hover {
    background: rgba(255, 255, 255, 0.3);
}

.lightbox__nav--prev { left: 20px; }
.lightbox__nav--next { right: 20px; }

/* El contenedor de la imagen para que no tape los botones */
.lightbox__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
 ```

 3. Resumen / Observaciones:
Z-Index: A veces los botones quedan "debajo" del fondo oscuro si no les pones un z-index mayor.

Posicionamiento Absolute: Sin position: absolute, los botones se comportan como texto normal y se ponen donde pueden (por eso estaban chiquititos,  a un lado, sin los estilos).

Listeners: JavaScript es como un auto; puedes tener el motor (abrirGaleria), pero si no conectas el volante (addEventListener), no puedes dirigirlo.

Tip de experto: Si quieres que la "X" se vea mejor, usa &times; en el HTML del botón, es el símbolo matemático de multiplicación que queda perfecto como icono de cierre.
