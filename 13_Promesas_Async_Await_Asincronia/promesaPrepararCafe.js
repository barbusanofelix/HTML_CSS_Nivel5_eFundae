const prepararCafe = () => {
    return new Promise((resolve, reject) => {
        console.log("☕ Hirviendo el agua... (esperando)");
        
        setTimeout(() => {
            const exito = true; // Simulación de que no se quemó la cafetera
            if (exito) {
                resolve("✅ ¡Café listo!");
            } else {
                reject("❌ Se acabó el agua...");
            }
        }, 2000);
    });
};

// Uso con .then() y .catch()
console.log("1. Inicio del pedido");
prepararCafe()
    .then((mensaje) => console.log(mensaje))
    .catch((error) => console.error(error))
    .finally(() => console.log("3. Proceso finalizado (limpiando barra)"));
console.log("2. Haciendo otras cosas mientras espero...");