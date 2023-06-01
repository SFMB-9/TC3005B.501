# buscar-auto-agencia

# Descripción

Este endpoint sirve para buscar los filtros y autos disponibles en base al nombre de la agencia y los filtros seleccionados. Por ejemplo, si se selecciona un filtro en el catálogo de gerente, este endpoint buscará los autos para los que aplique el filtro y los filtros que aún estén disponibles para esos autos, considerando solo los autos de la agencia del usuario gerente.

- Método

El método que se utiliza para hacer las requests es un GET.

- Request

Para hacer uso de este endpoint se necesita mandar mínimo un parámetro en el query:

- agencyName: representa el nombre de la agencia del usuario gerente.
- query: el resto del contenido del query representa aquellos filtros que se hayan seleccionado.
- Ejemplo:

```
/api/catalogo-gerente/buscar-auto-agencia?agencyName="Mazda Santa Fe"&modelo="Jetta"&ano="2019"
```

- Recursos

El recurso que se está utilizando es la instancia de Elasticsearch: 

![SSBDAutos.png](buscar-auto-agencia%20ff07ece8b1314a009b4ce8430b6e95d1/SSBDAutos.png)

Para este uso, lo que se está haciendo es utilizar el motor de b[usqueda de Elasticsearch para encontrar aquellos autos que coincidan con los filtros aplicados.

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/catalogo-gerente/buscar-auto-agencia

- Respuesta

Se regresa un objeto JSON que contiene los filtros restantes, los ********headers******** de estos filtros y los autos que coinciden con los filtros aplicados:

Ejemplo:

```jsx
{
    "message": "Autos recuperados exitosamente",
    "result": [
        {
            "_index": "autos",
            "_id": "vAbbO4gBf5mrGbtwq-JH",
            "_score": 0.86312973,
            "_source": {
                "marca": "Volkswagen",
                "modelo": "Jetta",
                "año": "2019",
                "precio": 400000,
                "cantidad": 6,
                "disponible_prueba": "true",
                "visible_catalogo": "true",
                "combustible": "Gasolina",
                "motor": "6 Cilindros",
                "tipo_vehiculo": "Sedán",
                "transmision": "Automática",
                "rendimiento": "26km/l",
                "pasajeros": 5,
                "estado_agencia": "CDMX",
                "nombre_agencia": "Volkswagen Salto de Agua",
                "municipio_agencia": "Cuauhtémoc",
                "direccion_agencia": "N° 70, Eje Central Lázaro Cárdenas, Obrera, Cuauhtémoc, 06800 Ciudad de México, CDMX",
                "color_interior": "Blanco",
                "colores": [
                    {
                        "nombre": "Gris Metálico",
                        "valor_hexadecimal": "#8f8888",
                        "imagenes": [
                            "https://img.remediosdigitales.com/a16630/volkswagen-jetta-2019_7/1366_2000.jpg",
                            "https://www.elcarrocolombiano.com/wp-content/uploads/2018/03/20180323-VOLKSWAGEN-JETTA-2019-MEXICO-01.jpg",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/2019_Volkswagen_Jetta_1.4L_front_3.22.19.jpg/800px-2019_Volkswagen_Jetta_1.4L_front_3.22.19.jpg"
                        ]
                    },
                    {
                        "nombre": "Rojo",
                        "valor_hexadecimal": "#cc3227",
                        "imagenes": [
                            "https://img.remediosdigitales.com/a87e35/volkswagen-jetta-trendline-2019_2/1366_2000.jpg",
                            "https://img.remediosdigitales.com/75f8f9/volkswagen-jetta-trendline-2019_7/450_1000.jpg",
                            "https://img.remediosdigitales.com/136247/jetta-r-line/450_1000.jpg"
                        ]
                    }
                ],
                "caracteristicas": [
                    "Tecnología Bluetooth",
                    "CarPlay",
                    "Llanta de Refacción",
                    "Frenos ABS",
                    "Cómodo para dormir",
                    "Interiores de Cuero"
                ],
                "extras": [
                    {
                        "titulo": "Peluche de Kirby",
                        "precio": 10000,
                        "descripcion": "Incluye un peluche de Kirby"
                    },
                    {
                        "titulo": "LEDs",
                        "precio": 3000,
                        "descripcion": "Leds de pesero tuneado"
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
                    "12": 5.6,
                    "24": 5.6,
                    "36": 6,
                    "48": 6,
                    "60": 6.1
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
                    "https://img.remediosdigitales.com/a87e35/volkswagen-jetta-trendline-2019_2/1366_2000.jpg",
                    "https://img.remediosdigitales.com/75f8f9/volkswagen-jetta-trendline-2019_7/450_1000.jpg",
                    "https://img.remediosdigitales.com/136247/jetta-r-line/450_1000.jpg"
                ],
                "ficha_tecnica": "https://github.com/SFMBa01029956/TC3005B.501",
                "descripcion": "El Volkswagen Jetta 2019 es un sedán que combina elegancia, rendimiento y tecnología de vanguardia. Con su diseño sofisticado y líneas aerodinámicas, este vehículo ofrece una experiencia de conducción excepcional.Bajo el capó, el Jetta cuenta con un potente motor de 6 cilindros que proporciona un rendimiento óptimo y una respuesta ágil en cada viaje. Su transmisión automática garantiza cambios suaves y precisos, brindando una experiencia de manejo cómoda y placentera. El interior del Jetta está diseñado para ofrecer comodidad y lujo a sus pasajeros. Los asientos de cuero de alta calidad proporcionan una experiencia de conducción lujosa, mientras que la tecnología Bluetooth y CarPlay permiten una conectividad perfecta con tus dispositivos móviles. Además, cuenta con características como frenos ABS y llanta de refacción, brindando seguridad y tranquilidad en cada trayecto. El Volkswagen Jetta 2019 está disponible en diferentes colores, incluyendo el elegante Gris Metálico y el llamativo Rojo. Estos colores se complementan con el interior en color Blanco, creando un ambiente sofisticado y moderno. Además de su impresionante rendimiento y comodidad, el Jetta 2019 ofrece opciones de personalización. Puedes agregar extras como un peluche de Kirby o LEDs para darle un toque único a tu vehículo. También cuenta con diferentes opciones de enganche y plazo de financiamiento, adaptándose a tus necesidades financieras. Si estás interesado en adquirir el Volkswagen Jetta 2019, puedes aprovechar la opción de entrega a domicilio, donde el vehículo será llevado directamente a la puerta de tu casa, brindándote comodidad y conveniencia. Para obtener más información técnica y detallada sobre el Jetta 2019, puedes consultar la ficha técnica en el siguiente enlace: Ficha Técnica del Volkswagen Jetta 2019. En resumen, el Volkswagen Jetta 2019 es un sedán que combina estilo, rendimiento y tecnología de vanguardia. Con su diseño elegante, comodidad interior y opciones de personalización, este vehículo es una elección perfecta para aquellos que buscan un automóvil de calidad y confiabilidad."
            }
        }
    ],
    "filters": {
        "modelo": [
            "Jetta"
        ],
        "ano": [
            "2019"
        ],
        "color": [
            null
        ],
        "combustible": [
            "Gasolina"
        ],
        "motor": [
            "6 Cilindros"
        ],
        "tipo_vehiculo": [
            "Sedán"
        ],
        "estado_agencia": [
            "CDMX"
        ]
    },
    "filterHeaders": {
        "modelo": "Modelo",
        "ano": "Año",
        "precio": "Precio",
        "color": "Color",
        "combustible": "Combustible",
        "cantidad": "Cantidad",
        "motor": "Motor",
        "estado_agencia": "Estado de la agencia",
        "municipio_agencia": "Municipio de la agencia",
        "tipo_vehiculo": "Tipo de vehículo"
    }
}
```

Códigos de estado HTTP:

- 200: Se encontraron autos y filtros y se regresó su información
- 404: No se encontró el proceso
- 405: El método del request no es un GET
- 500: Error interno del servidor

Código:

```jsx
// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')
let requestAgencyName = "";

export default async function handler(req, res){
    const client = new Client({ node: 'http://localhost:9200' });
    console.log("Query: " + JSON.stringify(req.query));

    let query = {};
    requestAgencyName = req.query.agencyName;

    if(req.query || req.query.search === undefined){
        query = buildQuery(req.query, {});
    }

    if(req.query.search){
      query = {
        "track_total_hits": true, 
        "from" : 0, 
        "size" : 1000,
        "query": {
          "match": {
            "descripcion": {
              "query": req.query.search,
              "minimum_should_match": 1
            }
          }
        }
      }
    }

    const filterHeaders = {
        // SOLO HAY UNA MARCA POR AGENCIA?
        //marca: "Marca",
        modelo: "Modelo",
        ano: "Año",
        precio: "Precio",
        color: "Color",
        combustible: "Combustible",
        //transmision: "Transmisión",
        cantidad: "Cantidad",
        motor: "Motor",
        estado_agencia: "Estado de la agencia",
        municipio_agencia: "Municipio de la agencia",
        tipo_vehiculo: "Tipo de vehículo"
      };
    
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Method not allowed'});
    }

    try{
        let elasticResponse = await client.search({
            index: 'autos',
            body: query
        }, {meta: true});

        let result = elasticResponse.body.hits.hits;

        let filters = {};
        await assembleFilter(result, filters);

        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron autos" });
          }
    
        if (!result) {
            return res.status(500).json({ message: "Error al buscar autos" });
        }

        return res
            .status(200)
            .json({
                message: "Autos recuperados exitosamente",
                result: result,
                filters: filters,
                filterHeaders: filterHeaders
        });
    } catch (err) {
        return res.status(500).json({ message: "Error al buscar autos", error: err.message });
    }
}

// Function to assemble the filters from the catalog results
async function assembleFilter(result, filters) {
    let modelo = [...new Set(result.map(item => item._source.modelo))];
    let ano = [...new Set(result.map(item => item._source.año))];
    let color = [...new Set(result.map(item => item._source.color))];
    let combustible = [...new Set(result.map(item => item._source.combustible))];
    let motor = [...new Set(result.map(item => item._source.motor))];
    let tipo_vehiculo = [...new Set(result.map(item => item._source.tipo_vehiculo))];
    let estado_agencia = [...new Set(result.map(item => item._source.estado_agencia))];

    // filters.marca = marca;
    filters.modelo = modelo;
    filters.ano = ano;
    filters.color = color;
    filters.combustible = combustible;
    filters.motor = motor;
    filters.tipo_vehiculo = tipo_vehiculo;
    filters.estado_agencia = estado_agencia;

  return filters;
}

// Function to build elasticsearch search body
function buildQuery(queryParams, dbQuery) {
    dbQuery.query = {
        bool: {
            must: [{
              match: {
                nombre_agencia: requestAgencyName
              }
            }]
        }
    };

    if (queryParams.marca) {
      dbQuery.query.bool.must.push({
        match: {
          marca: queryParams.marca
        }
      });
    }
  
    if (queryParams.modelo) {
      dbQuery.query.bool.must.push({
        match: {
          modelo: queryParams.modelo
        }
      });
    }
  
    if (queryParams.ano) {
      dbQuery.query.bool.must.push({
        match: {
          año: queryParams.ano
        }
      });
    }
  
    if (queryParams.color) {
      dbQuery.query.bool.must.push({
        match: {
          color: queryParams.color
        }
      });
    }
        
    if (queryParams.combustible) {
      dbQuery.query.bool.must.push({
        match: {
          combustible: queryParams.combustible
        }
      });
    }

    if (queryParams.motor) {
      dbQuery.query.bool.must.push({
        match: {
          motor: queryParams.motor
        }
      });
    }
  
    if (queryParams.tipo_vehiculo) {
      dbQuery.query.bool.must.push({
        match: {
          tipo_vehiculo: queryParams.tipo_vehiculo
        }
      });
    }
  
    if (queryParams.estado_agencia) {
      dbQuery.query.bool.must.push({
        match: {
          estado_agencia: queryParams.estado_agencia
        }
      });
    }
  
    if (queryParams.precio_min) {
      dbQuery.query.bool.must.push({
        range: {
          precio: {
            gte: queryParams.precio_min
          }
        }
      });
    }
  
    if (queryParams.precio_max) {
      dbQuery.query.bool.must.push({
        range: {
          precio: {
            lte: queryParams.precio_max
          }
        }
      });
    }

    return dbQuery;
}
```

Antes que nada se checa que el método que se está haciendo en el request sea un GET; si no lo es, se regresa estatus: 405. Después se inicia la conexión con la base de datos. En base a esto, se construye un query si no existe y este query se aplica a la base de datos con un try catch para encontrar los filtros y autos. En seguida se checa si el objeto que regreso la base de datos está vacío; en caso de que lo esté, se regresa estatus: 404 y si no lo está se regresa estatus: 200 con el objeto. Finalmente si hay algún error interno se regresa estatus: 500.