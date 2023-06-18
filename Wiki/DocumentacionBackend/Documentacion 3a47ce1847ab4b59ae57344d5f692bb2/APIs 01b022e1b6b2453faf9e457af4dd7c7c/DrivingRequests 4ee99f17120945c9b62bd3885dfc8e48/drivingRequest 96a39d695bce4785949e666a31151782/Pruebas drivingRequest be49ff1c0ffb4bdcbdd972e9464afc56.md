# Pruebas drivingRequest

Caso 1

1. **Nombre del escenario**: Procesos Correctos Recuperados
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer todos los requerimientos necesarios para la obtener la respuesta esperada:
    
    ```jsx
    				{
                vendedor_id: "6448c555af4b91297c2a3061",
                tipo_proceso: "pruebaManejo",
                method: "GET",
                expectedStatus: 200,
                expectedJson: (json) => {
                    expect(json.message).toBe("Se encontraron los procesos");
                    expect(json.procesos).toBeDefined();
                    expect(json.procesos[0]._doc.vendedor_id.toString()).toEqual("6448c555af4b91297c2a3061");
                    expect(json.procesos[0]._doc.tipo_proceso).toEqual("pruebaManejo");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de vendedor existente, y un tipo de procesos existente. Por consiguiente, se verificó previamente que existen procesos que vinculan ambos campos en la base de datos. De igual manera, se manda un método GET. 
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. Se verifica que el estatus de respuesta sea 200
    3. se verifica que hubieron procesos encontrados por el mensaje de respuesta
    4. se verifica que existe el objeto JSON con los procesos
    5. se verifica que el campo vendedor_id de uno de los procesos regresados sea equivalente al mandado en el request
    6. Se verifica que el campo tipo_proceso sea el mismo al mandado en el request
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
        "procesos": [
            {
                "_id": "mongoID",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "mongoID",
                "status": "estats",
                "__v": 1,
                "documentos": [
                    {
                        "uwu": "doc"
                    }
                ]
            },
           {
                "_id": "mongoID",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "mongoID",
                "status": "estats",
                "__v": 1,
                "documentos": [
                    {
                        "uwu": "doc"
                    }
                ]
            },
           //etc...
        ],
        "message": "Se encontraron los procesos"
    }
    ```
    
5. **Resultado actual**: 
    
    Estatus de la respuesta: 200
    
    ```jsx
    {
        "procesos": [
            {
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
            {
                "_id": "644ad97c0fe104b79f279925",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "Rechazada",
                "__v": 1,
                "documentos": [
                    {
                        "uwu": "ye"
                    }
                ]
            },
            {
                "_id": "644c6b2234ad73b0c59b3832",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "Aceptada",
                "__v": 0,
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado"
                    }
                ]
            },
            {
                "_id": "644c798abc77cc2db42477e5",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "Rechazada",
                "__v": 1,
                "documentos": [
                    {
                        "licencia": {
                            "nombre": "ye",
                            "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                            "ine": {
                                "nombre": "aha",
                                "fecha_modificacion": "2020-05-18T14:10:30.000Z"
                            }
                        }
                    }
                ]
            },
            {
                "_id": "644c7af0bc77cc2db42477e6",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "En_Revision",
                "__v": 1,
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Rechazado"
                    }
                ]
            },
            {
                "_id": "644c85a9bc77cc2db42477e7",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "sup",
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado"
                    },
                    {
                        "nombre": "yeyy",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "sup"
                    }
                ],
                "__v": 12
            },
            {
                "_id": "644c886abc77cc2db42477e8",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "En_Revision",
                "__v": 1,
                "documentos": [
                    {
                        "lisencia": {
                            "id": "1",
                            "nombre": "ye",
                            "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                            "status": "Rechazado"
                        },
                        "ine": {
                            "id": "2",
                            "nombre": "yeyy",
                            "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                            "status": "Aceptado"
                        }
                    }
                ]
            },
            {
                "_id": "645055222abb04e36f428df2",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "Aceptada",
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado"
                    },
                    {
                        "nombre": "yeyy",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado"
                    }
                ],
                "__v": 0,
                "comentarios": [
                    "ye"
                ]
            },
            {
                "_id": "64505bca2abb04e36f428df3",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "status": "sup",
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado",
                        "comentarios": [
                            "ye",
                            "yuuuu",
                            "awii"
                        ]
                    },
                    {
                        "nombre": "yeyy",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Rechazado",
                        "comentarios": "sup"
                    }
                ],
                "__v": 11
            },
            {
                "_id": "645063342abb04e36f428df4",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "En_Revision",
                        "comentarios": [
                            "ye",
                            "yuuuu"
                        ]
                    },
                    {
                        "nombre": "yeyy",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado",
                        "comentarios": [
                            "ya",
                            "yuuuu",
                            "this is wrong"
                        ]
                    }
                ],
                "__v": 6,
                "fecha_agendada": "2023-05-03T04:37:00.000Z",
                "status": "Rechazada"
            },
            {
                "_id": "64546f1db4d14568536877ec",
                "vendedor_id": "6448c555af4b91297c2a3061",
                "tipo_proceso": "pruebaManejo",
                "usuario_final_id": "6448b23e9b381e63ff823f7f",
                "documentos": [
                    {
                        "nombre": "ye",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado",
                        "comentarios": "no way"
                    },
                    {
                        "nombre": "yeyy",
                        "fecha_modificacion": "2020-05-18T14:10:30.000Z",
                        "status": "Aceptado",
                        "comentarios": "wow"
                    }
                ],
                "__v": 16,
                "fecha_agendada": "2023-05-03T04:37:00.000Z",
                "status": "Aceptada",
                "auto": {
                    "marca": "brandon",
                    "modelo": "modelindeed",
                    "ano": "2023",
                    "precio": "122323",
                    "auto_id": "ideeeeeeee"
                }
            }
        ],
        "message": "Se encontraron los procesos"
    }
    ```
    

Caso 2

1. **Nombre del escenario**: Procesos no encontrados
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de manera adecuada al proveer un estatus 404 cuando no se encontraron procesos con los parámetros del request que se mandaron.
    
    ```jsx
    				{
                vendedor_id: "6448b23e9b381e63ff823f7e",
                tipo_proceso: "pruebaManejo",
                method: "GET",
                expectedStatus: 404,
                expectedJson: (json) => {
                    expect(json.message).toBe("No se encontraron procesos");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de vendedor inexistente, y un tipo de procesos existente. Por consiguiente, se verificó previamente que no existen procesos que vinculan ambos campos en la base de datos. De igual manera, se manda un método GET. 
    
3. **Pasos a seguir**: 
    1. Se manda el request
    2. se verifica que el estatus de respuesta sea 404
    3. se verifica que el mensaje recibido sea “No se encontraron procesos”
    
4. **Resultado esperado**: 
    
    Estatus de la respuesta: 404
    
    ```jsx
    {
        "message": "No se encontraron los procesos"
    }
    ```
    
5. **Resultado actual**: 
    
    ```jsx
    {
        "message": "No se encontraron los procesos"
    }
    ```
    

Caso 3

1. **Nombre del escenario**: Método incorrecto
2. **Descripción del escenario**: En este escenario se busca demostrar que el endpoint funciona de de manera adecuada al proveer un estatus 405 cuando el método en el request no es el correcto.
    
    ```jsx
    				{
                vedndedor_id: "6448b23e9b381e63ff823f7f",
                tipo_proceso: "pruebaManejo",
                method: "POST",
                expectedStatus: 405,
                expectedJson: (json) => {
                    expect(json.message).toBe("Metodo no permitido");
                }
            }
    ```
    
    En este caso, en el request se están manda un ID de vendedor existente, y un tipo de procesos existente. De igual manera, se manda un método POST.
    
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