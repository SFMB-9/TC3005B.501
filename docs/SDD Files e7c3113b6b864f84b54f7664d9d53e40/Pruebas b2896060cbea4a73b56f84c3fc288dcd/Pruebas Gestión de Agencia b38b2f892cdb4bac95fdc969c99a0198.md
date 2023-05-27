# Pruebas Gestión de Agencia

# /pull-detalles-agencia

Caso 1

1. **Nombre del escenario**: Obtención de datos de agencia correctos.
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    test("test to get all of the agency's data", async () => {
      const req = { method: "GET" , body: { agency: "AgencyA" }};
    
      const json = jest.fn();
    
      const status = jest.fn(() => {
        return { json };
      });
    
      const res = { 
        status,
    	  json
      };
    
      await handler(req,res);
    
      expect(status).toHaveBeenCalledWith(200);
    
      const responseData = json.mock.calls[0][0];
    
      expect(responseData.horas_min).toBe(8);
      expect(responseData.horas_max).toBe(16);
      expect(responseData.dias_anticipo).toBe(3);
      expect(responseData.dias_max).toBe(20);
      expect(responseData.documentos_requeridos_compra).toEqual(["ine", "licencia", "acta de nacimiento"]);
    });
    ```
    
    En este caso, se manda un método GET y se espera conseguir la información de una agencia creada previo a las pruebas.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
    3. Se verifica que el mensaje de respuesta incluya los datos de la agencia
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
    	horas_min: 8,
      horas_max: 16,
      dias_anticipo: 3,
      dias_max: 20,
      documentos_requeridos_compra: ["ine","licencia","acta de nacimiento"]
    }
    ```
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
    	horas_min: 8,
      horas_max: 16,
      dias_anticipo: 3,
      dias_max: 20,
      documentos_requeridos_compra: ["ine","licencia","acta de nacimiento"]
    }
    ```
    

Caso 2

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    test("test to get all the agency's data with a wrong method", async () => {
    
    	const req = { method: "POST" };
    
      const json = jest.fn();
    
      const status = jest.fn(() => {
        return { json };
      });
    
      const res = { 
        status
      };
    
      await handler(req,res);
    
      expect(status).toHaveBeenCalledWith(405);
    });
    ```
    
    En este caso, en el request se están manda un método POST.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. se verifica que el estatus de respuesta sea 405
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 405
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 405
    

# /modificar-disponibilidad-pruebas

Caso 1

1. **Nombre del escenario**: Actualización de datos de agencia correctos.
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    test("test to update an agency's test scheduling", async () => {
    	const req = { method: "PUT", body: { 
        agency: "AgencyTest", 
        horas_min: 5, 
        horas_max: 6, 
        dias_anticipo: 7, 
        dias_max: 8
      }};
    
      const json = jest.fn();
    
      const status = jest.fn(() => {
        return { json };
      });
    
      const res = { 
        status
      };
    
    	await handler(req,res);
    
      expect(status).toHaveBeenCalledWith(200);
    });
    ```
    
    En este caso, se manda un método PUT junto con lo nuevos valores de tiempos y se espera actualizar la información de una agencia creada previo a las pruebas.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    

Caso 2

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    test("test to update an agency's test scheduling with a wrong method", async () => {
    
      const req = { method: "GET" };
    
      const json = jest.fn();
    
      const status = jest.fn(() => {
        return { json };
      });
    
      const res = { 
        status
      };
    
      await handler(req,res);
    
      expect(status).toHaveBeenCalledWith(405);
    });
    ```
    
    En este caso, en el request se están manda un método GET.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. se verifica que el estatus de respuesta sea 405
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 405
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 405