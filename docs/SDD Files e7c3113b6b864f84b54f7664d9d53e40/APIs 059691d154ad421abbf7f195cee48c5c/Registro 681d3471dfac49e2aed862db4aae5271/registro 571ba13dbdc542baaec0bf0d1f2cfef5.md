# /registro

Descripción

Este endpoint sirve para registrar a cualquier usuario.

- Método

El método que se utiliza para hacer las requests es un POST.

- Request

Para hacer uso de este endpoint se necesita mandar un request con un body con los siguientes parámetros:

- name: representa el nombre del usuario
- surname: representa los apellidos del usuario
- email: representa el email ligado a la cuenta
- password: representa la contraseña de la cuenta
- role: representa el rol y nivel de acceso de la cuenta
- Ejemplo:

```
http://localhost:3000/api/register
```

request body:

```jsx
{
    name: "Diego", 
		surname: "Corrales", 
		email: "d.pinedo@gmail.com", 
		password: "p4ssw0rdS4f37y", 
		role: "user"
}
```

- Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![Untitled](../../Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

Se crea un nuevo documento dentro de esta colección con cada registro.

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/register

- Respuesta

Se regresa un mensaje relacionado al código de estado HTTP.

Códigos de estado HTTP:

- 200: Se creó la cuenta
- 400: No se creó la cuenta
- 405: El método del request es incorrecto

Código:

```jsx
import { User, SellerUser, ManagerUser} from "../../models/user";
import dbConnect from "../../config/dbConnect";

/* 
Required imports for email verification (to be finalized...)

import nodemailer from 'nodemailer';
import EmailVerification from "../../models/emailVerification"; 
*/

import { encryptRole } from "../../utils/crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, surname, email, password, role } = req.body;
    const encrypted_role = encryptRole(role);

    if (!/[a-zA-Z]+/.test(name)) {
      // regex to check name format validity, returns if non-compliant
      return res.status(400).json({ message: "wrong name format" });
    }

    if (!/[\w\.-]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
      // regex to check email format validity, returns if non-compliant
      return res.status(400).json({ message: "wrong email format" });
    }

    let ping = require("ping");

    ping.sys.probe(email, function (isAlive) {
      // email existence validation, pings the email and returns if non-existent
      isAlive
        ? function () {
            // continue
          }
        : function () {
            return res.status(400).json({ message: "Email is invalid" });
          };
    });

    let usedEmail = await User.findOne({ email: email });

    // email existence check within the db, returns if there is already an account with the email
    if (!usedEmail) {
      
      if (role === "user") {
        await User.create({ 
          nombres: name, 
          apellidos: surname, 
          email: email, 
          contraseña: password, 
          tipo_usuario: encrypted_role 
        });
        res.status(200).json({ message: "User registered successfully" });
      } 
      
      else if (role === "seller") {

        const agency = req.body.agency;
        const phone = req.body.phone;

        await SellerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          contraseña: password,
          tipo_usuario: encrypted_role,
          agencia: agency,
          telefono: phone,
        });
        res.status(200).json({ message: "Seller registered successfully" });
      }

      else if (role === "manager") {

        const agency = req.body.agency;
        const phone = req.body.phone;

        await ManagerUser.create({
          nombres: name,
          apellidos: surname,
          email: email,
          contraseña: password,
          tipo_usuario: encrypted_role,
          agencia: agency,
          telefono: phone,
        });
        res.status(200).json({ message: "Manager registered successfully" });
      }
    } else {
      res.status(400).json({ message: "Account already exists" });
    }

    /* 
    base code for email verification, must be implemented above
    requires a functional email provider such as Mailgun in order to be finalized
    
    const newToken = function(length = 32) {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let token = '';
    
      for (let i = 0; i < length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
      }
    
      return token;
    };

    let token = newToken();

    const verificationLink = `https://localhost:3000/verify-email?token=${token}`; // dunno if this link can work, must be tested. Also requires an endpoint

    await emailVerification.create({email: email, token: token});

    const transporter = nodemailer.createTransport({
      // Configure your SMTP server or email provider here
    });

    await transporter.sendMail({
      from: 'noreply@swivel.com', // valid email? have to check this as well
      to: email,
      subject: 'Verify your email address',
      text: `Please click on the following link to verify your email address: ${verificationLink}`,
      html: `<p>Please click on the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`,
    }); 
    */
  }
}
```

Flujo:

- Se verifica el método del request, si no es POST se regresa un estado 405.
- Se verifican los formatos de los valores.
- Se verifica si existe el correo en la base de datos.
- Se crea la cuenta de acuerdo al rol con el que se registra.

Pruebas

[TESTS]