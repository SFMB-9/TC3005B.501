"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useRouter } from "next/router";

import Searchbar from '@/components/general/searchbar';
import ManagerLayout from '@/components/providers/Manager/layout';
import { Margin } from '@mui/icons-material';

export default function SearchResults() {

    //const router = useRouter();

    const [results, setResults] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const [editingEntry, setEditingEntry] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedCellphone, setEditedCellphone] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [agency, setAgency] = useState('');
    const useRouter = typeof window !== 'undefined' ? require('next/router').useRouter : null;
    const router = useRouter ? useRouter() : null;
    
    const RoutRegistroVendedor = () => {
        if (router) {
            router.push({
              pathname: '/providers/seller/signup',
            });
          }
      };
  
    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/gerente/pull-all-vendedores', { params: { agency: agency }});
            setResults(response.data);
        } 
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    // Fetch results when the component mounts
    useEffect(() => {
        fetchResults();
    }, [agency]);

    useEffect(() => {
        setFilteredResults(
          results.filter((entry) =>
            entry.nombres.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }, [results, searchValue]);

    // Function to delete an entry
    const deleteEntry = async (entry) => {
        try {
            await axios.delete('/api/gerente/eliminar-vendedor', { params: { email: entry, agency: agency }});
            // Refresh the results after deletion
            fetchResults();
        } 
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    // Function to open the editing section
    const editEntry = (entry) => {
        setEditingEntry(entry);
        setEditedName(entry.nombres);
        setEditedLastName(entry.apellidos);
        setEditedEmail(entry.email);
        setOldEmail(entry.email);
        setEditedCellphone(entry.numero_telefonico);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };
      
    const handleLastNameChange = (event) => {
        setEditedLastName(event.target.value);
    };
      
    const handleEmailChange = (event) => {
        setEditedEmail(event.target.value);
    };
      
    const handleCellphoneChange = (event) => {
        setEditedCellphone(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            await axios.put('/api/gerente/actualizar-vendedor', { 
                name: editedName, 
                last_name: editedLastName,
                newEmail: editedEmail,
                oldEmail: oldEmail,
                cellphone: editedCellphone,
                agency: agency
            });
            // Refresh the results after updating
            fetchResults();
            // Close the overlay after updating
            closeOverlay(); 
        } 
        catch (error) {
            console.error('Error updating entry:', error);
        }
      };

    // Function to close the overlay
    const closeOverlay = () => {
        setEditingEntry(null);
        setEditedName('');
        setEditedLastName('');
        setEditedEmail('');
        setOldEmail('');
        setEditedCellphone('');
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <>
        <ManagerLayout>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '2rem 5rem', 
            }}
        >
            <div>
                <h1>Administración de Vendedores</h1>
                <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Buscar..."
                    />
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: '100%',
                        alignItems: 'center',
                    }}
                >
                    <Searchbar 
                        setState={handleSearchChange}
                        searchStyle='administrative'
                    />
                    <a href='/providers/seller/signup'>
                        <button 
                            onClick={RoutRegistroVendedor}
                            style={{
                                flex: '25%',
                                backgroundColor: '#F55C7A',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                height: '50%',
                                padding: '0.5rem 1rem',
                            }}
                        > Registrar vendedor  + </button>
                    </a>
                </div>
            </div>

            <div>
            <label htmlFor="agency_field">Agencia</label>
            <input
                type="text"
                id="agency_field"
                className="form-control"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                required
            />
            </div>

            <ul>
                {filteredResults.map((entry) => (
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

                    <button onClick={() => deleteEntry(entry.email)}>Delete</button>
                    <button onClick={() => editEntry(entry)}>Edit</button>
                </li>
                ))}
            </ul>

            {editingEntry && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit Entry</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nombre:
                                <input type="text" value={editedName} onChange={handleNameChange} />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" value={editedLastName} onChange={handleLastNameChange} />
                            </label>
                            <label>
                                Email:
                                <input type="text" value={editedEmail} onChange={handleEmailChange} />
                            </label>
                            <label>
                                Teléfono:
                                <input type="text" value={editedCellphone} onChange={handleCellphoneChange} />
                            </label>
                            <button type="submit">Guardar</button>
                            <button onClick={closeOverlay}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
      </ManagerLayout >
      </>
    );
};    