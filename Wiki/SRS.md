<p align="center">
<!--   <img src="../assets/Logos/humanIT.005.png" width="300" title="hover text"> -->
</p>
<hr/>

<h2 align="center"> Digitalización del Proceso de Adquisición de un Vehículo 

<h2 align="center"> Software Requirements Specification

| Date       | Version | Description  |  
|------------|:-------:| :----------- |
| 26/02/2023 | 0.1     | Creación del Doc SRS |

<h2 align="center"> Autores
<h3 align="center"> Andreína Sanánez
<h3 align="center"> Andrew Dunkerley
<h3 align="center"> Do Hyun Nam
<h3 align="center"> Emiliano Cabrera
<h3 align="center"> Karla Mondragón
<h3 align="center"> Mateo Herrera 
<h3 align="center"> Regina Rodríguez
<h3 align="center"> Salvador Milanés
  
<h1 align="center"> Software Requirements Specification

# índice
1. [Introducción](#1-introducción)
        
    1.1. [Propósito](#11-propósito)

    1.2. [Convenciones del Documento](#15-convenciones-de-documento)

    1.3. [Enfoque y Alcance](#12-enfoque-y-alcances)

    1.4. [Objetivos SMART](#13-objetivos-smart)

    1.5. [Referencias](#16-referencias)

2. [Descripción General](#2-descripción-general)

    2.1. [Pespectiva del Producto](#21-perspectiva-del-producto)

    2.2. [Clases de Usuarios y Características](#22-clases-de-usuarios-y-características)

    2.3. [Ambiente de Desarrollo](#23-ambiente-de-desarrollo)

    2.4. [Restricciones del Diseño e Implementación](#24-restricciones-de-implementación-y-diseño)

    2.5. [Suposiciones y Dependencias](#25-suposiciones-y-dependencias)

3. [Características del Sistema](#3-características-del-sistema)

    3.1. [Requerimientos Funcionales](#31-requerimientos-funcionales)

    3.2. [Requerimientos No Funcionales](#32-requerimientos-no-funcionales)

    3.3. [Diagrama de Casos de Uso](#33-diagramas-de-casos-de-uso)

4. [Requerimientos de Datos](#4-requerimientos-de-datos) 

    4.1. [Modelo de Datos Lógico: Diagrama Entidad-Relación](#41-modelo-de-datos-lógico-diagrama-entidad-relación)

    4.2. [Diccionario de Datos](#42-diccionario-de-datos)

    4.3. [Reportes](#43-reportes)

    4.4. [Adquisición, Integridad, Retención y Eliminación de Datos](#44-adquisición-de-datos-integridad-retención-y-eliminación)  

5. [Requerimientos de Interfaces Externas](#5-requerimientos-de-interfaces-externas)

    5.1. [Interfaces de Usuario](#51-interfaces-de-usuario)

    5.2. [Interfaces de Software](#52-interfaces-de-software)

    5.3. Interfaces de Hardware (N/A)

    5.4. [Interfaces de Comunicación](#54-interfaces-de-comunicación)

6. [Atributos de Calidad](#6-atributos-de-calidad)

    6.1. [Usabilidad](#61-usabilidad)

    6.2. [Rendimiento](#62-rendimiento)

    6.3. [Seguridad](#63-seguridad)

    6.4. [Protección](#64-protección)

7. [Internacionalización y Ubicación de Requerimientos](#7-internacionalización-y-ubicación-de-requerimientos)

8. Otros Requerimientos (N/A)

9. [Apéndices](#9-apéndices)

    9.1. [WBS](#1-wbs)

    9.2. [Gantt](#2-gantt)

    9.3. [Budget and Effort Analysis](#3-budget-and-effort-analysis)

    9.4. [Historias de Usuario](#4-historias-de-usuario)

    9.5. [Administración de Riesgos](#5-administración-de-riesgos) 
# 1. Introducción
> Pendiente a validar por todo el grupo
  
> By team 1
  
<p align="justify"> El objetivo de este documento es recopilar, analizar y brindar una visión profunda de la aplicación web para NDS Cognitive Labs, definiendo el problema y la solución en detalle. El documento también concentra las capacidades requeridas por todos los stakeholders y sus necesidades definiendo las características del producto.

<p align="justify"> Nuestra misión para este proyecto es hacer el proceso de compra de un auto más fácil y conveniente para el usuario digitalizando dicho proceso. Esto planeamos lograrlo creando una plataforma confiable, transparente y de fácil acceso en la que los clientes puedan tomar decisiones informadas basadas en información confiable y recomendaciones profesionales. Nuestro compromiso con nuestros clientes es ofrecerles una gama variada de autos a través de agencias y grupos automotrices previamente verificadas en nuestra plataforma. El problema que nuestra propuesta busca solucionar lo inconventiente que se ha vuelto el proceso de adquisición de un vehículo, tanto para las agencias que no tienen acceso a un equipo de TI como para los compradores que pueden tardar meses en el proceso.

<p align="justify"> Con respecto a nuestra visión, buscamos transformar radicalmente el sector de ventas de autos. Con este proyecto queremos que la experiencia tradicional de la compra de autos cambie, se adapte a las nuevas tecnologías y no estrese a los usuarios. Estamos comprometidos a crear una comunidad confiable de vendedores y compradores donde las transacciones puedan ser en línea, quitando los problemas e inconvenientes asociados a la compra tradicional de autos. 
## 1.1. Propósito
<p align="justify"> El propósito del documento es recopilar y analizar todas las ideas que han surgido para definir el sistema y sus requisitos con respecto a los usuarios que harán uso de la aplicación. 

<p align="justify"> En este proyecto en colaboración con NDS Cognitive Labs, se busca la digitalización del proceso de adquisición de vehículos nuevos y seminuevos. La problemática que se busca resolver es agilizar un proceso que se ha vuelto inconveniente y tedioso: la compra de un vehículo. Dicho proceso presenta múltiples inconvenientes desde que no todas las agencias tienen el catálogo completo de autos disponibles hasta la cercanía entre las agencias y el comprador. Nuestra propuesta busca:
<ol>
    <li> Transparencia en los procesos de compra 
    <li> Un diseño intuitivo y funcional
    <li> Un proceso de compra amigable y conveniente
    <li> La protección de datos de usuarios
</ol>
## 1.2. Enfoque y Alcances
  
> Pendiente a validar por todo el grupo
>
> Comparar con team 4
  
> By teams 1,2
  
El enfoque de este proyecto es construir un servicio web responsivo y escalable que permita a los usuarios buscar, filtrar, comparar y comprar auto que satisfaga sus necesidades. Debido a las leyes y regulaciones aplicables en el pais donde el producto se va a desplegar, todos los pagos deben manejarse de forma externa. Dentro de sus multiples funcionalidades, se espera que el usuario sea capaz de:
1. Elegir un vehículo desde un amplio catálogo, 
2. Encuentre planes de financiamiento que se adapten a sus necesidades,  
4. Solicitar una prueba de manejo si así lo desea, 
5. Comprar su vehículo en cualquier agencia disponible,
6. Comunicarse con una agencia (vendedor específico) por medio de un chat en tiempo real,
7. Subir los documentos legales requeridos.

El proyecto debe tambien proveer a sus usuarios una experiencia fluida en toda la aplicacion, incluyendo procesos como digitalizacion y procesamiento de documentos, solicitudes de pruebas de manejo, filtrado y especificacion, manejo de cuenta y perfil de usuario, etc.

Los socios de este proyecto son:
<ul>
    <li> NDS Cognitive Labs: El cliente para quien se desarrolla el proyecto.
    <li> (Nombre de nuestro equipo): El equipo de desarrollo
    <li> Tecnológico de Monterrey: El instituto que colabora con el cliente y el equipo de desarrollo.
    <li> El usuario final, limitado a México.
</ul>

La aplicacion pretende:
1. Habilitar permisos de usuarios y roles administrativos, 
2. Permitir a usuarios administradores subir catálogos de autos y a sus clientes navegar los mismos,
3. Tener una interfaz intuitiva para que los usuarios puedan buscar y filtrar autos de un catálogo, 
4. Comparar opciones seleccionadas y ver sus especificaciones,
5. Tener una plataforma con diversas formas de pago, 
6. Que la información solicitada estará cifrada y protegida.

Lo que nos distingue de la competencia es nuestra intención de:
- Crear un simulador comparativo de autos, 
- Dar recomendaciones personalizadas con Machine Learning y 
- La implementación de un "Wishlist" (Bookmark de autos preferidos). <br>
Pero, priorizando la entrega de un MVP funcional, de calidad y que cubra las necesidades del cliente, NDS. 

Algunos aspectos de la solución, que quedan mas allá de nuestra propuesta como (nombre de nuestro grupo) son el mantenimiento de la aplicación, el servicio y hospedaje para el almacenamiento en Cloud y la solución de quejas acerca de la manufactura o el estado de los automóviles; así como el servicio de respaldo (backup) y la red de distribución de contenido (CDN).
## 1.3. Objetivos SMART
> Pendiente a validar por todo el grupo
> By team 1
1. _Mejorar la experiencia del usuario:_ al terminar el proyecto, con el lanzamiento de la aplicación, buscamos reducir aproximadamente un 30% el tiempo que le toma a un usuario comparar y adquirir un automóvil.
2. _Mejorar el servicio al cliente:_ dentro del desarrollo del proyecto (75%), se busca implementar un chatbot que pueda ofrecer ayuda a los clientes para así reducir hasta en un 50% los tiempos de respuesta. Esto mejorará el servicio al cliente en la plataforma.
3. _Aumentar las opciones de pago:_ al terminar el proyecto, con el lanzamiento de la aplicación, se busca incluir una pasarela de pago que acepte diversas formas de pago para ampliar la cantidad de alternativas para los clientes en la plataforma.
4. _Aumentar el posicionamiento en los motores de búsqueda:_ al terminar el proyecto, con el lanzamiento de la aplicación, se pretende utilizar mejores prácticas de optimización de motores de búsqueda para aumentar el ranking de la plataforma.
5. _Mejorar la seguridad de la plataforma:_ para evitar violaciones de datos y proteger la privacidad del consumidor, se agregara autenticación y la verificación de autorización y se incluirá el cifrado de datos dentro del desarrollo del proyecto (80%). 
6. _Implemente análisis predictivos:_ al terminar el proyecto, con el lanzamiento de la aplicación (si existen recursos disponibles), se pretende mejorar el uso de análisis predictivo con el objetivo de estudiar los datos de los clientes y ofrecer sugerencias de automóviles individuales, lo que lleva a un aumento en la satisfacción del cliente.
## 1.4. Convenciones de Documento
> Pendiente a validar por todo el grupo
  
> By team 1
  
| Concepto   | Descripción       |  
| :---------:|:-------------     | 
| SQL        | Structured Query Language, lenguaje de programación para almacenar y procesar información en una base de datos relacional|                           
| API        | Application Programming Interface, conjunto de definiciones y protocolos que se usa para diseñar e integrar el software de las aplicaciones|      
| BD o DB    | Base de Datos o Database|   
| AWS        | Amazon Web Services, colección de servicios de computación en la nube pública que en conjunto forman una plataforma de computación en la nube, ofrecidas a través de Internet por Amazon.com|  
| Stack Tecnológico | Ecosistema tecnológico, conjunto de lineamientos, servicios y softwares que componen un aplicación |
## 1.5. Referencias
> Pendiente a validar por todo el grupo
  
> By team 1
  
"IEEE Guide for Software Requirements Specifications," in IEEE Std 830-1984 , vol., no., pp.1-26, 10 Feb. 1984, doi: 10.1109/IEEESTD.1984.119205. https://ieeexplore.ieee.org/document/278253
# 2. Descripción General
## 2.1. Perspectiva del Producto
  
> Pendiente a validar por todo el grupo
  
> By team 1,2
  
La aplicación busca ser un servicio e-commerce donde un usuario comprador tenga la oportunidad de comprar un vehículo de forma intuitiva, amigable, segura y digital. NDS Cognitive Labs es una consultora internacional especializada en el diseño y desarrollo de soluciones de software de tiempo real que van desde Inteligencia Artificial a Nube. 

La idea del servicio pretende trabajar con tecnologías emergentes para facilitar el proceso de adquisión de un vehículo de agencia.

> ! Adjuntar imagen del diagrama hecho por el equipo 1 - 33 VLANs Studio
  
## 2.2. Clases de Usuario y Características
  
> Validado !
  
1. _Usuario Comprdador_ <br>

2. _Usuario Vendedor_

3. _Usuario Gerente_

4. _Usuario Grupo Automotriz_

5. _Usuario Super-Administrador_
## 2.3. Ambiente de Desarrollo
  
> Pendiente a definir por todo el grupo
>
> Comparar teams 2,3; team 3 usa google a diferencia del resto que ocupa AWS.
  
(Tech Stack)

## 2.4. Restricciones de Implementación y Diseño
> Pendiente a validar por todo el grupo
  
> By teams 1,2
  
El dueño de proyecto no ha establecido restricciones explicitas con respecto a las herramientas para el desarrollo, pues el proyecto pretende funcionar unicamente como prueba de concepto. Por lo tanto, las unicas restricciones son en relacion a los recursos disponibles.

Este proyecto no tendra financiamiento externo. La posibilidad de implementacion de la arquitectura propuesta puede ajustarse a opciones mas viables economicamente, pero no se limita a alternativas open-source.

Es importante recalcar que el equipo de desarrollo esta formado por estudiantes aspirantes a desarrolladores, sin conocimiento a nivel experto en el diseño e implementacion de métodos formal. El enfoque principal de los desarrolladores sera en la adecuada funcionalidad y amigabilidad del software.

En términos del diseño:
1. Solamente se aceptarán grupos automotrices y agencias como participantes en el sistema, y no individuos.
2. El sistema tendrá uso de nube (cloud) SaaS.
3. (Nombre del equipo desarrollador) no proveerá mantenimiento ni soporte al sistema.
  
## 2.5. Suposiciones y Dependencias
  
> Pendiente a definir por todo el grupo
  
## 2.6. Casos de Uso
  
> Pendiente a traducir y ligar

← [Casos de Uso](https://github.com/SFMBa01029956/TC3005B.501)

# 3. Características del Sistema
<p align="justify"> En este apartado se definen las características y aspectos específicos que se requieren del sistema. En específico, se detalla cada uno de los requerimientos funcionales y no funcionales recopilados a lo largo de las diferentes sesiones para el levantamiento de requerimientos que se tuvieron con el cliente. De la misma manera, muestran los diagramas de casos de uso, cuyo propósito es presentar de una manera gráfica y visual el comportamiento esperado de cierta parte del sistema en relación con sus diferentes actores.

## 3.1. Requerimientos Funcionales
> Pendiente a definir por todo el grupo
>
> Revisar teams 1,2
  
## 3.2. Requerimientos No Funcionales
> Pendiente a definir por todo el grupo

## 3.3. Diagramas de Casos de Uso
> Pendiente a definir por todo el grupo
  
# 4. Requerimientos de Datos
## 4.1. Modelo de Datos Lógico: Diagrama Entidad-Relación
### Primera Versión
> Adjuntar imagen del diagrama entidad-relación

## 4.2. Diccionario de Datos
> Pendiente a definir por todo el grupo

## 4.3. Reportes
> Pendiente a validar por todo el grupo
  
> By teams 1,2
  
Se busca que la plataforma sea capaz de producir diferentes estádisticas y dependiendo el rol del usuario y sus permisos se le muestran diferentes datos y aspectos de la plataforma. Algunas de las estadísticas que se pretenden mostrar en la aplicación son:

1. Ventas de cada vendedor, agencia y grupo automotriz, pruebas de manejo por agencia.
2. Venta de cada vehículo y su popularidad (ya sea por número de personas interesadas en el o por la cantidad de pruebas de manejo del modelo).
3. Comportamiento de la plataforma, cantidad de usuarios, información geográfica de los usuarios.

Por otra parte, la app generará los siguientes logs:

- Log de Auditoría: Incuirá el comprador, el vendedor, el administrador y dueño en caso de haber conflicto en una organizacion y se requiere transparencia, o si hay un error en las acciones CRUD y los desarrolladores requieren una referencia de un posible causante del error. Se incluye el timestamp, el usuario que realizó la acción y la acción realizada con su descripción.

- Log de Ventas: Se utilizará como comprobante al iniciarse, completarse o cambiar de etapa la venta de un vehículo. Se incluye el timestamp, el comprador, el vendedor y el estado de la venta.

## 4.4. Adquisición de Datos, Integridad, Retención y Eliminación
> Pendiente a definir por todo el grupo
  
# 5. Requerimientos de Interfaz Externas
> Pendiente a definir por todo el grupo
  
<p>

## 5.1. Interfaces de Usuario
### Diagrama de Procesos
> Pendiente a definir por todo el grupo
>
> Comparar teams 1(5.1) con diagramas de proceso de team 1.

> Revisar concepto de diagrama de secuencia

### Flujo del Comprador:
> Adjuntar imagen del flujo del Comprador

### Flujo del Vendedor:
> Adjuntar imagen del flujo del Vendedor

### Flujo del Gerente:
> Adjuntar imagen del flujo del Gerente

### Flujo del Grupo Automotriz:
> Adjuntar imagen del flujo del Grupo Automotriz

### Flujo del Super-Administrador:
> Adjuntar imagen del flujo del Super-Administrador

### Wireframe
> Insertar liga al wireframe

> Insertar imagen del wireframe

## 5.2. Interfaces de Software
### Diagrama de Arquitectura
> Pendiente a definir por todo el grupo
>
> Comparar e incorporar teams 1,2,3
  
### Componentes
> Pendiente a definir por todo el grupo (Descripcion de la arquitectura).

## 5.3. Interfaces de Hardware
### No aplica

## 5.4. Interfaces de Comunicación
> Pendiente a definir por todo el grupo
  
# 6. Atributos de Calidad
## 6.1. Usabilidad
> Pendiente a validar por todo el grupo
  
> By team 2
  
* <b>Interfaz Fácil de Usar:</b> La plataforma debe tener una interfaz clara e intuitiva que facilite a los usuarios la navegación y la búsqueda de la información que necesitan.
  
* <b>Interfaz Responsiva:</b> Cada una de las interfaces y diseño de la plataforma deberá ser responsive, es decir, accesible y funcional en distintos dispositivos y tamaños de pantalla (computadora, tablet, teléfono). 
  
* <b>Velocidad de Respuesta:</b> La plataforma debe cargarse rápidamente y responder a las acciones del usuario en el momento oportuno.

* <b>Información Clara sobre el Producto:</b> La plataforma debe ofrecer información transparente y detallada sobre cada coche, incluyendo especificaciones, precios y disponibilidad.

## 6.2. Rendimiento
> Pendiente a validar por todo el grupo
  
> By team 2
  
* Tiempo de carga de la Página:</b> La plataforma debe cargarse rápidamente, idealmente en unos segundos o menos, para garantizar una experiencia de usuario positiva y ágil.

* <b>Capacidad de Respuesta:</b> La plataforma debe responder rápidamente a las interacciones del usuario, como clics, toques y deslizamientos, proporcionando una experiencia de usuario fluida e intuitiva.
  
* <b>Escalabilidad:</b> La plataforma debe ser capaz de gestionar grandes volúmenes de tráfico y transacciones sin ralentizarse ni bloquearse.
  
* <b>Disponibilidad:</b> La plataforma debe estar disponible y accesible 24 horas al día, 7 días a la semana, garantizando que los usuarios puedan navegar y comprar autos en cualquier momento.
  
* <b>Fiabilidad:</b> La plataforma debe ser fiable y estable, con el mínimo tiempo de inactividad o errores que puedan interrumpir la experiencia del usuario y las transacciones.

## 6.3. Seguridad
> Pendiente a validar por todo el grupo
  
> By team 2
  
* <b>Comunicación Segura:</b> La página web debe utilizar protocolos de comunicación segura como HTTPS para cifrar todos los datos del usuario en tránsito, evitando su interceptación y manipulación.
  
* <b>Autenticación:</b> La página web debe utilizar mecanismos de autenticación fuertes como JWT tokens o Cookies para verificar la identidad de los usuarios y evitar escalamiento de privilegios.
  
* <b>Autorización:</b> La página web debe utilizar mecanismos de autorización adecuados como el hashing de las credenciales  para controlar el acceso a recursos y datos sensibles, garantizando que sólo los usuarios autorizados puedan acceder a ellos.
  
* <b>Protección de datos:</b> La página web debe utilizar medidas adecuadas para proteger todos los datos (en reposo, tránsito o uso) de los usuarios, como la información personal, los detalles de pago y el historial de compras.
  
* <b>Cifrado:</b> la plataforma deberá cifrar adecuadamente toda la información sensible contenida en la base de datos.
  
* <b>Seguridad en Código:</b> La plataforma debe seguir prácticas de seguridad en código y comprobarse periódicamente para detectar vulnerabilidades como Cross-site scripting (XSS) y SQL injection. Correspondientemente, deben tomarse las medidas adecuadas para solucionar cualquier vulnerabilidad detectada.

## 6.4. Protección
> Pendiente a validar por todo el grupo
  
> By team 2
  
* <b>Backup y Recuperación:</b> La plataforma debe contar con un plan de backup y recuperación para garantizar que los datos puedan restaurarse en caso de pérdida de datos o fallo del sistema.
  
* <b>Redundancia:</b> La plataforma debe contar con sistemas redundantes para garantizar que la página web siga disponible incluso en caso de fallo de hardware o software.
  
* <b>Protección de datos:</b> La plataforma debe aplicar medidas adecuadas de privacidad de datos para proteger los datos de los usuarios y garantizar el cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de Particulares.
  
* <b>Hosting:</b> La plataforma debe estar alojada en servidores seguros y fiables, idealmente utilizando un proveedor de alojamiento de confianza como AWS que aplique las medidas de seguridad adecuadas.
# 7. Internacionalización y Localización de Requerimientos
> Pendiente a validar por todo el grupo
  
Debido a las diferencias legales que se presentan de acuerdo a la región política y geográfica, los requerimientos para la internacionalización y localización de la aplicación dependerán del proveedor, los stakeholders y las legislaciones particulares de cada país. El alcance de la aplicación en ese momento es exclusivo de México.
# 8. Otros Requerimientos
### No aplica
  
# 9. Apéndices
> Agregar ligas a los apéndices
  
## 1. [WBS →]()

## 2. [Gantt →]()

## 3. [Budget & Effort Analysis →]()

## 4. [Historias de Usuario →]()

## 5. [Administración de Riesgos →]()

← [Inicio](https://github.com/SFMBa01029956/TC3005B.501)

← [Manuales](https://github.com/SFMBa01029956/TC3005B.501/tree/manuals)
