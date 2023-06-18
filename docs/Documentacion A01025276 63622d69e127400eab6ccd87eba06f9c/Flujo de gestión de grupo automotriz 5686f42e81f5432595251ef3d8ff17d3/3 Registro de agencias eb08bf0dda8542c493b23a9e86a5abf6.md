# 3. Registro de agencias

## 3.1. Descripción

Este módulo tiene como fin poder dar de alta a las agencias por parte de un usuario del tipo ‘Grupo Automotriz’. El usuario ingresa la información necesaria que solicita el sistema para iniciar con el proceso de dar de alta a una agencia asociada al grupo automotriz autenticado. 

## 3.2. Dependencias

### 3.2.1. Componentes dependientes

- **Registro de gerente**: se requiere que se registre un gerente y se asigne a una agencia que se crea mediante esta funcionalidad para poder poblar el campo de ‘gerente_id’ en la colección de usuarios con { tipo_usuario == “agencia” }.

### 3.2.2. Componentes necesarios

- ********************************************************Administración de agencias:******************************************************** Desde esta página se accede a la presente funcionalidad. Las agencias creadas se muestran en forma de tabla gracias a esta funcionalidad.

## 3.3. Componentes/Módulos

### 3.3.1. Base de datos

Para poder realizar el registro de una agencia, se necesita establecer una conexión con una base de datos. Para establecer dicha conexión se requiere de la *URI* proveniente de la base de datos, esta *URI* se guarda sobre un archivo ambiental local (*****.env.local*****) con fines de desarrollo y al momento de producción se guarda dentro del ambiente de la infraestructura (la forma de acceder a ella mediante código es igual sin importar el contexto). 

### 3.3.2. Colección de ‘usuarios’

![Figura 1.1. Estructura de la colección de usuarios](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Para el desarrollo de la presente funcionalidad los campos importantes son los siguientes mencionados, que se poblarán de las fuentes citadas a lado:

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

## 3.4. Interfaz de Usuario

Esta funcionalidad es compuesta por un flujo completo, incluyendo la interacción con el usuario. Es por ello que es una interfaz sencilla y practica para que el mismo usuario pueda completar los campos solicitados y citados en la sección 3.3.2. 

![Untitled](3%20Registro%20de%20agencias%20eb08bf0dda8542c493b23a9e86a5abf6/Untitled.png)

Al completar todos los campos, habrá que oprimir el botón  de ‘Registrar’ para que se pueda establecer la conexión con la base de datos mediante el API para poder crear los datos de la nueva agencia. Un punto importante a mencionar es que si los campos no están llenos todos los campos, se notifica un error al usuario para que pueda completar todas.

![Untitled](3%20Registro%20de%20agencias%20eb08bf0dda8542c493b23a9e86a5abf6/Untitled%201.png)

## 3.5. Objetivos y criterios de éxito

| Objetivo | Criterio de éxito | Orden |
| --- | --- | --- |
| Campos para ingresar información | Se muestran los 7 campos que se solicitan y son modificables. | 1 |
| Validación de información | Cada campo tiene la capacidad de validar la información ingresada (ej. que el correo tenga un @ y acabe en .—) | 2 |
| Botón de registro | Acciona el API para que se pueda agregar la agencia sobre la base de datos. | 3 |

---