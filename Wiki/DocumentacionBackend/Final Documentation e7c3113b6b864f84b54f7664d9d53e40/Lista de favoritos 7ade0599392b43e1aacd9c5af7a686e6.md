# Lista de favoritos

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de los vendedores asignados a la agencia del gerente. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra el almacenamiento del id de un vehículo. La base de datos es una instancia de Elasticsearch al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). Solo se usa una única tabla: autos.

Se utiliza un campo en la operación de búsqueda:

- auto_id: un campo que contiene el id de la entrada del documento en la base de datos.
    
    ![Base_de_Datos - Elasticsearch.png](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Base_de_Datos_-_Elasticsearch.png)
    

### Guardado de vehículos

Al visualizar algún vehículo, un cliente es capaz de seleccionarlo para agregarlo a su lista de favoritos.

Esto se hace mediante un endpoint:

Adición a la lista: /add-to-wishlist

### Obtención de vehículos en la lista

Al entrar a su perfil, un cliente es capaz de visualizar su lista de favoritos.

Esto se hace mediante un endpoint:

Obtención de la lista: /pull-wishlist

## Interfaz de usuario

A continuación se muestra la lista de favoritos.

![Untitled](Lista%20de%20favoritos%207ade0599392b43e1aacd9c5af7a686e6/Untitled.png)

Se puede acceder mediante el botón de mis favoritos dentro del perfil del usuario.

![Untitled](Lista%20de%20favoritos%207ade0599392b43e1aacd9c5af7a686e6/Untitled%201.png)

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del módulo

Como ya se mencionó, existen dos endpoints que manejan este módulo:

[/add-to-wishlist](APIs%20059691d154ad421abbf7f195cee48c5c/Lista%20de%20deseos%206459560f82e94d79b86d803ddd996ce7/add-to-wishlist%20a1afd3b610b64cd8ba7298eabf7ba2e9.md)

[/pull-wishlist](APIs%20059691d154ad421abbf7f195cee48c5c/Lista%20de%20deseos%206459560f82e94d79b86d803ddd996ce7/pull-wishlist%20866fb32aa9944e099d59971245172c86.md)

### Formato y tipo de datos almacenados

Este módulo utiliza una variable de tipo String:

- auto_id

### Especificaciones de seguridad y privacidad de los datos

No hay campos asegurados para este módulo.