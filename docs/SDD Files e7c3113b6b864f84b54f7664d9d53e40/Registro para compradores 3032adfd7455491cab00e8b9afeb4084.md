# Registro para compradores

## Introducción

Este módulo es el inicio del flujo del comprador, ya que es aquí donde se crea la cuenta con la que se accede a la aplicación. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

Dado que el módulo involucra la creación de cuentas para futuro acceso, el uso de la base de datos es indispensable. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El manejo de cuentas se hace dentro de una sola colección: la colección usuario.

![Untitled](Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

Varios campos se utilizan en esta operación:

- tipo_usuario: un campo encriptado que indica el nivel de permisos que tiene la cuenta asociada.
- nombres: campo que indica los nombres de pila.
- apellidos: campo que indica los apellidos.
- email: campo que indica el email con el que se creó la cuenta.
- contraseña: campo que guarda un hash de la contraseña.
- numero_telefonico: campo que indica el número de teléfono del usuario.
- is_account_verified: campo booleano que indica si el proceso de verificación por correo se ha llevado a cabo para esta cuenta.
- email_verification_string: token conformado por 32 caracteres que asisten en la verificación por correo.
- account_provider: campo que indica si la cuenta se creó usando Google o las credenciales de la aplicación.

### Registro y correo de verificación

El registro para compradores se divide en dos secciones: el registro dentro de la base de datos y la verificación por correo. El registro se hace dentro de un endpoint que maneja la verificación de formato de los campos relevantes, de la inserción a la base de datos y de enviar el correo de verificación, el cual contiene una liga especial. Un segundo endpoint se encarga de actualizar los campos de verificación al entrar a esta liga, siempre y cuando los parámetros coincidan con la entrada en la base de datos.

Endpoint de registro: /register

Endpoint de verificación: /verify-email

## Interfaz de usuario

El propósito de la interfaz es mostrarle al usuario que campos debe de llenar para que su información se pueda procesar para crear su cuenta. Consiste de los campos necesarios, y dos botones para la creación de cuenta. El primero usa la información requerida y el sgundo redirige al usuario a usar una cuenta de Google.

![Untitled](Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled%201.png)

### Desarrollo del componente

El componente se conforma de una serie de inputs de texto, uno por cada campo requerido, con el siguente formato:

```jsx
<div className="form-outline mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="CAMPO"
                value={CAMPO}
                onChange={(e) => setCAMPO(e.target.value)}
                required
              />
            </div>
```

Cada campo se guarda dentro de una variable de estado que permite modificar el valor de la variable cada vez que se ingresa texto nuevo.

El botón de “Crear Cuenta” activa una función que envía la información al endpoint de registro:

```jsx
const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", {
        name,
        surname,
        email,
        password,
        role: "user",
      });

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
```

El botón de “Ingresar con Google” utiliza una función de una librería llamada NextAuth para llevar a cabo el registro con Google.

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del sistema

Como ya se mencionó, existen únicamente dos endpoints para este módulo:

[/registro](APIs%20059691d154ad421abbf7f195cee48c5c/Registro%20681d3471dfac49e2aed862db4aae5271/registro%20571ba13dbdc542baaec0bf0d1f2cfef5.md) 

[/verify-email](APIs%20059691d154ad421abbf7f195cee48c5c/Registro%20681d3471dfac49e2aed862db4aae5271/verify-email%20e317771a5cd34f1ea4e57a044a45d266.md) 

### Formato y tipo de datos almacenados

Este módulo afecta múltiples variables, de las cuales los siguientes campos son de tipo String:

- nombres
- apellidos
- email
- contraseña
- numero_telefonico
- email_verification_string
- account_provider

Existe una única excepción que es de tipo Boolean:

- is_account_verified

### Especificaciones de seguridad y privacidad de los datos

Hay dos campos asegurados en este proceso:

- tipo_usuario: encriptación
- contraseña: hashing

El campo de email_verification_string funge como una medida de seguridad para la verificación, ya que la verificación se hace mediante un filtro de existencia, con tanto el token como el correo como filtros.

## Pruebas y verificación

### Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

### Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la respuesta exitosa
- se manda información equivocada y se regresa la respuesta de fallo
- se manda información con un método equivocado