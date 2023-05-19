/*
Diego Corrales Pinedo
5/7/2023

Car detail page, in which a user can
start the process of requesting a driving 
test for the car they are seeing.
*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CarDetail = () => {

  const autoId = "HWbdNYgBBj91CA9yeGJm";
  const userId = "64586ff82cd17fbeb63aa3d0";

  const router = useRouter();
  
  const viewRequest = (auto_id, user_id) => {
    // Navigate to a new page to view the details of the request
    router.push({
      pathname: '/buyer/test-detail',
      query: { auto_id, user_id },
    })
  };

  return (
    <div>
      <h1>Car detail</h1>
      <button onClick={() => 
        viewRequest(autoId, userId)
      }>Request Driving Test</button>
    </div>
  );
};

export default CarDetail;