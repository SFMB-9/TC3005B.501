# Creación de Solicitudes para Pruebas de Manejo

## Introducción

Este módulo es responsable por la creación de solicitudes de pruebas de manejo, como parte del flujo de usuario comprador. En este documento se describirá el diseño del módulo Creación de Solicitudes para Pruebas de Manejo, incluyendo su funcionalidad, interfaces e implementación. Este documento tiene la finalidad de ser utilizado por desarrolladores y otros *stakeholders* que necesiten entender el propósito o funcionalidad de este módulo en el sistema.

Cabe notar que muchas de las imágenes utilizadas son de una versión de desarrollo de la aplicación, por lo que no reflejan completamente el estilo que tendrá la aplicación entregada. Además, los datos utilizados son únicamente de prueba.

## **Componentes y Módulos**

- Base de datos
    
    Este módulo se conecta a una instancia de MongoDB hosteada en un clúster mediante un URI, el cuál es obtenido del archivo .env.local. La conexión en sí es manejada por una función común llamada ConnectToDatabase importada del archivo /utils/mongodb.js. Este componente utiliza ambas colecciones en la base de datos de MongoDB:
    

![SSBDUsuarios.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSBDUsuarios.png)

Para el usuario comprador nos interesan los siguientes campos: 

- usuario_id: con este campo se obtienen los datos correspondientes al usuario comprador que crea la solicitud y al usuario agencia dueño del auto solicitado. Esto para mostrarlos en el frontend y guardar algunos de ellos en el proceso creado. Este campo se guarda como el usuario_final_id al momento de crear el proceso, por ejemplo.
- nombres, apellidos, email, numero_telefonico, direccion: Todos estos campos se muestran al usuario comprador durante su proceso de creación de solicitud de prueba de manejo
- documentos: se muestran al usuario los documentos que tenga actualmente cargados como parte de su perfil al momento de crear su solicitud. Para la prueba de manejo solo se utilizan la identificación y la licencia. Además, los archivos de los documentos se pueden cambiar, pero estos solo serán guardados en la colección de procesos. Es decir, cualquier cambio a los documentos durante el proceso de creación de solicitud no se verá reflejado en los documentos del perfil del usuario comprador.
- procesos: la lista de procesos en curso que tiene el usuario comprador. Se le agrega el proceso de solicitud de prueba de manejo una vez sea completado.

Para el usuario agencia nos interesan los siguientes campos:

- nombres: para el usuario agencia, este campo contiene el nombre de la agencia. Se utiliza para buscar el documento correspondiente a la agencia a la que pertence el auto solicitado para la prueba de manejo.
- tipo_usuario: se utiliza para buscar el documento correspondiente a la agencia a la que pertence el auto solicitado para la prueba de manejo. Se busca el nombre de la agencia en nombres y “agencia” (o su equivalente después de encriptarse) en tipo_usuario para encontrarlo.
- numero_telefonico: se muestra al usuario al momento de crear su solicitud de prueba de manejo.
- horas_min, horas_max: en una escala de 0 a 24, las horas mínimas y máximas en las que un usuario comprador puede agendar una cita en cualquier día. Por ejemplo: horas_min = 4 significa que solo pueden agendar su cita hasta las 5 AM. horas_max = 22 significa que solo pueden agendar su cita hasta las 9 PM.
- dias_anticipo, dias_max: la cantidad de días mínima y máxima en las que un usuario comprador puede agendar una cita a partir de la fecha actual. Por ejemplo: dias_anticipo = 6 significa que solo pueden agendar una cita a partir del 6to día después del actual. dias_max = 10 significa que solo pueden agendar una cita hasta el 10mo día después del actual.
- coordenadas_agencia: utilizadas para mostrar el pin en la coordenada correcta dentro del componente de mapa.
- direccion_agencia: Dato duplicado en el documento correspondiente en la colección de Procesos.

![SSBDProcesos.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSBDProcesos.png)

Nos interesan los siguientes campos:

- proceso_id: creado al momento de insertar el proceso en la base de datos. Agregado a la lista de procesos del usuario comprador.
- tipo_proceso: ”pruebaManejo”.
- estatus: “En proceso” al momento de crear la solicitud de prueba de manejo.
- fecha_inicio: la fecha de creación de la solicitud.
- documentos: documentos del usuario comprador, cambiando aquellos que hayan sido editados durante el proceso.
- direccion, usuario_final_id: datos del usuario comprador agregados al proceso para su utilización en otros módulos.
- grupo_automotriz_id, agencia_id, superadmin_id, grupo_automotriz, auto, direccion_agencia, numero_telefonico: datos del auto o su agencia agregados al proceso para su utilización en otros módulos.
- fecha_agendada: la fecha seleccionada por el usuario comprador para realizar la prueba de manejo. Cabe notar que el usuario comprador la selecciona en tiempo local, pero se almacena en UTC.
- hora_agendada:  la hora seleccionada por el usuario comprador para realizar la prueba de manejo. Cabe notar que el usuario comprador la selecciona en tiempo local, pero se almacena en UTC.

Además, este módulo se conecta a una instancia de Elasticsearch en la cual se almacenan los datos de todos los autos en un solo índice. La conexión en sí es manejada por la librería de Elasticsearch para Nodejs.

![SSBDAutos.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSBDAutos.png)

Nos intersan los siguientes campos: 

- marca, modelo, ano, direccion_agencia, precio, comentarios, fotos_3d: datos mostrados al usuario comprador durante su proceso de creación de solicitud de prueba de manejo. Para fotos_3d solo se utiliza la primer imagen.
- agencia_id, nombre_agencia: datos duplicados en el documento correspondiente en la colección de Procesos.
- disponible_prueba: determina si el auto está disponible para una prueba de manejo.

- Procesamiento de solicitudes
    
    Para el servidor se esta utilizando Node.js con un protocolo de comunicación HTTPS por el cual se mandan requests de tipo REST a endpoints que establecen una conexión con un cluster en MongoDB o a Elasticsearch. En el caso de la Creación de Solicitudes para Pruebas de Manejo se utilizan requests de tipo: GET, POST y PUT, siguiendo la siguiente estructura:
    
    …/prueba-manejo/…
    
    Dependiendo de que endpoint se va a utilizar pueden seguir las siguientes rutas:
    
    /get-car-info-elastic
    
    /get-user-manager-info
    
    /crear-prueba-completa
    

## **Interfaz de Usuario**

- Descripción de la interfaz de usuario

El propósito de este conjunto de páginas es darle al usuario comprador un resumen de la información más relevante a su solicitud de prueba de manejo, así como para darle la oportunidad de realizar cambios a sus documentos y seleccionar una fecha y hora para su cita. Todo esto se divide en tres partes de una sola página: Datos, Elección de horario y Confirmación, las cuales son claramente listadas por un componente común en la parte superior de cada una. El otro componente compartido en esta página es el de los botones para “Volver”/“Cancelar” o “Continuar”/”Confirmar”. “Volver”/”Continuar” navegan las diferentes partes de la página, mientras que “Cancelar” regresa al catálogo y “Confirmar” crea la solicitud y redirige a la lista de pruebas de manejo del usuario comprador.

![SSPM1.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSPM1.png)

En esta primer parte hay dos componentes: una tabla de texto mostrando los datos básicos del usuario y otra mostrando sus documentos (solo identificación y licencia). Un botón de “Editar” en cada documento permite al usuario subir otro archivo diferente, tal como se muestra abajo. Una vez subido el archivo, este se puede “Confirmar” para realizar la verificación automática del mismo y guardarlo como parte del proceso en la colección de MongoDB una vez se haya finalizado la solicitud.

![SSPM2.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSPM2.png)

La segunda parte tiene cuatro componentes: la imagen del auto, un recuadro con información básica del auto, un selector para fecha y hora de la cita y un mapa mostrando la ubicación de la agencia.

![SSPM3.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSPM3.png)

![SSPM4.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSPM4.png)

Seleccionar alguno de los componentes de fecha u hora despliega un calendario con las opciones válidas para agendar una cita. Esto se muestra para la fecha abajo.

![SSPM5.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSPM5.png)

La tercer parte solo tiene un componente: un espacio de texto mostrando, por última vez, la información relevante sobre la solicitud que se creará.

![SSPM6.png](Creacio%CC%81n%20de%20Solicitudes%20para%20Pruebas%20de%20Manejo%2080c5e17b06dd44d8937d46f26c0b38e8/SSPM6.png)

- Flujo de navegación en la interfaz de usuario

El usuario selecciona la opción de Prueba de Manejo en el detalle de algún auto, lo que lo lleva a la primer parte de la página de Creación de Solicitudes para Pruebas de Manejo. Una vez esté conforme con los documentos utilizados, selecciona el botón para continuar. En la segunda parte debe de forzosamente seleccionar una fecha y hora para su cita antes de seleccionar el mismo botón para pasar a la tercer parte. En la tercer parte solo puede volver o confirmar su solicitud.

- Desarrollo de componentes y conexiones a backend

Para recuperar los datos necesarios sobre el usuario comprador, el auto y su agencia, se utilizan variables state que se hidratan llamando a la función fetchDetails() con cada carga de la página:

```jsx
const fetchDetails = async () => {
  let rawCar = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`,
    { method: 'GET' });
  const res = await rawCar.json();
  const retrievedAuto = res.auto._source;

  let rawData = await fetch(`http://localhost:3000/api/prueba-manejo/get-user-manager-info?agency_name=${retrievedAuto.nombre_agencia}&_id=${user_id}`,
    { method: 'GET' });
  const resData = await rawData.json();
  const retrievedManager = resData.manager;
  const retrievedUser = resData.user;
  const retrievedDocuments = resData.user.documentos_url;
  const retrievedAddress = resData.user.direccion;

  setCarData(retrievedAuto);
  setFirstImage(retrievedAuto.fotos_3d[0]);
  setManagerData(retrievedManager);
  setUserData(retrievedUser);
  setDocuments(retrievedDocuments);
  setUserAddress(retrievedAddress);  
}

useEffect(() => {  
  if (auto_id) {
    fetchDetails();
  }
}, [auto_id]);
```

Los datos del auto y del usuario comprador simplemente se muestran llamándolos como los valores de un JSON:

```jsx
// ...
<Grid item xs={12} sm={6}>
  <span>Nombre(s):  {userData.nombres}</span>
</Grid>
// ...

// ...
<div className={styles.carInfo}>
  <h1 className={styles.carName}>{carData.marca} {carData.modelo}</h1>
  <span className={styles.year}> {carData.año} </span>
  <p className={styles.address}>{carData.direccion_agencia}</p>
  <h1 className={styles.priceTag}>${carData.precio}</h1>
</div>
// ...
```

Se itera sobre los documentos, filtrándolos para solo mostrar la licencia e identificación, con la función documentInfo():

```jsx
const documentInfo = (document, i) => {
  if (document.nombre_documento === "licencia" || document.nombre_documento === "identificacion") {
    return (
      <tr key={i}>
        <td>{document.nombre_documento}</td>
        {/* <td>{document.url}</td> */}
        <td>{document.fecha_modificacion}</td>
        <td><button onClick={() => addToIsOpen(i)}>Editar</button></td>
        {isOpen.includes(i) && (
          <td>
            <div>
              <input type="file" name="documents" onChange={(e) => setUploadedDocument(e.target.files[0])}/>
              <button type="submit" onClick={() => handleDocumentEdit(uploadedDocument, i)}>Confirmar</button>
            </div>
          </td>
        )}
        <td>{document.estatus}</td>
        <td>{document.comentarios}</td>
      </tr>
    );
  }
  return;
};

<table>
  <thead>
    <tr>
      <th>Documento</th>
      {/* <th>URL</th> */}
      <th>Fecha de entrega</th>
      <th>Subir</th>
      <th>Estatus</th>
      <th>Comentarios</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {documents.map((document, i) => (              
      documentInfo(document, i)
    ))}
  </tbody>
</table>
```

Seleccionar el botón de “Editar” abre la opción para subir un documento diferente. Se puede ver que en cuanto se selecciona un documento diferente, este se define como la variable de estado uploadedDocument. Al presionar el botón para “Confirmar”, se llama la función handleDocumentEdit() para guardar la selección (vista abajo). Finalmente, se esconde la opción para subir un documento.

```jsx
const handleDocumentEdit = (doc, indx) => {
  const documentIndices = [...changedDocumentIndices];
  documentIndices.push(indx);
  setChangedDocumentIndices(documentIndices);

  const currentChangedDocuments = [...changedDocuments];
  currentChangedDocuments.push(doc);
  setChangedDocuments(currentChangedDocuments);

  const isOpenWithoutIndx = isOpen.filter(function (i) {
    return i !== indx;
  });

  setIsOpen(isOpenWithoutIndx);
};
```

Los selectores de fecha y hora son creados con la librería react-datepicker, en donde solo se tiene que definir el formato, límites y acción a tomar onChange: 

```jsx
// Selector de fecha
<DatePicker
  selected={selectedDate}
  onChange={date => setSelectedDate(date)}
  dateFormat='dd/MM/yyyy'
  minDate={addDays(new Date(), managerData.dias_anticipo)}
  maxDate={addDays(new Date(), managerData.dias_max)}
  startDate={addDays(new Date(), managerData.dias_anticipo)}
/>
// Selector de hora
<DatePicker
  selected={selectedTime}
  onChange={time => setSelectedTime(time)}
  showTimeSelect
  showTimeSelectOnly
  timeFormat='hh aa'
  timeIntervals={60}
  minTime={setHours(new Date(), managerData.horas_min)}
  maxTime={setHours(new Date(), managerData.horas_max)}
  dateFormat='hh:mm aa'
/>
```

El mapa se crea con el componente LocationsMap, definido en /general/locations_map:

```jsx
<LocationsMap
  locationsData = {[{brand: 'Toyota', position: { lat: 40.7128, lng: -74.0059 }}]}
/>
```

Una vez se seleccione la opción para “Confirmar”, se llama la función createDrivingTest() para crear la solicitud de prueba de manejo y redirigir al usuario a la lista de sus solicitudes:

```jsx
const createDrivingTest = async () => {
  // Save the changed documents to firebase
  await handleSubmit();

  const filteredDocuments = documents.filter(json => {
    return json.nombre_documento === "licencia" || json.nombre_documento === "identificacion";
  });
  
  // Create driving test request
  const res = await axios.post('/api/prueba-manejo/crear-prueba-completa',
    { auto_id: auto_id, user_id: user_id, documents: filteredDocuments, selected_date: selectedDate, selected_time: selectedTime });

  // Go to list of user's driving tests
  router.push({
    pathname: '/pruebas-manejo',
  })
};
```

La función handleSubmit() guarda los documentos al Bucket con la función FileUpload de /api/uploadBucketDoc/uploadBucketDoc:

```jsx
const handleSubmit = async () => {
  let documentUrl = "";
  const currentDocs = documents;

  // Store the changed documents inside firebase
  for(const [i, doc] of changedDocuments.entries()) {
    // Upload to firebase
    documentUrl = await FileUpload(doc);
    // Assign new URL
    currentDocs[changedDocumentIndices[i]].url = documentUrl;
    // Change modification date, status and comments
    currentDocs[changedDocumentIndices[i]].fecha_modificacion = new Date().toISOString();
    currentDocs[changedDocumentIndices[i]].estatus = "En revision";
    currentDocs[changedDocumentIndices[i]].comentarios = "";

    setDocuments(currentDocs);
  }
};
```

## **Almacenamiento de Datos y Endpoints**

- Descripción de los endpoints del sistema

Como se describió arriba, los endpoints que se utilizaron fueron:

/get-car-info-elastic [get-car-info-elastic](APIs%20e10aff3c50d44cea902a66f24d4a02bf/prueba-manejo%207d1946917687450288577e6c0aeaf7bf/get-car-info-elastic%2008b2a684da0445ecb80138bb3a96c16f.md) 

/get-user-manager-info [get-user-manager-info](APIs%20e10aff3c50d44cea902a66f24d4a02bf/prueba-manejo%207d1946917687450288577e6c0aeaf7bf/get-user-manager-info%20cc8f85d4ba874a3ba97a5f6089dba2ca.md) 

/crear-prueba-completa [crear-prueba-completa](APIs%20e10aff3c50d44cea902a66f24d4a02bf/prueba-manejo%207d1946917687450288577e6c0aeaf7bf/crear-prueba-completa%203e6de5ba69cf4909aada5b74a9f5f2d2.md)