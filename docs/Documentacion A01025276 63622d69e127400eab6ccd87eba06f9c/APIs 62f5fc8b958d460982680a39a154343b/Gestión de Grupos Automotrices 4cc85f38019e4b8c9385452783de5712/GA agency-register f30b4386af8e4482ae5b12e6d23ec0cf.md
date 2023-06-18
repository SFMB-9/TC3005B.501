# GA/agency-register

Crea un objeto de agencia sobre la base de datos con la información enviada por el cuerpo

### Metodo/URL

```xml
POST https://swivel.vercel.app/api/GA/agency-register
```

### Cuerpo de solicitud

```json
{
	"nombre_agencia": string,
	"direccion": {
		"calle": string,
		"numero_exterior": int,
		"numero_interior": int,
		"ciudad": string,
		"estado": string,
		"pais": string,
		"codigo_postal": int
	},
	"agency_phone": string,
	"email": string,
	"url": int,
	"rfc": int,
	"docs": [],
	"grupo_automotriz_id": int
}
```

| Valor | Tipo | Concepto |
| --- | --- | --- |
| nombre_agencia | string | Tipo de usuario encriptado |
| direccion | object | Nombre de grupo automotriz |
| agency_phone | string | Teléfono de la agencia |
| email | string | Email de la agencia |
| url | string | Página web de la agencia |
| rfc | string | RFC de la agencia |
| docs | array[object] | Documentos relacionados para registrar agencia |
| grupo_automotriz_id | int | Identificador del grupo automotriz de donde pertenece la agencia |

### Códigos de estatus HTTP

| Código  | Descripción  |
| --- | --- |
| 200 | Respuesta exitosa, se creó la agencia |
| 404 | No se pudo crear la agencia |
| 405 | Método incorrecto |
| 500 | Error interno del servidor |

### Respuesta esperada (200)

```json
{
   "message": "Agencia registrada exitosamente",
}
```

### Recursos

![Figura 1.1. Estructura de la colección de usuarios](../../Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Se realiza un ******query****** de inserción ************sobre la colección de usuarios en la base de datos*******.*******

### Ejemplos de códigos

```jsx
fetch('https://swivel.vercel.app/api/GA/agency-register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  },
  body: JSON.stringify({
		nombre_agencia: "Toyota Pedregal",
		direccion: {
			calle: "jardines de pedregal",
			numero_exterior: 7,
		  numero_interior: 1,
			ciudad: "Pedregal",
			estado: "CDMX",
			pais: "Mexico",
			codigo_postal: 09287
		},
		agency_phone: 5555555555,
		email: "agencia1@toyota.com",
		url: "https://toyotapedregal.com",
		rfc: "TOY112314SD1",
		docs: [],
		grupo_automotriz_id: 456
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

url = 'https://swivel.vercel.app/api/GA/agency-register'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
}

body = {
	"nombre_agencia": "Toyota Pedregal",
	"direccion": {
		"calle": "Jardines de Pedregal",
		"numero_exterior": 7,
		"numero_interior": 1,
		"ciudad": "Pedregal",
		"estado": "CDMX",
		"pais": "Mexico",
		"codigo_postal": 27813
	},
	"agency_phone": "55555555555",
	"email": "agencia1@toyota.com",
	"url": "https://toyotapedregal.com",
	"rfc": ,
	"docs": "TOY112314SD1",
	"grupo_automotriz_id": 43
}

response = requests.post(url, headers=headers, data=body)

if response.status_code == 200:
    # Request was successful
    response_data = response.json()
    print(response_data)
else:
    # Request encountered an error
    print(f'Error: {response.status_code}')
```