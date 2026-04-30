# ESTILOS A ELEMENTOS EN LA PAGINA:
Ahora que el esqueleto global ya se mueve y se adapta, ¿te parece si entramos a la Fase 3: Estética de las Fichas (BEM)?
Podemos darle estilo a los article (las castle-card) para que se vean como fichas reales con su borde, sombra y una tipografía más elegante, además de arreglar el menú de navegación.

## DISEÑO DE LAS ARTICLES
 Vamos a profundizar en el diseño de los artículos para que tengan ese acabado Junior+ que buscamos. Nos enfocaremos en la tipografía, el espaciado y un detalle de interacción (hover) que mejora mucho la experiencia de usuario.

Aquí tienes el bloque de CSS para refinar las castle-card. Fíjate bien en cómo usamos las variables de color y los selectores de BEM.

---
```CSS
/* --- Refinamiento de las Fichas (Articles) --- */

.castle-card {
    display: flex;
    flex-direction: column; /* Asegura que el contenido fluya hacia abajo */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Para una animación suave */
    border: 1px solid rgba(0,0,0,0.05);
}

/* Efecto al pasar el ratón: La ficha se eleva ligeramente */
.castle-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.castle-card__header {
    background-color: #f8f9fa; /* Un gris muy sutil para diferenciar el título */
    padding: 1.2rem;
}

.castle-card__name {
    margin: 0;
    font-family: 'Georgia', serif; /* Una fuente con serifa le da un toque histórico */
    color: #1a1a1a;
    letter-spacing: 0.5px;
}

.castle-card__meta {
    font-size: 0.85rem;
    color: #7f8c8d;
    text-transform: uppercase;
    margin-top: 4px;
}

/* Estilo para la lista de horarios dentro de la ficha */
.castle-card__info p {
    margin-bottom: 0.8rem;
    line-height: 1.5;
    color: #333;
}

/* Mejorando el componente Details/Summary */
.castle-card__details {
    background-color: #fffaf0; /* Un tono crema suave para la zona histórica */
    transition: all 0.3s ease;
}

.castle-card__details[open] {
    padding-bottom: 1rem;
}

.castle-card__summary {
    padding: 0.5rem;
    outline: none;
    user-select: none;
}

.castle-card__summary:hover {
    color: #a04000; /* Oscurece el naranja al pasar el ratón */
}

.castle-card__extra-content {
    padding: 1rem;
    font-size: 0.95rem;
    border-left: 3px solid #d35400; /* Una barra lateral naranja para destacar la reseña */
    margin: 0.5rem 0;
}
```
---
¿Qué hemos añadido aquí que es "Junior+"?
Transiciones (transition):  
No solo cambia el estado, sino que "vuela". El translateY(-5px) hace que la ficha parezca flotar cuando el usuario pone el cursor encima, lo que da una sensación de interactividad profesional.

Jerarquía Visual:  
Al poner el background-color grisáceo en el header y el tono crema en los detalles, ayudamos al usuario a escanear la información rápidamente.

Tipografía Mixta:  
 Usar una fuente con serifa (serif) para los nombres de los castillos refuerza el tema "histórico", mientras que el resto permanece en sans-serif para facilitar la lectura.

Estado [open]:  
 CSS permite dar estilos específicos al details cuando está abierto. Aprovechamos esto para añadir un borde lateral que haga que la reseña histórica se sienta como una cita importante.

# **EN ESTE MOMENTO LE QUITE EL COLOR DE FONDO QUE LE HABIA COLODA A LAS SECCIONES PARA HACERLAS VISUALES.**


## Próximo paso: La Barra Lateral (Sidebar)
¿Te parece si la diseñamos para que parezca una sección de "Información Útil" con iconos o viñetas personalizadas,

# BAS¡RRA LATERAL

Fase 5: Estética de la Barra Lateral (Sidebar)
Actualmente, la sección de "Información General" se ve un poco plana. Vamos a darle estilo para que parezca una tarjeta de consulta rápida.

Añade esto a tu CSS (antes de los Media Queries):

```css
/* --- Estilos de la Barra Lateral --- */

.sidebar {
    padding: 20px;
    background-color: #fcfcfc; /* Un blanco casi puro */
}

.sidebar__section {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px dashed #d35400; /* Un borde punteado le da estilo de "nota" */
}

.sidebar__title {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    text-align: center;
    border-bottom: 2px solid #f1c40f; /* Un detalle amarillo */
    padding-bottom: 5px;
}

.sidebar__subtitle {
    font-size: 1rem;
    margin-top: 1rem;
    color: #e67e22;
}

.sidebar__list {
    list-style: none; /* Quitamos los puntos por defecto */
    margin-top: 10px;
}

.sidebar__list li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
}

/* Un pequeño detalle: añadir un emoji o viñeta antes de cada item */
.sidebar__list li::before {
    content: "⛩️";
    margin-right: 8px;
    font-size: 0.8rem;
}
```
---
# UNIFICANDO EL NAV 
Fase 6: Unificando el Header y Nav
En tu captura, el Header y el Nav se ven separados y el menú todavía tiene los puntos azules de los enlaces. Vamos a aplicar el bloque de la fase anterior para que se vea como una unidad sólida.

Aplica esto para que el Header tenga peso visual:

---
```css
.header {
    background-color: #1a1a1a;
    color: white;
    padding: 3rem 1rem;
    text-align: center;
}

.header__subtitle {
    color: #f1c40f; /* Color oro para el subtítulo */
    font-style: italic;
    opacity: 0.9;
}  
```
---
Aqui el NAV:

---
```css
/* --- Estilos de Navegación (Nav) --- */

.nav {
    background-color: #2c3e50; /* Azul oscuro profundo */
    padding: 0; /* Quitamos padding para que los enlaces toquen los bordes si es necesario */
}

.nav__list {
    list-style: none; /* Quitamos los puntos de la lista */
    display: flex;
    flex-direction: column; /* Apilados verticalmente para móvil */
    padding: 0;
}

.nav__item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Separador sutil entre botones */
}

.nav__link {
    display: block; /* Para que todo el ancho sea clicable (mejor accesibilidad) */
    color: #ffffff;
    text-decoration: none;
    padding: 15px 20px;
    text-align: center;
    font-weight: 500;
    transition: all 0.3s ease;
}

/* Efecto Hover para los enlaces */
.nav__link:hover, 
.nav__link:focus {
    background-color: #34495e;
    color: #f1c40f; /* Color oro al pasar el ratón */
    outline: none;
}


```
---


¿Qué notarás al aplicar esto?
Sidebar: Pasará de ser texto suelto a un cuadro de información destacado con iconos de torii (⛩️).

Header: Se volverá oscuro y elegante, haciendo que el título "Japón Histórico" resalte mucho más.

Nav: (Si aplicas el código del paso anterior) Se verá como una barra de herramientas moderna.

Un detalle final de Junior+:
En tu código actual del main-layout, asegúrate de tener un color de fondo suave para que las tarjetas blancas "salten" a la vista.

---
```css
body {
    background-color: #f0f0f0; /* Un gris muy claro de fondo general */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```
---

# AJUSTE MEDIA QUERY
Actualizando el Media Query (Final del archivo)
Ahora, para que en pantallas grandes (Desktop) se pongan uno al lado del otro, debemos actualizar la sección @media (min-width: 768px) que ya tienes. Asegúrate de que incluya esto:

---
```css
@media (min-width: 768px) {
    /* ... (aquí va tu configuración de grid-template-areas que ya hicimos) ... */

    .nav__list {
        flex-direction: row; /* ¡Magia! Se ponen en horizontal */
        justify-content: center; /* Centrados en la barra */
    }

    .nav__item {
        border-bottom: none; /* Quitamos la línea separadora en desktop */
        border-right: 1px solid rgba(255, 255, 255, 0.1); /* Separador vertical opcional */
    }

    .nav__item:last-child {
        border-right: none; /* El último no lleva borde */
    }
}
```
---

¿Por qué lo hacemos así? (Nivel Junior+)
display: block en los enlaces: Es un error común de principiante dejar el enlace como "inline". Al ponerlo como bloque, el usuario puede hacer clic en cualquier parte del rectángulo del menú, no solo encima de las letras. Esto es vital para la accesibilidad y usuarios con movilidad reducida.

transition: Añade esa sensación de "suavidad" cuando el color cambia, lo que hace que la web se sienta más cara y bien construida.

:focus: No solo usamos :hover (ratón). Usar :focus permite que las personas que navegan usando la tecla TAB (porque no pueden usar ratón) vean claramente dónde están paradas.

Con esto aplicado, tu Header (oscuro), Nav (azul con letras oro/blanco) y el contenido deberían crear un contraste perfecto.

## Logrado hasta el momento:

Contraste: El Header oscuro con el subtítulo dorado se ve elegante y temático.

Identidad: La barra lateral con los iconos de torii y el borde punteado naranja le da mucha personalidad.

Limpia: La navegación ya no parece una lista de links, sino una barra de menú profesional.

Interactividad: Las tarjetas con sus sombras y el componente de "Leer reseña" invitan a explorar.

El Toque Final de Integridad
La tarjeta del castillo parece estar "pegada" al borde del menú. Para que el diseño respire y sea perfecto, te sugiero añadir un gap (espacio) y un padding global al contenedor principal.

Añade (o ajusta) esto en tu CSS:

Hay que distribuir este CSS las areas del CSS que le corresponden..
Es decir, el main-content y footer van en el area superior del CSS y el Media query de 768 dentro de ese Media ( Sin el @Media pues ya esta en el css)

---
```css
/* Ajuste en el contenedor principal para que nada toque los bordes */
.main-content {
    padding: 40px 20px; /* 40px arriba/abajo, 20px a los lados */
}

/* Espaciado entre la columna principal y la lateral en Desktop */
@media (min-width: 768px) {
    .main-layout {
        column-gap: 40px; /* Aumentamos el espacio entre Main y Aside */
        padding: 0 20px;  /* Margen a los lados de la web completa */
    }
}

/* Estilo para el Footer (que en la captura se ve blanco) */
.footer {
    background-color: #1a1a1a; /* Negro como el header para cerrar el diseño */
    color: white;
    padding: 3rem 1rem;
    margin-top: 40px; /* Separación del contenido */
}
```
---

# ¿Cumplimos el Reto?
Repasemos los requisitos:

Semántica: Usamos header, nav, main, article, aside, footer, details, summary, figure. LOGRADO.

Accesibilidad: Alt en imágenes, jerarquía de títulos, contrastes altos, aria-label. LOGRADO.

BEM: Estructura block__element--modifier respetada. LOGRADO.

Grid & Responsive: El layout cambia de 1 columna a 2 según el tamaño. LOGRADO.

Contenido: Los 3 castillos con sus fichas y contenido extra. LOGRADO.