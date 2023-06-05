# Página: Detalles de Proceso

## Introducción

Este módulo es parte de el proceso de ventas dentro del recorrido de vendedores y se encarga de la visualización los detalles de un proceso de compra específico que se le sido asignados a un vendedor. El propósito de este documento es describir el diseño del módulo: Detalles de proceso, incluyendo su funcionalidad, interfaces e implementación. Este documento es para developers y otros stakeholders que necesitan entender el propósito de este módulo en el sistema.

## **Componentes y Módulos**

- Base de datos
    
    Como la mayoría de módulos en el proyecto, el Dashboard se conecta a una instancia de MongoDB en un cluster. Para acceder a esta instancia lo unico que se hace es proveer un URL de conexión en un archivo .env que contiene las credenciales de acceso necesarias. Para propósitos de este componente, se hace uso de dos colecciones principales: la colección usuario y la colección procesos: 
    

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled.png)

Solamente nos interesan los siguientes campos: 

- usuario_id: con este campo se obtienen los procesos que corresponden a cada vendedor haciendo una búsqueda en la base de datos que encuentra los procesos de compra que están asignados al vendedor. De igual manera, al momento de obtener la información de usuario para desplegarla en cada proceso, se hace una búsqueda en la base de datos por medio esta variable.
- nombres: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.
- apellidos: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.
- email: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.
- numero_telefonico: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%201.png)

Solamente nos interesan los siguientes campos:

- proceso_id: únicamente se utiliza para pasarlo a la página de review procesos.
- estatus: este campo se utiliza para desplegar el estatus de cada proceso y también para actualizarlo.
- documentos: este campo es un array con objetos JSON que guarda todos los documentos de ese proceso que hayan sido subidos por el usuario.
- vendedor_id: este campo se utiliza para hacer la búsqueda en la base de datos haciendo un cruce entre el usuario_id del vendedor y cada proceso asignado a ese usuario.
- auto: se utiliza para desplegar los detalles del auto asociados con el proceso.
- documentos: se utiliza para desplegar los documentos asociados al proceso, su estatus y comentarios.
- Procesamiento de solicitudes
    
    Para el servidor se esta utilizando Node.js utilizando un protocolo de comunicación HTTPS por el cual se mandan requests de tipo REST a endpoints que establecen una conexión con un cluster en MongoDB.  En el caso del Dashboard, únicamente se utilizan requests de tipo: GET y PUT, siguiendo la siguiente estructura:
    
    …/DrivingRequestsSeller/…
    
    Dependiendo de que endpoint se va a utilizar pueden seguir las siguientes rutas:
    
    /getDrivingRequest
    
    /managerP
    
    /updateDocumentStatus
    
    /updateDocumentComment
    

## **Interfaz de Usuario**

- Descripción de la interfaz de usuario

El propósito de este panel es darle a cada vendedor una manera de tener una vista detallada del proceso en específico que quiera y se le haya sido asignado. Igualmente sirve para poder cambiar el estatus de cada uno de los documentos relacionados con ese proceso y cambiar sus comentarios.

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled.png)

La interfaz consiste de tres componentes principales: una sección con los detalles del auto, una sección con los detalles del cliente y una tabla con los documentos asociados al proceso.

- Flujo de navegación en la interfaz de usuario

El usuario, al inspeccionar la tabla de documentos, puede seleccionar el estatus de cada documento. Después, al observar los detalles del documento, puede añadir o cambiar el comentario actual.

- Desarrollo del componente

Para Desplegar los detalles del auto: 

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled%201.png)

```jsx
<h2>Auto:</h2>
      {request.auto?
      <div>
        <p>Marca: {request.auto.marca}</p>
        <p>Modelo: {request.auto.modelo}</p>
        <p>Precio: {request.auto.precio}</p>
      </div>
      :<p>No hay auto</p>
      }
```

Primero se checa si existe un auto:

```jsx
    {request.auto?
```

En caso de que si, se despliegan los detalles del auto: 

```jsx
	      <p>Marca: {request.auto.marca}</p>
        <p>Modelo: {request.auto.modelo}</p>
        <p>Precio: {request.auto.precio}</p>
```

En caso de que no haya un auto se despliega: “No hay auto”

Para Desplegar los detalles del cliente: 

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled%202.png)

```jsx
	<h2>Cliente:</h2>
      {user?
      <div>
      <p>ID: {user._id}</p>
      <p>Nombre: {user.nombres}</p>
      <p>Email: {user.email}</p>
      <p>Telefono: {user.telefono}</p>
      </div>
      :<p>No hay cliente</p>}
      <div>
```

Primero se checa si existe un cliente:

```jsx
		 {user?
```

En caso de que si, se despliegan los detalles del cliente: 

```jsx
	      <p>Marca: {request.auto.marca}</p>
        <p>Modelo: {request.auto.modelo}</p>
        <p>Precio: {request.auto.precio}</p>
```

En caso de que no haya un auto se despliega: “No hay cliente”

Para desplegar la tabla de documentos:

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled%203.png)

```jsx
<h1>Documentos del proceso</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estatus</th>
              <th>Ultima modificación</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document,i) => (
              <tr key={i}>
                <td>{document.nombre}</td>
                <td>
                  {/* This is the dropdown menu that allows the user to change the status of a document*/}
                  <select
                    value={document.status}
                    onChange={(e) => updateDocumentStatus(request._id,i, e.target.value)}
                  >
                    <option value="En_Revision">En_Revision</option>
                    <option value="Aceptado">Aceptado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </td>
                <td>{document.fecha_modificacion}</td>
                <td>
                  <p>{document.comentarios}</p>
                </td>
                <td>
                  {/* This is the input field that allows the user to add a comment to a document*/}
                  <input
                    type="text"
                    value={document.comment}
                    onChange={(e) => {
                      const newDocs = [...documents];
                      newDocs[i].comment = e.target.value;
                      setDocuments(newDocs);
                    }}
                    placeholder='Añade un comentario'
                    onKeyDown={(e) => e.key === 'Enter' && addNewComment(request._id,i)}
                  />
                </td>
                <td>
                  {/* This is the button that allows the user to add a comment to a document*/}
                  <button onClick={() => addNewComment(request._id,i)}>Añadir comentario</button>
                </td>
              </tr>
            ))}
          </tbody>

          </table>
```

Primero se mapea el array de documentos a cada fila de la tabla por medio de un entero i que representa el índice del documento en el array:

```jsx
{documents.map((document,i) => (
              <tr key={i}>
```

Después de esto, se despliega un elemento select para poder cambiar el estatus del documento:

```jsx
								<td>
                  {/* This is the dropdown menu that allows the user to change the status of a document*/}
                  <select
                    value={document.status}
                    onChange={(e) => updateDocumentStatus(request._id,i, e.target.value)}
                  >
                    <option value="En_Revision">En_Revision</option>
                    <option value="Aceptado">Aceptado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </td>
```

De igual manera, el estatus se actualiza en la base de datos al momento de ser cambiado.

En seguida se despliega el comentario actual del documento:

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled%204.png)

```jsx
								<td>
                  {/* This is the input field that allows the user to add a comment to a document*/}
                  <input
                    type="text"
                    value={document.comment}
                    onChange={(e) => {
                      const newDocs = [...documents];
                      newDocs[i].comment = e.target.value;
                      setDocuments(newDocs);
                    }}
                    placeholder='Añade un comentario'
                    onKeyDown={(e) => e.key === 'Enter' && addNewComment(request._id,i)}
                  />
                </td>
```

Por medio del campo input, al momento de cambiarlo se actualiza una variable de estado que independiente a cada documento. A partir de esto, al momento de dar enter se actualiza el comentario en la base de datos.

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled%205.png)

Opcionalmente, se puede utilizar:

![Untitled](Pagina%20Detalles%20de%20Proceso%2000ebfb0620b6428da7d9d9d8c4a0050a/Untitled%206.png)

Para poder añadir el comentario a la base de datos.

## **Almacenamiento de Datos y Endpoints**

- Descripción de los endpoints del sistema

Como se describió arriba, los endpoints que se utilizaron fueron:

/getDrivingRequest [getDrivingRequest](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/getDrivingRequest%2055079219983440ac89348866a3176bca.md) 

/updateDocumentStatus [updateDocumentStatus](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateDocumentStatus%20f1da9db5f5434e9786075ea70369a428.md) 

/updateDocumentComment [updateDocumentComment](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateDocumentComment%202e7227056be64006a0e49cbd0d7b7625.md) 

/managerP [managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf.md) 

- Formato y tipo de datos almacenados

Para este módulo los únicos datos que se modifican son de la colección de procesos y se llaman estatus y comentarios dentro del array de documentos siendo ambos variables STRING

- Especificaciones de seguridad y privacidad de los datos

tbd

## **Pruebas y Verificación**

- Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

- Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la información correcta
- se manda información equivocada y no se regresa nada
- se manda información con un método equivocado

Pruebas drivingRequest:

[Pruebas drivingRequest](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/drivingRequest%2096a39d695bce4785949e666a31151782/Pruebas%20drivingRequest%20be49ff1c0ffb4bdcbdd972e9464afc56.md) 

Pruebas updateRequestStatus

[Pruebas updateRequestStatus](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateRequestStatus%20fbf4c3bd0b724b93a826e1945301110e/Pruebas%20updateRequestStatus%20e0b9efe91f064554bdf5e4ea7154b728.md) 

Pruebas updateRequestComment

[Pruebas updateDocumentComment](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateDocumentComment%202e7227056be64006a0e49cbd0d7b7625/Pruebas%20updateDocumentComment%20d09022ea32564647a51dcd740ef32662.md) 

Pruebas managerP

[Pruebas managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf/Pruebas%20managerP%20cb82174e051843b6b688a511e7473574.md) 

