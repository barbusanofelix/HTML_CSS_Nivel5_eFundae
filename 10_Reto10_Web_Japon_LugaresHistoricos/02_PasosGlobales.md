 # Construir una web con enfoque en accesibilidad, semántica pura y CSS Grid es la mejor forma de pasar de un nivel Junior a un Junior+.

 Vamos a dividir el codigo en Etapas.

La propuesta de hoja de ruta:

## Fase 1: Arquitectura Semántica (HTML)
Antes de poner un solo color, debemos construir el "esqueleto" usando etiquetas que los lectores de pantalla entiendan perfectamente.

Usar HTML Semantico:  
Usaremos header, nav, main (que contendrá los article), aside (barra lateral) y footer.

Accesibilidad:  
Usaremos atributos aria-label donde sea necesario y jerarquía de títulos (h1, h2, h3) lógica.

## Fase 2: Estructura de Datos (BEM)
Definiremos los nombres de las clases siguiendo BEM (Block Element Modifier).

Ejemplo: .card (bloque), .card__title (elemento), .card--featured (modificador). Si usamos guion intermedio es para dar mas sentido al nombre, por ejemplo: .card__title-secundario

## Fase 3: Layout Maestro (Grid Global)
Crearemos el contenedor principal que distribuirá las secciones grandes (Header, Nav, Main, Sidebar, Footer) usando grid-template-areas. Asi es mejor pues es casi lenguaje humano.

## Fase 4: Detalle y Componentes (Las Fichas)
Diseñaremos las fichas de los castillos con la información que pides (foto, horarios, reseña oculta/extra).

## Fase 5: Responsive & Media Queries
Haremos que el grid se adapte:

Móvil (Portrait): Todo en una columna.

Móvil/Tablet (Landscape): Cambio de distribución al girar la pantalla.

Desktop: El layout completo con barra lateral.

