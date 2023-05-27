# Pruebas Lista de Vendedores

# /pull-all-vendedores

Caso 1

1. **Nombre del escenario**: Obtención de datos de vendedores correctos.
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    test("test to get all sellers' data", async () => {
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
    
      responseData.forEach((entry, index) => {
        if (index === 0) {
          expect(entry).toHaveProperty("tipo_usuario", e_role);
          expect(entry).toHaveProperty("nombres", "Test");
          expect(entry).toHaveProperty("apellidos", "Test");
          expect(entry).toHaveProperty("agencia", "AgencyA");
        } else if (index === 1) {
          expect(entry).toHaveProperty("tipo_usuario", e_role);
          expect(entry).toHaveProperty("nombres", "Test");
          expect(entry).toHaveProperty("apellidos", "Test");
          expect(entry).toHaveProperty("agencia", "AgencyA");
        }
      });
    
      const hasOneInEmail = responseData.some((entry) => entry["email"] === "number@one.com");
      expect(hasOneInEmail).toBe(true);
    
      const hasTwoInEmail = responseData.some((entry) => entry["email"] === "number@two.com");
      expect(hasTwoInEmail).toBe(true);
    });
    ```
    
    En este caso, se manda un método GET y se espera conseguir dos usuarios creados previos a las pruebas en forma de array.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
    3. Se verifica que el mensaje de respuesta incluya los datos de los usuarios
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
    	data: 
    	{
    	  tipo_usuario: e_role,
    	  nombres: "Test",
    	  apellidos: "Test",
    	  email: "number@one.com",
    	  agencia: "AgencyA"
      },
      {
    	  tipo_usuario: e_role,
    	  nombres: "Test",
    	  apellidos: "Test",
    	  email: "number@two.com",
    	  agencia: "AgencyA"
    	}
    }
    ```
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
    	data: 
    	{
    	  tipo_usuario: e_role,
    	  nombres: "Test",
    	  apellidos: "Test",
    	  email: "number@one.com",
    	  agencia: "AgencyA"
      },
      {
    	  tipo_usuario: e_role,
    	  nombres: "Test",
    	  apellidos: "Test",
    	  email: "number@two.com",
    	  agencia: "AgencyA"
    	}
    }
    ```
    

Caso 2

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    test("test to get all sellers' data with a wrong method", async () => {
    
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
    

# /actualizar-vendedor

Caso 1

1. **Nombre del escenario**: Actualización de datos de vendedor correctos.
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    test("test to update a seller", async () => {
    	const req = { method: "PUT", body: { 
    		name: "Arsi",
        last_name: "Parala", 
        oldEmail: "actualizar@vendedor.com", 
        newEmail: "hakita@florp.com", 
        cellphone: "0987654321", 
        agency: "Heresy"
      }
    
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
    
    En este caso, se manda un método PUT y se espera modificar un usuario creado previo a las pruebas.
    
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
    test("test to update a seller with a wrong method", async () => {
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
    

# /eliminar-vendedor

Caso 1

1. **Nombre del escenario**: Eliminación de vendedor apropiado.
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    test("test to delete an existing seller", async () => {
    	const req = { method: "DELETE", body: { email: "eliminar@vendedor.com", agency: "AgencyTest" }};
    
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
    
    En este caso, se manda un método DELETE y se espera eliminar  un usuario creado previo a las pruebas.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    

Caso 2

1. **Nombre del escenario**: Eliminación de vendedor no existente.
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer un requerimiento erróneo para la obtener la respuesta esperada:
    
    ```jsx
    test("test to delete a non-existing seller", async () => {
      const req = { method: "DELETE", body: { email: "test@eliminar.com", agency: "AgencyTest" }};
    
      const json = jest.fn();
    
      const status = jest.fn(() => {
        return { json };
      });
    
      const res = { 
        status
      };
    
      await handler(req,res);
    
      expect(status).toHaveBeenCalledWith(400);
    });
    ```
    
    En este caso, se manda un método DELETE y se espera eliminar  un usuario creado previo a las pruebas.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 400
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 400
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 400
    

Caso 3

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    test("test to delete a seller with a wrong method", async () => {
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