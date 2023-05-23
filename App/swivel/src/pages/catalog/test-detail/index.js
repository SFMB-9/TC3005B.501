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
import { useSession } from "next-auth/react";
import BuyerNavbar from '@/components/buyer/navbar';
import { TextField, Grid } from '@mui/material';

import styles from '@/styles/test_details.module.css';
import PhaseIndicator from '@/components/general/phase_indicator';

//import Map from '@/pages/Map';

export default function RequestDetails() {

  const { data: session } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [carData, setCarData] = useState({});
  const [firstImage, setFirstImage] = useState('');
  const [userData, setUserData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [processId, setProcessId] = useState('');
  const [managerData, setManagerData] = useState({});
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const { auto_id } = router.query;
  // user_id = session.id;
  const user_id = "646af4e093798d0cf9b3cd3a";

  const fetchDetails = async () => {
    let rawResult = await fetch(`http://localhost:3000/api/prueba-manejo/get-car-info-elastic?auto_id=${auto_id}`,
      { method: 'GET' });
    const res = await rawResult.json();
    const retrievedAuto = res.auto._source;
    const resUser = await axios.get('/api/prueba-manejo/get-user-info'
      , { params: { _id: user_id } });
    const retrievedUser = resUser.data.user;
    const retrievedDocuments = resUser.data.user.documentos_url;
    const retrievedAddress = resUser.data.user.direccion;
    const resManager = await axios.get('/api/prueba-manejo/get-manager-info'
      , { params: { agency_name: retrievedAuto.nombre_agencia } });
    const retrievedManager = resManager.data.user;
    setCarData(retrievedAuto);
    setFirstImage(retrievedAuto.fotos_3d[0]);
    setUserData(retrievedUser);
    setDocuments(retrievedDocuments);
    setUserAddress(retrievedAddress);
    setManagerData(retrievedManager);
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
      { auto_id: auto_id, user_id: user_id });
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

  const phases = ['Datos', 'Elección de horario', 'Confirmación'];

  return (
    <>
      <BuyerNavbar />
      <h1>Solicitud de prueba de manejo</h1>
      <PhaseIndicator
        phases={phases}
        currentPhaseIndex={activeSectionIndex}
      />
      {activeSectionIndex === 0 && (
        <>
          <h1>Detalles usuario</h1>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <span>Nombre: {userData.nombres}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span>Apellidos: {userData.apellidos}</span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <span>Correo: {userData.email}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span>Celular: {userData.numero_telefonico}</span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <span>Estado de residencia: {userAddress.estado}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span>CP: {userAddress.codigo_postal}</span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userData.nombres}
                label='Nombre(s)'
                size='small'
                placeholder='Nombre(s)'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userData.apellidos}
                label='Apellidos'
                size='small'
                placeholder='Apellidos'
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userData.email}
                label='Correo electrónico'
                size='small'
                placeholder='Correo electrónico'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userData.numero_telefonico}
                label='Número telefónico'
                size='small'
                placeholder='Número telefónico'
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userAddress.estado}
                label='Estado de residencia'
                size='small'
                placeholder='Estado de residencia'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={userAddress.codigo_postal}
                label='Código postal'
                size='small'
                placeholder='Código postal'
              />
            </Grid>
          </Grid>
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
              {documents.map((document, i) => (
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
          <button href='/catalog'>Cancelar</button>
          <button onClick={() => setActiveSectionIndex(1)}>Continuar</button>
        </>
      )}
      {activeSectionIndex === 1 && (
        <>
          <div className={styles.schedule}>
            {/* <h1>Mapa a la agencia</h1>
              <Map coordinates={[40.73, -73.935]}/> */}
            <div className={styles.carView}>
              <div>
                <img src={firstImage}
                  alt="Imagen de auto ejemplo"
                  width="500"
                  height="400"
                />
              </div>
              <div>
                <h1>Detalles auto</h1>
                <p>Marca: {carData.marca} </p>
                <p>Modelo: {carData.modelo} </p>
                <p>Año: {carData.año} </p>
                <p>Precio: {carData.precio} </p>
                <p>Direccion: {carData.direccion_agencia}</p>
              </div>
            </div>



            <h1>Elegir horario</h1>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat='dd/MM/yyyy'
              minDate={addDays(new Date(), managerData.dias_anticipo)}
              maxDate={addDays(new Date(), managerData.dias_max)}
              startDate={addDays(new Date(), managerData.dias_anticipo)}
            />
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
          <button onClick={() => setActiveSectionIndex(0)}>Volver</button>
          <button onClick={() => setActiveSectionIndex(2)}>Continuar</button>
        </>
      )}
      {activeSectionIndex === 2 && (
        <>
          <div className={styles.confirmation}>
          </div>
          <button onClick={() => setActiveSectionIndex(1)}>Volver</button>
          <button onClick={() => setActiveSectionIndex(3)}>Confirmar</button>
        </>
      )}
    </>
  );
};