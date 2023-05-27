# /actualizar-vendedor

Descripción

Este endpoint sirve para actualizar la información de la cuenta de algún vendedor.

- Método

El método que se utiliza para hacer las requests es un PUT.

- Request

Para hacer uso de este endpoint se necesita mandar un request con los siguientes parámetros:

- agency: id que representa la agencia
- Ejemplo:

```
http://localhost:3000/api/gerente/actualizar-vendedor
```

request body:

```jsx
{
  name: "Sebastián",
	last_name: "Villacorta", 
	oldEmail: "s.gonzalez@gmail.com", 
	newEmail: "villacorta.s@gmail.com", 
	cellphone: "5599887766", 
	agency: "617a7e1705c242001f34b6d5"
}
```

- Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![Untitled](../../../Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/gerente/actualizar-vendedor

- Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Detalles actualizados
- 405: El método del request es incorrecto

Código:

```jsx
import { SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
seller details update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { name, last_name, oldEmail, newEmail, cellphone, agency } = req.body;
    
    await SellerUser.findOneAndUpdate({ email: oldEmail, agencia_id: agency }, { nombres: name, apellidos: last_name, email: newEmail, numero_telefonico: cellphone });
    res.status(200).json({ message: "User details updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

Flujo:

- Se verifica el método del request, si no es PUT se regresa un estado 405.
- Se actualizan los usuarios que cumplan con el rol de “seller” y el correo dado.

Pruebas

[TESTS]