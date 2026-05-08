// Importamos la data galeriasEstructuras para usar en funcion renderizadoPortadas
import { galeriasEstructura } from './data.js';



/***************************************************************** */
/** CARGADOR DE IMAGEN ASINCRONO **
 * Carga una imagen de forma asíncrona
 * @param {string} url - Dirección de la imagen
 * @returns {Promise} - Resuelve con la imagen cargada o rechaza si hay error
 */
const cargarImagenAsync = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image(); // Objeto de imagen en memoria
        img.src = url;
        
        // Si la imagen carga correctamente
        img.onload = () => resolve(img);
        
        // Si hay un error (link roto, sin internet, etc.)
        img.onerror = () => reject(new Error(`No se pudo cargar: ${url}`));
    });
};

/***************************************************************** */
/** renderizado en HTML segun clases BEM  */
const galleryGrid = document.getElementById('galleryGrid');

function renderizarPortadas() {
    galeriasEstructura.forEach((tema) => {
        const card = document.createElement('article');
        card.className = 'gallery-item'; // Clase BEM
        
        card.innerHTML = `
            <img src="${tema.portada}" alt="${tema.titulo}" class="gallery-item__img">
            <div class="gallery-item__info">
                <h3 class="gallery-item__title">${tema.titulo}</h3>
            </div>
        `;
        
        // Al hacer clic, abrimos esa galería específica
        card.addEventListener('click', () => abrirGaleria(tema.id));
        
        galleryGrid.appendChild(card);
    });
}

renderizarPortadas();

/**************************************************************** */
/** MODAL  */
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
/**************************************************************************** */
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
    console.log("Boton next presionado");
    indiceImagenActual = (indiceImagenActual + 1) % galeriaActiva.imagenes.length;
    aplicarEfectoYMostrar();
});

// Botón Anterior
const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
btnPrev.addEventListener('click', () => {
    // Bucle infinito hacia atrás
     console.log("Boton anteror presionado");
    indiceImagenActual = (indiceImagenActual - 1 + galeriaActiva.imagenes.length) % galeriaActiva.imagenes.length;
    aplicarEfectoYMostrar();
});

// Botón Cerrar (La X)
const btnClose = lightbox.querySelector('.lightbox__close');
btnClose.addEventListener('click', () => {
    console.log("Intentando cerrar el modal...");
    lightbox.classList.add('lightbox--hidden');
    lightboxImg.src = ""; // Liberar memoria
});

// Cierre con la tecla ESC (Muy importante para la UX)
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains('lightbox--hidden')) {
        console.log("Tecla ESC detectada, cerrando...");
        btnClose.click(); // Dispara la misma lógica de la X
    }
});

// Función auxiliar para aplicar el efecto WAAPI al cambiar
async function aplicarEfectoYMostrar() {
    await mostrarImagen(indiceImagenActual);
    const fotogramas = efectosEspeciales[galeriaActiva.id];
    lightboxImg.animate(fotogramas, { duration: 500, easing: 'ease-out' });
}
/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */