
// **************** Animacion Pelota Besibol ******************************
// 1. La función para generar números
// Version original
// const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Para ver el random generado 
const random = (min, max) => { // <--- Abrimos llaves: ahora mandamos nosotros
    const resultado = Math.floor(Math.random() * (max - min)) + min; // 1. Calculamos y guardamos
    // console.log("Resultado: "+resultado);                                          // 2. Espiamos
    return resultado;                                               // 3. Entregamos (Salida única)
};


// 2. Creamos la "hoja de estilos" dinámica
const style = document.createElement('style');

// 3. Escribimos el @keyframes con valores al azar usando las comillas locas ``
style.innerHTML = `
@keyframes superReboteAzar {
    0%   { transform: translate(${random(0, 10)}vw, ${random(0, 10)}vh) scale(1); }
    25%  { transform: translate(${random(10, 30)}vw, ${random(10, 30)}vh) scale(1); }
    50%  { transform: translate(${random(40, 60)}vw, ${random(60, 80)}vh) scale(1.3, 0.7); }
    75%  { transform: translate(${random(70, 80)}vw, ${random(20, 40)}vh) scale(1); }
    100% { transform: translate(${random(85, 95)}vw, ${random(60, 80)}vh) scale(1.3, 0.7); }
}`;

// 4. Lo inyectamos en el html, la etiqueta style, del head, con el @keyframes superReboteAzar
document.head.appendChild(style);
// ******************** Animmacion Pelota Playa *******************************
// GENERAR VALORES PARA PELOTA DE PLAYA.

// 1. Seleccionamos la pelota
const pelota = document.getElementById('pelotaPlaya');

// 2. Función para generar números aleatorios
function generarValoresAzar() {
    // Valores para el eje X (entre 0 y 70% del ancho de pantalla)
    const x = Math.floor(Math.random() * 90) + "vw";
    const xFinal = Math.floor(Math.random() * 90) + "vw";
    
    // Valores para el eje Y (entre -20 y 50% del alto de pantalla)
    const y = Math.floor(Math.random() * 90 - 20) + "vh";
    const yFinal = Math.floor(Math.random() * 90 - 20) + "vh";
    
    // Escala al azar (entre 0.5 y 1.5)
    const escala = (Math.random() * (1.5 - 0.5) + 0.5).toFixed(2);
    
    // Color al azar
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;

    // 3. Aplicamos los valores al estilo de la pelota (Variables CSS)
    pelota.style.setProperty('--pos-x', x);
    pelota.style.setProperty('--pos-y', y);
    pelota.style.setProperty('--pos-x-final', xFinal);
    pelota.style.setProperty('--pos-y-final', yFinal);
    pelota.style.setProperty('--escala', escala);
    pelota.style.setProperty('--color-azar', color);
}

// Ejecutar la función al cargar la página
generarValoresAzar();

// Opcional: Cambiar los valores cada 3 segundos para que siempre sea distinta
setInterval(generarValoresAzar, 3000);

//**************************************************************

// **** Animacion Pelota Rugby con WAAPI **********************
// WAAPI = Web Animation API
// Una libreria nativa de JavaScript para animaciones

// declaramos miAnim fuera de la animacion para  todos pueden tener acceso a esa variable
let miAnim; // Variable "mando a distancia" globa
let velocidadActual = 1;  // Variable global:mantener la velocidad que se reasigne porque cada nueva animacion nace con velocidad 1.
let direccionActual = 1; // 1 = adelante, -1 = reversa. El objeto no recuerda si va hacia adelante o atras!!!
// Asigna a pelotaRubby el elemento en HTML con el id="pelotaRugby"
const pelotaRubby = document.getElementById('pelotaRugby');
// Capturamos el boton
const btnPausaActivar = document.getElementById('btnPausaActivar');
const btnAcelerar = document.getElementById('btnAcelerar');
const btnReverse = document.getElementById('btnReverse');

function siguienteSaltoAzar() {
    // 1. LEER: ¿Dónde está la pelota justo ahora?
    const estiloActual = window.getComputedStyle(pelotaRugby);
    //console.log(estiloActual.getPropertyValue('left'));
    const actualX = estiloActual.left;
    const actualY = estiloActual.top;
    // Imprimir en la consola 
   // console.log('x:' + actualX + ' Y:' + actualY);
    // Lo anterior es lo mismo que haber obtenido del objeto estiloActual el valor de las propiedades left y top
   // console.log('Left:'+estiloActual.getPropertyValue('left') +' top: '+estiloActual.getPropertyValue('top'));

    // 2. CALCULAR: Nuevo destino al azar
    const nuevoX = Math.floor(Math.random() * 80) + "vw";
    const nuevoY = Math.floor(Math.random() * 60) + "vh";

    // VER EL DETALLE DE LA ANIMACION . ESTAS 7 LINEAS SE PUEDEN DESCOMENTAR PERO HARA PESADO LA ANIMACION.
    // const miAnim = pelotaRugby.animate([{ left: actualX, top: actualY }, // Inicio: donde quedó antes
    //     { left: nuevoX, top: nuevoY }], {duration: 3000,
    //     fill: 'forwards', // Importante: se queda en el destino al terminar
    //     easing: 'linear'});
    //     console.log("Estado de la animación:", miAnim.playState);
    //     console.log("Destino:", nuevoX, nuevoY);
    //     miAnim.onfinish = siguienteSaltoAzar;
    // hASTA ACA VER QUE SUCEDE PERO ES MUY PESADO Y LA ANIMACION COLAPSA
    
    // 3. EJECUTAR: Usamos la Web Animations API
    // Definimos los fotogramas (keyframes) en el momento
    miAnim = pelotaRugby.animate([
        { left: actualX, top: actualY }, // Inicio: donde quedó antes
        { left: nuevoX, top: nuevoY }   // Fin: el nuevo azar
    ], {
        duration: 3000,
        fill: 'forwards', // Importante: se queda en el destino al terminar
        easing: 'linear'
    });

    // Al nacer la animacion le aplicamos la velocidad actual porque sino nace con velocidad=1
    miAnim.playbackRate = velocidadActual;

    miAnim.onfinish = siguienteSaltoAzar; // <--- LA MEMORIA: Al terminar, llama a la función de nuevo

}

// Lógica del Botón Único Pausa/ Activar movimiento
btnPausaActivar.addEventListener('click', () => {
    if (miAnim.playState === 'running') {
        miAnim.pause();
        btnPausaActivar.textContent = "Reanudar Pelota";
    } else {
        miAnim.play();
        btnPausaActivar.textContent = "Pausar Pelota";
    }
});

// Lógica del Botón Acelerar movimiento
btnAcelerar.addEventListener('click', () => {
    console.log('Velocidad es : ' + miAnim.playbackRate);
    if (miAnim.playState === 'running') {  // Sino esta moviendose NO hace nada 
        if (miAnim.playbackRate === 1) {
            miAnim.playbackRate = 4;
            velocidadActual = 4;
            btnAcelerar.textContent = "Bajar Velocidad";
        } else {
            miAnim.playbackRate = 1;
            velocidadActual = 1;
            btnAcelerar.textContent = "Acelerar 4x";
        }
    }
});


// Lógica del Botón Reverse movimiento
btnReverse.addEventListener('click', () => {
    //  console.log("Direccion actual :" + direccionActual);
    if (miAnim.playState === 'running') {  // Sino esta moviendose NO hace nada 
        // Invertimos la variable global: si es 1 pasa a -1, y viceversa
        direccionActual = direccionActual * -1;
        if (direccionActual === 1) {
            btnReverse.textContent = "Adelante";
        } else {
            btnReverse.textContent = "Retroceder";
        }
        // Aplicamos el cambio de inmediato a la animación actual
        if (miAnim) {
            miAnim.playbackRate = velocidadActual * direccionActual;
        }
    }
});



// miAnim.reverse(); → La pelota regresa al punto de origen.

//miAnim.playbackRate = 2; → La pelota se mueve al doble de velocidad.

// Iniciar el primer ciclo
siguienteSaltoAzar();

