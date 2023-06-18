# Pruebas getDrivingRequest

Caso 1

1. **Nombre del escenario**: Proceso Correcto Recuperad
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    				{
                _id: "64546f1db4d14568536877ec",
                method: "GET",
                expectedStatus: 200,
                expectedJson: (json) => {
                    expect(json.message).toBe("Se ha encontrado el proceso");
                    expect(json.proceso).toBeDefined();
                    expect(json.proceso._doc._id.toString()).toEqual("64546f1db4d14568536877ec");
                }
            },
    ```
    
    En este caso, en el request se están manda un ID de proceso existente. De igual manera, se manda un método GET. 
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
    3. se verifica que hubo un proceso encontrado por el mensaje de respuesta
    4. se verifica que existe el objeto JSON con los procesos
    5. se verifica que el campo _id del proceso regresado sea equivalente al mandado en el request
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
        "proceso": {
            "_id": "644ad9450fe104b79f279924",
            "vendedor_id": "6448c555af4b91297c2a3061",
            "tipo_proceso": "pruebaManejo",
            "usuario_final_id": "6448b23e9b381e63ff823f7f",
            "status": "Aceptada",
            "__v": 1,
            "documentos": [
                {
                    "uwu": "ye"
                }
            ]
        },
        "message": "Se ha encontrado el proceso"
    }
    ```
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
        "proceso": {
            "_id": "644ad9450fe104b79f279924",
            "vendedor_id": "6448c555af4b91297c2a3061",
            "tipo_proceso": "pruebaManejo",
            "usuario_final_id": "6448b23e9b381e63ff823f7f",
            "status": "Aceptada",
            "__v": 1,
            "documentos": [
                {
                    "uwu": "ye"
                }
            ]
        },
        "message": "Se ha encontrado el proceso"
    }
    ```
    

Caso 2

1. **Nombre del escenario**: Procesos no encontrados
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer un estatus 404 cuando no se encontraron procesos con los parámetros del request que se mandaron.
    
    ```jsx
    			{
                _id: "64546f1db4d14568536877ea",
                method: "GET",
                expectedStatus: 404,
                expectedJson: (json) => {
                    expect(json.message).toBe("No se encontro el proceso");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de proceso inexistente. De igual manera, se manda un método GET. 
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. se verifica que el estatus de respuesta sea 404
    3. se verifica que el mensaje recibido sea “No se encontro el proceso”
    
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 404
    
    ```jsx
    {
        "message": "No se encontro el proceso"
    }
    ```
    
5. **Resultado actual**: 
    
    ```jsx
    {
        "message": "No se encontro el proceso"
    }
    ```
    

Caso 3

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    				{
                _id: "64546f1db4d14568536877ec",
                method: "POST",
                expectedStatus: 405,
                expectedJson: (json) => {
                    expect(json.message).toBe("Metodo no permitido");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de proceso existente. De igual manera, se manda un método POST.
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. se verifica que el estatus de respuesta sea 405
    3. se verifica que el mensaje recibido sea “Metodo no permitido”
    
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 404
    
    ```jsx
    {
        "message": "Metodo no permitido"
    }
    ```
    
5. **Resultado actual**: 
    
    ```jsx
    {
        "message": "Metodo no permitido"
    }
    ```