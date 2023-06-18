# updateRequestStatus

# Descripción

Este endpoint sirve para cambiar el estatus de cualquier tipo de proceso. Por ejemplo, si se tiene un proceso de compra en revision se puede cambiar sus estatus a rechazado o a aceptado. 

- Método

El método que se utiliza para hacer las requests es un PUT.

- Request

Para hacer uso de este endpoint se necesita mandar un body con el id del proceso y el estatus nuevo estatus:

- _id: representa el ID del proceso
- status: representa el nuevo estatus
- Ejemplo:

```
http://localhost:3000/api/DrivingRequestsSeller/updateRequestStatus
```

Body:

```jsx
{
    "_id": "645063342abb04e36f428df4",
    "status": "Rechazada"
}
```

- Recursos

El recurso que se está utilizando es un cluster en mongo a una colección llamada procesos: 

![Base_de_Datos - MongoDesnormalizado (3).png](../../Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Base_de_Datos_-_MongoDesnormalizado_(3).png)

Para este uso, lo que se está haciendo es recuperar el proceso que se está buscando y cambiar su estatus

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/DrivingRequestsSeller/updateRequestStatus

- Respuesta

Se regresa un mensaje representando que el cambio fue exitoso en el proceso específico

Ejemplo:

```jsx
{
    "message": "status of 645063342abb04e36f428df4 updated to Rechazada"
}
```

Códigos de estado HTTP:

- 200: Se encontró el proceso y se cambio el estatus
- 404: No se encontró el proceso
- 405: El método del request no es un PUT
- 500: Error interno del servidor

Código:

```jsx
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

export default async (req, res) => {
      
        if(req.method !== 'PUT'){
            return res.status(405).json({message: 'Metodo no permitido'})
        }

        const proceso_id = req.body._id;
        const new_status = req.body.status
        //seller id and type are passed as query parameters
      
        await dbConnect();
    
        try {
        // Find the processes that belong to the seller and are of a specific type
        const proc = await Proceso.findById(proceso_id);
        if (!proc) {
          return res.status(404).json({ message: 'No se encontro el proceso' });
        }
        proc.status = new_status;
        await proc.save();
        res.status(200).json({ message: 'status of ' + proceso_id + ' updated to ' + new_status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
```

Antes que nada se checa que el método que se está haciendo en el request sea un GET; si no lo es, se regresa estatus: 405. Después se agarran los parámetros del request y se inicia la conexión con la base de datos. En base a esto, se utiliza una estructura try catch para hacer un query a la base de datos para encontrar el proceso por medio de su ID. En seguida se checa si el objeto que regreso la base de datos está vacío; en caso de que lo esté, se regresa estatus: 404 y si no lo está se regresa estatus: 200 con el objeto. Finalmente si hay algún error interno se regresa estatus: 500.

[Pruebas updateRequestStatus](updateRequestStatus%20fbf4c3bd0b724b93a826e1945301110e/Pruebas%20updateRequestStatus%20e0b9efe91f064554bdf5e4ea7154b728.md)