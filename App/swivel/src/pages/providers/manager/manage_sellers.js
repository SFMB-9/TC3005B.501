"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    IconButton,
    Button,
} from '@mui/material';

import { useRouter } from "next/router";

import Searchbar from '@/components/general/searchbar';
import ManagerLayout from '@/components/providers/Manager/layout';
import DataTable from "@/components/general/Table";
import PopUpComponent from '@/components/general/Popup';
import EditSellerData from '@/components/providers/seller/edit_seller_data';

export default function SearchResults() {

    const router = useRouter();

    const [results, setResults] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const [agency, setAgency] = useState('');
    const useRouter = typeof window !== 'undefined' ? require('next/router').useRouter : null;
    //const router = useRouter ? useRouter() : null;

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
            console.error('Error borrando usuario: ', error);
        }
    };

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
                                    <EditSellerData data={params.row}
                                    userType="seller"
                                    />
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
                                        <p> Al hacer click en &apos;Confirmar&apos; estas confirmando de forma definitiva que quieres eliminar tu cuenta. </p>
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
                            <Link href='/providers/seller/signup'>
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
                            </Link>
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
                </div>
            </ManagerLayout >
        </>
    );
};    