# Flujo de gestión de grupo automotriz

# Documento de Diseño de Software

## Do Hyun Nam A01025276

### Versiones

| Versión | Fecha | Responsable | Comentarios |
| --- | --- | --- | --- |
| 1.0.0 | 18/5/2023 | Do Hyun Nam | Creación del Documento |
| 1.0.1 | 23/5/2023 | Do Hyun Nam | Definición de estructura |
| 1.1.0 | 3/5/2023 | Do Hyun Nam | Redacción de índice e introducción  |
| 1.1.1 | 18/5/2023 | Do Hyun Nam | Redacción de administración de agencias y registro de agencias |
| 1.1.2 | 19/5/2023 | Do Hyun Nam | Redacción de detalles de agencias |
| 1.1.3 | 21/5/2023 | Do Hyun Nam | Redacción de administración de documentos |
| 1.2.0 | 7/6/2023 | Do Hyun Nam | Agregar glosario |

---

### Índice

1. Contexto
2. Administración de agencias
3. Registro de agencias
4. Detalles de agencia
5. Administración de documentos
6. API Endpoints
7. Glosario

---

# 1. Contexto

El propósito de este documento de diseño de software (SDD, por sus siglas en inglés) es desglosar el proceso de planeación y diseño del flujo de gestión de agencias por parte de los grupos automotrices. 

La estructura del flujo es la siguiente:

- Administración de agencia: visualización y manejo (crear, editar, eliminar) de agencias correspondientes al grupo automotriz.
- Registro de agencia: proceso para que un grupo automotriz pueda dar de alta a una agencia.
- Detalles de agencia: Visualización y funcionalidad de editar información relevante a una agencia.
- Administrar documentos de agencia: consultar los documentos necesitados y poder editarlos, subirlos y borrarlos dependiendo de cada caso.

Al final del documento, se detallan las solicitudes (********requests********) y respuestas (*********response*********) que se envían a los endpoints de la interfaz de programación de aplicaciones (*API*, por sus siglas en inglés) para poder lograr las funcionalidades mencionadas. 

## 1.1. Dependencias generales del flujo

- **Log in:** Se requiere de la sesión para obtener información del usuario que está ingresando información para registrar agencia. En este caso son tanto el nombre del grupo automotriz tanto como su identificador.
- **Sign in:** Se requiere de la sesión para obtener información del usuario que está ingresando información para registrar agencia. En este caso son tanto el nombre del grupo automotriz tanto como su identificador.

Las funcionalidades de autenticación proveen las credenciales necesarias para acceder a la presente, ya que está restringida solo a los usuarios del tipo ‘Grupo Automotriz’. 

Si se llega a ocupar algún otro módulo necesario, específicamente para cada funcionalidad que compone el flujo, estará en su respectiva sección en módulos necesarios.

---

[2. Administración de agencias](Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56.md)

[3. Registro de agencias](Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/3%20Registro%20de%20agencias%20eb08bf0dda8542c493b23a9e86a5abf6.md)

[4. Detalles de agencia](Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/4%20Detalles%20de%20agencia%205b4f951a246b4e2f8cd9c16576240358.md)

[5. Administración de documentos](Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/5%20Administracio%CC%81n%20de%20documentos%20d58da61f90064cb1ac76ff7473ab5564.md)

[6. Flujo y conexión de componentes](Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/6%20Flujo%20y%20conexio%CC%81n%20de%20componentes%2019f1c292e7e843c39b78474e580ebd99.md)

[7. Glosario](Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/7%20Glosario%20435fe3ce8cd44bdba7a0a7ecba160f90.md)