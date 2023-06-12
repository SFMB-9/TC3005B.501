"use client"
/*
Ana Paula Katsuda

Code used to pull agencias from the database and display them in a table.
*/

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    IconButton,
    Button,
    Container,
    Typography,
    TextField,
} from '@mui/material';

import Searchbar from '@/components/general/searchbar';
import GALayout from "@/components/providers/GA/ga_layout";
import DataTable from "@/components/general/Table";
import PopUpComponent from '@/components/general/Popup';
import EditEntityData from '@/components/providers/GA/edit_entity_data';
import { formatDate } from "@/components/general/date_utils";
import { useSession } from "next-auth/react";

export default function ManageAgencias() {
    const router = useRouter();

    const { data: session } = useSession();

    const [agencias, setAgencias] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [GA, setGA] = useState("");
    const [procesos, setProcesos] = useState([]);
    const role = "1624fa678ed998894bece420898aa464"; // Quitar cosas hardcodeadas

    const RouteRegistroAgencias = () => {
        if (router) {
            router.push("/providers/GA/agency_management/registerAgency/form");
        }
    };

    const fetchAgencias = async () => {
        try {
            const res = await fetch(
                `/api/GA/pull-agencias?tipo_usuario=${role}&grupo_automotriz_id=${GA}`
            );
            const data = await res.json();
            setAgencias(data.result);
            console.log(data.result);
            console.log("Agencias", agencias)
        } catch (error) {
            console.log(error)
        }

    };

    const fetchProcesos = async () => {
        const res = await fetch(
            `http://localhost:3000/api/GA/pull-procesos?tipo_usuario=${role}&grupo_automotriz_id=${GA}`
        );
        const data = await res.json();
        setProcesos(data.result);
    };

    const fetchGAId = async () => {
        const res = await fetch(`/api/managerProfile/managerP?id=${session.id}`);
        const ga_admin_data = await res.json();
        const GA = ga_admin_data.userData.grupo_automotriz_id;
        console.log(GA)
        setGA(GA);
    };
    useEffect(() => {
        if (!session) return
        fetchGAId();
        if (!GA) return
        fetchAgencias()
        fetchProcesos();
    }, [session, GA]);

    useEffect(() => {
        if (agencias) {
            setFilteredResults(
                agencias.filter((entry) =>
                    entry.nombres.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.direccion.estado.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.numero_telefonico.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
    }, [agencias, searchValue]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const deleteEntry = async (entry) => {
        console.log("This entry", entry);
        try {
            await axios.delete("/api/buyerProfile/deleteUser", { params: { id: entry } });
            fetchAgencias();
        }
        catch (error) {
            console.log("Error borrando usuario: ", error);
        }
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
                field: "estado",
                headerName: "Estado",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
                valueGetter: (params) => {
                    let cell = params.row
                        ? `${params.row.direccion.estado}` : "Estado no encontrado";
                    return cell;
                },
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
                field: "detalles",
                headerName: "",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
                type: "actions",
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() =>
                            router.push(`/providers/GA/agency_management/${params.row._id}`)
                        }
                        className="py-0"
                        sx={{
                            fontFamily: "Lato",
                            fontSize: "12px",
                            backgroundColor: "#111439",
                        }}
                    >
                        Ver detalles
                    </Button>
                ),
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
                                    <>
                                        <EditEntityData data={params.row}
                                            userType="agency" />
                                    </>
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
                        </div>
                    </>
                ),
            },
        ],
        [agencias]
    );

    const processColumns = useMemo(
        () => [
            {
                field: "nombres_agencia",
                headerName: "Nombre",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
                valueGetter: (params) => {
                    let cell = params.row
                        ? `${params.row.info_agencia.nombres}` : "Nombre no encontrado";
                    return cell;
                }
            },
            {
                field: "fecha_creacion",
                headerName: "Fecha de creación",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
                valueGetter: (params) => {
                    const cell = params.row.fecha_creacion !== "" && params.row.fecha_creacion ? formatDate(params.row.fecha_creacion).formattedShortDate : "";
                    return cell;
                },
            },
            {
                field: "estatus_validacion",
                headerName: "Estatus de validación",
                headerAlign: "center",
                align: "center",
                minWidth: 150,
                flex: 1,
                valueGetter: (params) => {
                    const cell = params.row.estatus_validacion;
                    if (cell === "pendiente") {
                        return "Pendiente";
                    }
                    return cell;
                },
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
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() =>
                            router.push(`/providers/GA/agency_management/registerAgency/${params.row._id}`)
                        }
                        className="py-0"
                        sx={{
                            fontFamily: "Lato",
                            fontSize: "12px",
                            backgroundColor: "#111439",
                        }}
                    >
                        Ver detalles
                    </Button>
                ),
            }

        ]
    )

    console.log(agencias)
    return (
        <>
            <GALayout>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            padding: "4rem",
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "Raleway",
                                textAlign: "start",
                            }}
                        >Administración de agencias</h1>
                        {agencias ?
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flex: '100%',
                                        alignItems: 'center',
                                        padding: '1rem',
                                    }}
                                >
                                    <Searchbar
                                        firstValue={searchValue}
                                        // setState={setSearchValue}
                                        setState={handleSearchChange}
                                        searchStyle='administrative'
                                    />
                                    {/* <a href='/providers/seller/signup'> */}
                                    <button
                                        onClick={RouteRegistroAgencias}
                                        style={{
                                            flex: '25%',
                                            backgroundColor: '#F55C7A',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            height: '50%',
                                            padding: '0.5rem 1rem',
                                        }}
                                    > Registrar agencia  + </button>
                                    {/* </a> */}
                                </div>
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
                            :
                            <div>
                                <p>No hay agencias registradas</p>
                                <button
                                    onClick={RouteRegistroAgencias}
                                    style={{
                                        flex: '25%',
                                        backgroundColor: '#F55C7A',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        height: '50%',
                                        padding: '0.5rem 1rem',
                                    }}
                                > Registrar agencia  + </button>
                            </div>
                        }
                        <div
                            style={{
                                marginTop: "2rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <h4
                                style={{
                                    fontFamily: "Raleway",
                                    textAlign: "start",
                                }}
                            >
                                Procesos activos de registro de agencia
                            </h4>
                        </div>
                        {procesos ? 
                        <div>
                        <DataTable
                            columns={processColumns}
                            rows={procesos}
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
                        </div> : <p>No hay procesos registrados</p>}
                    </div>
                </div>
            </GALayout>
        </>
    );
}