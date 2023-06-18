# GA/upload-docs-GA

Actualiza el ****URL**** al documento que se subió a la cubeta, recibe el link y lo actualiza en el campo del documento correspondiente para la agencia.

### Metodo/URL

```xml
PUT https://swivel.vercel.app/api/GA/upload-docs-GA
```

### Cuerpo de solicitud

```json
{
	"id": int,
	"documento": {
		"nombre_documento": string,
		"url": string,
		"fecha_modificacion": string,
		"estatus": string
  }
} 
```

| Valor | Tipo | Concepto |
| --- | --- | --- |
| id | ObjectID | ID unico del objeto en la base de datos |
| documento |  Objecto | Objeto que contiene información del documento a subir |

### Códigos de estatus HTTP

| Código  | Descripción  |
| --- | --- |
| 200 | Respuesta exitosa, se actualizó el documento de la agencia |
| 404 | No se pudo actualizar el documento de la agencia |
| 405 | Método incorrecto |
| 500 | Error interno del servidor |

### Respuesta esperada (200)

```json
{
   "message": "Documento de la agencia actualizada exitosamente",
}
```

### Recursos

![Figura 1.1. Estructura de la colección de usuarios](../../Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Se realiza un ******query****** de encontrar uno y actualizar ************sobre la colección de usuarios en la base de datos*******,******* con base en el ‘nombre’ del objeto a actualizar se selecciona la agencia, y se actualiza el documento especifico que se subió a la cubeta.

### Ejemplos de códigos

```jsx
fetch('https://swivel.vercel.app/api/GA/upload-docs-GA', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  },
  body: JSON.stringify({
	id: 2312314,
	documento: {
		nombre_documento: "ContratoTYPedregal",
		url: "https://firebase.storage/docs-agencia/ajsida1231312",
		fecha_modificacion: "12-5-23",
		estatus: "Rechazado"
  }
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

url = 'https://swivel.vercel.app/api/GA/upload-docs-GA'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
}

body = {
	"id": int,
	"documento": {
		"nombre_documento": "ContratoTYPedregal",
		"url": "https://firebase.storage/docs-agencia/ajsida1231312",
		"fecha_modificacion": "12-5-23",
		"estatus": "Aprobado"
  }
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

---