# elasticCarRegister

Descripción

Este endpoint sirve para registrar un auto en Elasticsearch.

- Método

El método que se utiliza para hacer las requests es un POST.

- Request

Para hacer uso de este endpoint se necesita mandar un body con los siguientes parámetros:

- marca: marca del auto
- modelo: modelo del auto
- año: año del auto
- precio: precio del auto
- cantidad: número de unidades
- disponible_prueba: booleano
- visible_catalogo: booleano
- combustible: tipo
- motor: tipo
- tipo_vehículo: camioneta, SUV, etc…
- transmisión: tipo de transmisión
- rendimiento: por kilómetros
- pasajeros: número de pasajeros
- agencia_id: id de la agencia a la pertenece
- estado_agencia: estado de la república
- municipio_agencia: municipio de la agencia
- nombre_agencia: nombre de la agencia
- direccion_agencia: direccion de la agencia
- gerente_id: id dekl gerente de la agencia
- color_interior: color interior del coche
- colores: colores disponibles
- caracteristicas: caracteristicas del coche
- extras: extras que se le pueden añadir al coche
- enganche: porcentajes de enganches disponibles
- plazo: plazos disponibles del coche:
- descirpción: descripción del vehículo
- visistas: numero de visitas en la página
- Ejemplo:

```
http://localhost:3000/api/carRegister/elasticCarRegister
```

request:

```jsx
"car": {
    "cantidad": 0,
      "marca": "",
      "modelo": "",
      "colores": [],
      "color_interior": "",
      "combustible": "",
      "motor": "",
      "ano": 0,
      "transmision": "",
      "rendimiento": "",
      "pasajeros": 0,
      "nombre_agencia": "",
      "estado_agencia": "",
      "municipio_agencia": "",
      "direccion_agencia": "",
      "tipo_vehiculo": "",
      "precio": 0,
      "caracteristicas": [],
      "extras": [],
      "enganche": [],
      "plazo": {},
      "entrega": [],
      "disponible_prueba": "",
      "visible_catalogo": "",
      "descripcion": "",
      "ficha_tecnica": "",
      "fotos_3d": []
    }
}
```

- Recursos

El recurso que se está utilizando es un index llamado autos: 

![Base_de_Datos - Elasticsearch.png](../Pa%CC%81gina%20Registro%20de%20Autos%20e3697a73a5e8416fbd0ca8412c56bede/Base_de_Datos_-_Elasticsearch.png)

Para este uso, lo que se está haciendo es recuperar los datos del usuario con el ID que se esta mandando.

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/carRegister/elasticCarRegister

- Respuesta

Se regresa un Objeto tipo JSON con los datos del usuario y un mensaje que dice “Usuario encontrado”.

Ejemplo:

```jsx
"car": {
    "cantidad": 0,
      "marca": "",
      "modelo": "",
      "colores": [],
      "color_interior": "",
      "combustible": "",
      "motor": "",
      "ano": 0,
      "transmision": "",
      "rendimiento": "",
      "pasajeros": 0,
      "nombre_agencia": "",
      "estado_agencia": "",
      "municipio_agencia": "",
      "direccion_agencia": "",
      "tipo_vehiculo": "",
      "precio": 0,
      "caracteristicas": [],
      "extras": [],
      "enganche": [],
      "plazo": {},
      "entrega": [],
      "disponible_prueba": "",
      "visible_catalogo": "",
      "descripcion": "",
      "ficha_tecnica": "",
      "fotos_3d": []
    }
}
```

Códigos de estado HTTP:

- 200: Se encontró el usuario
- 404: No se encontró el usuario
- 405: El método del request no es un GET
- 500: Error interno del servidor

Código:

```jsx
const { Client } = require('@elastic/elasticsearch')
const { ELASTIC_API_KEY } = process.env

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const car = req.body.car;
  const agency_id = req.body.agency_id;
  const { ano, ...carWithoutAno } = car;

  const client = new Client({
      node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
      auth: {
          apiKey: ELASTIC_API_KEY
      }
  })

  try {
    await client.index({
      index: 'autos',
      body: {
        ...carWithoutAno,
        año: ano,
        agencia_id: agency_id
      }
    });

    res.status(200).json({ message: 'Car uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading car' });
  }
};
```

Antes que nada se checa que el método que se está haciendo en el request sea un POST; si no lo es, se regresa estatus: 405. Después se agarran los parámetros del request y se inicia la conexión con Elasticsearch. En base a esto, se utiliza una estructura try catch para hacer un query a la base de datos para añadir el auto al índice. Si no hubo errores se regresa estatus: 200. Finalmente si hay algún error interno se regresa estatus: 500.