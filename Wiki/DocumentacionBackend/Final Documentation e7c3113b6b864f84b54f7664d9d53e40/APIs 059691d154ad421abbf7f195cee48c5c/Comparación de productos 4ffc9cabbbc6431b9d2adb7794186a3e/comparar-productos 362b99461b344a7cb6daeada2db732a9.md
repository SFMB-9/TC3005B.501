# /comparar-productos

## Descripción

Este endpoint sirve para obtener toda la información de una selección de vehículos.

## Método

El método que se utiliza para hacer las requests es un GET.

## Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- lst: string de ids de vehiculos unido por comas (,)
- Ejemplo:

```
http://localhost:3000/api/comparar-productos/comparar-productos
```

request body:

```jsx
{
    lst: "E5S_dIgB6Fc17-h0xcKz,mZS_dIgB6Fc17-h09MIB,SZTAdIgB6Fc17-h0J8OE"
}
```

## Recursos

El recurso que se está utilizando es una instancia de Elasticsearch con una tabla llamada autos: 

![autos.png](comparar-productos%20362b99461b344a7cb6daeada2db732a9/autos.png)

## URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/comparar-productos/comparar-productos

## Respuesta

Se regresa un Array de Objetos JSON con los datos de cada vehiculo.

Códigos de estado HTTP:

- 200: Resultados
- 400: Hubo un error en la búsqueda
- 405: El método del request es incorrecto

## Código

```jsx
const { Client } = require('@elastic/elasticsearch')
/* 
car comparison function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    const client = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: process.env.ELASTIC_API_KEY
        }
    })

    if(req.method === 'GET'){
        const lst = req.query.lst;
        const arr = lst.split(',')

        // console.log(arr)

        // Dont think this should be handled here
        // if(arr.length < 1 || arr.length > 4){
        //     return res.status(401).json({ message: 'Unsupported amount of cars' }); // <-- handle this part in front
        // };

        try {
            const body = await client.search({
                index: 'autos',
                body: {
                  query: {
                    terms: {
                      _id: arr
                    }
                  }
                }
              });

            const searchResults = body.hits.hits.map(hit => hit._source);
            
            res.status(200).json(searchResults);
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
- Si hay un error al buscar los vehículos se regresa un estado 400.
- Se regresa un mensaje con el estado.