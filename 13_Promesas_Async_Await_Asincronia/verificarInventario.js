const verificarInventario = (articulo) => {
    return new Promise((resolve, reject) => {
        console.log(`☕ Buscando si hay articulo= ${articulo}... (esperando)`);
        
        setTimeout(() => {
            const producto = articulo; // Simulación de que no se quemó la cafetera
            if (producto=="pelota") {
                resolve("✅ ¡Hay pelotas en el Almacen."); // Internamente JS asigna a  mensajeDeResolve="✅ ¡Hay pelotas"  ( Mensaje)
            } else {
                reject(`❌ No buscas pelotas, buscas ${articulo}...`);// Internamente javaScript asigna errorReject="❌ No buscas pelotas..."  
            }
        }, 1000);
    });
};

// Uso con .then() y .catch()
console.log("1. Buscando en el inventario");
let articulo = "pelota";  // Por ejemplo, articulo="bate" caera en else y tomara el reject que asignara el mensaje  ❌ No buscas pelotas, buscas bate...
verificarInventario(articulo)
    .then((mensajeDeResolve) => console.log(mensajeDeResolve))
    .catch((errorReject) => console.error(errorReject))
    .finally(() => console.log("3. Proceso finalizado (Cerrando el almacen)"));
console.log("2. Haciendo otras cosas mientras espero...");