# EXPLICACION DEL REBOTE LOCO. ( Pelota Magica  de Beisball)
Para lograr un rebote realista que se mueva en dos ejes ($X$ e $Y$) y cambie de tamaño (efecto de "aplastamiento" al tocar el suelo), combinaremos varias funciones de transform.Aquí tienes el código para una pelota que rebota contra las paredes y el suelo de forma dinámica:  

1. El Concepto: Ejes y Escala  
    Para moverla en simultáneo usaremos:translateX: Movimiento horizontal (Eje $X$).translateY: Movimiento vertical (Eje $Y$).scale: Cambio de tamaño (Efecto rebote).
2. El Código CSS  
    Vamos a crear una animación llamada superRebote. Para que el movimiento horizontal sea independiente del vertical y no parezca un rebote "cuadrado", lo ideal es integrarlos así:

    ---
    ```css

    .pelota-magica {
    width: 80px;
    position: relative;
    /* Duración 3s | Ritmo lineal | Infinito | Alternado (va y vuelve) */
    animation: superRebote 3s linear infinite alternate;
}
```
---
```css
@keyframes superRebote {
    0% {
        /* Inicio: Arriba a la izquierda y tamaño normal */
        transform: translate(0, 0) scale(1, 1);
    }
    25% {
        /* Punto medio arriba: se desplaza a la derecha */
        transform: translate(150px, 50px) scale(1, 1);
    }
    50% {
        /* Toca el "suelo": se mueve más a la derecha y se aplasta */
        /* scale(ancho, alto) -> 1.2 es más ancho, 0.8 es más bajo */
        transform: translate(300px, 400px) scale(1.2, 0.8);
        background-color: gold; /* Opcional: brilla al tocar suelo */
    }
    75% {

        /* Rebota hacia arriba y recupera forma, sigue avanzando a la derecha */
        transform: translate(450px, 50px) scale(1, 1);
    }
    100% {
        /* Llega al extremo derecho y vuelve a bajar */
        transform: translate(600px, 400px) scale(1.2, 0.8);
    }
} 
```
--- 

## Explicación de los cambios simultáneos  

## translate(X, Y): 

Es el atajo para mover en ambos ejes a la vez. En el ejemplo, mientras la pelota va bajando (aumenta $Y$), también se desplaza hacia la derecha (aumenta $X$).  

## scale(1.2, 0.8):  
 Este es un truco de animación clásica (Squash and Stretch). Cuando el valor de $Y$ llega al máximo (el suelo), aumentamos el ancho ($1.2$) y disminuimos el alto ($0.8$). Esto da la sensación de que la pelota es de goma y tiene peso.  
 
 ## alternate:  
  Esta palabra en la propiedad animation es vital. Hace que cuando la pelota llegue al final del trayecto ($100\%$), haga el camino de vuelta hacia el $0\%$, creando un efecto de rebote continuo y fluido de derecha a izquierda.  
  

  ## ¿Por qué usar transform y no top/left?  
  Como estás aprendiendo, este consejo te ahorrará dolores de cabeza:  
  Animar top, left, width o height obliga al navegador a recalcular todo el diseño de la página en cada frame (Layout).
  
  Animar transform (translate, scale, rotate) ocurre en una capa distinta que el navegador maneja de forma súper rápida directamente con la tarjeta de video (Composite).  
  
  ¡Es la diferencia entre una animación que se ve "trabada" y una que va a 60 cuadros por segundo!
