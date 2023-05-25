# Pruebas updateDocumentComment

Caso 1

1. **Nombre del escenario**: Cambio de estatus en un documento específico de un proceso
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    				{
                _id: "64505bca2abb04e36f428df3",
                doc_id: "1",
                comment: "sup",
                method: "PUT",
                expectedStatus: 200,
                expectedJson: (json) => {
                    expect(json.message).toMatch('added comment: ' + 'sup' + ' in request: ' + '64505bca2abb04e36f428df3' + ' at document: ');
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de proceso, un ID de documento y un nuevo estatus. Por consiguiente, se verificó previamente que existe el proceso y el documento dentro de la base de datos. De igual manera, se manda un método PUT. 
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
    3. Se verifica que el mensaje de respuesta incluya el id del proceso y el nuevo comentario
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
        "message": "added comment: yuuuu in request: 64505bca2abb04e36f428df3 at document: yeyy"
    }
    ```
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
        "message": "added comment: yuuuu in request: 64505bca2abb04e36f428df3 at document: yeyy"
    }
    ```
    

Caso 2

1. **Nombre del escenario**: Proceso no encontrado
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer un estatus 404 cuando no se encontró el proceso específico
    
    ```jsx
    				{
                _id: "64505bca2abb04e36f428df4",
                doc_id: "1",
                comment: "sup",
                method: "PUT",
                expectedStatus: 404,
                expectedJson: (json) => {
                    expect(json.message).toBe("No se encontro el proceso");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de proceso inexistente. Por consiguiente, se verificó previamente que no existe el proceso. De igual manera, se manda un método PUT. 
    
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

1. **Nombre del escenario**: Documento no encontrado
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer un estatus 404 cuando no se encontró el documento específico.
    
    ```jsx
    			{
                _id: "64505bca2abb04e36f428df3",
                doc_id: "300",
                comment: "sup",
                method: "PUT",
                expectedStatus: 404,
                expectedJson: (json) => {
                    expect(json.message).toBe("No se encontro el documento");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de proceso existente y un ID de documento inexistente. Por consiguiente, se verificó previamente que no existe el documento y que si existe el proceso. De igual manera, se manda un método PUT. 
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. se verifica que el estatus de respuesta sea 404
    3. se verifica que el mensaje recibido sea “No se encontro el documento”
    
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 404
    
    ```jsx
    {
        "message": "No se encontro el documento"
    }
    ```
    
5. **Resultado actual**: 
    
    ```jsx
    {
        "message": "No se encontro el documento"
    }
    ```
    

Caso 4

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    				{
                _id: "64505bca2abb04e36f428df3",
                doc_id: "1",
                comment: "sup",
                method: "POST",
                expectedStatus: 405,
                expectedJson: (json) => {
                    expect(json.message).toBe("Metodo no permitido");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de proceso existente y un ID de documento existente. De igual manera, se manda un método POST.
    
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