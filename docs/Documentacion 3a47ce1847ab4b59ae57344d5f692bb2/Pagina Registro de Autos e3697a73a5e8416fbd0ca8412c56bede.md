# Página: Registro de Autos

## Introducción

Este módulo es parte de el proceso de autos dentro del flujo de gerente y se encarga del registro de un nuevo auto para que sea subido a la plataforma bajo el nombre del grupo automotriz y agencia. El propósito de este documento es describir el diseño del módulo: Página: Registro de Autos, incluyendo su funcionalidad, interfaces e implementación. Este documento es para developers y otros stakeholders que necesitan entender el propósito de este módulo en el sistema.

## **Componentes y Módulos**

- Base de datos
    
    A diferencia de la mayoría de los módulos, la página se conecta a una instancia de Elasticsearch. Para acceder a esta instancia lo único que se hace es proveer un URL de conexión en un archivo .env que contiene las credenciales de acceso necesarias. Para propósitos de este componente, se hace uso de un index: autos, en el cual se guardan todos los autos del sistema.
    

Para este módulo nos interesan todos los campos de esta colección ya que se van a utilizar todos al momento de registrar al auto. No obstante, por claridad se definirán los campos compuestos: 

- colores: Colores es un objeto JSON que guarda los colores disponibles para el auto. dentro de este objeto hay objetos JSON para cada color con los siguientes campos:
    - nombre
    - valor_hexadecimal
    - imagenes: es un array de strings que guarda todos los hipervínculos a firestore
- extras: es un objeto JSON que guarda todas las características extra que puede tener un auto para añadirle valor al costo. Dentro de este objeto JSON hay un objeto JSON por cada característica extra:
    - titulo
    - precio
    - descripcion
- plazo: plazo es un objeto JSON con las opciones de plazos disponibles para el pago del auto. Este objeto JSON contiene otros objetos JSON con cada plazo y tasa disponible para el auto:
    - meses
    - porcentaje
- entrega: Este campo es un objeto JSON con las opciones de entrega disponibles para el auto. Dentro del objeto hay objetos JSON con los siguientes campos:
    - Nombre
    - Precio
    - Descripción

![Base_de_Datos - Elasticsearch.png](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Base_de_Datos_-_Elasticsearch.png)

- Procesamiento de solicitudes
    
    Para el servidor se esta utilizando Node.js utilizando un protocolo de comunicación HTTPS por el cual se mandan requests de tipo REST a endpoints que establecen una conexión con un cluster en Elasticseach.  En el caso de la página, únicamente se utilizan requests de tipo: GET y POST, siguiendo las siguientes rutas:
    
    /carRegister/elasticCarRegister
    
    /uploadBucketDoc/uploadBucketDoc
    

## **Interfaz de Usuario**

- Descripción de la interfaz de usuario

El propósito de este panel es darle a cada vendedor una manera de tener una vista detallada del proceso en específico que quiera y se le haya sido asignado. Igualmente sirve para poder cambiar el estatus de cada uno de los documentos relacionados con ese proceso y cambiar sus comentarios.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled.png)

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%201.png)

La interfaz contiene un forms con todos los campos descritos en el diagrama de datos.

- Flujo de navegación en la interfaz de usuario

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%202.png)

Este primer componente despliega los detalles del inventario para el auto incluyendo cantidad y si va a estar disponible para prueba o catálogo.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%203.png)

Este segundo componente despliega los detalles generales del auto, incluyendo la marca, modelo, color interior, combustible, motor, año, transmisión, rendimiento,  número de pasajeros, precio, tipo de vehículo (el cual se selecciona por medio de un dropdown) y descripción. 

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%204.png)

El siguiente componente incluye la información de la agencia a la que se va a registrar el auto.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%205.png)

Esta sección se encarga de incluir todos los colores en los que va a estar disponible el vehículo. Cabe notar que existe una sección para subir una imagen del auto en ese color. No obstante hay un pequeño problema aquí. El objeto colores sólo debe de guardar un url de la imagen guardada en Firestore sin embargo, no hemos subido nada todavía. Por lo tanto, una vez se da el botón de guardar en el final de la página, se llama al endpoint [uploadBucketDoc](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/uploadBucketDoc%203b9a583063e5476495805b80e3427a22.md) que al mandarle una variable tipo File, sube el archivo a Firestore y regresa un url. Hacemos esto por cada una de las imágenes de los colores.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%206.png)

El componente de características permite añadir características del coche.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%207.png)

Siguiente se encuentran los extras. Estos extras sirven para dar características opcionales al auto para darle valor añadido en caso de que el comprador lo desee.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%208.png)

Enganche sirve para añadir porcentajes de enganche disponibles que el usuario comprador seleccione.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%209.png)

En las opciones de plazo, el usuario puede añadir los meses y el porcentaje que se tiene que pagar por cada mes.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%2010.png)

En la sección de entrega el auto se introducen los detalles del auto para que el usuario comprador pueda escoger como recibir el auto. Cabe mencionar que algunos tienen un precio añadido.

![Untitled](Pagina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Untitled%2011.png)

Finalmente se encuentra el botón de subir auto, el cual llama al endpoint [elasticCarRegister](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/elasticCarRegister%20d23c1bc5926a418e9ff39637be643a00.md) que agarra un objeto auto que con todos los valores del forms y lo sube a Elasticseach

## **Almacenamiento de Datos y Endpoints**

- Descripción de los endpoints del sistema

Como se describió arriba, los endpoints que se utilizaron fueron:

[/elasticCarRegister](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/elasticCarRegister%20d23c1bc5926a418e9ff39637be643a00.md)

[/uploadBucketDoc](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/uploadBucketDoc%203b9a583063e5476495805b80e3427a22.md)

- Formato y tipo de datos almacenados

Para este módulo los únicos datos que se modifican son de tipo INT, STRING y BOOL.