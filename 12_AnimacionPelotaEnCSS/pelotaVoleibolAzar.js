// 1. La función para generar números
// Version original
// const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Para ver el random generado 
const random = (min, max) => { // <--- Abrimos llaves: ahora mandamos nosotros
    const resultado = Math.floor(Math.random() * (max - min)) + min; // 1. Calculamos y guardamos
    console.log("Resultado: "+resultado);                                          // 2. Espiamos
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