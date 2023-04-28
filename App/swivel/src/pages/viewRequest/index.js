import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RequestDetails = () => {

  const router = useRouter();
  const [request, setRequests] = useState([]);
  
  const { id } = router.query;

  const fetchRequests = async () => {
    // This function fetches the request details using the _id in the URL
    const res = await axios.get('/api/DrivingRequestsSeller/getDrivingRequest'
    , {params : {_id: id}});
    const r = res.data.proceso;
    setRequests(r);
  }
  
  
  useEffect(() => {
    fetchRequests();
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  console.log("this is the request" + request);
  return (
    <div>
      <h1>Request Details</h1>
      <p>Request ID: {request._id}</p>
      <p>User ID: {request.usuario_final_id}</p>
      <p>Tipo de Proceso: {request.tipo_proceso}</p>
      <p>Status: {request.status}</p>
    </div>
  );
};





export default RequestDetails;