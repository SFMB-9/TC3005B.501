/*
Diego Corrales Pinedo, Andrew Dunkerley
7-05-2023

Page to visualize the details of a driving
test.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const RequestDetails = () => {

  const router = useRouter();
  const [request, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [comment, setComment] = useState(''); 
  const [date, setDate] = useState('');
  const [agencyAddress, setAgencyAddress] = useState({});
  const [carData, setCarData] = useState({});
  const { id } = router.query;

  const fetchRequests = async () => {  
    const res = await axios.get('/api/DrivingRequestsSeller/getDrivingRequest'
    , {params : {_id: id}});
    const retrievedRequest = res.data.proceso;
    const docs = res.data.proceso.documentos_url;
    setRequests(retrievedRequest);
    setAgencyAddress(res.data.proceso.direccion_agencia);
    setCarData(res.data.proceso.auto);
    setDocuments(docs);
  }


  const addDate = async (_id) => {
    await axios.put('/api/prueba-manejo/actualizar-fecha-prueba', { _id, date });
    fetchRequests();
  };

  
  useEffect(() => {
    fetchRequests();
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    // This is the page that displays the details of a request
    <div>
        <h1>Request Details</h1>
        <p>Request ID: {request._id}</p>
        <p>User ID: {request.usuario_final_id}</p>
        <p>Tipo de Proceso: {request.tipo_proceso}</p>
        <p>Estatus: {request.estatus_validacion}</p>
        <p>Fecha de creación: {request.fecha_inicio}</p>
        
        <h1>Agency Details</h1>
        <p>Agency ID: {request.agencia_id}</p>
        <p>Agency Address: {agencyAddress.calle}</p>
        <p>{agencyAddress.numero_exterior}</p> 
        <p>{agencyAddress.numero_interior}</p>
        <p>{agencyAddress.ciudad}</p>
        <p>{agencyAddress.estado}</p>
        <p>{agencyAddress.pais}</p>
        <p>{agencyAddress.codigo_postal}</p>
        
        <h1>Car Details</h1>
        <p>Car ID: {carData.auto_id} </p>
        <p>Car Brand: {carData.marca} </p>
        <p>Car Model: {carData.modelo} </p>
        <p>Car Price: {carData.precio} </p>
        <p>Car Year: {carData.ano} </p>
        <p>Car Photo URLs: {carData.array_fotografias} </p>
        
        <h1>Agendar Cita</h1>
        <input type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        >
        </input>
        <button onClick={() => addDate(request._id)}> Agendar </button>
        
        <p>Fecha actualmente agendada: {request.fecha_agendada}</p>
        
        {/*
        <div>
            <h1>Request Documents</h1>
            <table>
            <thead>
                <tr>
                <th>Document Name</th>
                <th>Document Status</th>
                <th>Ultima modificación</th>
                <th>Comentarios</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((document,i) => (
                <tr key={i}>
                    <td>{document.nombre}</td>
                    <td>{document.fecha_modificacion}</td>
                    <td>
                    {document.comentarios && document.comentarios.map((comentario, j) => (
                    <p key={j}>{comentario}</p>
                    ))}
                    <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Añade un comentario'
                    onKeyDown={(e) => e.key === 'Enter' && addNewComment(request._id,i)}
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div> */}
    </div>
  );
};





export default RequestDetails;