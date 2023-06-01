"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

export default function SearchResults() {

    const router = useRouter();
    const { id } = router.query

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
  
    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/GA/pull-gerente', { params: { id: id }});
            setName(response.data.manager.nombres);
            setSurname(response.data.manager.apellidos);
            setEmail(response.data.manager.email);
            setPhone(response.data.manager.numero_telefonico);
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
        await axios.put('/api/GA/pull-gerente', { id: id, name: name, surname: surname, email: email, phone: phone })
    };

    const cancelHandler = () => {
        router.push(`/providers/GA/detalles-agencia`);
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
};    