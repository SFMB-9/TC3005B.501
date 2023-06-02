import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
  const [lst, setLst] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/wishlist/pull-wishlist', { params: { id: id } }); // id should be gotten from the session, it's the user's session
        setLst(response.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {lst.map((item) => (
          <li key={item._id}>{item.nombres}</li>
        ))}
      </ul>
    </div>
  );
}; // please add the additional thingies you need for this

export default Wishlist;
