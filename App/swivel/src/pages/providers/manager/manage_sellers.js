"use client"

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    IconButton,
    Button,
    Container,
    Typography,
    TextField,
} from '@mui/material';

//import { useRouter } from "next/router";

import Searchbar from '@/components/general/searchbar';
import ManagerLayout from '@/components/providers/Manager/layout';
import { Margin } from '@mui/icons-material';
import DataTable from "@/components/general/Table";
import Popup from "@/components/general/Popup";
import PopUpComponent from '@/components/general/Popup';
import EditSellerData from '@/components/providers/seller/edit_seller_data';

export default function SearchResults() {

    //const router = useRouter();

    const [results, setResults] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    // const [editingEntry, setEditingEntry] = useState(null);
    // const [editedName, setEditedName] = useState('');
    // const [editedLastName, setEditedLastName] = useState('');
    // const [editedEmail, setEditedEmail] = useState('');
    // const [editedCellphone, setEditedCellphone] = useState('');
    // const [oldEmail, setOldEmail] = useState('');
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
            const response = await axios.get('/api/gerente/pull-all-vendedores', { params: { agency: agency } });
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
                entry.nombres.toLowerCase().includes(searchValue.toLowerCase()) ||
                entry.apellidos.toLowerCase().includes(searchValue.toLowerCase()) ||
                entry.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                entry.numero_telefonico.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    }, [results, searchValue]);

    // Function to delete an entry
    const deleteEntry = async (entry) => {
        try {
            await axios.delete('/api/gerente/eliminar-vendedor', { params: { email: entry, agency: agency } });
            // Refresh the results after deletion
            fetchResults();
        }
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    // Function to open the editing section
    // const editEntry = (entry) => {
    //     setEditingEntry(entry);
    //     setEditedName(entry.nombres);
    //     setEditedLastName(entry.apellidos);
    //     setEditedEmail(entry.email);
    //     setOldEmail(entry.email);
    //     setEditedCellphone(entry.numero_telefonico);
    // };

    // const handleNameChange = (event) => {
    //     setEditedName(event.target.value);
    // };

    // const handleLastNameChange = (event) => {
    //     setEditedLastName(event.target.value);
    // };

    // const handleEmailChange = (event) => {
    //     setEditedEmail(event.target.value);
    // };

    // const handleCellphoneChange = (event) => {
    //     setEditedCellphone(event.target.value);
    // };

    // Function to handle form submission
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         await axios.put('/api/gerente/actualizar-vendedor', {
    //             name: editedName,
    //             last_name: editedLastName,
    //             newEmail: editedEmail,
    //             oldEmail: oldEmail,
    //             cellphone: editedCellphone,
    //             agency: agency
    //         });
    //         // Refresh the results after updating
    //         fetchResults();
    //         // Close the overlay after updating
    //         closeOverlay();
    //     }
    //     catch (error) {
    //         console.error('Error updating entry:', error);
    //     }
    // };

    // // Function to close the overlay
    // const closeOverlay = () => {
    //     setEditingEntry(null);
    //     setEditedName('');
    //     setEditedLastName('');
    //     setEditedEmail('');
    //     setOldEmail('');
    //     setEditedCellphone('');
    // };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const columns = useMemo(
        () => [
            {
                field: "nombres",
                headerName: "Nombre",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
            },
            {
                field: "apellidos",
                headerName: "Apellido",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
            },
            {
                field: "email",
                headerName: "Correo",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
            },
            {
                field: "numero_telefonico",
                headerName: "Teléfono",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
            },
            {
                field: "botones",
                headerName: "",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
                type: "actions",
                renderCell: (params) => (
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <PopUpComponent
                                title="Editar datos"
                                popUpContent={
                                    <EditSellerData data={params.row} agency={agency}/>
                                }
                                btnOpen={
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        component="span"
                                        // onClick={() => editEntry(params.row)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                }
                            />
                            <PopUpComponent
                                title="Eliminar cuenta"
                                popUpContent={
                                    <div className="text-center mt-3"> <p> ¿Estas segurx que quieres eliminar tu cuenta? </p>
                                        <p> Al hacer click en "Confirmar" estas confirmando de forma definitiva que quieres eliminar tu cuenta. </p>
                                        <Button
                                            variant="contained"
                                            onClick={() => deleteEntry(params.row.email)}
                                            type="submit"
                                            className="w-80"
                                            sx={{
                                                fontFamily: "Lato",
                                                ":hover": {
                                                    backgroundColor: "red",
                                                },
                                            }}
                                        >
                                            Eliminar Cuenta
                                        </Button>
                                    </div>
                                }
                                btnOpen={
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        component="span"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                        </div>
                    </>
                ),
            },
        ],
        [filteredResults]
    );

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
                        {/* <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            placeholder="Buscar..."
                        /> */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Searchbar
                                firstValue={searchValue}
                                // setState={setSearchValue}
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
                    <div>
                        <DataTable
                            columns={columns}
                            rows={filteredResults}
                            rowSelection={false}
                            sx={{
                                border: 1,
                                borderColor: "#D9D9D9",
                                "& .MuiDataGrid-cell": {
                                    border: 1,
                                    borderRight: 0,
                                    borderTop: 0,
                                    borderLeft: 0,
                                    borderColor: "#D9D9D9",
                                    fontFamily: "Lato",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#333333",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    fontFamily: "Lato",
                                    fontSize: "16px",
                                    color: "#333333",
                                    borderBottom: 0,
                                },
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    fontWeight: 800,
                                },
                                "& .MuiPaginationItem-text": {
                                    fontFamily: "Lato",
                                    color: "#333333",
                                },
                            }}
                        />
                    </div>
                    {/* <ul>
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
                                {/* <button onClick={() => editEntry(entry)}>Edit</button> */}
                            {/* </li>
                        ))}
                    </ul> */}

                    {/* {editingEntry && (
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
                    )} */}
                </div>
            </ManagerLayout >
        </>
    );
};    