# get-car-info-elastic

# Descripción

Como su nombre lo dice, el endpoint sirve para recuperar los datos de un auto guardado en Elasticsearch. 

### Método

El método que se utiliza para hacer el request es un GET.

### Request

Para hacer uso de este endpoint se necesita mandar un parámetro en el query:

- auto_id: representa el ID del auto que se busca

Ejemplo:

```
/api/prueba-manejo/get-car-info-elastic?auto_id=6448c555af4b91297c2a3061
```

### Recursos

El recurso que se está utilizando es la instancia de Elasticsearch: 

![SSBDAutos.png](get-car-info-elastic%2008b2a684da0445ecb80138bb3a96c16f/SSBDAutos.png)

Para este uso, lo que se está haciendo es encontrar aquel tipo con un ID igual al auto_id del query. 

### URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/prueba-manejo/get-car-info-elastic

### Respuesta

Se regresa un objeto tipo JSON que contiene todos los datos del auto.

Ejemplo:

```json
{
    "auto": {
        "_index": "autos",
        "_id": "wQbbO4gBf5mrGbtwteKH",
        "_version": 1,
        "_seq_no": 308,
        "_primary_term": 8,
        "found": true,
        "_source": {
            "marca": "Kia",
            "modelo": "Forte",
            "año": "2019",
            "precio": 350000,
            "cantidad": 3,
            "disponible_prueba": "true",
            "visible_catalogo": "true",
            "combustible": "Gasolina",
            "motor": "4 Cilindros",
            "tipo_vehiculo": "Sedán",
            "transmision": "Automática",
            "rendimiento": "30km/l",
            "pasajeros": 5,
            "estado_agencia": "CDMX",
            "nombre_agencia": "Kia Cuajimalpa",
            "municipio_agencia": "Cuajimalpa",
            "direccion_agencia": "Prol. Paseo de la Reforma 1130, Lomas de Santa Fe, Contadero, Cuajimalpa de Morelos, 05300 Ciudad de México, CDMX",
            "color_interior": "Negro",
            "colores": [
                {
                    "nombre": "Azul Metalico",
                    "valor_hexadecimal": "#3d5882",
                    "imagenes": [
                        "https://http2.mlstatic.com/D_NQ_NP_655018-MLM53782975871_022023-O.jpg",
                        "https://http2.mlstatic.com/D_NQ_NP_883943-MLM54171070901_032023-O.jpg",
                        "https://http2.mlstatic.com/D_NQ_NP_966248-MLM53887407193_022023-O.jpg"
                    ]
                },
                {
                    "nombre": "Gris Metalico",
                    "valor_hexadecimal": "#6a717a",
                    "imagenes": [
                        "https://http2.mlstatic.com/D_NQ_NP_727222-MLM68985664992_042023-O.jpg",
                        "https://cars.usnews.com/static/images/Auto/izmo/Colors/kia_19forteexsd3a_gravitygrey.jpg",
                        "https://http2.mlstatic.com/D_NQ_NP_621812-MLM54693193365_032023-O.jpg"
                    ]
                }
            ],
            "caracteristicas": [
                "Tecnología Bluetooth",
                "Aire Acondicionado",
                "Calefacción",
                "Frenos ABS",
                "Muy rápido fiuuuuummmm",
                "Sistema de Navegación"
            ],
            "extras": [
                {
                    "titulo": "Rines de Hierro",
                    "precio": 5000,
                    "descripcion": "Unos bellos rines pero de hierro"
                },
                {
                    "titulo": "Television",
                    "precio": 7000,
                    "descripcion": "Ponle una tele"
                }
            ],
            "enganche": [
                10,
                20,
                30,
                40,
                50
            ],
            "plazo": {
                "12": 5.7,
                "24": 5.8,
                "36": 6,
                "48": 6.2,
                "60": 6.6
            },
            "entrega": [
                {
                    "nombre": "domicilio",
                    "precio": 12000,
                    "descripcion": "Te lo llevamos a la puerta de tu casa"
                },
                {
                    "nombre": "Recoger en Agecia",
                    "precio": 0,
                    "descripcion": "Recoge tu auto en la agencia GRATIS"
                }
            ],
            "fotos_3d": [
                "https://http2.mlstatic.com/D_NQ_NP_655018-MLM53782975871_022023-O.jpg",
                "https://http2.mlstatic.com/D_NQ_NP_883943-MLM54171070901_032023-O.jpg",
                "https://http2.mlstatic.com/D_NQ_NP_966248-MLM53887407193_022023-O.jpg"
            ],
            "ficha_tecnica": "https://github.com/SFMBa01029956/TC3005B.501",
						"descripcion": "Un pequeño y ágil auto familiar. El Kia Forte 2019 es ideal para la vida urbana."
        }
    },
    "message": "Se ha encontrado el auto"
}
```

### Códigos de estado HTTP

- 200: Se encontró el auto y se regresó el objecto JSON
- 405: El método del request no es un GET
- 500: Error interno del servidor

### Código

```jsx
const { Client } = require('@elastic/elasticsearch');

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
  const client = new Client({ node: 'http://localhost:9200' });

  const auto_id = req.query.auto_id;

  try {
    const auto = await client.get({
      index: 'autos',
      id: auto_id
    });

    return res
      .status(200)
      .json({
            auto,
            message: "Se ha encontrado el auto"
      });
    
  } catch (error) {
    res.status(500).json({ error: 'Error encontrando auto' , message: error.message});
  } finally {
    client.close();
  }
};
```

Antes que nada, se checa que el método que se está haciendo en el request sea un GET; si no lo es, se regresa estatus: 405. Después, se inicializa la conexión con Elasticseach y se agarra el parámetro del request. En base a esto, se utiliza una estructura try catch para hacer un query a la base de datos con el parámetro. Enseguida se regresa estatus: 200 con el objeto encontrado. Finalmente, si hay algún error interno, se regresa estatus: 500.