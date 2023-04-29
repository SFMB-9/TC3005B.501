import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RequestDetails = () => {

  const router = useRouter();
  const [request, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const { id } = router.query;

  const fetchRequests = async () => {
    // This function fetches the request details using the _id in the URL
    const res = await axios.get('/api/DrivingRequestsSeller/getDrivingRequest'
    , {params : {_id: id}});
    const r = res.data.proceso;
    const d = res.data.proceso.documentos;
    setRequests(r);
    setDocuments(d);
    
  }
  
  // This function updates the status of a document
  const updateDocumentStatus = async (_id,doc_id, status) => {
    await axios.put('/api/DrivingRequestsSeller/updateDocumentStatus', { _id,doc_id, status });
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
      <p>Status: {request.status}</p>
      <p>Última modificación: {request.fecha_modificacion}</p>
      <p>fecha de creación: {request.fecha_inicio}</p>
      <div>
        {/* This is the table that displays the documents of a request*/}
        <h1>Request Documents</h1>
        <table>
          <thead>
            <tr>
              <th>Document ID</th>
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
                <td>
                  {/* This is the dropdown menu that allows the user to update the status of a document*/}
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
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    </div>
  );
};





export default RequestDetails;