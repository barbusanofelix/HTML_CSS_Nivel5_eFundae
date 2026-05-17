## Paso 1: Ruta Global del Proyecto
Para mantener el código organizado y eficiente, dividiremos el desarrollo en las siguientes fases. 

Crear una estructura de archivos dentro de la carpeta del proyecto, 15_Reto13_Form_Por_Mail_PHP/:


15_Reto13_Form_Por_Mail_PHP/
│
├── css/
│   └── styles.css          # Estilos usando metodología BEM
│
├── index.php               # Formulario HTML5 + Mensajes de feedback
└── procesar.php            # Lógica PHP: Validación, sanitización y envío de mail


### Flujo de trabajo:
**Fase HTML (Frontend Semántico):** Creación del formulario en index.php con atributos de validación nativos.

**Fase CSS (Diseño con BEM):** Estilizado profesional en css/styles.css sin frameworks.

**Fase PHP (Seguridad y Lógica):** Recepción de datos, sanitización estricta (antinyectores), validación manual, generación del número de incidencia correlativo y simulación del envío con mail().

## Paso 2: Creación del Formulario (index.php)
Este archivo contiene la estructura HTML5. Usaremos la metodología BEM (.contacto-form, .contacto-form__group, .contacto-form__input, etc.) y pasaremos los errores o mensajes de éxito a través de la URL de manera sencilla para que el usuario sepa qué ocurrió.

---
´´´html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Contacto - Soporte Técnico</title>
    <!-- Vinculación del archivo CSS externo -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <main class="container">
        <section class="contact-card">
            <h1 class="contact-card__title">Centro de Soporte</h1>
            <p class="contact-card__subtitle">Por favor, rellene el formulario para generar un ticket de incidencia.</p>

            <!-- Bloque de alertas/mensajes de feedback para el usuario -->
            <?php if (isset($_GET['status'])): ?>
                <?php if ($_GET['status'] === 'success' && isset($_GET['ticket'])): ?>
                    <div class="alert alert--success">
                        <strong>¡Registro Exitoso!</strong> Su solicitud ha sido procesada con el ticket: <?php echo htmlspecialchars($_GET['ticket']); ?>. Revise su correo.
                    </div>
                <?php elseif ($_GET['status'] === 'error'): ?>
                    <div class="alert alert--danger">
                        <strong>Error:</strong> Por favor, verifique los datos introducidos. Todos los campos son obligatorios y deben ser válidos.
                    </div>
                <?php endif; ?>
            <?php endif; ?>

            <!-- Formulario de Contacto - Bloque BEM: contact-form -->
            <form action="procesar.php" method="POST" class="contact-form" novalidate>
                
                <!-- Campo: Nombre -->
                <div class="contact-form__group">
                    <label for="nombre" class="contact-form__label">Nombre Completo *</label>
                    <input type="text" id="nombre" name="nombre" class="contact-form__input" required placeholder="Ej. Juan Pérez">
                </div>

                <!-- Campo: Dirección -->
                <div class="contact-form__group">
                    <label for="direccion" class="contact-form__label">Dirección *</label>
                    <input type="text" id="direccion" name="direccion" class="contact-form__input" required placeholder="Ej. Calle Mayor 123, 2ºB">
                </div>

                <!-- Campo: Teléfono -->
                <div class="contact-form__group">
                    <label for="telefono" class="contact-form__label">Teléfono de Contacto *</label>
                    <input type="tel" id="telefono" name="telefono" class="contact-form__input" required placeholder="Ej. 600123456">
                </div>

                <!-- Campo: Correo Electrónico -->
                <div class="contact-form__group">
                    <label for="email" class="contact-form__label">Correo Electrónico *</label>
                    <input type="email" id="email" name="email" class="contact-form__input" required placeholder="Ej. juan.perez@email.com">
                </div>

                <!-- Campo: Asunto -->
                <div class="contact-form__group">
                    <label for="asunto" class="contact-form__label">Asunto de la Incidencia *</label>
                    <input type="text" id="asunto" name="asunto" class="contact-form__input" required placeholder="Ej. Fallo en el acceso a la plataforma">
                </div>

                <!-- Campo: Mensaje -->
                <div class="contact-form__group">
                    <label for="mensaje" class="contact-form__label">Mensaje / Descripción detallada *</label>
                    <textarea id="mensaje" name="mensaje" class="contact-form__input contact-form__input--textarea" rows="5" required placeholder="Escriba aquí los detalles de su solicitud..."></textarea>
                </div>

                <!-- Botón de Envío -->
                <button type="submit" class="contact-form__button">Enviar Solicitud</button>

            </form>
        </section>
    </main>

</body>
</html>
```
---

## Paso 3: Estilos Profesionales con BEM (css/styles.css)
Para lograr un aspecto estéticamente cuidado, limpio y moderno, crearemos variables CSS, utilizaremos Flexbox/Grid para centrar el contenido y estilizaremos los estados de los inputs (:focus).

---
´´´css
/* ==========================================================================
   Variables Globales y Reset
   ========================================================================== */
:root {
    --color-primary: #2563eb;
    --color-primary-hover: #1d4ed8;
    --color-bg: #f8fafc;
    --color-card: #ffffff;
    --color-text: #1e293b;
    --color-text-light: #64748b;
    --color-border: #cbd5e1;
    --color-success: #16a34a;
    --color-danger: #dc2626;
    
    --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --border-radius: 8px;
    --transition: all 0.3s ease;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-main);
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

/* ==========================================================================
   Contenedor Principal (Bloque)
   ========================================================================== */
.container {
    width: 100%;
    max-width: 600px;
}

.contact-card {
    background-color: var(--color-card);
    padding: 40px;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

.contact-card__title {
    font-size: 1.8rem;
    margin-bottom: 8px;
    color: var(--color-primary);
    text-align: center;
}

.contact-card__subtitle {
    font-size: 0.95rem;
    color: var(--color-text-light);
    margin-bottom: 24px;
    text-align: center;
}

/* ==========================================================================
   Bloque Formulario: contact-form (BEM)
   ========================================================================== */
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contact-form__group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.contact-form__label {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-text);
}

.contact-form__input {
    padding: 12px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 0.95rem;
    transition: var(--transition);
    outline: none;
}

/* Estado Focus del Input (Elemento) */
.contact-form__input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* Modificador para el Textarea */
.contact-form__input--textarea {
    resize: vertical;
    min-height: 120px;
}

.contact-form__button {
    background-color: var(--color-primary);
    color: #ffffff;
    border: none;
    padding: 14px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    margin-top: 10px;
}

.contact-form__button:hover {
    background-color: var(--color-primary-hover);
}

/* ==========================================================================
   Componentes Independientes: Alertas
   ========================================================================== */
.alert {
    padding: 14px;
    border-radius: var(--border-radius);
    margin-bottom: 20px;
    font-size: 0.9rem;
}

.alert--success {
    background-color: #f0fdf4;
    color: var(--color-success);
    border: 1px solid #bbf7d0;
}

.alert--danger {
    background-color: #fef2f2;
    color: var(--color-danger);
    border: 1px solid #fecaca;
}
```
---

