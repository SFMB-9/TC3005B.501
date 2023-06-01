# get-user-manager-info

# Descripción

Este endpoint sirve para recuperar los datos de un usuario comprador y un usuario agencia guardados en MongoDB. Se junta la recuperación de ambos para reducir el tiempo de carga de la página de solicitud de prueba de manejo, en donde se utiliza este endpoint.

### Método

El método que se utiliza para hacer las requests es un GET.

### Request

Para hacer uso de este endpoint se necesitan mandar los siguientes parámteros en el query:

- _id: representa el ID del usuario comprador del que se quieren conseguir los datos.
- agency_name: representa el nombre de la agencia de la que se quieren conseguir los datos.
- Ejemplo:

```
/api/prueba-manejo/get-user-mamanger-info?_id=6448c555af4b91297c2a3061&agency_name="Kia Santa Fe"
```

### Recursos

El recurso que se está utilizando es la siguiente colección en MongoDB: 

![SSBDUsuarios.png](get-user-manager-info%20cc8f85d4ba874a3ba97a5f6089dba2ca/SSBDUsuarios.png)

Para este uso, lo que se está haciendo es encontrar aquel tipo con un ID igual al _id del query. Además, se encuentra aquel que tenga el nombre_agencia del query en su campo agencia y que sea de tipo_usuario “agencia” (o su equivalente después de encriptarse con la función encryptRole() de /utils/crypto.js).

### URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/prueba-manejo/get-user-manager-info

### Respuesta

Se regresa un objeto tipo JSON que contiene todos los datos del usuario comprador y del usuario agencia.

Ejemplo:

```json
{
    "user": {
        "_id": "646e7555cfb24b65a4f5d1b7",
        "rol_encriptado": "Rol",
        "tipo_usuario": "comprador",
        "nombres": "Diego",
        "apellidos": "Corrales Pinedo",
        "email": "diego@gmail.com",
        "contrasena": "password",
        "direccion": {
            "calle": "Profirio Diaz",
            "numero_exterior": "10",
            "numero_interior": "310",
            "ciudad": "CDMX",
            "estado": "Ciudad de Mexico",
            "pais": "Mexico",
            "codigo_postal": "01700"
        },
        "numero_telefonico": "5532323232",
        "lista_deseos": [],
        "documentos_url": [
            {
                "nombre_documento": "identificacion",
                "url": "www.ejemplo.com",
                "fecha_modificacion": "2023-05-24T20:36:37.379Z",
                "estatus": "aprobado",
                "comentarios": "",
                "_id": "646e7555cfb24b65a4f5d1b8"
            },
            {
                "nombre_documento": "licencia",
                "url": "www.ejemplo.com",
                "fecha_modificacion": "2023-05-24T20:36:37.379Z",
                "estatus": "rechazado",
                "comentarios": "Debe ser a color",
                "_id": "646e7555cfb24b65a4f5d1b9"
            }
        ],
        "procesos": [
            "64714faa135649e6d655ff21",
            "64715102135649e6d655ff22",
            "6471521d135649e6d655ff23",
            "647152e9135649e6d655ff24"
        ],
        "__v": 19
    },
    "manager": {
        "_id": "646e751bcfb24b65a4f5d1b4",
        "rol_encriptado": "Rol",
        "tipo_usuario": "agencia",
        "nombres": "Mazda Santa Fe",
        "apellidos": "",
        "email": "zoomzoom@gmail.com",
        "contrasena": "password",
        "direccion": {
            "calle": "Av. Santa Fe",
            "numero_exterior": "100",
            "numero_interior": "5",
            "ciudad": "CDMX",
            "estado": "Ciudad de Mexico",
            "pais": "Mexico",
            "codigo_postal": "01800"
        },
        "numero_telefonico": "5512345678",
        "grupo_automotriz": "Mazda Co.",
        "gerente_id": "ID del Gerente",
        "lista_deseos": [],
        "procesos": [],
        "horas_min": 4,
        "horas_max": 20,
        "dias_anticipo": 6,
        "dias_max": 9,
        "documentos_url": [],
        "__v": 0
    }
}
```

### Códigos de estado HTTP

- 200: Se encontraron los usuarios y se regresó el objeto JSON
- 405: El método del request no es un GET
- 500: Error interno del servidor

### Código

```jsx
import connectToDatabase from '@/utils/mongodb'
import { ObjectId } from "mongodb";
import { encryptRole } from '@/utils/crypto';

export default async (req, res) => {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
    }
  
    const user_id = req.query._id;
    const nombre_agencia = req.query.agency_name;

    const client = await connectToDatabase;
    const db = client.db("test");
    const userCollection = db.collection('usuarios');

    try {
      // Find the user specific to the given id
      const user = await userCollection.findOne({_id : new ObjectId(user_id)});

      // Find the agency specific to the given name
      const manager = await userCollection.findOne({ nombres: nombre_agencia, tipo_usuario: "agencia" });

      res.status(200).json({ user, manager }, { status: 'Se han encontrado los usuarios'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
};
```

Antes que nada, se checa que el método que se está haciendo en el request sea un GET; si no lo es, se regresa estatus: 405. Después, se agarran los parámetros del request y se inicializa la conexión con MongoDB y la colección ”usuarios”. En base a esto, se utiliza una estructura try catch para hacer dos queries a la base de datos con los parámetros. Enseguida se regresa estatus: 200 con el objeto encontrado. Finalmente, si hay algún error interno, se regresa estatus: 500.