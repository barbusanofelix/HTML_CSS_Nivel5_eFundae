
# Paso 1: Estructura HTML y Metodología BEM  


En BEM (Block, Element, Modifier), estructuramos las clases así: bloque__elemento--modificador. Esto evitará que nuestro CSS se vuelva un caos.

Propuesta de Estructura:
Block header: Usará Flexbox para centrar el logo o la imagen principal.

Block principles: Será nuestro contenedor Grid.

Element card: Cada principio del Bushido será una tarjeta.

Element separator: Imágenes de samuráis para intercalar entre definiciones.

Aquí tienes el código base para el index.html. Dejaremos contenedores pensando en donde irán las fotos:


---
```html

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bushido: El Camino del Guerrero</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- BLOQUE: Header (Usaremos Flexbox aquí) -->
    <header class="main-header">
        <div class="main-header__content">
            <h1 class="main-header__title">BUSHIDO</h1>
            <p class="main-header__subtitle">Los Siete Principios del Código Samurai</p>
        </div>
    </header>

    <main class="container">
        
        <!-- BLOQUE: Grid de Principios -->
        <section class="bushido-grid">
            
            <!-- Elemento: Card de Principio -->
            <article class="principle-card">
                <figure class="principle-card__figure">
                    <img src="gi.jpg" alt="Rectitud" class="principle-card__image">
                </figure>
                <div class="principle-card__text">
                    <h2 class="principle-card__name">Gi (Rectitud)</h2>
                    <p class="principle-card__description">Sé honrado en tus tratos con todo el mundo. Cree en la justicia, pero no en la que emana de los demás, sino en la tuya propia.</p>
                </div>
            </article>

            <!-- Imagen separadora (Se ocultará o cambiará de posición según el breakpoint) -->
            <aside class="separator">
                <img src="samurai-1.jpg" alt="Samurai decorativo" class="separator__img">
            </aside>

            <article class="principle-card">
                <figure class="principle-card__figure">
                    <img src="yu.jpg" alt="Valor" class="principle-card__image">
                </figure>
                <div class="principle-card__text">
                    <h2 class="principle-card__name">Yu (Valor Heroico)</h2>
                    <p class="principle-card__description">Álzate sobre las masas de gente que temen actuar. Ocultarse como una tortuga en su caparazón no es vivir.</p>
                </div>
            </article>

            <!-- Aquí continuarían los demás principios siguiendo el mismo patrón -->

        </section>
    </main>

    <footer class="footer">
        <p class="footer__copy">&copy; 2026 Honor y Lealtad - Proyecto Bushido</p>
    </footer>

</body>
</html>
```
---

## Por qué lo hacemos así:
Semántica: Usamos `<article>` para los principios porque son unidades de contenido independientes.

Imágenes: He incluido un `<aside class="separator">` para fotos de samuráis "sueltas".   
Con Grid, podremos decidir en qué columna o fila aparecen estas fotos según el tamaño de la pantalla.

BEM: Fíjate en clases como principle-card__name. Es claro, descriptivo y evita colisiones de estilos.