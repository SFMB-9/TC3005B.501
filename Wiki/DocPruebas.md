# Documento de Pruebas




# Índice

[**Índice**](#índice)

[**Introducción**](#1-introducción)

[**Estrategia de Pruebas**](#2-estrategia-de-pruebas)

[**Manejo de Pruebas**](#3-manejo-de-pruebas)

[**Ambiente de pruebas**](#4-ambiente-de-pruebas)

[**Plantilla de Pruebas**](#5-plantilla-de-pruebas)

[**Conclusiones**](#6-conclusiones)

# 1. Introducción
## 1.1 Objetivo

## 1.2 Descripción del Proyecto

## 1.3 Audiencia

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

| No. | Tipo de Prueba | Ejemplo | Dependencia |
|---|---|---|---|
|1| Prueba unitaria | Conexión a la base de datos | Bases de datos finalizadas |
|2|Prueba unitaria | Prueba de autenticación de usuario |Módulo de autenticación finalizado|
|3|Prueba unitaria|Prueba de registro de usuario|Módulo de registro finalizado|
|4|Prueba de integración|Prueba de Registro/ autenticación. El usuario es capaz de crear una cuenta y auntenticar esa cuenta|Terminadas las pruebas 1,2,3|
|5||||

## 2.9 Estimado de Esfuerzo


# 3. Manejo de Pruebas

## 3.1 Plan de Ejecución de Pruebas

## 3.2 Factores de Riesgo y Mitigación de Pruebas
|Riesgo|Probabilidad|Impacto|Plan de Mitigación|
|---|---|---|---|
|s|s|s|s|

## 3.3 Plan de Comunicación y Roles de Equipo

### 3.3.1 Roles

### 3.3.2 Estrategia de Comunicación

## 3.4 Gantt

# 4. Ambiente de pruebas
El hardware utilizado para las pruebas tendrá un mínimo de 4 núcleos, Intel i5-1155G7 a 4,5 GHz y 8 GB de RAM. Este hardware correra tendrá un sistema operativo mínimo de Windows 10.0.19045. Todo el hardware utilizado por los equipos de prueba y desarrollo cumplirá con estos requisitos mínimos.

La aplicación en sí se alojará en una instancia VPC, que contendrá máquinas virtuales escalables para almacenar el front-end y el back-end por separado, así como una base de no relacional para datos secundarios. Para obtener más información, consulte el Diagrama de arquitectura en la Especificación de requisitos de software. Todos los miembros de los equipos de prueba y desarrollo tendrán acceso a la misma versión de esta instancia VPC.

# 5. Plantilla de pruebas

# 6. Conclusiones

