# crear-prueba-completa

# Descripción

Este endpoint sirve para crear un documento en la colección de procesos en MongoDB, representando una nueva solicitud de prueba de manejo.

### Método

El método que se utiliza para hacer las requests es un POST.

### Request

Para hacer uso de este endpoint se necesitan mandar los siguientes datos en el body del request:

- auto_id: representa el ID del auto para el que se solicita una prueba de manejo.
- user_id: representa el ID del usuario solicitante.
- documents: los documentos del usuario (licencia e identificación) para la prueba de manejo.
- selected_date: la fecha seleccionada por el usuario para realizar la prueba de manejo.
- selected_time: la hora seleccionada por el usuario para realizar la prueba de manejo.
- Ejemplo:

```
/api/prueba-manejo/crear-prueba-completa
```

Body:

```jsx
{
  "auto_id": "645063342abb04e36f428df4",
	"user_id": "646e7555cfb24b65a4f5d1b7",
	"documents": [{
			"nombre_documento": "identificacion",
			"url": "https://firebasestorage.googleapis.com/v0/b/swivel-test-b63aa.appspot.…",
			"fecha_modificacion": "2023-05-27T00:46:31.759Z",
			"estatus": "En revision",
			"comentarios": ""
		}, {
			"nombre_documento": "licencia",
			"url": "https://firebasestorage.googleapis.com/v0/b/swivel-test-b63aa.appspot.…",
			"fecha_modificacion": "2023-05-27T00:47:30.591Z",
			"estatus": "Aceptado",
			"comentarios": ""
		}],
	"selected_date": "2023-05-10T00:00:00.000+00:00",
	"selected_time": "0000-00-00T16:00:00.000+00:00"
}
```

### Recursos

Los recursos que se estan utilizando son ambas colecciones en MongoDB. La de usuarios para conseguir la información del usuario comprador y la agencia del auto y la de procesos para escribirle la nueva solicitud de prueba de manejo: 

![SSBDProcesos.png](crear-prueba-completa%203e6de5ba69cf4909aada5b74a9f5f2d2/SSBDProcesos.png)

![SSBDUsuarios.png](crear-prueba-completa%203e6de5ba69cf4909aada5b74a9f5f2d2/SSBDUsuarios.png)

Además, se utiliza el índice de autos en Elasticsearch para conseguir la información del auto solicitado:

![SSBDAutos.png](crear-prueba-completa%203e6de5ba69cf4909aada5b74a9f5f2d2/SSBDAutos.png)

Para este uso, lo que se está haciendo es encontrar aquel tipo con un ID igual al user_id del body en la base de datos de usuarios. Además, se encuentra aquel que tenga el nombre_agencia del query en su campo agencia y que sea de tipo_usuario “agencia” (o su equivalente después de encriptarse con la función encryptRole() de /utils/crypto.js). En el índice de autos, se encuentra aquel que tenga un ID igual al auto_id del body.

### URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/prueba-manejo/crear-prueba-compelta

### Respuesta

Se regresa un mensaje de confirmación, así como el ID del proceso creado.

Ejemplo:

```jsx
{
    "message": "Proceso de prueba de manejo creado exitosamente",
    "result": "646e7555cfb24b65a4f5d1b7"
}
```

### Códigos de estado HTTP:

- 200: Se creó el proceso
- 405: El método del request no es un POST
- 500: Error interno del servidor

### Código

```jsx
const { Client } = require('@elastic/elasticsearch');
import connectToDatabase from '@/utils/mongodb'
import { ObjectId } from "mongodb";

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }

    const clientElastic = new Client({ node: 'http://localhost:9200' });

    const client = await connectToDatabase;
    const db = client.db("test");
    const userCollection = db.collection('usuarios');
    const processCollection = db.collection('procesos');

    try {
        // Find the car specific to the given id
        const auto = await clientElastic.get({
            index: 'autos',
            id: req.body.auto_id
        });

        const carData = auto._source;
        
        // Find the user specific to the given id
        const userData = await userCollection.findOne({_id : new ObjectId(req.body.user_id)});

        // Find the agency specific to the given name
        const agencyData = await userCollection.findOne({ nombres: carData.nombre_agencia, tipo_usuario: "agencia" });

        // Create the Process with the defined data
        const proceso = { 
            tipo_proceso: "pruebaManejo",
            estatus_validacion: "En proceso",
            documentos: req.body.documents,
            grupo_automotriz_id: agencyData["grupo_automotriz_id"],
            nombre_agencia: carData.nombre_agencia,
            direccion: userData["direccion"],
            fecha_inicio: new Date().toISOString(),
            grupo_automotriz: agencyData["grupo_automotriz"],
            superadmin_id: agencyData["superadmin_id"],
            usuario_final_id: req.body.user_id,
            auto: {
                "auto_id": req.body.auto_id,
                "marca": carData.marca,
                "modelo": carData.modelo,
                "ano": carData.año,
                "precio": carData.precio,
                "array_fotografias_url": carData.fotos_3d
            },
            direccion_agencia: carData.direccion_agencia,
            numero_telefonico: agencyData["numero_telefonico"],
            comentarios: "",
            fecha_agendada: new Date(req.body.selected_date),
            hora_agendada: new Date(req.body.selected_time)
        };

        // Insert the created process into the collection
        const result = await processCollection.insertOne(proceso);
        const process_id = result.insertedId;

        // Add the created process to the list of processes the user has
        await userCollection.updateOne({ _id: userData._id }, { $push: { procesos: process_id } });

        return res
            .status(200)
            .json({ message: 'Proceso de prueba de manejo creado exitosamente', result: process_id });

    } catch(error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al crear proceso de prueba de manejo', error: error.message});
    }
}
```

Antes que nada, se checa que el método que se está haciendo en el request sea un POST; si no lo es, se regresa estatus: 405. Después, se inicializa la conexión con MongoDB a las colecciones ”usuarios” y “procesos”, así como la conexión a Elasticsearch. En base a esto, se utiliza una estructura try catch para hacer dos queries a la colección “usuarios” con los parámetros, encontrando los datos del usuario comprador y usuario agencia correspondiente. Con todos estos datos se construye un JSON para insertarlo como un nuevo proceso en la colección de procesos. Finalmente, se realiza un PUT en el que se agrega el nuevo proceso a la lista de procesos del usuario comprador. Enseguida se regresa estatus: 200 con el mensaje de confirmación y el ID. Finalmente, si hay algún error interno, se regresa estatus: 500.