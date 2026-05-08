En esta fase, construiremos el "cerebro" que lee nuestro objeto de datos y genera el HTML. También crearemos la función que "espera" a las imágenes.

1. El Cargador de Imágenes Asíncrono
Esta función es la pieza clave. Devuelve una Promise que solo se resuelve cuando el navegador confirma que los píxeles ya están en memoria.

---
```js
/**
 * Carga una imagen de forma asíncrona
 * @param {string} url - Dirección de la imagen
 * @returns {Promise} - Resuelve con la imagen cargada o rechaza si hay error
 */
const cargarImagenAsync = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image(); // Objeto de imagen en memoria
        img.src = url;
        
        // Si la imagen carga correctamente
        img.onload = () => resolve(img);
        
        // Si hay un error (link roto, sin internet, etc.)
        img.onerror = () => reject(new Error(`No se pudo cargar: ${url}`));
    });
};
```
---

2. Renderizado de las Portadas (BEM)
Vamos a inyectar las portadas de los temas en el grid que definimos en el HTML.

