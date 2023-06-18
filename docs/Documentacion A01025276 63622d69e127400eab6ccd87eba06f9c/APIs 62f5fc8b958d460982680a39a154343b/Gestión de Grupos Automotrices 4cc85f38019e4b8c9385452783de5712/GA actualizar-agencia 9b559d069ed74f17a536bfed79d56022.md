# GA/actualizar-agencia

Actualiza una agencia ya existente en la base de datos, con base en su _id único de objeto.

### Metodo/URL

```xml
PUT https://swivel.vercel.app/api/GA/actualizar-agencia
```

### Cuerpo de solicitud

```json
{
 "id": ObjectID,
 "phone": string,
 "email": string,
 "calle": string,
 "num_ext": int,
 "num_int": int,
 "city": string,
 "state": string,
 "country": string,
 "PC": int
} 
```

| Valor | Tipo | Concepto |
| --- | --- | --- |
| id | ObjectID | ID unico del objeto en la base de datos |
| phone | string  | Teléfono de la agencia |
| email | string | Email de la agencia |
| calle | string | Calle en donde está la agencia |
| num_ext | int | Número exterior del lugar |
| num_int | int | Número interior del lugar |
| city | string | Ciudad |
| state | string | Estado |
| country | string | País  |
| PC | int | Código postal |

### Códigos de estatus HTTP

| Código  | Descripción  |
| --- | --- |
| 200 | Respuesta exitosa, se actualizó la agencia |
| 404 | No se pudo actualizar la agencia |
| 405 | Método incorrecto |
| 500 | Error interno del servidor |

### Respuesta esperada (200)

```json
{
   "message": "Agencia actualizada exitosamente",
}
```

### Recursos

![Figura 1.1. Estructura de la colección de usuarios](../../Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Se realiza un ******query****** de encontrar uno y actualizar ************sobre la colección de usuarios en la base de datos*******,******* con base en el ‘_id’ del objeto a actualizar.

### Ejemplos de códigos

```jsx
fetch('https://swivel.vercel.app/api/GA/actualizar-agencia', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  },
  body: JSON.stringify({{
		id: 123142123,
		phone: "55555555555",
	  email: "agencia1@toyota.com",
	  calle: "Jardines de Pedregal Nuevo",
	  num_ext: 6,
	  num_int: null,
	  city: "CDMX",
	  state: "CDMX",
	  country: "Mexico",
	  PC: 53424
	})
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
```

```python
import requests
import json

url = 'https://swivel.vercel.app/api/GA/actualizar-agencia'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
}

body = {
 "id": 123142123,
 "phone": "5555555555",
 "email": "agencia1@toyota.com",
 "calle": "Jardines de Pedregal Nuevo",
 "num_ext": 6,
 "num_int": None,
 "city": "CDMX",
 "state": "CDMX",
 "country": "Mexico",
 "PC": 43534
} 

response = requests.put(url, headers=headers, data=body)

if response.status_code == 200:
    # Request was successful
    response_data = response.json()
    print(response_data)
else:
    # Request encountered an error
    print(f'Error: {response.status_code}')
```