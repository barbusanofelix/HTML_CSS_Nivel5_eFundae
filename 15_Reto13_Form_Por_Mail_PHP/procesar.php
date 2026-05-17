<?php
/**
 * Script de procesamiento, validación y envío de correo.
 * Nivel: Junior / Junior+
 */

// 1. Restringir el acceso directo si no se accede mediante POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

// 2. Inicialización y Sanitización de Variables (Seguridad Backend)
// Usamos filter_input con FILTER_SANITIZE_SPECIAL_CHARS para neutralizar etiquetas HTML/Scripts (<script>, etc.)
$nombre    = trim(filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_SPECIAL_CHARS));
$direccion = trim(filter_input(INPUT_POST, 'direccion', FILTER_SANITIZE_SPECIAL_CHARS));
$telefono  = trim(filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_SPECIAL_CHARS));
$email     = trim(filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL)); // Valida y limpia la estructura de email
$asunto    = trim(filter_input(INPUT_POST, 'asunto', FILTER_SANITIZE_SPECIAL_CHARS));
$mensaje   = trim(filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_SPECIAL_CHARS));

// 3. Validación Backend estricta
// Comprobamos que ningún campo esté vacío y que el email sea sintácticamente válido
if (empty($nombre) || empty($direccion) || empty($telefono) || !$email || empty($asunto) || empty($mensaje)) {
    // Redirección con estado de error si falla la validación
    header('Location: index.php?status=error');
    exit;
}

// 4. Generación del Número de Incidencia Correlativo Simulado
// Formato requerido: [año][mes][dia]+[correlativo de 3 digitos] (Ej: 20260516001)
$fechaActual = date('Ymd'); 

// Simulamos el correlativo diario. En un entorno real se consultaría a la Base de Datos.
// Para este reto generaremos un número aleatorio entre 1 y 99 or usaremos una semilla.
$correlativoSimulado = rand(1, 15); // Simula que es la incidencia "N" del día
$correlativoFormateado = str_pad($correlativoSimulado, 3, '0', STR_PAD_LEFT); // Asegura 3 dígitos (ej: 005)

$numeroIncidencia = $fechaActual . $correlativoFormateado;

// 5. Construcción del Correo Electrónico
$para = $email; // Dirección captada por el formulario tal como pide el enunciado
$tituloEmail = "Confirmación de Registro de Incidencia: " . $asunto;

// Cuerpo del mensaje respetando el formato solicitado
$cuerpoEmail = "Un saludo cordial " . $nombre . ".\n";
$cuerpoEmail .= "Hemos recibido su solicitud: " . $asunto . " y ha sido registrada con el numero " . $numeroIncidencia . "\n";
$cuerpoEmail .= "Y su mensaje:\n";
// Para que el mensaje salga entre comillas : colocamos \ antes de la comilla para que la tome como texto.
$cuerpoEmail .= "\"" . $mensaje . "\"\n\n";
$cuerpoEmail .= "En maximo 2 dias habiles, nos comunicaremos con usted por esta via y/o telefono : " . $telefono . "\n\n";
$cuerpoEmail .= "Favor no responda a este mail pues es un servicio automatico.";

// Cabeceras Obligatorias para el correcto envío de correos en PHP (Evita que caiga en Spam)
$headers = "From: no-reply@tuservicio.com" . "\r\n" .
           "Reply-To: no-reply@tuservicio.com" . "\r\n" .
           "X-Mailer: PHP/" . phpversion() . "\r\n" .
           "Content-Type: text/plain; charset=UTF-8"; // Usamos texto plano para cumplir la estructura exacta

// 6. Envío del Correo con la función nativa mail()
// NOTA: mail() requiere un servidor de correo configurado en php.ini (como Sendmail o SMTP local)
// Al estar en entorno de desarrollo local (XAMPP), evaluamos si se ejecuta el envío simulado.
// if (@mail($para, $tituloEmail, $cuerpoEmail, $headers)) {
    // Envío exitoso
    // header('Location: index.php?status=success&ticket=' . $numeroIncidencia);
// } else {
    // Si estás en localhost sin servidor SMTP configurado, mail() puede devolver false.
    // Para que el flujo de pruebas funcione y puedas comprobar el resultado a nivel Junior, 
    // forzaremos el éxito simulado si estás probando en entorno local.
    // header('Location: index.php?status=success&ticket=' . $numeroIncidencia);
// }

// ==========================================================================
// 6. MODO PRUEBA: Guardar el correo en un archivo local .txt
// ==========================================================================

// Construimos el contenido tal cual se enviaría
$contenidoSimulado = "Para: " . $para . "\n";
$contenidoSimulado .= "Asunto: " . $tituloEmail . "\n";
$contenidoSimulado .= "Cabeceras: \n" . $headers . "\n";
$contenidoSimulado .= "--------------------------------------------------\n";
$contenidoSimulado .= $cuerpoEmail;

// Creamos un archivo llamado 'ultimo_correo.txt' en tu carpeta del proyecto
// Si el archivo ya existe, sobrescribirá el contenido con el último envío
file_put_contents('ultimo_correo.txt', $contenidoSimulado);

// Mantenemos la redirección de éxito idéntica para el frontend
header('Location: index.php?status=success&ticket=' . $numeroIncidencia);
exit;


