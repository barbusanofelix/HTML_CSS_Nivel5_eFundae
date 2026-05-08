


async function procesoAlmacen() {
    try {
        console.log("1. Buscando en el inventario");
        
        // El programa se "pausa" aquí (solo dentro de esta función)
        const mensaje = await verificarInventario("pelota"); 
        
        // Esta línea no se ejecuta hasta que la anterior termine
        console.log(mensaje); 

    } catch (error) {
        // Si la promesa cae en 'reject', saltamos directo aquí
        console.error(error);
    } finally {
        console.log("3. Proceso finalizado (Cerrando el almacen)");
    }
}


const verificarInventario = (articulo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            articulo === "pelota" ? resolve(`El articulo ${articulo} esta en stock!!`) : reject("Agotado");
        }, 1000);
    });
};



procesoAlmacen();
console.log("2. Haciendo otras cosas mientras espero...");