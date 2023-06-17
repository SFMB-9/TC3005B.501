# Notificaciones por Twilio

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de los vendedores asignados a la agencia del gerente. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la verificar la modificación de un campo de un proceso. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El campo relevante se encuentra dentro de la colección procesos.

Se utilizan un campo en la operación de actualización:

- estatus_validacion: un campo que indica el estado en el que se encuentra el proceso.
    
    ![Base_de_Datos - MongoDesnormalizado (1).png](Notificaciones%20por%20Twilio%20dc17b6062fa84c6eabef2fdb017c5b3b/Base_de_Datos_-_MongoDesnormalizado_(1).png)
    

### Envío de mensaje

El envío del mensaje se hace cada vez que se actualiza el estado de un proceso relevante.

Esto se hace mediante un endpoint:

Envío de mensaje: /message

## Interfaz de usuario

A continuación se muestra la pantalla de solicitudes de compra.

![Untitled](Notificaciones%20por%20Twilio%20dc17b6062fa84c6eabef2fdb017c5b3b/Untitled.png)

Los mensajes se envían al haber un cambio en la columna de Estatus.

![Untitled](Notificaciones%20por%20Twilio%20dc17b6062fa84c6eabef2fdb017c5b3b/Untitled%201.png)

A continuación se muestra la pantalla de solicitudes de pruebas de manejo.

![Untitled](Notificaciones%20por%20Twilio%20dc17b6062fa84c6eabef2fdb017c5b3b/Untitled%202.png)

Los mensajes se envían al haber un cambio en la columna de Estatus.

![Untitled](Notificaciones%20por%20Twilio%20dc17b6062fa84c6eabef2fdb017c5b3b/Untitled%203.png)

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del módulo

Como ya se mencionó, existe un endpoint para este módulo:

[/message](APIs%20059691d154ad421abbf7f195cee48c5c/Notificaciones%20Twilio%203755118b237848399991cc731eb36260/message%20f108809932ff4e00bb3495ed698a9997.md)

### Formato y tipo de datos almacenados

Este módulo utiliza una variable de tipo String:

- estatus_validacion

### Especificaciones de seguridad y privacidad de los datos

No hay campos asegurados para este módulo.