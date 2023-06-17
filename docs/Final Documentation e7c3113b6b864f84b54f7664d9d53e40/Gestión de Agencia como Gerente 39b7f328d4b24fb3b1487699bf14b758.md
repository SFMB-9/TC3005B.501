# Gestión de Agencia como Gerente

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de disponibilidad de las pruebas de manejo y de los documentos que pide le la agencia al comprador al hacer una venta vehicular. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la actualización de datos en una cuenta central que representa a la agencia. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El manejo de la agencia se hace dentro de una sola colección: la colección usuario.

Se utilizan cuatro campos en la operación de disponibilidad:

- horas_min: campo que indica la hora de apertura.
- horas_max: campo que indica la hora de cierre.
- dias_anticipo: campo que indica la cantidad de días previos durante los que se puede apartar una prueba.
- dias_max: campo que indica la cantidad máxima de días para agendar una prueba.

Se utiliza un solo campo en la operación de documentos:

- documentos_requeridos_compra: campo que indica los documentos que pide la agencia.

Este campo se usa en ambas operaciones:

- agencia: campo que indica la agencia en cuestión.
    
    ![Base_de_Datos - MongoDesnormalizado.png](Gestio%CC%81n%20de%20Agencia%20como%20Gerente%2039b7f328d4b24fb3b1487699bf14b758/Base_de_Datos_-_MongoDesnormalizado.png)
    

### Modificación de detalles

Los detalles de la agencia se pueden modificar dentro de la página mediante inputs númericos y de texto, junto con botones que guardan los cambios al enviar la nueva información al endpoint.

Esto se hace mediante tres endpoints distintos:

Actualización de horarios: /modificar-disponibilidad-pruebas

Actualización de lista de documentos: /actualizar-documentos-requeridos

Obtención de información: /pull-detalles-agencia

## Interfaz de usuario

A continuación se muestra la pantalla de gestión de la agencia.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Gerente%2039b7f328d4b24fb3b1487699bf14b758/Untitled.png)

Hay dos secciones principales, una para el horario de atención y/o de las prubas de manejo.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Gerente%2039b7f328d4b24fb3b1487699bf14b758/Untitled%201.png)

Y otro para los documentos que pide la agencia para hacer una venta.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Gerente%2039b7f328d4b24fb3b1487699bf14b758/Untitled%202.png)

Adicionalmente hay dos botones que aceptan los cambios o los cancelan.

![Untitled](Gestio%CC%81n%20de%20Agencia%20como%20Gerente%2039b7f328d4b24fb3b1487699bf14b758/Untitled%203.png)

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del sistema

Como ya se mencionó, existen tres endpoints para este módulo:

[/pull-detalles-agencia](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Gerente%206be23fa9887b451e84d41c54d375ec3e/pull-detalles-agencia%20c1e0ed11e1cb47f49c2c55686f70059a.md) 

[/actualizar-documentos-requeridos](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Gerente%206be23fa9887b451e84d41c54d375ec3e/actualizar-documentos-requeridos%200fdbce131c374c71907c5e0d56a075ef.md) 

[/modificar-disponibilidad-pruebas](APIs%20059691d154ad421abbf7f195cee48c5c/Gestio%CC%81n%20de%20Agencia%20como%20Gerente%206be23fa9887b451e84d41c54d375ec3e/modificar-disponibilidad-pruebas%209a9b1584d0184eb8b16c71fc8ee0a115.md) 

### Formato y tipo de datos almacenados

Este módulo utiliza las sigunetes variables de tipo String:

- dias_anticipo
- dias_max
- agencia

Los siguentes campos son de tipo Int:

- horas_min
- horas_max

El siguente campo es de tipo Array[String]:

- documentos_requeridos_compra

### Especificaciones de seguridad y privacidad de los datos

No hay campos encrptados o asegurados de manera especial.

## Pruebas y verificación

### Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

### Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la respuesta exitosa
- se manda información equivocada y se regresa la respuesta de fallo
- se manda información con un método equivocado

### Pruebas

[Pruebas Gestión de Agencia](Pruebas%20b2896060cbea4a73b56f84c3fc288dcd/Pruebas%20Gestio%CC%81n%20de%20Agencia%20b38b2f892cdb4bac95fdc969c99a0198.md)