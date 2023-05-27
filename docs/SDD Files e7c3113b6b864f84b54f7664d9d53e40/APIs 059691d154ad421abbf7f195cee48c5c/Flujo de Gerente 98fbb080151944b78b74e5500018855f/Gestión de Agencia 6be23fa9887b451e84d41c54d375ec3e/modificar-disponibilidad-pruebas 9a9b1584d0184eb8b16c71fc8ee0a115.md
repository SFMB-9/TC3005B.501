# /modificar-disponibilidad-pruebas

Descripción

Este endpoint sirve para modificar los campos de tiempo de una agencia.

- Método

El método que se utiliza para hacer las requests es un PUT.

- Request

Para hacer uso de este endpoint se necesita mandar un request con el siguiente parámetro:

- agency: representa la agencia, diferente del id de la agencia
- horas_min:  representa la hora de apertura de la agencia
- horas_max: representa la hora de cierre de la agencia
- dias_anticipo: representa los dias de anticipo con los que se puede agendar una prueba
- dias_max: representa la máxima cantidad de días para agendar una prueba
- Ejemplo:

```
http://localhost:3000/api/agencia/modificar-disponibilidad-pruebas
```

request body:

```jsx
{
  agency: "AgencyA", 
	horas_min: "8", 
	horas_max: "15", 
	dias_anticipo: "2", 
	dias_max: "10"
}
```

- Recursos

El recurso que se está utilizando es un clúster en mongo a una colección llamada usuario: 

![Untitled](../../../Registro%20para%20compradores%203032adfd7455491cab00e8b9afeb4084/Untitled.png)

- URL

Para poder hacer requests a este endpoint se utiliza el siguiente path:

/api/gerente/modificar-disponibilidad-pruebas

- Respuesta

Se regresa un mensaje con el estado.

Códigos de estado HTTP:

- 200: Detalles actualizados
- 405: El método del request es incorrecto

Código:

```jsx
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
agency time update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { agency, horas_min, horas_max, dias_anticipo, dias_max } = req.body;

    await User.findOneAndUpdate({ agencia: agency }, { horas_min: horas_min, horas_max: horas_max, dias_anticipo: dias_anticipo, dias_max: dias_max });
    
    res.status(200).json({ message: "Time constraints updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}
```

Flujo:

- Se verifica el método del request, si no es PUT se regresa un estado 405.
- Se actualiza el registro relevante.

Pruebas

[TESTS]