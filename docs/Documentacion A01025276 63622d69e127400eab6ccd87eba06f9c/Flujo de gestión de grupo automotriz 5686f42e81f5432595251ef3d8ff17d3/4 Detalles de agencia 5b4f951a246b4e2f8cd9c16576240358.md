# 4. Detalles de agencia

## 4.1. Descripción

En esta funcionalidad se desglosa a detalle la información de las agencias que pertenecen al grupo automotriz autenticado. Además, se puede editar dicha información en caso de requerir algún cambio.

## 4.2. Dependencias

### 4.2.1. Componentes dependientes

- **Registro de gerente**: se requiere el presente componente para asignar a la agencia que se creo en la funcionalidad de la sección 3. Esto con el fin de poder poblar el campo de ‘gerente_id’ en la colección de usuarios con { tipo_usuario == “agencia” }.
- **Registro de vendedores:** mediante este componente se puede registrar a distintos vendedores para cada agencia.

### 4.2.2. Componentes necesarios

- ********************************************************Administración de agencias:******************************************************** Desde esta página se accede a la presente funcionalidad. Las agencias creadas se muestran en forma de tabla gracias a esta funcionalidad.

## 4.3. Componentes/Módulos

### 4.3.1. Base de datos

Para poder realizar el registro de una agencia, se necesita establecer una conexión con una base de datos. Para establecer dicha conexión se requiere de la *URI* proveniente de la base de datos, esta *URI* se guarda sobre un archivo ambiental local (*****.env.local*****) con fines de desarrollo y al momento de producción se guarda dentro del ambiente de la infraestructura (la forma de acceder a ella mediante código es igual sin importar el contexto). 

### 4.3.2. Colección de ‘usuarios’

![Figura 1.1. Estructura de la colección de usuarios](2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Para el desarrollo de la presente funcionalidad los campos importantes son los siguientes mencionados, que se poblarán de las fuentes citadas a lado:

- **nombre**: incluye el nombre de la agencia, insertado por el mismo usuario si se desea editar.
- **email**: insertado por el usuario mediante la interfaz.
- **direccion**: insertado por el usuario mediante la interfaz.
- **numero_telefonico**: insertado por el usuario mediante la interfaz.
- **grupo_automotriz**: nombre de grupo automotriz que lo registra, esta información se envía como un parámetro de *query* (en detalle sobre la sección 3.6.).
- **grupo_automotriz_id**: id del grupo automotriz que lo registra, esta información se envía como un parámetro de *query* (en detalle sobre la sección 3.6.).
- **agencia**: insertado por el usuario mediante la interfaz.

Es importante recalcar que dentro de la base de datos, sobre la colección de ‘usuarios’ se estará guardando información de los distintos tipos de usuarios que se manejan, delimitados y segmentados por el campo ‘tipo_usuario’ encriptado. 

## 4.4. Interfaz de Usuario

Dentro de esta interfaz se podrán consultar los datos ingresados al momento de registrar la agencia al mismo tiempo que lo utilizamos para poder actualizar la información. Los campos detallados con su cuadro de texto, que evidentemente estará vinculado con la base de datos (sección 3.3.2.).

![Untitled](4%20Detalles%20de%20agencia%205b4f951a246b4e2f8cd9c16576240358/Untitled.png)

En la parte superior, a un costado de ‘Datos de la Agencia’ encontramos un icono en forma de lápiz. Al oprimir el icono los campos citados en la parte superior se habilitaran para que se pueda editar. 

![Untitled](4%20Detalles%20de%20agencia%205b4f951a246b4e2f8cd9c16576240358/Untitled%201.png)

Después de editar los campos deseados, es necesario dar click en el botón de ‘Guardar’, con este evento se realizará una actualización a a la base de datos en la colección de ‘usuarios’ basado en el ‘usuario_id’ que se está editando. 

![Untitled](4%20Detalles%20de%20agencia%205b4f951a246b4e2f8cd9c16576240358/Untitled%202.png)

## 4.5. Objetivos y criterios de éxito

| Objetivo | Criterio de éxito  | Orden |
| --- | --- | --- |
| Campos para ingresar/ver información  | Se muestran los 6 campos que se solicitan y son modificables. Dentro del placeholder se puede leer la información actual. | 1 |
| Validación de información  | Cada campo tiene la capacidad de validar la información ingresada (ej. que el correo tenga un @ y acabe en .—) | 2 |
| Botón de editar | Habilita que se puedan ingresar datos a los cuadros de texto. | 3 |
| Botón de guardar | Acciona el API para que se pueda actualizar los datos de la agencia sobre la base de datos. | 4 |