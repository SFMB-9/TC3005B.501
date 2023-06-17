# Comparación de productos

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de los vendedores asignados a la agencia del gerente. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la verificar la modificación de un campo de un proceso. La base de datos es una instancia de Elasticsearch al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). Solo se usa una única tabla: autos.

Se utiliza un campo en la operación de búsqueda:

- auto_id: un campo que contiene el id de la entrada del documento en la base de datos.
    
    ![Base_de_Datos - Elasticsearch.png](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Base_de_Datos_-_Elasticsearch.png)
    

### Búsqueda de vehículos seleccionados

La búsqueda se hace una vez que hay una cantidad apropiada de vehículos seleccionados en el catálogo y el cliente decide compararlos.

Esto se hace mediante un endpoint:

Comparación de vehículos: /comparar-productos

## Interfaz de usuario

A continuación se muestra la pantalla del catálogo.

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled.png)

Al seleccionar entre 2 y 3 coches se muestra un botón de “Comparar productos”

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled%201.png)

Se pueden comparar 2 vehículos.

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled%202.png)

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled%203.png)

O se pueden comparar 3 vehículos.

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled%204.png)

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled%205.png)

![Untitled](Comparacio%CC%81n%20de%20productos%205a7d2ae2f8bd49138afc7502c2c698f1/Untitled%206.png)

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del módulo

Como ya se mencionó, existe un endpoint para este módulo:

[/comparar-productos](APIs%20059691d154ad421abbf7f195cee48c5c/Comparacio%CC%81n%20de%20productos%204ffc9cabbbc6431b9d2adb7794186a3e/comparar-productos%20362b99461b344a7cb6daeada2db732a9.md)

### Formato y tipo de datos almacenados

Este módulo utiliza una variable de tipo String:

- auto_id

### Especificaciones de seguridad y privacidad de los datos

No hay campos asegurados para este módulo.