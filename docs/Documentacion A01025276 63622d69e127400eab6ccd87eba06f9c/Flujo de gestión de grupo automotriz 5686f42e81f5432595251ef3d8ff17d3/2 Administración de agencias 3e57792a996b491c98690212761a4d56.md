# 2. Administración de agencias

## 2.1. Descripción

Esta funcionalidad comprende la funcionalidad de visualizar y administrar las agencias que comprenden un grupo automotriz registrado sobre el programa. Con este componente sera posible, además de visualizar; poder crear, editar y eliminar las agencias que sean del grupo automotriz que se ha autenticado.

## 2.2. Dependencias

### 2.2.1. Componentes dependientes

- **Registro de agencia:** Se necesita que las funcionalidad del presente modulo se cumplan para poder acceder a esta funcionalidad.
- ********************************Detalle de agencia:******************************** Desde esta interfaz se accede a los detalles de la agencia.

### 2.2.2. Funcionalidades necesarios

- **Borrar objeto en base de datos:** Requerido para eliminar objeto creado y asociado a una agencia.
- **************************************Buscador por palabra:************************************** Necesario para buscar agencias por los campos mostrados y guardados.

## 2.3. Componentes/Módulos

### 2.3.1. Base de datos

Para poder administrar las agencias de un grupo automotriz, se necesita establecer una conexión con una base de datos. Para establecer dicha conexión se requiere de la *URI* proveniente de la base de datos, esta *URI* se guarda sobre un archivo ambiental local (*****.env.local*****) con fines de desarrollo y al momento de producción se guarda dentro del ambiente de la infraestructura (la forma de acceder a ella mediante código es igual sin importar el contexto). 

### 2.3.2. Colección de ‘usuarios’

![Figura 1.1. Estructura de la colección de usuarios](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Para el desarrollo de la presente funcionalidad los campos importantes son los siguientes mencionados, que contienen los datos a visualizarse mediante esta funcionalidad:

- **usuario_id**: autogenerado, corresponde al identificador único para la agencia, será utilizado para identificar cada componente del frontend.
- **email**: campo sobre la tabla que contiene el correo electrónico en forma de cadena de caracteres.
- { **direccion: { estado } }**: campo sobre la tabla que contiene el estado en el que se encuentra la agecia en forma de cadena de caracteres.
- **numero_telefonico**: campo sobre la tabla que contiene el número telefónico en forma de cadena de caracteres.
- **agencia**: campo sobre la tabla que contiene el nombre de la agencia en forma de cadena de caracteres.

Es importante recalcar que dentro de la base de datos, sobre la colección de ‘usuarios’ se estará guardando información de los distintos tipos de usuarios que se manejan, delimitados y segmentados por el campo ‘tipo_usuario’ encriptado. 

## 3.4. Interfaz de Usuario

En esta interfaz sera posible realizar distintas acciones relacionadas con la administración de agencias. 

![Untitled](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Untitled.png)

Primero mediante la barra de búsqueda puedes buscar a la agencia por cualquier campo visible dentro de la tabla de agencias (ej. buscar por estado o nombre de agencia). 

![Untitled](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Untitled%201.png)

Con el botón de ‘Registrar agencia’ se agregan agencias nuevas correspondientes al grupo automotriz autenticado (consultar sección 3.). 

![Untitled](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Untitled%202.png)

Dentro de la tabla, es posible visualizar los tres campos de ‘Agencia’, ‘Estado’, ‘Teléfono’.

![Untitled](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Untitled%203.png)

Al costado de la tabla, tenemos botones relevantes. El primero ‘Ver detalle’ te redirecciona a la página con los detalles de la agencia correspondiente a la fila del botón (desglosado en la sección 4.). 

![Untitled](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Untitled%204.png)

El siguiente botón corresponde a ‘Borrar’, expresado con un icono en forma de basurero. Este se conecta al API para mandar una solicitud con el fin de eliminar la agencia de la fila correspondiente.

![Untitled](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Untitled%205.png)

## 2.5. Objetivos y criterio de éxito

| Objetivo | Criterio de éxito  | Orden |
| --- | --- | --- |
| Tabla de visualización de agencias | Ordenados por orden de registro, que muestre los datos de agencia, estado y teléfono.  | 1 |
| Botón para eliminar agencia | Elimina a la agencia asociada en la fila del botón. | 2 |
| Botón de detalle | Redirige al usuario a la funcionalidad con los detalles específicos de la agencia seleccionada.  | 3 |
| Buscador de agencias | Se filtran las agencias dependiendo de las palabras clave insertadas en el campo. | 4 |
| Botón para registrar agencia | Redirige al usuario a la funcionalidad para ingresas información de la agencia y registrarla. | 5 |