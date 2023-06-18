# /pull-detalles-agencia

## Descripción

Este endpoint sirve para obtener toda la información de una agencia.

## Método

El método que se utiliza para hacer las requests es un GET.

## Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- agency: representa la agencia, diferente del id de la agencia
- Ejemplo:

```
http://localhost:3000/api/agencia/pull-detalles-agencia
```

request body:

```jsx
{
    agency: "AgencyA"
}
```

## Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![users.png](pull-detalles-agencia%20c1e0ed11e1cb47f49c2c55686f70059a/users.png)

## URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/gerente/pull-all-vendedores

## Respuesta

Se regresa un Array de Objetos JSON con los datos de cada usuario.

Códigos de estado HTTP:

- 200: Resultados
- 400: Hubo un error en el request
- 405: El método del request es incorrecto

## Código

```jsx
import { SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
agency details retrieval function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    if(req.method === 'GET'){
        dbConnect();

        const { agency } = req.query;

        try {
            const result = await SellerUser.findOne({ agencia: agency }, "horas_min horas_max dias_anticipo dias_max documentos_requeridos_compra");
            res.status(200).json(result);
        } 
        catch (error) {
            console.error('Error fetching data:', error);
            res.status(400).json({ error: 'An error occurred' });
        }
    }
    else {
        res.status(405).json({ message: "Wrong request method" });
    }
  }
```

## Flujo

- Se verifica el método del request, si no es GET se regresa un estado 405.
- Se busca un usuario que cumpla con el nombre de la agencia dada, si hay un error se regresa un estado 400.
- Se regresa el Array resultante, conteniendo únicamente con los campos especificados, al frontend.