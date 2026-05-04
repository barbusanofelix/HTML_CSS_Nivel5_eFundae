# PUNTOS IMPORTANTES A TENER EN CUENTA EN EL GRID LAYOUT

1. El Tablero: ¿Cómo se acomodan los elementos?
Por defecto, Grid utiliza un algoritmo de flujo automático (auto-placement). Los elementos se colocan por orden de aparición en el HTML, llenando cada celda de izquierda a derecha y de arriba hacia abajo.

Líneas de Grid:  
Grid no cuenta "cuadros", **cuenta líneas.** En una cuadrícula de 3 columnas, existen 4 líneas verticales (la 1 es el borde izquierdo, la 4 es el derecho).

Celdas Implícitas:  
Si defines **grid-template-columns: repeat(3, 1fr)**, el navegador crea las columnas, pero las filas se crean automáticamente según la cantidad de contenido que tengas.

2. Selección Quirúrgica: El uso de **nth-of-type**
Para mover elementos específicos, usamos selectores estructurales. Esto evita tener que ponerle una clase manual a cada tarjeta en el HTML.

Ejemplo:
**.principle-card:nth-of-type(2)**: Esta instrucción le dice al navegador: "Busca el segundo elemento de este tipo dentro de su padre".

Punto de control:  
Es vital recordar que Grid cuenta todos los hijos directos del contenedor. Si metes un div o una img suelta entre tus tarjetas, el conteo de nth-of-type podría variar según cómo esté estructurado el HTML.

3. Ajustes Especiales: Moviendo piezas a voluntad
Cuando escribimos **grid-column: 3;**, estamos rompiendo el flujo automático.

El Salto (Gap):  
Al obligar al elemento 2 y 4 a ir a la columna 3 ( ver el  caso de Media Query de min 900px), el algoritmo de Grid ve que la columna 2 está vacía. Si no hay ningún otro elemento que "quepa" ahí, Grid deja el hueco, que es exactamente el efecto visual de limpieza que buscábamos.

Propiedad grid-column:

grid-column: 3; es un atajo de "colócate en la columna 3".

grid-column: 1 / span 3;   
le dice al elemento: "Empieza en la línea 1 y estírate hasta cubrir 3 columnas". Esto lo usamos para que las fotos de los samuráis cortaran la rejilla de lado a lado.

4. ¿Cómo saber en qué punto está cada elemento?
Para depurar y entender tu grid en proyectos futuros, te recomiendo dos métodos:

Inspector del Navegador (F12): En Chrome o Firefox, si vas a la pestaña "Elements" y haces clic en la etiqueta pequeña que dice grid junto a tu contenedor, el navegador dibujará las líneas y los números (1, 2, 3, 4) sobre tu web.

Coordenadas manuales:

Fila 1: Elementos 1 (col 1), vacio (col 2), Elemento 2 (col 3).

Fila 2: Foto separadora (ocupa col 1, 2 y 3).

Fila 3: Elemento 3 (col 1), vacio (col 2), Elemento 4 (col 3).

5. El Ajuste de Simetría Final
En la última parte, usamos grid-column: 2; para Chugi y la Imagen con Overlay.

justify-self: center: Mientras que grid-column posiciona el "bloque" en la columna del medio, justify-self asegura que, si el bloque es más estrecho que la columna, se quede perfectamente centrado dentro de esos márgenes.

grid-row: En algunos casos, si Grid intenta amontonar elementos, usamos grid-row para decirle: "No importa lo que pase arriba, tú te quedas en la fila X", asegurando que el cierre de la página sea siempre el mismo.

