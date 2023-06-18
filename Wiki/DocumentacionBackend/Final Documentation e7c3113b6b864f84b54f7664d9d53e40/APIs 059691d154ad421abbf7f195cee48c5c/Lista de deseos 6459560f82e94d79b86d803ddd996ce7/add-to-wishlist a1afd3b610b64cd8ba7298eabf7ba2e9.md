# /add-to-wishlist

## Descripción

Este endpoint sirve para actualizar la lista de deseos de un usuario.

## Método

El método que se utiliza para hacer las requests es un PUT.

## Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- id: id de un usuario comprador
- lst: Array con los ids de los coches en seleccionados por el usuario
- Ejemplo:

```
http://localhost:3000/api/wishlist/add-to-wishlist
```

request body:

```jsx
{
    id: "6475ce431870c4941b667158",
		lst: ["","",""]
}
```

## Recursos

Se está utilizando un clúster en mongo , llamando a una colección llamada usuario:

![users.png](pull-wishlist%20866fb32aa9944e099d59971245172c86/users.png)

## URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/wishlist/add-to-wishlist

## Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Inserción exitosa
- 400: Hubo un error en la inserción
- 405: El método del request es incorrecto

## Código

```jsx
import { BuyerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
buyer wishlist update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    if(req.method === 'PUT'){
        dbConnect();

        const { id, lst } = req.body;

        try {
            await BuyerUser.findByIdAndUpdate(id, { lista_deseos: lst });

            res.status(200).json({ message: "Wishlist updated successfully" });
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

- Se verifica el método del request, si no es PUT se regresa un estado 405.
- Se busca un usuario con el id dado y se actualiza su lista de deseos, si hay un error regresa un estado 400.
- Se regresa un mensaje con el estado.