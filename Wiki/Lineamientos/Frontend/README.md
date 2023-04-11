# Lineamientos y estándares para el área de Frontend

### Versión 1.0
Integrantes: Ana Paula Katsuda, Tonatiuh Reyes, Mateo Herrera, Regina Rodríguez, Iwalani Amador, Salvador Milanés y Luis Javer Karam

---

## Índice
1. [Introducción](#introducción)
2. [Roles y Responsabilidades](#roles-y-responsabilidades)
3. [Estándares](#estándares)
    1. [Estándares de Comunicación](#estándares-de-comunicación)
    2. [Estándares de Código](#estándares-de-código)
    3. [Manual de Imagen](#manual-de-imagen)
5. [Consideraciones generales para el sitio]()

--- 

## Introducción 
El objetivo del presente documento es proveer una descripción general de la manera en la que el equipo de frontend trabajará, los estándares de imagen, código y comunicación a utilizar así como las consideraciones que se tendrá al desarrollar el sitio web. 

## Roles y responsabilidades
A continuación, se especifican los roles y las responsabilidades de los integrantes del equipo. 

| Rol | Responsabilidades | Integrante |
| --- | --- | --- |
| Co-Project Manager| Sus responsabilidades son mantener organización y seguimiento de las actividades realizadas por el frontend, asegurando que se cumplan los requerimientos. | Ana Paula Katsuda y Tonatiuh Reyes |
| Head de Diseño | Su responsabilidad es supervisar y definir el diseño de la página, enfocándose en que se cumplan las buenas prácticas de UX | Regina Rodríguez | 
| Equipo de calidad | Su responsabilidad es asegurarse de que se cumplan todos los estándares planteados y que se tenga una buena calidad en el sitio por parte del frontend. Van de la mano con el Head de diseño | Mateo Herrera e Iwalani Amador | 
| Desarrolladores | Son los principales encargados de desarrollar el código. | Luis Javier Karam y Salvador Milanés | 

Si bien esta es la manera en la que se dividen los roles, el equipo estará trabajando con base en objetivos (enfocándose en que se cumplan las historias de usuario de cada sprint), por lo que la distribución está sujeta a cambios. 

## Estándares

En esta sección, se presentan los estándares que el equipo seguirá para el desarrollo correcto de la aplicación. 

### Estándares de Comunicación
La comunicación en el frontend se mantendrá por medio de Discord como se ha acordado en el equipo general. Se tiene un canal dedicado al frontend y para tareas más específicas será posible abrir un "Thread". Asimismo, la información relevante tal como las ligas a los diseños, acuerdos planteados entre otros, podrá ser "pinneada".

### Estándares de Código
En cuanto a los estándares de código, se continuará utilizando github para el control de versiones (siguiendo los estándares definidos en para el equipo general de Pulse) y se tendrán las siguientes especificaciones: 

- _Nombres de variables_: Se utilizará la convención de lowerCamelCase, en la que la primera palabra va completamente en minúsculas, y las palabras siguientes (en caso de haber) van con la primera letra en mayúsculas sin ningún espacio. 
- _Identación_: Para cualquier lenguaje utilizado, se deberá mantener la identación correspondiente en caso de que existan agrupaciones o código base. 
- _Comentarios_: 

    - Comentarios en ESPAÑOL.
    - Poner la descripción de lo que hace cada "Script" al inicio del código. Incluir nombres de autores. 
    - Iniciar los comentarios con mayúsculas y terminarlos con punto. 
    - Utilizar notación de bloque (/**/ en javascript) si el comentario lleva más de una línea y notación de línea (// en javascript) si solamente es de una línea. 
    - Poner el comentario en la línea anterior al inicio del código que se quiere explicar. 
    - Funciones: Describir el uso de la función, especificar valores de entrada y de salida. 
- _Longitud de código_: cada línea de código debe tener una longitud menor a 80 caracteres a menos que exista una razón específica para no tenerla. 
- _Reusabilidad de código_: seccionar el código de manera que se pueda reusar. En el caso del frontend, un ejemplo de esto es la separación de componentes de React para utilizarlos en distintas páginas. 

## Manual de Imagen
En el presente manual, se podrá encontrar información relevante respecto al diseño del sitio web, desde la paleta de colores, tipografía y logo. 

[Acceder al manual](https://www.canva.com/design/DAFe6UqGWEM/fySzxZqLm30OoAXwTal-BQ/view?utm_content=DAFe6UqGWEM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Consideraciones generales
En la presente sección, se enlistan las consideraciones generales que se tendrán para el desarrollo del frontend. 

_Notas importantes:_
El front-end va en mancuerna con el backend, por lo que es imprescindible estar en sintonía con respecto al scope y lo que se desarrollará.

### M - Lo que constituye al MVP
Interfaz de catálogo donde:
- Se ve un arreglo inteligente de tarjetas de vehículo.
- Elegir una tarjeta abre una interfaz de información.
- Se tiene una sección visible con filtros.
Interfaz de informacion del vehiculo donde:
- Se ven imágenes del vehículo.
    - Se despliega una interacción 360º 
- Se enlista información pertinente de las características y atributos particulares del vehículo.
- Se muestra el precio final.
- Existe un botón para diálogo con un vendedor/agente.
- Existe un botón para solicitar una prueba de manejo.
- Existe un botón para cotizar o comprar el vehículo. 
Interfaz de perfil donde
- Se pueda ver los datos de la cuenta 
    - Tipo de cuenta.
    - Nombre de usuario

Interfaz general donde
- Se muestra una barra de navegación. 
- La barra contiene acceso fácil a páginas importantes. 
- La barra contiene acceso al perfil de usuario.
- Se muestra el “footer” de la página. 

### S - Un poco más allá, lo que nos distingue o identifica
Interfaz de landing (usr no registrado) donde
- Se puede tomar un quiz tipo Buzzfeed para generar recomendaciones con base en el perfil del cliente.

Interfaz de información del vehículo donde:
- Haya un botón para guardar el vehículo en una lista de deseos, o en una colección.

Interfaz de perfil donde
- Se pueda modificar los datos de la cuenta
    - Nombre
- Se pueda eliminar la cuenta

### C - Nuestro Wishlist
Interfaz de perfil de usuario donde
- Existan campos de personalización.
    - Imagen de perfil.
    - Definición y modificación de pronombres (chat).

Interfaz de comparación de autos donde
- Los usuarios puedan agregar y quitar coches en la comparación. 
- Se muestra claramente.

### W - El wishlist de NDS y llevar el producto más allá
Interfaz de perfil de usuario donde
- Se puede personalizar la paleta de color de la pagina.
- Se puede cambiar el idioma.

Si bien se especifica una serie de interfaces con sus características, estás serán extendidas y alineadas a los requerimientos, por lo que la visualización general de las mismas se encuentra en el Wireframe del SRS. 