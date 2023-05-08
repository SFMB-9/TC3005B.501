/*
Diego Corrales Pinedo
5/7/2023

Car detail page, in which a user can
request a driving test for the car
they are seeing.
*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CarDetail = () => {

  const autoId = "645875ec3b0cf3da15559bd7";
  const userId = "64586ff82cd17fbeb63aa3d0";

  const router = useRouter();
  
  const viewRequest = (id) => {
    // Navigate to a new page to view the details of the request
    router.push({
      pathname: '/buyer/view-test-request',
      query: { id },
    })
  };

  const [processId, setProcessId] = useState('');

  const createDrivingTest = async () => {
    const res = await axios.post('/api/prueba-manejo/crear-prueba',
    {auto_id: autoId, user_id: userId});
    const proceso_id = res.data.result.proceso_id;
    await axios.post('/api/prueba-manejo/agregar-proceso-usuario', { userId, proceso_id });
    setProcessId(proceso_id);
  };

  // Execute viewRequest only when processId changes
  useEffect(() => {
    if (processId !== "") {
      viewRequest(processId);
    }
  }, [processId]);

  return (
    <div>
      <h1>Car detail</h1>
      <button onClick={() => 
        createDrivingTest()
      }>Request Driving Test</button>
    </div>
  );
};

export default CarDetail;