# Fase 3. Layout Maestro.

Se empieza con la estrategia de hacer el layout con Movil Fist y limpieza inicial de estilos haciendo que las cajas incluyan su pading y margen en la dimension de la caja:

## ESTILO BASE 
---
```css
/* Limpieza inicial */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* El contenedor Grid */
.main-layout {
    display: grid;
    /* Mapa de la página */
    grid-template-areas: 
        "header"
        "nav"
        "main"
        "aside"
        "footer";
    min-height: 100vh;
}

/* Asignación de áreas a las etiquetas semánticas */
.header { 
    grid-area: header;
    background-color: chartreuse; 
}
.nav    { 
    grid-area: nav;
    background-color: rgb(152, 215, 152);
 }
.main-content { 
    grid-area: main;
    background-color: gold; }
.sidebar { 
    grid-area: aside;
    background-color: cyan; 
}
.footer  { 
    grid-area: footer; 
    background-color: blueviolet;
}

```
---    
El grid anterior solo coloca todo los elementos en filas, que ocupan el ancho de la pantalla y UNA columna 
Los background-color se los agregue yo para ver las areas en pantalla y entender mejor.

### La  class="main-layout" esta el contenedor que esta dentro del body y ocupa todo el espacio ( desde el inicio del body hasta el final) y es alli donde aplicamos el Grid.

El orden de las equitetas es tal cual se presenta pues en HTML hay que seguir ese orden ( tal vez saltar alguna pero su ubicacion ha de ser esa)

1. La Estrategia Mobile First
Es la mejor práctica actual. Diseñamos primero para la pantalla más pequeña y restrictiva (móvil) porque:

Simplicidad:  
Es más fácil apilar bloques verticalmente y luego "expandirlos" hacia los lados conforme crece la pantalla.

Rendimiento:  
Los móviles suelen tener menos potencia; cargar un diseño sencillo primero mejora la experiencia.

Prioridad:  
Nos obliga a decidir qué es lo realmente importante antes de tener mucho espacio para rellenar.

En tu captura, al no haber definido columnas todavía, Grid simplemente apila las grid-template-areas una debajo de otra, que es exactamente lo que queremos para un teléfono.

2. La Limpieza Inicial (Reset/Normalize)
El * { box-sizing: border-box; margin: 0; padding: 0; } es el "primer ladrillo" de cualquier proyecto profesional.

margin/padding: 0: Cada navegador (Chrome, Firefox, Safari) tiene sus propios márgenes por defecto. Si no los quitas, tu web se verá distinta en cada uno.

box-sizing: border-box: Esto asegura que si dices que una caja mide 100px, los bordes y el padding no la ensanchen. Sin esto, hacer layouts precisos es una pesadilla.

# AHora que tenemos el grid base podemos ir introduciendo los Media Query.

## Fase 3.1: Evolución del Layout (Pasando a Tablet/Desktop)
Ahora vamos a aplicar la magia de las Media Queries. Vamos a decirle al navegador: "Cuando la pantalla sea ancha (como una Tablet en horizontal o un PC), deja de apilar y empieza a usar columnas".

Añade esto a tu style.css:

---
```CSS
/* --- Estilos para Tablet y Desktop (Pantallas mayores a 768px) --- */

@media (min-width: 768px) {
    .main-layout {
        /* Definimos 2 columnas: una fija para el sidebar y otra flexible */
        grid-template-columns: 1fr 250px;
        
        /* Redibujamos el mapa para esta resolución */
        grid-template-areas: 
            "header  header"
            "nav     nav"
            "main    aside"
            "footer  footer";
        
        column-gap: 20px; /* Espacio entre columnas */
    }

    /* Opcional: Centrar el contenido para que no se estire al infinito en pantallas 4K */
    .header__container, .nav__list, .main-content, .footer__container {
        max-width: 1200px;
        margin: 0 auto;
    }
}

/* --- Caso especial: Volteo de pantalla (Landscape en Móvil) --- */
@media (max-height: 500px) and (orientation: landscape) {
    .header__title {
        font-size: 1.2rem; /* Achicamos el título para que no robe toda la pantalla al girar */
    }
    .header {
        padding: 10px;
    }
}
```
---

¿Qué acaba de pasar?
grid-template-columns:   
1fr 250px;: Ahora el main ocupará todo el espacio que pueda (1fr) y el aside se quedará siempre en 250px.

grid-template-areas:   
Nota cómo ahora pusimos dos palabras por fila. El header, nav y footer ocupan las dos columnas (hacen un "span"), mientras que main y aside se reparten una cada uno.

max-width: 1200px:   
Es una mejor práctica para que en monitores gigantes la web no se vea "desparramada".

