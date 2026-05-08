En este proyecto aplicaremos asincronía, objetos, manipulación del DOM y animaciones. Es nivel  "Junior+".

🏗️ Estrategia Global (El "Blueprint")
Dividiremos el desarrollo en 5 fases críticas:

Fase de Datos (Modelo): Crearemos una estructura de datos (un Array de Objetos) que contenga la información de las galerías (temas, portadas e imágenes internas).

Fase de Estructura (HTML con BEM): Diseñaremos el contenedor principal y el modal siguiendo la metodología BEM para evitar el caos en los estilos.

Fase de Estética (CSS3 & Lightbox): Crearemos el efecto de fondo oscurecido y las tarjetas de las galerías.

Fase de Lógica Asíncrona (JS): Programaremos la carga de imágenes usando Promises o Async/Await para que la UI no se bloquee.

Fase de Animación (WAAPI & CSS): Implementaremos los efectos de apertura "distintos" para cada imagen.

🎨 Otros elementos a Aplicar:
Para que la página sea realmente atractiva y técnica:

Skeleton Screens: Mientras las imágenes se cargan asincrónicamente, mostrar un recuadro gris con una animación de pulso (en lugar de un espacio vacío).

Lazy Loading nativo: Usar el atributo loading="lazy" para mejorar el rendimiento.

Cierre Inteligente: Que el modal se cierre al presionar la tecla ESC o al hacer clic fuera de la imagen (en el fondo oscuro).

