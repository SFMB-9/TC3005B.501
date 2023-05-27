# /actualizar-documentos-requeridos

Descripción

Este endpoint sirve para modificar el array de documentos de una agencia.

- Método

El método que se utiliza para hacer las requests es un PUT.

- Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- agency: representa la agencia, diferente del id de la agencia
- data: representa el nuevo array de documentos

```
http://localhost:3000/api/agencia/actualizar-documentos-requeridos
```

request body:

```jsx
{
  agency: "AgencyA", 
	data: ["INE","Acta de Nacimiento","Licencia para Conducir"] 
}
```

- Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![Untitled](../../../Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/gerente/actualizar-documentos-requeridos

- Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Detalles actualizados
- 405: El método del request es incorrecto

Código:

```jsx
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
agency documents update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { agency, data } = req.body;

    await User.findOneAndUpdate({ agencia: agency }, { documentos_requeridos_agencia: data });
    
    res.status(200).json({ message: "Time constraints updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

Flujo:

- Se verifica el método del request, si no es PUT se regresa un estado 405.
- Se actualiza el registro relevante.

Pruebas

[TESTS]