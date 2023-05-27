# /verify-email

Descripción

Este endpoint sirve para verificar una cuenta nueva.

- Método

El método que se utiliza para hacer las requests es un POST.

- Request

Para hacer uso de este endpoint se necesita mandar un request con los siguientes parámetros:

- token: representa el token de verificación creado durante el registro
- email: representa el email de la cuenta a verificar
- Ejemplo:

```
http://localhost:3000/api/verify-email?token=gBbdY19G2Dlr7w9d0Kg5sdLm6AkIYLlf&email=d.pinedo@gmail.mx
```

- Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![Untitled](../../Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/verify-email

- Respuesta

Se regresa un mensaje relacionado al código de estado HTTP.

Códigos de estado HTTP:

- 200: Se verificó la cuenta
- 400: No se verificó la cuenta
- 405: El método del request es incorrecto

Código:

```jsx
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler (req, res) {
  if(req.method === "POST"){
    const { token, email } = req.query;
    dbConnect();

    let verification = await User.exists({ email_verification_token: token, email: email });

    if (verification) {
      await User.findOneAndUpdate({ email: email }, { is_account_verified: true, email_verification_token: null })
      res.status(200).json({ message: "Email has been validated" }); // display a confirmation message to the user
    }
    else {
      res.status(400).json({ message: "Email could not be validated" }); // display an error message to the user
    }
  }
  else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

Flujo:

- Se verifica el método del request, si no es POST se regresa un estado 405.
- Se verifican la existencia del correo con la token correspondiente.
- Se actualiza el estado de la cuenta en la base de datos.

Pruebas

[TESTS]