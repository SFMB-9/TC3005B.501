# updateDocumentStatus

# Descripción

Este endpoint sirve para cambiar el estatus de cualquier documento dentro de un proceso. Por ejemplo, si se tiene un proceso de compra en revision se puede cambiar sus estatus a rechazado o a aceptado. 

- Método

El método que se utiliza para hacer las requests es un PUT.

- Request

Para hacer uso de este endpoint se necesita mandar un body con el id del proceso, el estatus nuevo y el id del documento dentro del array de documentos del proceso

- _id: representa el ID del proceso
- doc_id: representa el id del documento dentro del array
- status: representa el nuevo estatus
- Ejemplo:

```
http://localhost:3000/api/DrivingRequestsSeller/updateDocumentStatus
```

Body:

```jsx
{
    "_id": "644c85a9bc77cc2db42477e7",
    "doc_id": "1",
    "status": "uiiiiiii"
}
```

- Recursos

El recurso que se está utilizando es un cluster en mongo a una colección llamada procesos: 

![Untitled](../../Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%201.png)

Para este uso, lo que se está haciendo es recuperar el proceso por medio de su ID y cambiar el estatus de un documento dentro del array de documentos

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/DrivingRequestsSeller/updateDocumentStatus

- Respuesta

Se regresa un mensaje representando que el cambio fue exitoso en el proceso y documento específicos

Ejemplo:

```jsx
{
    "message": "status of document: yeyy in request: 644c85a9bc77cc2db42477e7 to Aceptado"
}
```

Códigos de estado HTTP:

- 200: Se encontró el proceso, el documento y se cambió el estatus
- 404: No se encontró el proceso o el documento
- 405: El método del request no es un PUT
- 500: Error interno del servidor

Código:

```jsx
import dbConnect from "../../../config/dbConnect";
const Proceso = require('../../../models/procesos');

export default async (req, res) => {
        
        //request id, document id and status are passed as body parameters
        const request_id = req.body._id;
        const doc_id = req.body.doc_id;
        const new_status = req.body.status
        

        if(req.method !== 'PUT'){
            return res.status(405).json({message: 'Metodo no permitido'})
        }

        await dbConnect();
    
        try {
        // Find the process that needs to be updated
        const proc = await Proceso.findById(request_id);
        if (!proc) {
          return res.status(404).json({ message: 'No se encontro el proceso' });
        }
        if (!proc.documentos[doc_id]) {
          return res.status(404).json({ message: 'No se encontro el documento' });
        }

        //get the documents of the process
        const doc = proc.documentos;
        //change the status of the document
        doc[doc_id].status = new_status;
        proc.documentos = doc;
        proc.markModified('documentos');
        //save the changes
        await proc.save();
        res.status(200).json({ message: 'status of document: ' + doc[doc_id].nombre + ' in request: ' + request_id + ' to ' + new_status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    } 
  };
```

Antes que nada se checa que el método que se está haciendo en el request sea un PUT; si no lo es, se regresa estatus: 405. Después se agarran los parámetros del request y se inicia la conexión con la base de datos. En base a esto, se utiliza una estructura try catch para hacer un query a la base de datos para encontrar el proceso por medio de su ID. En seguida se checa si el objeto que regreso la base de datos está vacío; en caso de que lo esté, se regresa estatus: 404. De igual manera, si el documento que se mando no existe, también se regresa un error 404. Si ambos existen, se regresa estatus: 200 con el objeto. Finalmente si hay algún error interno se regresa estatus: 500.

[Pruebas updateDocumentStatus](updateDocumentStatus%20f1da9db5f5434e9786075ea70369a428/Pruebas%20updateDocumentStatus%2018bfb9919aa94cf3b3bc63d4a5a914da.md)