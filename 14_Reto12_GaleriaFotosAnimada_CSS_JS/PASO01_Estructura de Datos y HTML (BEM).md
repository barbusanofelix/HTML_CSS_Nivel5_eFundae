Antes de programar, necesitamos organizar la información.   
Elegi hacer 3 temas de Galeria: WAAPI - Transiciones y Transformaciones

WAAPI= Web Animation API y Transiciones y Transformaciones son CSS-Transition y CSS-Transform

Busque en Internet y copie los links de la direccion de las imagenes : Cargarlas directamente de internet, y asi aplicar asincronia.

Estas imagenes la cargaremos en un modelo de datos, que llamaremos data.js y lo colocare en el directorio raiz. Para accesarlo hay que usar `./data.js` que le dice a javaScript que el archivo data.js se encuentra en este mismo directorio, ("./") donde esta el main.js que llamara a data.js: 

---
```js
export const galeriasEstructura = [
    {
        id: "transiciones",
        titulo: "CSS Transiciones",
        portada: "https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2019/09/CSS-Transition-1.png",
        imagenes: [
            "https://media.geeksforgeeks.org/wp-content/uploads/20201208083657/transition.PNG",
            "https://static.d-libro.com/01-course-content-images/1011-11-HTML-CSS-Coding-with-AI/010-main-figures/transition-property-in-css-id101111060110.webp",
            "https://codingartistweb.com/wp-content/uploads/2022/07/day-night-01.png",
            "https://techsoftechs.com//assets/post/details/css-animation-and-transitions_1687448319.webp"
        ]
    },
    {
        id: "transformaciones",
        titulo: "CSS Transformaciones",
        portada: "https://polypane.app/blogs/transforms/transforms.svg",
        imagenes: [
            "https://cdn.shortpixel.ai/spai/q_lossy+w_971+to_auto+ret_img/codigonautas.com/wp-content/uploads/2025/11/Ejemplo-css-transform-origin.png",
            "https://i.ytimg.com/vi/qdeIy9_fbxE/maxresdefault.jpg",
            "https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/12/webkit-transform.jpg?fit=1200%2C600&ssl=1&resize=350%2C200"
        ]
    },
    {
        id: "waapi",
        titulo: "Web Animation API (WAAPI)",
        portada: "https://animejs.com/media/pages/documentation/web-animation-api/when-to-use-waapi/639d6e479b-1777477889/generated-og-image.en.png",
        imagenes: [
            "https://i0.wp.com/css-tricks.com/wp-content/uploads/2017/06/css-vs-js.png?fit=1200%2C600&ssl=1",
            "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Web_Animations_API_Concepts/waapi_timing_diagram_white.png",
            "https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/06/YeWYFmww.jpeg"
        ]
    }
];
```
---

El HTML - Metodologia BEM.
ATENCION con la etiqueta script. Debe incluir module para que funcione la importacion y exportacion de archivos , pues data.js lo separe para tener la data por un lado y la lògica por otro en el main.js

```html
<body>
<!-- Hacer el HTML: ! + [tab] e incluir el siguiente codigo dentro del body -->
<!-- Contenedor de las Portadas de Galerías -->
<main class="gallery-container">
    <h1 class="gallery-container__title">Mis Galerías de Aprendizaje</h1>
    <section id="galleryGrid" class="gallery-grid">
        <!-- Se generará dinámicamente con JS -->
    </section>
</main>

<!-- Ventana Modal (Lightbox) -->
<div id="lightbox" class="lightbox lightbox--hidden">
    <button class="lightbox__close" aria-label="Cerrar">&times;</button>
    
    <div class="lightbox__content">
        <button class="lightbox__nav lightbox__nav--prev">❮</button>
        
        <div class="lightbox__image-container">
            <img src="" alt="Imagen expandida" class="lightbox__image">
            <div class="lightbox__loader">Cargando...</div>
        </div>
        
        <button class="lightbox__nav lightbox__nav--next">❯</button>
    </div>
</div>
<!-- VITAL COLOCR module para exportar e importar scripts. Sin module no importaria data.js hacia main.js -->
 <script type="module" src="main.js"></script>
<body/>

```