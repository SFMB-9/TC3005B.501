# Dashboard Compras Vendedor

## Introducción

Este módulo es parte de el proceso de ventas dentro del recorrido de vendedores y se encarga de la visualización todos los procesos de compra que le han sido asignados a un vendedor. El propósito de este documento es describir el diseño del módulo Dashboard Compras Vendedor incluyendo su funcionalidad, interfaces e implementación. Este documento es para developers y otros stakeholders que necesitan entender el propósito de este módulo en el sistema.

## **Componentes y Módulos**

- Base de datos
    
    Como la mayoría de módulos en el proyecto, el Dashboard se conecta a una instancia de MongoDB en un cluster. Para acceder a esta instancia lo unico que se hace es proveer un URL de conexión en un archivo .env que contiene las credenciales de acceso necesarias. Para propósitos de este componente, se hace uso de dos colecciones principales: la colección usuario y la colección procesos: 
    
    Para este módulo nos interesan estos campos: 
    
    - usuario_id: con este campo se obtienen los procesos que corresponden a cada vendedor haciendo una búsqueda en la base de datos que encuentra los procesos de compra que están asignados al vendedor. De igual manera, al momento de obtener la información de usuario para desplegarla en cada proceso, se hace una búsqueda en la base de datos por medio esta variable.
    - nombres: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.
    - apellidos: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.
    
    Para este módulo nos interesan estos campos:
    
    - proceso_id: únicamente se utiliza para pasarlo a la página de review procesos.
    - estatus: este campo se utiliza para desplegar el estatus de cada proceso y también para actualizarlo.
    - documentos: este campo es un array con objetos JSON que guarda todos los documentos de ese proceso que hayan sido subidos por el usuario.
    - vendedor_id: este campo se utiliza para hacer la búsqueda en la base de datos haciendo un cruce entre el usuario_id del vendedor y cada proceso asignado a ese usuario.
    - auto: se utiliza para desplegar los detalles del auto asociados con el proceso.
    
    ![Base_de_Datos - MongoDesnormalizado (1).png](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Base_de_Datos_-_MongoDesnormalizado_(1).png)
    

![Base_de_Datos - MongoDesnormalizado (3).png](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Base_de_Datos_-_MongoDesnormalizado_(3).png)

- Procesamiento de solicitudes
    
    Para el servidor se esta utilizando Node.js utilizando un protocolo de comunicación HTTPS por el cual se mandan requests de tipo REST a endpoints que establecen una conexión con un cluster en MongoDB.  En el caso del Dashboard, únicamente se utilizan requests de tipo: GET y PUT, siguiendo la siguiente estructura:
    
    …/DrivingRequestsSeller/…
    
    Dependiendo de que endpoint se va a utilizar pueden seguir las siguientes rutas:
    
    /drivingRequest
    
    /managerP
    
    /updateRequestStatus
    

## **Interfaz de Usuario**

- Descripción de la interfaz de usuario

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled.png)

El propósito de este panel es darle a cada vendedor una manera de tener una vista general de todos los procesos de compra que le hayan sido asignados y poder cambiar el estatus de cada uno de acuerdo con el progreso que se tenga. La interfaz consiste de dos componentes principales: una tabla con con todos los procesos de compra y un componente de filtrado para segmentar los procesos de acuerdo con el estatus deseado:

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%201.png)

- Flujo de navegación en la interfaz de usuario

Este es el Dashboard de solicitudes de compra para un vendedor.  El elemento más destacado es la tabla de solicitudes, en la cual, se pueden observar todos los procesos asignados a un vendedor. Para obtener estos procesos se utiliza el endpoint [drivingRequest](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/drivingRequest%2096a39d695bce4785949e666a31151782.md) .  La tabla, contiene 4 columnas:

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%202.png)

Esta primera consiste en los nombres de los vehículos de la solicitud para dar una idea general. Para esta se obtiene el modelo por medio del objeto JSON Auto de cada proceso que se está recuperando. 

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%203.png)

La siguiente es cliente, la cual se obtiene por medio de una búsqueda en la tabla de datos utilizando el campo usuario_final_id, el cual genera un cruce con usuario_id dentro de la colección usuario. Utilizando el endpoint [managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf.md) 

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%204.png)

Este es el estatus de cada solicitud. Contiene un dropdown que permite seleccionar el estatus actual de cada solicitud. Se pueden seleccionar tres, Pagado, Pago pendiente y Documentos pendientes. Una vez se selecciona un cambio, se manda un PUT a la base de datos para cambiar el estado de la solicitud. utilizando el endpoint [updateRequestStatus](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateRequestStatus%20fbf4c3bd0b724b93a826e1945301110e.md) 

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%205.png)

Finalmente, se tiene un botón de ver detalles. Al hacer click, se redirecciona a la pantalla de detalles del proceso, mandando el id de la solicitud. 

Para más detalle en la descripción de los componentes de Front-end, referir al manual de usuario de front-end.

## **Almacenamiento de Datos y Endpoints**

- Descripción de los endpoints del sistema

Como se describió arriba, los endpoints que se utilizaron fueron:

[/drivingRequest](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/drivingRequest%2096a39d695bce4785949e666a31151782.md)  

[/updateRequestStatus](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateRequestStatus%20fbf4c3bd0b724b93a826e1945301110e.md)  

[/managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf.md)  

- Formato y tipo de datos almacenados

Para este módulo el único dato que se modifica es el de la colección de procesos y se llama estatus el cual es una variable STRING

## **Pruebas y Verificación**

- Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

- Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la información correcta
- se manda información equivocada y no se regresa nada
- se manda información con un método equivocado

Pruebas drivingRequest:

[Pruebas drivingRequest](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/drivingRequest%2096a39d695bce4785949e666a31151782/Pruebas%20drivingRequest%20be49ff1c0ffb4bdcbdd972e9464afc56.md) 

Pruebas updateRequestStatus

[Pruebas updateRequestStatus](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateRequestStatus%20fbf4c3bd0b724b93a826e1945301110e/Pruebas%20updateRequestStatus%20e0b9efe91f064554bdf5e4ea7154b728.md) 

Pruebas managerP

[Pruebas managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf/Pruebas%20managerP%20cb82174e051843b6b688a511e7473574.md)