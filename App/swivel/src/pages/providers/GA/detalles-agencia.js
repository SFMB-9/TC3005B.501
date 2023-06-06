"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

export default function SearchResults() {

    const router = useRouter();

    const [agency, setAgency] = useState(null);
    const [managers, setManagers] = useState(null);
    const [sellers, setSellers] = useState(null);
    const [marca, setMarca] = useState('')
    const [GA, setGA] = useState(null)

    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    
    const [calle, setCalle] = useState('')
    const [num_ext, setNX] = useState('')
    const [num_int, setNI] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [PC, setPC] = useState('')
  
    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/GA/pull-agencia', { params: { id: router.query.id }});
            setAgency(response.data.agency);
            setManagers(response.data.managers);
            setSellers(response.data.sellers);
            setMarca(response.data.agency.nombres.split(' ')[0]);
            setGA(response.data.GA.nombres);

            setPhone(agency.numero_telefonico);
            setEmail(agency.email);

            setCalle(agency.direccion.calle);
            setNX(agency.direccion.numero_exterior);
            setNI(agency.direccion.numero_interior);
            setCity(agency.direccion.ciudad);
            setState(agency.direccion.estado);
            setCountry(agency.direccion.pais);
            setPC(agency.direccion.codigo_postal);

        } 
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    useEffect(() => {
        fetchResults();
    }, []);

    const deleteEntry = async (entry) => {
        try {
            await axios.delete('/api/GA/eliminar-gerente', { id: entry });
            
            fetchResults();
        } 
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const editEntry = (entry) => {
        router.push(`providers/new_GA/edit-gerente?id=${entry}`);
    };

    const addManager = () => {
        router.push(`providers/manager/signup?GA_id=${agency.grupo_automotriz_id}&agency_id=${router.query.id}`);
    };

    const addSeller = () => {
        router.push(`providers/seller/signup?id=${router.query.id}`);
    };

    const saveAgency = async () => {
        try {
            await axios.put('/api/GA/actualizar-agencia', { id: id, phone: phone, email: email, calle: calle, num_ext: num_ext, num_int: num_int, city: city, state: state, country: country, PC: PC });
            
            fetchResults();
        } 
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    return (
        <>
            <div>
                <h1>Detalles de la agencia</h1>
                <label>
                    Nombre:
                    <input type="text" value={agency.nombres} readOnly/>
                </label>
                <label>
                    Marca:
                    <input type="text" value={marca} readOnly/>
                </label>
                <label>
                    Teléfono:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </label>
                <label>
                    Correo electrónico:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Grupo Automotriz:
                    <input type="text" value={GA} readOnly/>
                </label>
                <div>
                    <h2>Dirección de agencia</h2>
                    
                    <label>
                        Calle:
                        <input type="text" value={calle} onChange={(e) => setCalle(e.target.value)}/>
                    </label>
                    <label>
                        Número exterior:
                        <input type="text" value={num_ext} onChange={(e) => setNX(e.target.value)}/>
                    </label>
                    <label>
                        Número interior:
                        <input type="text" value={num_int} onChange={(e) => setNI(e.target.value)}/>
                    </label>
                    <label>
                        Ciudad:
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                    </label>
                    <label>
                        Estado:
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)}/>
                    </label>
                    <label>
                        País:
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
                    </label>
                    <label>
                        Código postal:
                        <input type="text" value={PC} onChange={(e) => setPC(e.target.value)}/>
                    </label>
                </div>

                <button onClick={() => saveAgency}>Guardar</button>
            </div>

            <div>
                <h1>Gerentes</h1>
                <button onClick={() => addManager}>Agregar Gerente</button>
                <ul>
                    {managers.map((entry) => (
                    <li key={entry._id}>
                        <div>
                            <strong>Name:</strong> {entry.nombres}
                        </div>

                        <div>
                            <strong>Last Name:</strong> {entry.apellidos}
                        </div>

                        <div>
                            <strong>Email:</strong> {entry.email}
                        </div>

                        <div>
                            <strong>Cellphone:</strong> {entry.numero_telefonico}
                        </div>

                        <button onClick={() => deleteEntry(entry._id.toString())}>Delete</button>
                        <button onClick={() => editEntry(entry._id)}>Edit</button>
                    </li>
                    ))}
                </ul>
            </div>

            <div>
                <h1>Vendedores</h1>
                <button onClick={() => addSeller}>Agregar Vendedor</button>
                <ul>
                    {sellers.map((entry) => (
                    <li key={entry._id}>
                        <div>
                            <strong>Name:</strong> {entry.nombres}
                        </div>

                        <div>
                            <strong>Last Name:</strong> {entry.apellidos}
                        </div>

                        <div>
                            <strong>Email:</strong> {entry.email}
                        </div>

                        <div>
                            <strong>Cellphone:</strong> {entry.numero_telefonico}
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

        </>
    );
};    