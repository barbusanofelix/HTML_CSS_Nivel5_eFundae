# Fase 1: Estructura Semántica y Metodología BEM.

En este paso, nos enfocaremos en que el HTML sea impecable. No te preocupes si al abrirlo en el navegador se ve "desnudo" o aburrido; estamos construyendo los cimientos.

## 1. Estructura HTML Semántica
Crea un archivo llamado index.html dentro de tu carpeta 10_Reto10_Web:JaponLugaresHistoricos.


index.html.  
Se aplicaron directamente las clases BEM a los elementos
---
```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Fichas históricas de castillos en Japón: Tsuruga, Higashiyama y Matsuyama.">
        <title>Historia de Japón: Enclaves Legendarios</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>

        <div class="main-layout">

            <header class="header">
                <div class="header__container">
                    <h1 class="header__title">Japón Histórico</h1>
                    <p class="header__subtitle">Explorando los castillos de la era Samurái</p>
                </div>
            </header>

            <nav class="nav" aria-label="Navegación principal">
                <ul class="nav__list">
                    <li class="nav__item"><a href="#tsuruga" class="nav__link">Castillo Tsuruga</a></li>
                    <li class="nav__item"><a href="#higashiyama" class="nav__link">Higashiyama</a></li>
                    <li class="nav__item"><a href="#matsuyama" class="nav__link">Castillo Matsuyama</a></li>
                    <li class="nav__item"><a href="#contacto" class="nav__link">Contacto</a></li>
                </ul>
            </nav>

            <main class="main-content">
                <section class="main-content__intro">
                    <h2 class="main-content__title">Enclaves de Relevancia Histórica</h2>
                    <p>Japón conserva estructuras que narran siglos de estrategia militar y arte arquitectónico.</p>
                </section>

                <article class="castle-card" id="tsuruga">
                    <header class="castle-card__header">
                        <h3 class="castle-card__name">Castillo Tsuruga</h3>
                        <p class="castle-card__meta">Localización: Aizuwakamatsu</p>
                    </header>

                    <figure class="castle-card__figure">
                        <img src="https://placehold.co/300x200" alt="Vista exterior del Castillo Tsuruga con sus tejas rojas características" class="castle-card__image">
                        <figcaption class="castle-card__caption">El único castillo en Japón con tejas de color rojo.</figcaption>
                    </figure>

                    <div class="castle-card__info">
                        <p><strong>Horario:</strong> 08:30 - 17:00</p>

                        <details class="castle-card__details">
                            <summary class="castle-card__summary">Leer reseña histórica</summary>
                            <div class="castle-card__extra-content">
                                <p>Este castillo fue un bastión clave durante la Guerra Boshin en 1868. Su resistencia simboliza el fin de la era de los samuráis.</p>
                            </div>
                        </details>
                    </div>
                </article>

                <article class="castle-card" id="higashiyama">
                    <header class="castle-card__header">
                        <h3 class="castle-card__name">Distrito de Higashiyama</h3>
                        <p class="castle-card__meta">Localización: Kioto</p>
                    </header>
                
                    <figure class="castle-card__figure">
                        <img src="https://placehold.co/300x200" alt="Calle empedrada de Higashiyama con templos al fondo al atardecer" class="castle-card__image">
                        <figcaption class="castle-card__caption">Uno de los distritos históricos mejor conservados de Japón.</figcaption>
                    </figure>
                
                    <div class="castle-card__info">
                        <p><strong>Horario:</strong> Acceso libre (Templos: 09:00 - 17:00)</p>
                
                        <details class="castle-card__details">
                            <summary class="castle-card__summary">Leer reseña histórica</summary>
                            <div class="castle-card__extra-content">
                                <p>Este distrito evoca la atmósfera del antiguo Kioto. Ha sido el centro de la cultura y la religión durante siglos, sobreviviendo a numerosos incendios y guerras civiles.</p>
                            </div>
                        </details>
                    </div>
                </article>
                
                <article class="castle-card" id="matsuyama">
                    <header class="castle-card__header">
                        <h3 class="castle-card__name">Castillo Matsuyama</h3>
                        <p class="castle-card__meta">Localización: Ehime (Isla Shikoku)</p>
                    </header>
                
                    <figure class="castle-card__figure">
                        <img src="https://placehold.co/300x200" alt="Castillo Matsuyama situado en la cima de un monte rodeado de vegetación" class="castle-card__image">
                        <figcaption class="castle-card__caption">Uno de los doce castillos originales construidos antes de la era Edo.</figcaption>
                    </figure>
                
                    <div class="castle-card__info">
                        <p><strong>Horario:</strong> 09:00 - 17:00 (Cierre varía según estación)</p>
                
                        <details class="castle-card__details">
                            <summary class="castle-card__summary">Leer reseña histórica</summary>
                            <div class="castle-card__extra-content">
                                <p>Construido por Kato Yoshiaki en 1603, es un complejo defensivo magistral situado a 132 metros de altura, ofreciendo una vista estratégica de todo el mar interior de Seto.</p>
                            </div>
                        </details>
                    </div>
                </article>

            </main>

            <aside class="sidebar">
                <section class="sidebar__section">
                    <h2 class="sidebar__title">Información General</h2>
                    <div class="sidebar__content">
                        <h3 class="sidebar__subtitle">Medios de Transporte</h3>
                        <ul class="sidebar__list">
                            <li>Japan Rail (JR Pass)</li>
                            <li>Autobuses locales (Loop Bus)</li>
                            <li>Alquiler de bicicletas</li>
                        </ul>
                    </div>
                </section>
            </aside>

            <footer class="footer" id="contacto">
                <div class="footer__container">
                    <section class="footer__contact">
                        <h2 class="footer__title">Contacto y Soporte</h2>
                        <p>Para guías certificadas, escríbanos a:
                        <address>info@japónhistorico.jp</address>
                        </p>
                    </section>
                    <p class="footer__copy">&copy; 2026 Japón Histórico - Documentación para Junior+</p>
                </div>
            </footer>

        </div>
    </body>
</html>
```
---



## ¿Por qué lo hemos hecho así? (Análisis Junior+)
Semántica: He usado `<figure>` y `<figcaption>` para las imágenes. Esto le dice a los buscadores y lectores de pantalla: "esta imagen y este texto van juntos".

### Accesibilidad:

aria-label en el `<nav>` para que alguien que no ve sepa qué tipo de lista está navegando.

La etiqueta `<address>` en el contacto es la forma correcta de marcar información de contacto.

### Metodología BEM: 
Bloque: castle-card

Elemento: castle-card__name

Si quisiéramos un castillo destacado, usaríamos un modificador: castle-card--featured.

Details/Summary:  
Como acordamos, esto reduce la carga cognitiva, permitiendo que el usuario elija cuándo profundizar en la historia.

## ¿Notas de Integridad y Mejores Prácticas:
IDs Únicos: He añadido id="higashiyama" e id="matsuyama". Esto es vital para que los enlaces del `<nav>` que creamos antes funcionen como "anclas" (al hacer clic, la página bajará sola hasta ese castillo).

### Alt Text (Accesibilidad):  
 Fíjate en los atributos alt de las imágenes. No solo dicen "Foto castillo", sino que describen qué se ve. Esto es lo que un usuario con visión reducida escuchará en su lector de pantalla.

Jerarquía de Títulos:  
`<h1>`: El título del sitio.

`<h2>`: Secciones generales (Intro, Sidebar, Footer).

`<h3>`: Nombres de los castillos específicos.

Esto permite que el usuario navegue por el documento saltando de encabezado en encabezado de forma lógica.

# Alguna explicacion importante en el orden de las etiiquetas?

Usamos :  `<div class="main-layout">` ...para un subcontenedor dentro del body y separar el main de los elementos superiores? No hay una etiqueta semantica para ello?

¡Qué gran pregunta! Tienes toda la razón en ser escrupuloso con la semántica. Vamos a resolver esto punto por punto, porque aquí es donde un desarrollador Junior+ marca la diferencia.

## 1. ¿Hay una etiqueta semántica para el contenedor padre?
La respuesta corta es: Sí, a veces.

El estándar HTML5 sugiere que si un contenedor es solo un "contenedor de estilo" (para aplicar el display: grid), lo ideal es usar el elemento `<div>`. Sin embargo, si ese contenedor realmente envuelve todo el contenido principal de la página, la etiqueta semántica correcta es:

`<body>`:   
¡Es en sí mismo el contenedor semántico raíz!

Nota: Muchas veces, los desarrolladores añaden una div extra (como la **.main-layout** que usamos) solo porque CSS Grid necesita un padre directo para sus hijos. Si el `<body>` tiene muchos otros scripts o elementos flotantes, envolver todo en un div ayuda a que el Grid no se "contamine".

**Alternativa semántica:**  
Si no quieres usar un div, puedes aplicar el display: grid directamente al `<body>` (aunque esto a veces trae problemas si tienes componentes externos como modales o popups).

**Conclusión**:  
Seguir usando la div con una clase descriptiva (.main-layout o .page-wrapper) es una práctica muy aceptada y profesional, porque mantiene limpio el body de estilos de diseño.

## 2. ¿Importa el orden de las etiquetas?
Sí, y por dos razones fundamentales: Accesibilidad y Experiencia de Usuario (UX).

### A. Orden de lectura (DOM Order)
Los lectores de pantalla siguen el orden en el que escribes las etiquetas en el HTML. Si pones el **`aside`** antes del main, una persona ciega escuchará primero la publicidad o la barra lateral antes que el contenido histórico del castillo, que es lo que realmente busca.

#### El orden que seguimos:

header: Contexto general.

nav: Menú (es vital que esté arriba para que el usuario pueda saltar a las secciones).

main: El núcleo de tu información.

aside: Contenido relacionado (se entiende mejor después de haber leído el núcleo).

footer: Cierre y contacto.

B. La regla de "No te repitas" (DRY - Don't Repeat Yourself)
En el CSS, el orden no importa tanto como la especificidad, pero en el HTML, el orden es jerárquico. Si cambias el orden, el flujo del documento se altera.

3. ¿Cómo vamos a aplicar el Grid al Layout?
Ya que estamos en la Fase 2, vamos a aplicar el CSS a esa clase **.main-layout**. Al separarlo en una clase, nos da una ventaja enorme: si mañana decides que quieres una web diferente, solo cambias la clase del contenedor y el Grid se adapta.