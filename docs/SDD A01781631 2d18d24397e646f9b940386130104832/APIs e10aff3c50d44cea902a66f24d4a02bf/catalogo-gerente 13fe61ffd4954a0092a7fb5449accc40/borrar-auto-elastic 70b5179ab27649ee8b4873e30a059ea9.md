# borrar-auto-elastic

# Descripción

Como su nombre lo dice, el endpoint sirve para eliminar un auto dado de Elasticsearch. 

### Método

El método que se utiliza para hacer las requests es un DELETE.

### Request

Para hacer uso de este endpoint se necesita mandar un parámetro en el query:

- auto_id: representa el ID del auto qu se quiere eliminar

Ejemplo:

```
/api/catalogo-gerente/borrar-auto-elastic?auto_id=6448c555af4b91297c2a3061
```

### Recursos

El recurso que se está utilizando es la instancia de Elasticsearch: 

![SSBDAutos.png](borrar-auto-elastic%2070b5179ab27649ee8b4873e30a059ea9/SSBDAutos.png)

Para este uso, lo que se está haciendo es encontrar aquel tipo con un ID igual al auto_id del query. 

### URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/catalogo-gerente/borrar-auto-elastic

### Respuesta

Se regresa un mensaje de confirmación.

Ejemplo:

```json
{
    "message": "Auto borrado exitosamente"
}
```

Códigos de estado HTTP:

- 200: Se borró el auto
- 405: El método del request no es un DELETE
- 500: Error interno del servidor

### Código

```jsx
const { Client } = require('@elastic/elasticsearch');

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
  const client = new Client({ node: 'http://localhost:9200' });

  const auto_id = req.query.auto_id;

  try {
    await client.delete({
      index: 'autos',
      id: auto_id
    });

    return res
      .status(200)
      .json({
          message: "Auto borrado exitosamente"
      });
    
  } catch (error) {
    res.status(500).json({ error: 'Error borrando auto' , message: error.message});
  }
};
```

Antes que nada, se checa que el método que se está haciendo en el request sea un DELETE; si no lo es, se regresa estatus: 405. Después, se inicializa la conexión con Elasticseach y se agarra el parámetro del request. En base a esto, se utiliza una estructura try catch para hacer un query a la base de datos con el parámetro. Enseguida se regresa estatus: 200 con el mensaje de confirmación. Finalmente, si hay algún error interno, se regresa estatus: 500.