# /actualizar-gerente

## Descripción

Este endpoint sirve para actualizar la información de un gerente.

## Método

El método que se utiliza para hacer las requests es un PUT.

## Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- id: id del documento del gerente
- name: nombre nuevo del gerente
- last_name: apellido nuevo del gerente
- newEmail: correo nuevo del gerente
- cellphone: teléfono nuevo del gerente
- Ejemplo:

```
http://localhost:3000/api/agencia/actualizar-gerente
```

request body:

```jsx
{
    id: "6475ce431870c4941b667158",
		name: "Mauricio", 
		last_name: "Ramirez", 
		newEmail: "m.ramirez@gmail.com", 
		cellphone: "5534439779"
}
```

## Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![users.png](pull-agencia%20c1e0b7cc540648dfa3344600c4367552/users.png)

## URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/GA/actualizar-gerente

## Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Gerente actualizado correctamente
- 405: El método del request es incorrecto

## Código

```jsx
import { ManagerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
manager update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { _id, name, last_name, newEmail, cellphone } = req.body;

    const managerRole = encryptRole("manager");

    await ManagerUser.findOneAndUpdate({ _id: _id, tipo_usuario: managerRole }, { nombres: name, apellidos: last_name, email: newEmail, numero_telefonico: cellphone }).exec()

    res.status(200).json({ message: "Gerente actualizado correctamente" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

## Flujo

- Se verifica el método del request, si no es PUT se regresa un estado 405.
- Se regresa el mensaje con el estado correspondiente.