# Dashboard Compras Vendedor

## Introducción

Este módulo es parte de el proceso de ventas dentro del recorrido de vendedores y se encarga de la visualización todos los procesos de compra que le han sido asignados a un vendedor. El propósito de este documento es describir el diseño del módulo Dashboard Compras Vendedor incluyendo su funcionalidad, interfaces e implementación. Este documento es para developers y otros stakeholders que necesitan entender el propósito de este módulo en el sistema.

## **Componentes y Módulos**

- Base de datos
    
    Como la mayoría de módulos en el proyecto, el Dashboard se conecta a una instancia de MongoDB en un cluster. Para acceder a esta instancia lo unico que se hace es proveer un URL de conexión en un archivo .env que contiene las credenciales de acceso necesarias. Para propósitos de este componente, se hace uso de dos colecciones principales: la colección usuario y la colección procesos: 
    

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled.png)

Solamente nos interesan los siguientes campos: 

- usuario_id: con este campo se obtienen los procesos que corresponden a cada vendedor haciendo una búsqueda en la base de datos que encuentra los procesos de compra que están asignados al vendedor. De igual manera, al momento de obtener la información de usuario para desplegarla en cada proceso, se hace una búsqueda en la base de datos por medio esta variable.
- nombres: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.
- apellidos: este campo se utiliza al momento de desplegar la información de cada usuario en cada proceso.

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%201.png)

Solamente nos interesan los siguientes campos:

- proceso_id: únicamente se utiliza para pasarlo a la página de review procesos.
- estatus: este campo se utiliza para desplegar el estatus de cada proceso y también para actualizarlo.
- documentos: este campo es un array con objetos JSON que guarda todos los documentos de ese proceso que hayan sido subidos por el usuario.
- vendedor_id: este campo se utiliza para hacer la búsqueda en la base de datos haciendo un cruce entre el usuario_id del vendedor y cada proceso asignado a ese usuario.
- auto: se utiliza para desplegar los detalles del auto asociados con el proceso.
- Procesamiento de solicitudes
    
    Para el servidor se esta utilizando Node.js utilizando un protocolo de comunicación HTTPS por el cual se mandan requests de tipo REST a endpoints que establecen una conexión con un cluster en MongoDB.  En el caso del Dashboard, únicamente se utilizan requests de tipo: GET y PUT, siguiendo la siguiente estructura:
    
    …/DrivingRequestsSeller/…
    
    Dependiendo de que endpoint se va a utilizar pueden seguir las siguientes rutas:
    
    /drivingRequest
    
    /managerP
    
    /updateRequestStatus
    

## **Interfaz de Usuario**

- Descripción de la interfaz de usuario

El propósito de este panel es darle a cada vendedor una manera de tener una vista general de todos los procesos de compra que le hayan sido asignados y poder cambiar el estatus de cada uno de acuerdo con el progreso que se tenga. 

La interfaz consiste de dos componentes principales: una tabla con con todos los procesos de compra y un componente de filtrado para segmentar los procesos de acuerdo con el estatus deseado:

- Flujo de navegación en la interfaz de usuario

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%202.png)

El usuario primero selecciona los procesos que quiere visualizar y por default se tienen todos. A partir de esto, el usuario puede observar los procesos y cambiar el estatus de cualquiera de ellos por medio del select. Finalmente, si el usuario desea, puede seleccionar el botón de Ver en detalle para ver los detalles específicos de ese proceso.

- Desarrollo del componente

Para el filtrado se utiliza un componente select que filtra todos los procesos de acuerdo al estatus:

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%203.png)

```jsx
					<select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            >
            <option value="all">All</option>
            <option value="En_Revision">En Revision</option>
            <option value="Aceptada">Aceptada</option>
            <option value="Rechazada">Rechazada</option>
		      </select>
```

En detalle, se utiliza una variable state que guarda el estatus de seleccionado y al momento de seleccionar otro por medio del componente, se actualiza la variable state y se actualizan los procesos visualizados:

```jsx
const [statusFilter, setStatusFilter] = useState('all');
```

Al actualizar la variable:

```jsx
{requests.filter((request) => {
    if (statusFilter === 'all') {
        return true;
    } else {
        return request.status === statusFilter;
    }
}).map((request) => (

```

los procesos mapeados cambian por medio del .filter

Para la tabla: 

```jsx
							<table>
				        <thead>
                <tr>
                    <th>Auto</th>
                    <th>Cliente</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {requests
                .filter((request) => {
                    if (statusFilter === 'all') {
                    return true;
                    } else {
                    return request.status === statusFilter;
                    }
                })
                .map((request) => (
                    <tr key={request._id}>
                    <td>{request.auto?
                        `${request.auto.marca} ${request.auto.modelo}`
                        :"Este proceso no contiene auto"}</td>
                    <td>{/* If the user object is not null, display the user's name*/}
                        {user[request.usuario_final_id]
                        ? `${user[request.usuario_final_id].nombres} ${user[request.usuario_final_id].apellidos}`
                        : "Usuario no encontrado"}
                    </td>
                    <td>
                        {/* updateRequestStatus is called when the select value changes */}
                        <select
                        value={request.status}
                        onChange={(e) => updateRequestStatus(request._id, e.target.value)}
                        >
                        <option value="En_Revision">En_Revision</option>
                        <option value="Aceptada">Aceptada</option>
                        <option value="Rechazada">Rechazada</option>
                        </select>
                        {/* viewRequest is called when the button is clicked */}
                        <button onClick={() => viewRequest(request._id, request.usuario_final_id)}>View Details</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
```

Se definen tres columnas: Auto, Cliente y Status:

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%204.png)

```jsx
								<tr>
                    <th>Auto</th>
                    <th>Cliente</th>
                    <th>Status</th>
                </tr>
```

Los procesos se mapean de acuerdo con el id único de cada proceso

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%205.png)

```jsx
							<tr key={request._id}>
```

A partir de esto, se despliegan los detalles del auto asociado con el proceso. En caso de que el proceso no contenga datos de auto, se despliega: “Este proceso no contiene auto”.

```jsx
										<td>{request.auto?
                        `${request.auto.marca} ${request.auto.modelo}`
                        :"Este proceso no contiene auto"}</td>
                    <td>{/* If the user object is not null, display the user's name*/}
                        {user[request.usuario_final_id]
                        ? `${user[request.usuario_final_id].nombres} ${user[request.usuario_final_id].apellidos}`
                        : "Usuario no encontrado"}
                    </td>
```

En seguida se despliegan los datos específicos del usuario que realizó el proceso:

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%206.png)

```jsx
										<td>{/* If the user object is not null, display the user's name*/}
                        {user[request.usuario_final_id]
                        ? `${user[request.usuario_final_id].nombres} ${user[request.usuario_final_id].apellidos}`
                        : "Usuario no encontrado"}
                    </td>
```

Como último dato se añade un elemento select para poder cambiar el status de cada proceso 

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%207.png)

```jsx
												<select
                        value={request.status}
                        onChange={(e) => updateRequestStatus(request._id, e.target.value)}
                        >
                        <option value="En_Revision">En_Revision</option>
                        <option value="Aceptada">Aceptada</option>
                        <option value="Rechazada">Rechazada</option>
                        </select>
```

Adicionalmente, en cada elemento, se añade un botón para llevar a la página de detalles del proceso en específico

![Untitled](Dashboard%20Compras%20Vendedor%202e08b1d5cfc2455b98882ef5d97d47ae/Untitled%208.png)

```jsx
<button onClick={() => viewRequest(request._id, request.usuario_final_id)}>View Details</button>
```

## **Almacenamiento de Datos y Endpoints**

- Descripción de los endpoints del sistema

Como se describió arriba, los endpoints que se utilizaron fueron:

/drivingRequest [drivingRequest](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/drivingRequest%2096a39d695bce4785949e666a31151782.md) 

/updateRequestStatus [updateRequestStatus](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/DrivingRequests%204ee99f17120945c9b62bd3885dfc8e48/updateRequestStatus%20fbf4c3bd0b724b93a826e1945301110e.md) 

/managerP [managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf.md) 

- Formato y tipo de datos almacenados

Para este módulo el único dato que se modifica es el de la colección de procesos y se llama estatus el cual es una variable STRING

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

Pruebas managerP

[Pruebas managerP](APIs%2001b022e1b6b2453faf9e457af4dd7c7c/managerP%2058345df2ce5740b59c7ba536290f04bf/Pruebas%20managerP%20cb82174e051843b6b688a511e7473574.md) 

