/*
Diego Corrales Pinedo
15/5/2023

Page to visualize the details of a driving
test after it has been confirmed and 
stored to the db.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format, toDate } from "date-fns";
import axios from 'axios';

const RequestDetails = () => {

  const router = useRouter();
  const [request, setRequests] = useState([]);
  const [agencyAddress, setAgencyAddress] = useState({});
  const [carData, setCarData] = useState({});
  const [firstImage, setFirstImage] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const { id } = router.query;

  const fetchRequests = async () => {  
    const res = await axios.get('/api/DrivingRequestsSeller/getDrivingRequest'
    , {params : {_id: id}});
    const retrievedRequest = res.data.proceso;
    setRequests(retrievedRequest);
    setAgencyAddress(res.data.proceso.direccion_agencia);
    setCarData(res.data.proceso.auto);
    setFirstImage(res.data.proceso.auto.array_fotografias_url[0]);
    setChosenDate(res.data.proceso.fecha_agendada);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    // This is the page that displays the details of a request
    <div>
        <h1>Resumen de la cita</h1>
        <p>Agendada: {chosenDate}</p>
        <p>Fecha: {chosenDate.slice(0, 10)} (UTC)</p>
        <p>Hora: {chosenDate.slice(11, 16)} (UTC)</p>

        <p>Direccion: {agencyAddress.calle},  
            Num. {agencyAddress.numero_exterior},   
            Int. {agencyAddress.numero_interior},  
            {agencyAddress.ciudad},  
            {agencyAddress.estado},  
            {agencyAddress.pais}.  
            CP: {agencyAddress.codigo_postal}
        </p>
        <p>Telefono: {request.numero_telefonico}</p>
        
        <h1>Auto</h1>
        <p>{carData.marca} {carData.modelo} - {carData.ano} </p>
        <img src={firstImage}
          alt="Imagen de auto ejemplo" 
          width="500" 
          height="400"/>

        <h1>Comentarios</h1>
        {request.comentarios ? (
        <div>
          {request.comentarios}
        </div>
        ) : (
          <div>
            <p>No hay comentarios por el momento.</p>
          </div>
        )}
    </div>
  );
};

export default RequestDetails;