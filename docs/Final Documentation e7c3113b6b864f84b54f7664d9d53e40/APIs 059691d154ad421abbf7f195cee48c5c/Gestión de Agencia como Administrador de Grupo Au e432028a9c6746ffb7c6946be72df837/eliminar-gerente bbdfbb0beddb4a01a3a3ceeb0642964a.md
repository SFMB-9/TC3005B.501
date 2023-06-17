# /eliminar-gerente

## Descripción

Este endpoint sirve para eliminar la información de un gerente.

## Método

El método que se utiliza para hacer las requests es un DELETE.

## Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- id: id del documento del gerente
- Ejemplo:

```
http://localhost:3000/api/agencia/eliminar-gerente
```

request body:

```jsx
{
    id: "6475ce431870c4941b667158"
}
```

## Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![users.png](pull-agencia%20c1e0b7cc540648dfa3344600c4367552/users.png)

## URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/GA/eliminar-gerente

## Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Gerente eliminado correctamente
- 405: El método del request es incorrecto

## Código

```jsx
import { ManagerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
manager deletion function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    dbConnect();

    const { id } = req.body;

    const managerRole = encryptRole("manager");

    await ManagerUser.findOneAndDelete({ _id: id, tipo_usuario: managerRole }).exec()

    res.status(200).json({ message: "Manager deleted" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

## Flujo

- Se verifica el método del request, si no es DELETE se regresa un estado 405.
- Se regresa el mensaje con el estado correspondiente.