import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SellerNavbar from '@/components/providers/seller/seller_navbar';

const RequestDetails = () => {

  const router = useRouter();
  const [request, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [user, setUser] = useState({});
  const { id, user_id } = router.query;

  // This function fetches the request details using the _id in the URL
  const fetchRequests = async () => {
    console.log("id", id);
    console.log("user_id", user_id);
    const res = await axios.get('/api/DrivingRequestsSeller/getDrivingRequest', { params: { _id: id } });
    const r = res.data.proceso;
    const d = r.documentos.map(doc => ({ ...doc, comment: '' }));
    setRequests(r);
    setDocuments(d);
  }

  const fetchUser = async () => {
    // This function fetches the user details using the _id in the URL
    const res = await axios.get("/api/managerProfile/managerP"
      , { params: { id: user_id } });

    const u = res.data.userData;
    setUser(u);
  }

  // This function updates the status of a document
  const updateDocumentStatus = async (_id, doc_id, status) => {
    await axios.put('/api/DrivingRequestsSeller/updateDocumentStatus', { _id, doc_id, status });
    fetchRequests();
  };

  // This function creates a new comment for a document
  const addNewComment = async (_id, doc_id) => {
    const doc = documents[doc_id];
    await axios.put('/api/DrivingRequestsSeller/updateDocumentComment', { _id, doc_id, comment: doc.comment });
    fetchRequests();
  };


  useEffect(() => {
    if (id) {
      fetchRequests();
    }

  }, [id]);

  useEffect(() => {
    if (user_id) {
      fetchUser();
    }
  }, [user_id]);


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    // This is the page that displays the details of a request
    <>
      <SellerNavbar />
      <div>
        <h1>Request Details</h1>
        {/*Car details*/}
        <h2>Auto:</h2>
        {request.auto ?
          <div>
            <p>Marca: {request.auto.marca}</p>
            <p>Modelo: {request.auto.modelo}</p>
            <p>Precio: {request.auto.precio}</p>
          </div>
          : <p>No hay auto</p>
        }
        {/*User details*/}
        <h2>Cliente:</h2>
        {user ?
          <div>
            <p>ID: {user._id}</p>
            <p>Nombre: {user.name}</p>
            <p>email: {user.email}</p>
            <p>Telefono: {user.phone}</p>
          </div>
          : <p>No hay cliente</p>}
        <div>
          {/* This is the table that displays the documents of a request*/}
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
              {documents.map((document, i) => (
                <tr key={i}>
                  <td>{document.nombre}</td>
                  <td>
                    {/* This is the dropdown menu that allows the user to change the status of a document*/}
                    <select
                      value={document.status}
                      onChange={(e) => updateDocumentStatus(request._id, i, e.target.value)}
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
                      onKeyDown={(e) => e.key === 'Enter' && addNewComment(request._id, i)}
                    />
                  </td>
                  <td>
                    {/* This is the button that allows the user to add a comment to a document*/}
                    <button onClick={() => addNewComment(request._id, i)}>Añadir comentario</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};





export default RequestDetails;