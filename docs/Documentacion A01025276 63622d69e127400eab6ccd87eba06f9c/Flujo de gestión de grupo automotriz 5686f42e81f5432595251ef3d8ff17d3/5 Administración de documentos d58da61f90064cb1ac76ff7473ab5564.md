# 5. Administración de documentos

## 5.1. Descripción

Dentro de esta amplia funcionalidad se administran los documentos que se necesitan para completar con el proceso de dar de alta de una agencia. Se enlistan los documentos, se pueden subir, cambiar o eliminar. Además, el usuario puede monitorear el estatus de los documentos y leer comentarios que pueden ser relevantes al estatus del documento.

## 5.2. Dependencias

### 5.2.1. Componentes dependientes

- ****************************************************Aprobación de documentos:**************************************************** Con esta funcionalidad se asigna el estatus y actualizan los comentarios a todos los documentos subidos. Evidentemente se requiere de esta funcionalidad para poder acceder a lo mencionado previamente.
- ******************************************************Documentos para descargar:****************************************************** El panel de administración de documentos es la que contiene una tabla que referencia todos los documentos que se necesitan descargar, llenar y volver a subir.

### 5.2.2. Componentes necesarios

- **************************************************Subir documentos a la nube:************************************************** Esta funcionalidad es una dependencia crítica ya que sin esta no se puede proceder con todo lo que comprende la presente funcionalidad.
- ******************************************************************Eliminar documentos de la cubeta:****************************************************************** En caso de requerir eliminar un documento, se tiene que encontrar el documento en la nube y removerla.
- ******************Actualizar base de datos:****************** Si se realiza un cambio en el documento, es primordial que quede actualizado al objeto de agencia que se está tratando.
- **Actualizar estatus de archivo:** Se requiere para la columna en donde se muestra el estatus de cada documento solicitado.
- **Crear comentario para archivo:** Similar al de arriba, para que el usuario pueda tener detalles del por qué de su estatus.

## 5.3. Componentes/Módulos

### 5.3.1. Base de datos

Para poder realizar el registro de una agencia, se necesita establecer una conexión con una base de datos. Para establecer dicha conexión se requiere de la *URI* proveniente de la base de datos, esta *URI* se guarda sobre un archivo ambiental local (*****.env.local*****) con fines de desarrollo y al momento de producción se guarda dentro del ambiente de la infraestructura (la forma de acceder a ella mediante código es igual sin importar el contexto). 

### 5.3.2. Colección de ‘usuarios’ - subcolección ‘documentos’

![Figura 1.1. Estructura de la colección de usuarios](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

![Figura 1.2. Estructura de la subcolección de documentos](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled.png)

Figura 1.2. Estructura de la subcolección de documentos

Para el desarrollo de la presente funcionalidad utilizaremos la subcolección de documentos. Se emplearán los siguientes campos:

- **usuario_id**: autogenerado, corresponde al identificador único para la agencia.
- **tipo_usuario**: para esta funcionalidad sera ‘agencia’, encriptada para poder esconder los roles dentro de la colección.
- **email**: insertado por el usuario mediante la interfaz.
- **direccion**: insertado por el usuario mediante la interfaz.
- **numero_telefonico**: insertado por el usuario mediante la interfaz.
- grupo_automotriz: nombre de grupo automotriz que lo registra, esta información se envía como un parámetro de *query* (en detalle sobre la sección 3.6.).
- **grupo_automotriz_id**: id del grupo automotriz que lo registra, esta información se envía como un parámetro de *query* (en detalle sobre la sección 3.6.).
- **agencia**: insertado por el usuario mediante la interfaz.
- **agencia_id**: autogenerado al insertar el campo superior.
- **gerente_id**: asignado al registrar gerente (dependencia con ‘Registro de gerente’, mencionado en la sección 3.2.).

Es importante recalcar que dentro de la base de datos, sobre la colección de ‘usuarios’ se estará guardando información de los distintos tipos de usuarios que se manejan, delimitados y segmentados por el campo ‘tipo_usuario’ encriptado. 

### 5.3.3. Cubeta (bucket) en la nube

Para poder integrar esta función se requiere de una cubeta en donde se puedan almacenar archivos. Al momento de subir un documento por medio de nuestra API recibiremos un **URL** al documento subido. 

Posterior a recibir la ****URL**** al documento, se inicia otro proceso dentro del mismo API para actualizar el documento sobre la subcolección de los documentos que solicita cada grupo automotriz para dar de alta una agencia. 

Asimismo, en esta cubeta se guardan los documentos que se tienen que proveer de ambos lados, como ejemplo el contrato, para que dentro de esta misma funcionalidad de administración de documentos se pueda actualizar.

## 5.4. Interfaz de Usuario

Para esta funcionalidad tenemos dos pantallas. La primera es la que tenemos es el panel de administración de documentos. En esta se enlistan todos los documentos por su nombre, fecha de entrega, funciones de edición (subir, adjuntar, borrar), estatus y los comentarios. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%201.png)

Dentro de los primeros componentes funcionales dentro de la pantalla, tenemos los botones de edición de los documentos solicitados. Dependiendo del estatus del documento, se activan distintos botones. Si el estatus esta como ‘sin subir’, solo se activa el botón para subir documentos denotado con una flecha hacia arriba (este lo manda a la segunda pantalla, desglosada después). Si fuera el caso de que ya se subió el documento y esta dentro de los tres estados posibles a ser mencionados a continuación, se activa el botón de adjuntar caracterizado por un clip y el botón de borrar expresado en un basurero. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%202.png)

La siguiente columna dinámica viene siendo el estatus del documento, de las cuales pueden ser: sin subir, aprobado, rechazado, en revisión. Cada uno con sus colores que se observan abajo.

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%203.png)

Por último, en la columna de comentarios se agrega texto por los usuarios aprobadores, en caso de que los documentos subidos tengan detalles específicos que necesitan ser tratados antes de ser re-adjuntados. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%204.png)

En la siguiente sección, podemos ver la funcionalidad dependiente de esta, que viene siendo la de descarga de documentos.

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%205.png)

Una vez aprobados todos los documentos, se activa este botón de ‘Continuar’ (cambiando de color al rosa) para proceder con los siguientes pasos para continuar con la gestión de agencias.

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%206.png)

La siguiente pantalla, se puede considerar una extensión de la previa, que se accede al momento de querer subir o adjuntar un documento.

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%207.png)

Dentro del primer campo de texto, se ingresa el nombre deseado para el documento a subir.

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%208.png)

En la pequeña tabla a la derecha, se observan todos los metadatos correspondientes a subir el documento. Desde el ‘Estado de archivo’, ‘Fecha de entrega’ y ‘Estado de aceptación’. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%209.png)

En el gran cuadro punteado en la izquierda, subir el archivo ya sea accediendo a los archivos locales o mediante el arrastre del archivo. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%2010.png)

La sección abajo de la tabla, tenemos otra cuadricula grande en donde se leen los comentarios de los detalles que ha tenido el documento. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%2011.png)

Por último, se encuentra un botón para subir el archivo que activa el API para subir a la cubeta el archivo, recibir el URL y actualizarlo sobre la base de datos. 

![Untitled](5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564/Untitled%2012.png)

## 5.5. Objetivos y criterios de éxito

| Objetivo | Criterio de éxito | Orden |
| --- | --- | --- |
| Tabla con listado de documentos necesarios | Se muestran en lista todos los documentos que se encuentran dentro del campo de ‘documentos’. | 1 |
| Columna de estatus del documento | El color y texto de los indicadores cambia dependiendo del estatus asociado. | 2 |
| Columna de comentarios | El usuario puede observar los comentarios relevantes al estatus de su documento. | 3 |
| Columna con botones dinámicos para editar el documento | Los botones que se activan y muestran se asocian al estatus del documento. | 4 |
| Tabla dinámica con documentos que se pueden descargar para llenar | Se muestra una tabla en donde se enlistan y se pueden descargar los documentos propios. | 5 |
| Interfaz para subir documento | Redirige al usuario a una nueva pantalla con los objetivos listados abajo. | 6 |
| Cuadro para subir o arrastrar documento a subir | El usuario puede subir un documento ya sea seleccionando desde su máquina local o arrastrando. | 7 |
| Cuadro de texto para cambiar nombre del documento | El usuario puede ingresar un nuevo nombre del documento. | 8 |
| Tabla con metadatos del documento | Se muestran los metadatos asociados con la subida del archivo (si existe un archivo previo). | 9 |
| Cuadro con los comentarios hechos al documento | Se observa y leen los comentarios que se hicieron al archivo.  | 10 |
| Botón para subir archivo | Se acciona el API para subir el documento a la cubeta y actualizar la base de datos con el URL recibido.  | 11 |