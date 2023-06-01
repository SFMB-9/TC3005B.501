import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();
  const id = "6477e14bae27e558e56c3c13";

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Function to fetch search results from the API endpoint
  const fetchResults = async () => {
    try {
      const response = await axios.get("/api/managerProfile/managerP", { params: { id: id }});
      console.log(response.data.userData);
      const userData = response.data.userData;
      setName(userData.nombres || ''); // Provide an empty string as the initial value
      setSurname(userData.surname || ''); // Provide an empty string as the initial value
      setEmail(userData.email || ''); // Provide an empty string as the initial value
      setPhone(userData.numero_telefonico || ''); // Provide an empty string as the initial value
    } 
    catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Fetch results when the component mounts
  useEffect(() => {
    fetchResults();
  }, []);

  const submitHandler = async () => {
    await axios.put('/api/GA/editGA', { id, name, surname, email, phone });
  };

  const cancelHandler = () => {
    router.push(`providers/GA`);
  };

  return (
    <>
      <h1>Detalles del Gerente</h1>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>
        Apellidos:
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <label>
        Teléfono:
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
      </label>

      <button onClick={cancelHandler}>
        Cancelar
      </button>
      <button onClick={submitHandler}>
        Guardar
      </button>
    </>
  );
}
