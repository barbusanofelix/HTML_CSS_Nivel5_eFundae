# Para que una animación funcione en CSS:
## Necesitas 2 pasos:
### 1.	La regla @keyframes: Donde defines qué va a pasar.
### 2.	La propiedad animation: Donde aplicas esa coreografía al elemento.

### 1. El corazón: @keyframes
Imagina que `@keyframes` es el guion de una película. Aquí defines cómo cambia el estilo en puntos específicos del tiempo (usando porcentajes del 0% al 100%).

En CSS , con `@keyframes` y le colocamos un nombre que asignaremos a la animación :

---
```CSS
@keyframes miGranSalto {
  	0% { transform: translateY(0); }
  	50% { transform: translateY(-50px); background-color: gold; }
  	100% { transform: translateY(0); }
	}
```
---

2. Aplicar la animación: La propiedad animation
Una vez que tienes el guion, debes decirle al elemento cómo interpretarlo. **La propiedad animation es un "shorthand" (atajo)** que agrupa varias sub-propiedades:

 **Tabla de Sub-propiedades de animation**
| Sub-propiedad | ¿Qué hace? |
| :--- | :--- |
|animation-name	:|El nombre del @keyframes (en nuestro caso, miGranSalto).|
|animation-duration:|	Cuánto tarda en completar un ciclo (ej: 3s).|
|animation-timing-function:|	El ritmo (ej: ease, linear, ease-in-out).|
|animation-delay:|	Cuánto espera antes de empezar (ej: 1s).|
|animation-iteration-count:|	Cuántas veces se repite (3, infinite).|
|animation-direction:|	Si va hacia adelante, hacia atrás o alterna (alternate).|

En CSS, 

---
```CSS
.pelota 	{
  	width: 50px;
  	height: 50px;
  	background-color: red;
  	border-radius: 50%;
  
  	animation: miGranSalto 2s ease-in-out infinite;   
	}

```

________________________________________
En la tabla e Sdub-propiedades de animation hay 6 sub-propiedades, sin embargo el ejemplo uso 4: 
Por qué? Efectivamente, podemos escribir las 6 (o incluso más) en una sola línea, o poner solo las que necesitemos. CSS es bastante inteligente para entender cuál es cuál, pero tiene sus reglas.
________________________________________
#### 1. El Orden de las Propiedades
Aunque el navegador es flexible, el orden estándar recomendado es este:
`animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];`  

#### Las reglas de oro para saltarse propiedades:
1.	El Nombre y la Duración son obligatorios: Si no pones nombre, no sabe qué animar. Si no pones duración (o pones 0s), la animación nunca ocurre.
2.	El Tiempo vs. El Retraso: Esta es la única regla estricta. Como ambos se escriben en segundos (s) o milisegundos (ms), el primer valor de tiempo que pongas siempre será la duración, y el segundo será el retraso (delay).
animation: miGranSalto 2s 1s; → Dura 2s y espera 1s para empezar.
animation: miGranSalto 1s 2s; → Dura 1s y espera 2s para empezar.
3.	El resto es libre: CSS distingue infinite (repetición) de alternate (dirección) o ease (ritmo) sin importar el orden, porque son palabras clave únicas.
Ejemplo con casi todo:
/* Nombre: miGranSalto | Dura: 3s | Ritmo: linear | Espera: 1s | Repite: siempre | Dirección: va y vuelve */
animation: miGranSalto 3s linear 1s infinite alternate;

2. ¿Qué significa "ease" a secas?
Si no especificas nada o escribes solo ease, estás usando el valor por defecto del navegador.
**Significado (ease):** La animación comienza un poco lento, se acelera en el medio y termina muy lento.
Diferencia con ease-in-out: Son muy parecidos, pero ease es asimétrico (frena mucho más de lo que acelera). ease-in-out es más equilibrado y orgánico.
Tip de experto: ease es excelente para elementos que se mueven de forma natural, mientras que linear se usa para cosas mecánicas (como un ventilador girando o un segundero de reloj).

3. ¿Qué pasa con las que te saltas?
Si no escribes una propiedad en la línea corta, el navegador le asigna su valor inicial:
•	Si no pones iteration-count → Se ejecuta 1 vez.
•	Si no pones delay → Empieza al instante (0s).
•	Si no pones direction → Siempre va hacia adelante (normal).
•	Si no pones fill-mode → El elemento vuelve a su sitio al terminar (none).


# PATRON DE LA ANIMACION:


---
```CSS
@keyframes miGranSalto {
  	0% { transform: translateY(0); }
  	50% { transform: translateY(-50px); background-color: gold; }
  	100% { transform: translateY(0); }
	}
```
---

El patron mostrado en el ejemplo no es el único. Hay libertad para cambiarlo PERO existen **dos patrones principales que todo desarrollador debe conocer.**

El patrón que vimos antes (0%, 50%, 100%) es el más flexible, pero no es el único. Las variaciones y cómo "jugar" con ellas:

1. Patrón "From / To" (Desde / Hasta)
Es la forma más simple. Se usa cuando solo necesitas un punto de inicio y un punto de final (solo dos estados).

---
```CSS
@keyframes aparecer {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```
---
* from es equivalente a 0%.

* to es equivalente a 100%.

2. Patrón de Porcentajes (Multi-etapa)
Es el que usamos en miGranSalto. Te permite crear coreografías complejas. No estás limitado a 0, 50 y 100; puedes usar tantos porcentajes como quieras.

---
```css
@keyframes semaforo {
  0%   { background: green; }
  33%  { background: yellow; }
  66%  { background: red; }
  100% { background: green; }
}
```
---

3. Variaciones "Trucos" de Expertos
Aquí, la libertad lo hace interesante:

A. Agrupar Selectores
Si quieres que el elemento tenga las mismas propiedades en diferentes momentos, puedes agrupar los porcentajes con comas:

---
```css
@keyframes latido {
  0%, 100% { transform: scale(1); } /* Inicio y fin iguales */
  50%      { transform: scale(1.2); }
}
```
---

B. Omitir el 0% o el 100%
Si no defines el 0%, el navegador tomará los estilos que el elemento ya tiene por defecto en tu CSS. Esto es muy útil para animaciones que quieres que empiecen desde el estado "natural" del objeto.

---
```css
@keyframes loco {
  0% { 
    left: 0; 
    border-radius: 0; 
  }
  100% { 
    left: 200px; 
    border-radius: 50%; 
    background: blue; 
  }
}
```
---

C. Múltiples propiedades a la vez
No estás limitado a cambiar una sola cosa (como la posición). Puedes cambiar color, tamaño, sombra y rotación, todo en el mismo paso:

---
```css
@keyframes loco {
  0% { 
    left: 0; 
    border-radius: 0; 
  }
  100% { 
    left: 200px; 
    border-radius: 50%; 
    background: blue; 
  }
}
```
---
4. ¿Qué propiedades NO se pueden animar?
Aunque parece libre, hay una regla física: CSS solo puede animar valores que sean números o colores.

Se puede: width, height, opacity, color, font-size, margin, transform.

NO se puede: display: none a display: block (porque no hay un "punto medio" entre existir y no existir). Tampoco se pueden animar familias de fuentes (como pasar de Arial a Times New Roman).

Resumen de variaciones usuales:
**Entradas**: Usar from { transform: translateX(-100%); } para que algo entre desde afuera.

**Énfasis**: Usar 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } con un 40% elevado para crear un efecto de rebote.

**Loops infinitos**: Asegurarte de que el 0% y el 100% sean idénticos para que no se note el "salto" cuando la animación reinicie.


# CAMBIAR COLOR DE IMAGEN Y NO FONDO

Un detalle técnico sobre el fondo de las imágenes
Has notado que background-color en las pelotas (como la de Tenis o Fútbol) pinta un cuadrado detrás de la pelota. Esto es porque las imágenes .png tienen transparencia, pero el "lienzo" de la imagen sigue siendo cuadrado.

Si quieres que la pelota misma cambie de color, necesitarías usar filtros de CSS (como filter: hue-rotate()) o usar iconos en formato SVG, que permiten cambiar el color de sus trazos directamente.

