Las Media Queries son los "puntos de quiebre" (breakpoints) que permiten que una web deje de ser estática y se convierta en Responsive.

Vamos a diseñar una "Tarjeta de Perfil de Héroe". En móviles se verá como una columna (vertical) y en pantallas grandes se transformará en una fila (horizontal), sobre los `768px`

1. El HTML (Estructura BEM)
Usaremos el bloque hero-card. Fíjate cómo los elementos están claramente definidos.

---
```xml
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio Media Queries BEM</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <main class="container">
        <article class="hero-card">
            <div class="hero-card__width-indicator"><span id="width-value">0</span>px</div>
            
            <div class="hero-card__image-wrapper">

                <img src="https://placehold.co/300x200" alt="Héroe" class="hero-card__img">
            </div>

            <div class="hero-card__content">
                <h2 class="hero-card__title">Explorador Estelar</h2>
                <p class="hero-card__description">
                    Viaja a través de las galaxias para descubrir nuevos mundos. 
                    Un diseño que se adapta a cualquier dispositivo, desde naves espaciales hasta smartwatches.
                </p>
                <button class="hero-card__button hero-card__button--primary">Contactar</button>
            </div>

        </article>
    </main>
    <script>
        const widthDisplay = document.getElementById('width-value');
        function updateWidth() {
            widthDisplay.textContent = window.innerWidth;
        }
        window.addEventListener('resize', updateWidth);
        updateWidth();
    </script>

</body>
</html>

```
---

El Script en JavaScript determina cual es el ancho actual de la pantalla y lo pasa al elemento cuyo id="width-value" , es decir esta instruccion:  
   `<div class="hero-card__width-indicator"><span id="width-value">0</span>px</div>`.

   Se coloca el `<span>`para dar mas control y escribir el "px" despues del valor del ancho de pantalla. 

   Si vemos la class="hero-card__width-indicator" en la misma linea y revisaos el CSS veremos que segun el ancho de pantalla esta clase tendra diferentes asignaciones en su contenido, como por ejemplo:

.hero-card__width-indicator::before {
    `content: "Viewport: Móvil (< 768px)-Actual:"`;
}

donde tenemos el Pseudo-elementos (::before): que  CSS lo usa para "inyectar" texto que no existe en el HTML. Es ideal para etiquetas de estado o indicadores técnicos. Asi como hay un ::before hay un ::after, si se quiere que se inyecte despues del elemento. Aqui queremos que sea antes pues despues el script inyectara el ancho de la pantalla y con el span se le cooca en px.

Propiedad `content:` Es la única forma en CSS de cambiar el texto de un elemento dependiendo de la Media Query.


2. El CSS (Mobile First)
La mejor práctica actual es el "Mobile First": escribir primero el código para móviles (que es más sencillo) y luego añadir las Media Queries para pantallas más grandes.

---
```css
/* ==========================================================================
   ESTILOS BASE (MÓVIL POR DEFECTO)
   ========================================================================== */

body {
    font-family: sans-serif;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    padding: 20px;
}

/* Contenedor del ejercicio */
.container {
    width: 100%;
    max-width: 900px;
}

/* BLOQUE: hero-card
   En móvil, los elementos se apilan naturalmente (display: block) */
.hero-card {
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column; /* Apilado vertical en móvil */
}

/* ELEMENTO: Imagen 
   Queremos que ocupe todo el ancho en móvil */
.hero-card__image-wrapper {
    width: 100%;
    height: 250px;
}

.hero-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Evita que la imagen se deforme al estirarse */
}

/* ELEMENTO: Contenido */
.hero-card__content {
    padding: 20px;
    text-align: center; /* Centrado para lectura cómoda en móvil */
}

.hero-card__title {
    margin: 0 0 10px 0;
    color: #2c3e50;
}

.hero-card__description {
    color: #7f8c8d;
    line-height: 1.5;
    margin-bottom: 20px;
}

/* ELEMENTO: Botón */
.hero-card__button {
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;
}

.hero-card__button--primary {
    background-color: #3498db;
    color: white;
}

/* ==========================================================================
   INDICADOR DE ANCHO (DEBUGGER VISUAL)
   ========================================================================== */

.hero-card {
    position: relative; /* Para que el indicador se posicione respecto a la tarjeta */
}

.hero-card__width-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #00ff00; /* Color estilo terminal */
    padding: 5px 10px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    z-index: 100;
}

/* Estado por defecto: Móvil (< 768px) */
.hero-card__width-indicator::before {
    content: "Viewport: Móvil (< 768px)-Actual:";
}

/* ==========================================================================
   MEDIA QUERY (TABLET / DESKTOP)
   Se activa cuando la pantalla mide 768px o más.
   ========================================================================== */

@media (min-width: 768px) {
    
    /* Cambiamos la dirección de la tarjeta a horizontal */
    .hero-card {
        flex-direction: row; /* Imagen a la izquierda, texto a la derecha */
        align-items: center;
    }

    /* La imagen ahora ocupa solo la mitad de la tarjeta */
    .hero-card__image-wrapper {
        width: 50%;
        height: 100%; /* Se ajusta a la altura del contenido */
    }

    .hero-card__content {
        width: 50%;
        padding: 40px;
        text-align: left; /* Alineación profesional para pantallas anchas */
    }

    /* Aumentamos el tamaño del título solo en desktop */
    .hero-card__title {
        font-size: 2rem;
    }

    .hero-card__width-indicator {
        background-color: #2980b9;
        color: white;
    }

    /* Mientras el ancho de pantalla sea <=768 mostrara este mensaje */
    .hero-card__width-indicator::before {
        content: "Viewport: Tablet/Desktop (>= 768px)-Actual:";
    }



} 
/* Pantallas Grandes */
@media (min-width: 1200px) {
    .hero-card__width-indicator {
        background-color: #27ae60;
    }
    .hero-card__width-indicator::before {
        content: "Viewport: Large Desktop (>= 1200px)-Actual:";
    }
}

```
---  

## ¿Por qué se hace así? (Análisis Técnico)
### Mobile First:   
Es más fácil añadir complejidad que quitarla. Al definir el diseño vertical primero, la Media Query solo tiene que cambiar el flex-direction a row.

### object-fit: cover:  
Es una propiedad vital. Permite que la imagen llene el contenedor (que cambia de forma de vertical a horizontal) sin aplastarse ni pixelarse.

Unidades Relativas:  
Al usar width: 100% en móvil y 50% en desktop, la tarjeta se estira suavemente entre los diferentes tamaños de pantalla antes de llegar al siguiente breakpoint.

BEM:  
Fíjate que incluso dentro de la Media Query, seguimos usando las mismas clases. No creamos clases nuevas para desktop, simplemente redefinimos las que ya existen dentro de la regla @media.

# MOSTRAR EL ANCHO DE PANTALLA PARA VER CUANDO SE ACTIVA EL @MEDIA QUERY
Para mostrar el ancho de la pantalla en tiempo real dentro del diseño, tenemos un pequeño desafío: CSS no puede "escribir" el número exacto del ancho por sí solo (necesitaría JavaScript para ser dinámico al 100%).

Sin embargo, para este ejercicio de aprendizaje, podemos usar un truco técnico avanzado usando el pseudo-elemento :before y Content. Vamos a crear una "etiqueta flotante" que cambie su texto según el breakpoint en el que nos encontremos.

Aquí tienes la actualización para tu laboratorio:

1. El HTML (Añadir un indicador)
Añadiremos un pequeño div dentro de la tarjeta para que sirva de visor.

---
```XML
<article class="hero-card">
    <div class="hero-card__width-indicator"><span id="width-value">0</span>px</div>  <!--Esta es la linea que muestra el rango en que esta y el ancho real obtenido con javascript -->
    
    <div class="hero-card__image-wrapper">
        <img src="https://via.placeholder.com/400x300" alt="Héroe" class="hero-card__img">
    </div>
    </article>  

    ```
    ---

    Resto de la explicacion ya lo explique por la linea 55.