# Gestión de Agencia como Administrador de Grupo Automotriz

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de disponibilidad de las pruebas de manejo y de los documentos que pide le la agencia al comprador al hacer una venta vehicular. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la visualización de datos en una cuenta central que representa a la agencia y la visualización y modificación de las cuentas de gerentes asignadas a dicha agencia. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El manejo de la agencia se hace dentro de una sola colección: la colección usuario.

La información de la agencia se conforma de los siguientes campos:

- nombres: campo que tiene el nombre de la agencia.
- email: campo que contiene el correo de la agencia.
- numero_telefonico: campo que contiene el tléfono de la agencia.
- grupo_automotriz_id: id del documento del grupo automotriz al que pertenece la agencia.
- url_agencia: campo que contiene la URL del sitio web de la agencia.

La dirección se conforma de un campo con subcampos:

- dirección: campo sub-JSON que contiene los siguientes campos:
    - calle
    - numero_exterior
    - numero_interior
    - ciudad
    - estado
    - pais
    - codigo_postal
    - colonia

La gestión de agencia también permite visualizar a los gerentes y vendedores asignados a ella. Se buscan a base de los siguientes campos:

- tipo_usuario: campo que indica el nivel de permisos y rol de la cuenta.
- agencia_id: id del documento de la agencia a la que pertence el usuario.

La edición de gerentes usa los siguientes campos:

- nombres: campo que indica los nombres del usuario.
- apellidos: campo que indica los apellidos del usuario.
- email: campo que indica el correo del usuario.
- numero_telefonico: campo que indica el telefono del usuario.
    
    ![Base_de_Datos - MongoDesnormalizado.png](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Base_de_Datos_-_MongoDesnormalizado.png)
    

### Obtención de detalles de agencia

Los detalles de la agencia se pueden visualizar dentro de la página en forma de texto.

Esto se hace mediante un endpoint:

Obtención de detalles de agencia: /pull-agencia

### Modificación de detalles de gerentes

Los detalles de los gerentes se pueden modificar dentro de la página mediante inputs de texto, junto con botones que guardan los cambios al enviar la nueva información al endpoint. También es posible eliminar la cuenta del gerente mediante su propio botón dedicado.

Esto se hace mediante tres endpoints distintos:

Actualización de gerente: /actualizar-gerente

Eliminación de gerente: /eliminar-gerente

Obtención de información de gerente: /pull-gerente

## Interfaz de usuario

A continuación se muestra la pantalla de gestión de agencia.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled.png)

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled%201.png)

Contiene la sección de detalles de la agencia.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled%202.png)

De su dirección.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled%203.png)

Se ve la lista de Gerentes de la agencia.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled%204.png)

Donde se puede registrar a un nuevo gerente.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled%205.png)

Y finalmente se ve la lista de vendedores asignados.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%209417d5258c8e423d90a983445b6ec01a/Untitled%206.png)

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del sistema

Como ya se mencionó, existen cuatro endpoints para este módulo:

[/pull-agencia](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%20e432028a9c6746ffb7c6946be72df837/pull-agencia%20c1e0b7cc540648dfa3344600c4367552.md)

[/pull-gerente](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%20e432028a9c6746ffb7c6946be72df837/pull-gerente%20e0d4f60f81424088932696f365d17c20.md)

[/actualizar-gerente](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%20e432028a9c6746ffb7c6946be72df837/actualizar-gerente%20e55b161cfcd245eb9488422c72fee7e3.md)

[/eliminar-gerente](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Administrador%20de%20Grupo%20Au%20e432028a9c6746ffb7c6946be72df837/eliminar-gerente%20bbdfbb0beddb4a01a3a3ceeb0642964a.md)

### Formato y tipo de datos almacenados

Este módulo utiliza las siguientes variables de tipo String:

- nombres
- apellidos
- email
- numero_telefonico
- grupo_automotriz_id
- url_agencia
- tipo_usuario
- agencia_id
- calle
- numero_exterior
- numero_interior
- ciudad
- estado
- pais
- codigo_postal
- colonia

Hay una variable adicional de tipo JSON, se encuentra conformada por otras variables mencionada arriba:

- direccion

### Especificaciones de seguridad y privacidad de los datos

- tipo_usuario: campo encriptado