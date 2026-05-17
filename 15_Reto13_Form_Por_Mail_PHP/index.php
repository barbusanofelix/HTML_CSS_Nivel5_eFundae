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