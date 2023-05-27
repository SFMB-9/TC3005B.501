# /eliminar-vendedor

Descripción

Este endpoint sirve para eliminar alguns cuenta de un vendedor.

- Método

El método que se utiliza para hacer las requests es un DELETE.

- Request

Para hacer uso de este endpoint se necesita mandar un request con los siguientes parámetros:

- agency: id que representa la agencia
- Ejemplo:

```
http://localhost:3000/api/gerente/eliminar-vendedor
```

request body:

```jsx
{
  email: "vera.a@gmail.com",
	agency: "617a7e1705c242001f34b6d5"
}
```

- Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![Untitled](../../../Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/gerente/eliminar-vendedor

- Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Vendedor eliminado
- 400: Vendedor no encontrado
- 405: El método del request es incorrecto

Código:

```jsx
import { SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
seller removal function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    dbConnect();

    const { email, agency } = req.query;
    
    const result = await SellerUser.deleteOne({ email: email, agencia_id: agency });

    if(result.deletedCount > 0) {
        res.status(200).json({ message: "User deleted successfully" });    
    }
    else {
        res.status(400).json({ message: "User not found" });
    }
  }
  else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

Flujo:

- Se verifica el método del request, si no es DELETE se regresa un estado 405.
- Se elimina el usuario que cumpla con la agencia y el correo dado, si no existe se regresa un estado 400.

Pruebas

[TESTS]