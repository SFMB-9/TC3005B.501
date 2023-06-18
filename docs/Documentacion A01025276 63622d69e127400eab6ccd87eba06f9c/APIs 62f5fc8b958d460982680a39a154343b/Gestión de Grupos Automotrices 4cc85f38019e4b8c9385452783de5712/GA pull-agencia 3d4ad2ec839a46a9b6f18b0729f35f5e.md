# GA/pull-agencia

Regresa a todas las agencias asociadas al grupo automotriz registrado.

### Metodo/URL

```xml
GET https://swivel.vercel.app/api/GA/pull-agencia?id=int
```

### Parámetros de solicitud

| Valor | Tipo | Concept |
| --- | --- | --- |
| id | int | id de la agencia a buscar |

### Códigos de estatus HTTP

| Código  | Descripción  |
| --- | --- |
| 200 | Respuesta exitosa, se encontró la agencia |
| 404 | No se encontraron agencias |
| 405 | Método incorrecto |
| 500 | Error interno del servidor |

### Respuesta esperada (200)

```json
{
   "message":"Trayendo informacion de agencia",
   "data": {
      "_id":{
         "$oid":"6481222c10381de00f16986a"
      },
      "is_account_verified":false,
      "documentos_requeridos_compra":[
         "INE",
         "Licencia",
         "Comprobante de Domicilio"
      ],
      "horas_min":{
         "$numberInt":"0"
      },
      "horas_max":{
         "$numberInt":"23"
      },
      "dias_anticipo":{
         "$numberInt":"1"
      },
      "dias_max":{
         "$numberInt":"14"
      },
      "grupo_automotriz_id":"647ae7c7f25041c1b7b8a57b",
      "direccion":{
         "calle":"Paseo de las Palmas",
         "numero_exterior":"1",
         "numero_interior":"1",
         "ciudad":"CDMX",
         "estado":"CDMX",
         "pais":"Mexico",
         "codigo_postal":"01000"
      },
      "url_agencia":"www.autos.com",
      "tipo_usuario":"ea32725caec36ffca1c1ee939e606cd1",
      "nombres":"Palmas",
      "__t":"AgencyEntity",
      "__v":{
         "$numberInt":"0"
      },
      "email":"autospalmas@gmail.com",
      "numero_telefonico":"5510901090"
   }
}
```

### Recursos

![Figura 1.1. Estructura de la colección de usuarios](../../Flujo%20de%20gestio%CC%81n%20de%20grupo%20automotriz%205686f42e81f5432595251ef3d8ff17d3/2%20Administracio%CC%81n%20de%20agencias%203e57792a996b491c98690212761a4d56/Base_de_Datos_-_MongoDesnormalizado.png)

Figura 1.1. Estructura de la colección de usuarios

Se realiza un ******query****** sobre la colección de usuarios en la base de datos de *******MongoDB*******, en donde los parámetros a buscar sobre son ‘usuario_id’*********************.*********************

### Ejemplos de códigos

```jsx
fetch('https://swivel.vercel.app/api/GA/pull-agencia?id=1', {
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

url = 'https://swivel.vercel.app/api/GA/pull-agencias?pull-agencia?id=1'
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

##