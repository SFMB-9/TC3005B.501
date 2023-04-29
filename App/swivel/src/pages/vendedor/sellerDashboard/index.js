import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const SellerDashboard = () => {

  const router = useRouter();
  const viewRequest = (id) => {
    // Navigate to a new page to view the details of the request
    router.push({
      pathname: '/viewRequest',
      query: { id },
    })
  };


  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get('/api/DrivingRequestsSeller/drivingRequest',
    {params : {vendedor_id:"6448c555af4b91297c2a3061", tipo_proceso: "pruebaManejo"}});
    const r = res.data.procesos;
    setRequests(r);
  };

  const updateRequestStatus = async (_id, status) => {
    await axios.put('/api/DrivingRequestsSeller/updateRequestStatus', { _id, status });
    fetchRequests();
  };
  


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>ID Usuario</th>
            <th>Tipo de Proceso</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.usuario_final_id}</td>
              <td>{request.tipo_proceso}</td>
              <td>{request.status}</td>
              <td>
                  <select
                    value={request.status}
                    onChange={(e) => updateRequestStatus(request._id, e.target.value)}
                  >
                    <option value="En_Revision">En_Revision</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="Rechazada">Rechazada</option>
                  </select>
                  <button onClick={() => viewRequest(request._id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerDashboard;
