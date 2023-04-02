# Plan de Pruebas

| Date       | Version | Description  |  
|------------|:-------:| :----------- |
| 26/02/2023 | 0.1     | Creación del Doc SRS |

# Índice

1. [**Introducción**](#1-introducción)

2. [**Estrategia de Pruebas**](#2-estrategia-de-pruebas)

3. [**Manejo de Pruebas**](#3-manejo-de-pruebas)

4. [**Ambiente de pruebas**](#4-ambiente-de-pruebas)

5. [**Plantilla de Pruebas**](#5-plantilla-de-pruebas)

6. [**Conclusiones**](#6-conclusiones)

# 1. Introducción
## 1.1 Objetivo
El objetivo del presente documento, es proveer una propuesta respecto a las pruebas de software necesarias para el desarrollo y la funcionalidad correcta de la aplicación web de adquisición de autos. Estas contribuirán en la creación de un producto con un control de calidad alto por lo que serán detalladas y argumentadas en este escrito.

En cuanto al plan de pruebas que se realizará, este incluirá la especificación de elementos de software que serán probados, el nivel y la secuencia en la que serán probados, los criterios de salida y la manera en la que se aplicará la estrategia en el ambiente de pruebas. Junto con lo anterior, se considerarán los siguientes puntos:
- Lo que está dentro y fuera del alcance
- Supuestos
- Roles y responsabilidades del equipo QA
- Herramientas
- Entregables
- Gestión de Defectos
- Riesgos
- Calendario

Es relevante recalcar que el presente documento será organizado de manera que se especifiquen claramente las dos vertientes principales de pruebas: dinámicas y estáticas.

## 1.2 Descripción del Proyecto
El proyecto que será desarrollado por Pulse Technologies, se trata de una solución para grupos automotrices y compradores de autos en donde se permitirá digitalizar una parte del proceso de compra, evitando visitas excesivas a las agencias. Dicha solución está planteada como una aplicación web que permitirá a los usuarios interactuar con el agente, explorar distintas opciones de autos, obtener cotizaciones estimadas automáticamente, comparar autos, subir y editar sus documentos, solicitar pruebas de manejo y mantener un seguimiento adecuado (con la misma calidad de atención que en una agencia tradicional) de sus compras.

La aplicación beneficiará a los clientes de las agencias ya que les ahorrará tiempo, les proporcionará opciones de distintas marcas y agencias (con distintos planes de financiamiento) en una misma plataforma, y les permitirá tener una visión más clara de lo que quieren. Asimismo, beneficiará a las agencias y grupos automotrices, dándoles un espacio en el que tendrán visibilidad, la posibilidad de agilizar ciertos procesos (como lo es el de la entrega de documentos del cliente) para poder atender a más clientes y la posibilidad de obtener ciertas estadísticas que les podrán ayudar a analizar sus ventas.

## 1.3 Audiencia
En cuanto a la audiencia, es necesario separar claramente a las entidades involucradas para las pruebas dinámicas y para las pruebas estáticas. 

### Dinámicas
Puesto a que las pruebas dinámicas requieren de la ejecución del código, su audiencia principal son los desarrolladores (quienes generan en código, lo modifican y verifican que funcione dicho código). De igual manera, aquellos encargados de diseñar las pruebas estarán involucrados en las pruebas dinámicas ya que tendrán que planearlas. 

### Estáticas
En cuanto a las pruebas estáticas - que se basan en la revisión de productos de trabajo sin código -, estas involucrarán a los encargados de diseñar las pruebas (ya que mediante la revisión del trabajo podrán planear mejores pruebas), al Product Owner (quien tiene la visión de la perspectiva del cliente por lo que puede evaluar si se cumplen las necesidades del mismo), el Project Manager (quien supervisará que se lleve a cabo el proyecto correctamente y se entreguen las pruebas adecuadas), y cualquier otro participante del producto que quiera revisar los documentos y asegurar la calidad del mismo. 

### Dependencias
Esta lista de hitos es tentativa y puede cambiar debido a las siguientes razones:

a) Problemas en el ambiente de desarrollo

b) Cambios en el alcance

c) Dependencias que impacten los esfuerzos y tiempos

| Nu. | Tipo de Prueba | Ejemplo de Prueba (SUT) | Dependencias (DOC) |
|--|-----------|--------------------|------------------|
| 1 | Pruebas Unitarias | Conexion a BD  | Base de datos completa & API |
| 2 | Pruebas Unitarias | Login de usuario | Base de datos completa & API |
| 3 | Pruebas Unitarias | Registro de usuario | Base de datos completa & API |
| 4 | Pruebas de integracion | Chat entre usuarios | Los usuarios se pueden comunicar de manera exitosa |
| 5 | Pruebas de integracion | Compra de usuario | El usuario puede realizar compras de manera exitosa |
| 6 | Pruebas de validacion | La interfaz de usuario es agradable y facil de usar |  Diseño de interface completo|
| 7 | Pruebas de validacion | El sistema esta completo y el cliente esta satisfecho con su funcionamiento | El sistema esta completo|
| 8| Prueba de sistema | El usuario final puede iniciar sesion, navegar la pagina, realizar compras y comunicarse con vendedores por medio de chat | Base de datos completa, Conexiones API completas, Frontend de usuario final completo|
| 9 | Prueba de sistema | EL usuario administrador puede iniciar sesion, entrar a la vista de administrador, y administrar los usuarios de la pagina | Base de datos completa, Conexiones API completas Frontend de usuario administrador completo | 
| 10 | Prueba de sistema | El usuario vendedor puede iniciar sesion, entrar a la vista de vendedor, y administrar sus productos | Base de datos completa, Conexiones API completas, Frontend de usuario vendedor completo |
| 11 | Prueba de sistema | El usuario de grupo automotriz puede iniciar sesion, entrar a la vista de grupo automotriz, y asignar agencias asociadas | Base de datos completa, Conexiones API completas, Frontend de grupo automotriz completo |
| 12 | Prueba de sistema | El usuario de agencia puede iniciar sesio, entrar a la vista de agencia, y asignar vendedores asociados | Base de datos completa, Conexiones API completas, Frontend de grupo automotriz completo |

# 2. Estrategia de Pruebas
## 2.1 Dinámicas

## 2.2 Objetivos de pruebas



## 2.3 Suposiciones sobre las Pruebas

## 2.4 Alcance



## 2.5 Niveles de Prueba



## 2.6 Criterios de Entrada y Salida

### 2.6.1 Dinámicas

|*Criterio de Entrada*|*Equipo de Prueba*|*Equipo Técnico*|*Notas*|
| :- | :- | :- | :- |


De Caja Blanca


|*Criterio de Entrada*|*Equipo de Prueba*|*Equipo Técnico*|*Notas*|
| :- | :- | :- | :- |


Integración


|*Criterio de Entrada*|*Equipo de Prueba*|*Equipo Técnico*|*Notas*|
| :- | :- | :- | :- |


Aceptación



|*Criterio de Entrada*|*Equipo de Prueba*|*Equipo Técnico*|*Notas*|
| :- | :- | :- | :- |


**Criterio de Salida**

|*Criterio de Salida*|*Equipo de Prueba*|*Equipo Técnico*|*Notas*|
| :- | :- | :- | :- |



### 2.6.2 No funcionales

**NO se realizarán pruebas de tipo no funcional.**

### 2.6.3 Estáticas

Las pruebas estáticas que se llevarán a cabo son las siguientes.

**Documento SRS**

*Prioridad: Alta*



**Documento de Especificación de Pruebas**

*Prioridad: Alta*



**Manuales de Usuario (para todos los usuarios)**

*Prioridad: Media*

Se generarán manuales de usuario que describan los diferentes flujos y caminos que puede tomar un usuario en la plataforma. Estos flujos serán los flujos más relevantes como la compra de un coche, la dada de alta de un auto, etc. Es de vital importancia generar un manual de usuario por tipo de usuario (Final, Venedor, Gerente, Grupo Automotriz, Administrador de la Plataforma) y hacer estos manuales lo más gráficos y simples posible.

Para realizar estos manuales utilizaremos una herramienta llamada Tango, que se usa para generar guías paso a paso de alguna funcionalidad de la plataforma.



**Mockup de la interfaz gráfica**

*Prioridad: Alta*

Otra de las pruebas estáticas que realizaremos será la de un Mockup de la Interfaz de Usuario. Este mockup será un predecesor de la Interfaz Gráfica en donde se plantea el diseño de la plataforma y se incluyen los posibles recorridos que puede seguir el usuario.

Este documento será útil para obtener retroalimentación del usuario en cuestiones de experiencia de usuario y de apariencia física de la plataforma. Esta información nos ayudará a refinar la aplicación para ajustarla lo más posible a la comodidad del usuario.

**Documentación de las APIs**  

*Prioridad: Media*

Se generará documentación de todas las APIs que expongan los diferentes servicios que sean necesarios para el funcionamiento de la aplicación. Se realizarán usando la herramienta de OpenAPI para la definición de contratos.

Estos documentos tendrán la función de facilitar el desarrollo de la aplicación con la definición de los valores de entrada y salida esperados para el correcto funcionamiento de los servicios. De igual manera servirán para definir en primera instancia los diferentes endpoints.

## 2.7 Entregables

| No. | Nombre del Entregable | Autor | Sprint Esperado | Supervisor  |
|---|---|---|---|---|
| 1 |Plan de pruebas   | Equipo de prubas  | 1  | P.M. |
| 2 |Casos de pruebas unitarias |Equipo de pruebas   |3   |P.M.   |
| 3 |Caos de pruebas de integración   |Equipo de pruebas   |3   |P.M.   |
| 4 |Revisión Técnica   |Equipo de pruebas   |Cada sprint después del tercero   |P.M/Equipo de pruebas   |
| 5 |Reporte de estatus semanal   |Equipo de pruebas   |Cada sprint después del tercero   |P.M./Equipo de pruebas   |
| 6 |Logs de resultados de pruebas   |Equipo de pruebas   |Cada sprint después del tercero   |P.M./Equipo de pruebas   |
| 7 | Reporte de finalización de pruebas | Equipo de pruebas | 9 | P.M. |

## 2.8 Lista de Objetivos

| **No.** | **Tipo de prueba** | **Ejemplo de prueba** | **Dependencias** |
| --- | --- | --- | --- |
| 1 | Prueba unitaria | Conexión de base de datos | Bases de datos finalizadas |
| 2 | Prueba unitaria | Prueba de autenticación de usuario | Módulo de autenticación finalizado |
| 3 | Prueba unitaria | Prueba de registro de usuario | Módulo de registro finalizado |
| 4 | Prueba de integración | Prueba de registro/autenticación de usuario: El usuario es capaz de crear una cuenta y de autenticar esa cuenta | Pruebas unitarias finalizadas: 1, 2, 3 |
| 5 | Prueba unitaria | Prueba de envío de solicitudes | Módulo de solicitudes finalizado |
| 6 | Prueba unitaria | Prueba de validación de solicitudes | Módulo de aceptación de solicitudes finalizado |
| 7 | Prueba de integración | Prueba de manejo de solicitudes: El usuario es capaz de autenticar y enviar una solicitud. El administrador es capaz de autenticar y aceptar/denegar la solicitud | Pruebas unitarias finalizadas: 5, 6 |
| 8 | Prueba unitaria | Prueba de asignación de Gerentes/Vendedores | Módulo de asignación de Gerentes/Vendedores finalizado |
| 9 | Prueba de integración | Prueba de integración de Gerentes/Vendedores: Los privilegios de estas cuentas se ven reflejados en la base de datos | Pruebas unitarias finalizadas: 1, 8 |
| 10 | Prueba unitaria | Prueba de creación de cuentas | Módulo de creación de cuentas finalizado |
| 11 | Prueba de integración | Prueba de integración de creación de cuentas: La cuenta creada se ve reflejada en la base de datos | Pruebas unitarias finalizadas: 1, 10 |
| 12 | Prueba unitaria | Prueba de búsqueda de coches | Finalizado: Página inicial y módulos de búsqueda de página |
| 13 | Prueba de integración | Prueba de integración de búsqueda de coches: Muestar coches filtrados | Pruebas unitarias finalizadas: 1, 12 |
| 14 | Prueba unitaria | Prueba de compra de coches/prueba de manejo | Módulo de tarjeta de coche finalizado |
| 15 | Prueba de integración | Prueba de compra de coche/prueba de manejo: Se puede reservar una prueba de manejo y comprar un coche | Pruebas unitarias finalizadas: 1, 12, 14 |
| 16 | Prueba unitaria | Prueba de subida de modelo | Módulo de subda de modelos finalizado |
| 17 | Prueba de integración | Prueba unitaria de subida de modelo: Se puede subir un coche y se vera reflejado en la base de datos y en la búsqueda de coches | Pruebas unitarias finalizadas: 1, 12, 14, 16 |
|| Prueba unitaria | Prueba unitaria de validación de documentos: Se pueden subir documentos y se recibe un booleano que indique su validez | Módulo de validación de documentos finalizado |
| 18 | Prueba de validación | Hay pocos cambios o nulos. La interfaz está de acuerdo a los estándares del cliente. | Diseño de la interfaz finalizado |
| 19 | Prueba de validación | Hay pocos cambios o nulos. El programa está completo y funciona de acuerdo a los estándares del cliente. | Programa finalizado |
| 20 | Prueba de recorrido | Recorrido de todos los usuarios se puede completar | Bases de datos finalizadas, API finalizada, arquitectura de nube finalizada, conexiones finalizadas, implementación de front-end finalizada, implementación de back-end finalizada |

## 2.9 Estimado de Esfuerzo


# 3. Manejo de Pruebas

## 3.1 Plan de Ejecución de Pruebas

## 3.2 Factores de Riesgo y Mitigación de Pruebas
| **Riesgo** | **Probabilidad** | **Impacto** | **Plan de mitigación** |
| --- | --- | --- | --- |
| Commits de GitHub poco claros | Media | Bajo | Crear lineamiento de commits, los cuales incluirán instrucciones para presentar cambios, frecuecia y descripciones claras.|
| Falta de información en reportes de pruebas | Media | Medio | Crear plantillas claras y concisas para reportar los resultados de cada tipo de prueba y checar los resultados de manera inmediata tras completar la prueba, para que si alguna información se encuentra faltante, se puede corregir al momento. |
| Not indicar finalización de tareas en la tabla de SCRUM | Media | Bajo | Hacer un recordatorio diario, sea hecho por el PM o con ayuda de un recordatiorio ligado a la tera en la tabla. |
| Inyección de SQL en los campos de campos de entrada | Baja | Alto | Investigar métodos efectivos para la prevención de inyecciones SQL e implementarlos, o usar librerías para prevenirlos. |
| Clientes teniendo privilegios de administrador | Baja | Alto | Separar la infraestructura de clientes y administradores, al igual que encriptar la información de acceso de los administradores. |
| El programa no es capaz de manejar el tráfico | Baja | Alto | Revisar repetidamente el plan de arquitectura y revisar la configuración de la implementación para asegurar que todo se encuentre bien conectado e implementado. |
| Información no es ingresada de manera correcta a la base de datos | Baja | Medio | Durante la etapa de pruebas informales, asegurarse que las queries están estructuradas de manera correcta en la API para que no se envíen queries incorrectas durante el resto de las fases de prueba. |
| Las bases de datos se llenan de manera demasiado rápida | Media | Medio | Limitar número de queries y tamaño de documentos para que no haya documentos demasiado pesados o spam de queries.|
| La infromación no se muestar correctamente en el browser del tester | Media | Medio | Asegurar que el prgrama sea funcional en, como mínimo, 2/3 de los browsers más usados del mercado (por ejemplo, Firefox, Chrome y Opera) |

## 3.3 Plan de Comunicación y Roles de Equipo

### 3.3.1 Roles

### 3.3.2 Estrategia de Comunicación

## 3.4 Gantt

# 4. Ambiente de pruebas
El hardware utilizado para las pruebas tendrá un mínimo de 4 núcleos, Intel i5-1155G7 a 4,5 GHz y 8 GB de RAM. Este hardware correra tendrá un sistema operativo mínimo de Windows 10.0.19045. Todo el hardware utilizado por los equipos de prueba y desarrollo cumplirá con estos requisitos mínimos.

La aplicación en sí se alojará en una instancia VPC, que contendrá máquinas virtuales escalables para almacenar el front-end y el back-end por separado, así como una base de no relacional para datos secundarios. Para obtener más información, consulte el Diagrama de arquitectura en la Especificación de requisitos de software. Todos los miembros de los equipos de prueba y desarrollo tendrán acceso a la misma versión de esta instancia VPC.

# 5. Plantilla de pruebas

# 6. Conclusiones