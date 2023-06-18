# charts/solicitudManejoAgencia

Regresa todas las solicitudes de compra que se han realizado dentro de una agencia, dependiendo del nombre que se mande como query.

### Metodo/URL

```xml
GET /api/charts/solicitudManejoAgencia?name=nombre%20gencia
```

### Parámetros de solicitud

| Valor | Tipo | Concepto |
| --- | --- | --- |
| name | string | Nombre de la agencia a filtrar |

### Códigos de estatus HTTP

| Código  | Descripción  |
| --- | --- |
| 200 | Respuesta exitosa, se encontraron pruebas de manejo |
| 404 | No se encontraron pruebas de manejo |
| 405 | Método incorrecto |
| 500 | Error interno del servidor |

### Respuesta esperada (200)

```json
{
   "message":"Datos recuperados",
   "data": 
			"_id": "64883efd95a6862801850d6e",
			"tipo_proceso": "pruebaManejo",
			"estatus": "en proceso",
			"documentos": [...],
			"fecha_creacion": "2023-06-13T10:03:41.566Z".
			"auto": {
				"modelo": "Sportage"
				...
			},
			"usuario_final_id": "64880db4cca96c9555319061",
			"vendedor": {...},
			"agencia": {
				"nombres": "Nissan Santa Fe",
				...
			},
			"nombre": "Nissan Santa Fe",
			"cantidad_a_pagar": 135128.96
	}
```

### Recursos

![Figura 1.2. Se muestra la colección de procesos.](charts%20solicitudCompraAgencia%20bb8b565df9f3470abbf8c5c7a2a153f0/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.2. Se muestra la colección de procesos.

Se realiza un ******query****** sobre la colección de procesos en la base de datos, en donde los parámetros a buscar sobre es dentro del campo de *********************nombre.********************* Este API se creo con el fin de poder generar estadísticas por agencia. Para obtener el query de name, se hace uso del endpoint de ********managerP******** para obtener la información de la agencia que pertenece el gerente y mandar el request al presente. 

### Ejemplos de códigos

```jsx
fetch('/api/charts/solicitudManejoAgencia?name=Nissan%20Santa%20Fe', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  }
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

url = 'https://swivel.vercel.app/api/charts/solicitudManejoAgencia?name=Nissan%20Santa%20Fe'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    # Request was successful
    response_data = response.json()
    print(response_data)
else:
    # Request encountered an error
    print(f'Error: {response.status_code}')
```