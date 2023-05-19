/*
Diego Corrales Pinedo
15/5/2023

Page to visualize the details of a driving
test request before confirming it. The 
request will only be saved to the db once 
the user has selected the "confirm" button.
Here the user is able to choose a date and
time for their driving test.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import addDays from 'date-fns/addDays';
import { format } from "date-fns";
import axios from 'axios';

//import Map from '@/pages/Map';

const RequestDetails = () => {

  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [carData, setCarData] = useState({});
  const [firstImage, setFirstImage] = useState("");
  const [userData, setUserData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [processId, setProcessId] = useState('');
  const { auto_id, user_id } = router.query;

  const fetchDetails = async () => {  
    let rawResult = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`, 
    {method: 'GET'});
    const res = await rawResult.json();
    const retrievedAuto = res.auto._source;
    const resUser = await axios.get('/api/prueba-manejo/get-user-info'
    , {params : {_id: user_id}});
    const retrievedUser = resUser.data.user;
    const retrievedDocuments = resUser.data.user.documentos_url;
    const retrievedAddress = resUser.data.user.direccion;
    setCarData(retrievedAuto);
    setFirstImage(retrievedAuto.fotos_3d[0]);
    setUserData(retrievedUser);
    setDocuments(retrievedDocuments);
    setUserAddress(retrievedAddress);
  }

  const viewRequest = (id) => {
    // Navigate to a new page to view the details of the request
    router.push({
      pathname: '/buyer/test-confirm',
      query: { id },
    })
  };

  const createDrivingTest = async () => {
    // Create driving test request
    const res = await axios.post('/api/prueba-manejo/crear-prueba-elastic',
    {auto_id: auto_id, user_id: user_id});
    const proceso_id = res.data.result.proceso_id;
    // Add the driving test request to the list of processes of the user
    await axios.post('/api/prueba-manejo/agregar-proceso-usuario', 
    { user_id: user_id, proceso_id: proceso_id });
    // Add the selected date and time to the driving test request
    await axios.put('/api/prueba-manejo/actualizar-fecha-hora-prueba', { proceso_id: proceso_id, selected_date: selectedDate, selected_time: selectedTime });
    setProcessId(proceso_id);
  };

  // Execute viewRequest only when processId changes
  useEffect(() => {
    if (processId !== "") {
      viewRequest(processId);
    }
  }, [processId]);

  useEffect(() => {
    fetchDetails();
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    // This is the page that displays the details of a request
    <div>   
        <h1>Detalles usuario</h1>
        <p>Nombre: {userData.nombres}</p>
        <p>Apellidos: {userData.apellidos}</p>
        <p>Correo: {userData.email}</p>
        <p>Celular: {userData.numero_telefonico}</p>
        <p>Estado de residencia: {userAddress.estado}</p>
        <p>CP: {userAddress.codigo_postal}</p>

        <div>
            {/* This is the table that displays the user's documents*/}
            <h1>Documentos</h1>
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
                        <td>{document.nombre_documento}</td>
                        <td>{document.url}</td>
                        <td>{document.estatus}</td>
                        <td>{document.fecha_modificacion}</td>
                        <td>
                        <p>{document.comentarios}</p>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* <h1>Mapa a la agencia</h1>
        <Map coordinates={[40.73, -73.935]}/> */}

        <h1>Detalles auto</h1>
        <p>Marca: {carData.marca} </p>
        <p>Modelo: {carData.modelo} </p>
        <p>Año: {carData.año} </p>
        <p>Precio: {carData.precio} </p>
        <p>Direccion: {carData.direccion_agencia}</p>
        <img src={firstImage}
          alt="Imagen de auto ejemplo" 
          width="500" 
          height="400"/>

        <h1>Elegir horario</h1>
        <DatePicker
          selected={selectedDate} 
          onChange={date => setSelectedDate(date)}
          dateFormat='dd/MM/yyyy'
          minDate={addDays(new Date(), carData.dias_anticipo)}
          maxDate={addDays(new Date(), carData.dias_max)}
          startDate={addDays(new Date(), carData.dias_anticipo)}
        />
        <DatePicker
          selected={selectedTime} 
          onChange={time => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat='hh aa'
          timeIntervals={60}
          minTime={setHours(new Date(), carData.horas_min)}
          maxTime={setHours(new Date(), carData.horas_max)}
          dateFormat='hh:mm aa'
        />

        {selectedDate && (
          <p>
            Fecha actualmente agendada:{" "}
            {/* La fecha se guarda en UTC, pero se muestra en tiempo local */}
            {format(selectedDate, "dd/MM/yyyy")} (Tiempo local)
          </p>
        )}

        {selectedTime && (
          <p>
            Hora actualmente agendada:{" "}
            {/* La hora se guarda en UTC, pero se muestra en tiempo local */}
            {format(selectedTime, "hh:mm aa")} (Tiempo local)
          </p>
        )}

        {(selectedDate && selectedTime) ? (
          <div>
            <button onClick={() => 
              createDrivingTest()
            }>Confirmar</button>
          </div>
        ) : (
          <div>
            <p>Selecciona una fecha y horario para confirmar tu cita.</p>
          </div>
        )}
        
    </div>
  );
};

export default RequestDetails;