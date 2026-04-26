Para que este laboratorio sea realmente útil, vamos a consolidar todo lo que hemos trabajado: BEM, Flexbox, Media Queries, Transiciones y Transformaciones, aplicándolos a una estructura de "Tarjeta de Producto/Servicio".

Este ejemplo está diseñado para que lo copies y lo pruebes directamente. He corregido el detalle del indicador de ancho para que el número aparezca al final de la frase, como buscábamos.

1. El HTML (index.html)
He estructurado el documento para que sea un "Hero" (sección principal) con una tarjeta interactiva.
Ver el index.html  dentro de la carpeta raiz de este directorio ( 05_EjemploResponsiveMediaQueryFlexBox)


2. El CSS (style.css)
He organizado el CSS de forma que puedas leer los comentarios para entender cada instrucción técnica.

Quiero que el contenedor de

---
```css
 /* Se activa cuando el ancho de pantalla es 768px o mayor */

@media (min-width: 768px) {

    .hero-card {
        /* Cambio de flujo: Ahora Horizontal */
        flex-direction: row;
        align-items: stretch;
    }

    .hero-card__indicator{
        background-color: green;
    }

    /* Cambiamos el texto del indicador */
    .hero-card__indicator::before {
        content: "Viewport: Desktop (>=768px) - Ancho:";
    }

    /* Reparto de espacio: 40% imagen, 60% texto */
    .hero-card__img-container {
        width: 40%;
        height: auto; /* Permite que crezca según el contenido del texto */
    }

    .hero-card__body {
        width: 60%;
        text-align: left; /* Alineación a la izquierda en pantallas grandes */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .hero-card__title {
        font-size: 2rem;
    }
}

/* Pantallas Grandes */

@media (min-width: 1200px) {
    .hero-card__width-indicator {
        background-color: #2d33ec;
    }

    .hero-card__width-indicator::before {
        content: "Viewport: Large Desktop (>= 1200px)-Actual:";
    }
}
```
---



Sobre los 1200 px pretiendo que el contenedor de "hero-card__width-indicator" se pinte en azul pero parece que no lo hago bien pues sigue siendo verde .

Añadi el @media de min 1200px , pero no responde.

¡Excelente ojo! Acabas de toparte con uno de los errores más comunes y frustrantes en CSS: el error tipográfico (typo) en el nombre de las clases.

El problema es que en tu bloque de 768px usaste un nombre de clase, y en el de 1200px usaste otro ligeramente distinto.

El error específico
En tu HTML y en el primer Media Query usas: .hero-card__indicator (Sin la palabra width).

En tu Media Query de 1200px escribiste: .hero-card__width-indicator (Añadiste width).

Como esa clase con "width" no existe en tu HTML, el navegador simplemente ignora esa regla y mantiene el color verde que heredó del breakpoint anterior.

La solución corregida
Solo necesitas unificar el nombre de la clase. Aquí tienes el código corregido para que responda correctamente:

---
```CSS
/* Media Query para Desktop (Tablet en adelante) */
@media (min-width: 768px) {
    .hero-card__indicator {
        background-color: green; /* Se pone verde a partir de 768px */
    }
    .hero-card__indicator::before {
        content: "Viewport: Desktop (>=768px) - Ancho:";
    }
    /* ... resto de tu código ... */
}

/* Media Query para Pantallas Grandes */
@media (min-width: 1200px) {
    /* CORRECCIÓN: Quitamos "width-" para que coincida con el nombre real */
    .hero-card__indicator {
        background-color: #2d33ec; /* Ahora sí se pintará de azul */
    }
    .hero-card__indicator::before {
        content: "Viewport: Large Desktop (>= 1200px) - Actual:";
    }
}
```
---

Conceptos clave que aprender de esto:
Herencia de Cascada: Las Media Queries son aditivas. Cuando llegas a 1200px, el navegador sigue aplicando las reglas de 768px A MENOS que escribas una regla exactamente con el mismo nombre para sobrescribirla. Al escribir mal el nombre, la sobrescritura falló.

Especificidad BEM: Mantener nombres cortos y consistentes ayuda a evitar estos errores. Si empezaste con __indicator, mantente así en todo el archivo.

Orden de las reglas: Siempre coloca las Media Queries de menor a mayor (768px -> 1200px). Esto permite que la lógica de "Pantalla Grande" gane sobre la de "Pantalla Mediana" por orden de aparición en el archivo.


Guía de Experimentos (Prueba esto en tu código)
Para que el tablero sea realmente un laboratorio, cambia la línea de justify-content en tu CSS por estos valores y observa el cambio:

flex-start: Las cajas se pegan a la izquierda (inicio).

flex-end: Se pegan a la derecha (final).

space-between: La caja 1 se va a la izquierda, la 3 a la derecha y la 2 queda en medio. (Ideal para menús de navegación).

space-around: Distribuye el espacio sobrante alrededor de cada caja.

4. El "Superpoder" de Flexbox: align-items
Ahora prueba cambiar align-items: center por:

stretch: (Valor por defecto). ¡Ojo! Si las cajas tienen un height definido, no se estirarán. Si quitas el height: 80px de .flex-lab__item, verás que las cajas ocupan todo el alto del contenedor.

flex-end: Las cajas se van al "suelo" del contenedor.

Análisis Técnico: ¿Por qué es un tablero de control?
Porque en Flexbox, el contenedor es el Director de Orquesta. Los hijos (items) simplemente obedecen. Si el contenedor dice "todos al centro", los hijos se mueven sin que tengas que tocar sus márgenes individuales.