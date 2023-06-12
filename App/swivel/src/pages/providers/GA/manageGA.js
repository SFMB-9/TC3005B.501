//App/swivel/src/pages/providers/GA/manageGA.js

import { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import axios from "axios";
import { encryptRole } from "../../../utils/crypto";
import {
    IconButton,
    Button,
    Container,
    Typography,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from "@/components/general/Table";
import GALayout from "@/components/providers/GA/ga_layout";
import PopUpComponent from '@/components/general/Popup';
import Searchbar from '@/components/general/searchbar';
import EditSellerData from '@/components/providers/seller/edit_seller_data';
import styles from '@/styles/manageGA.module.css'

export default function ManageGA() {
    const router = useRouter();

    const [GA, setGA] = useState();
    const [admin, setAdmin] = useState();
    const [admins, setAdmins] = useState();
    const [admin_id, setA_id] = useState();

    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const { data: session } = useSession();
    
    // const fetchData = async () => {
    //   const resData = await fetch(
    //     `/api/managerProfile/managerP?id=${session.id}`
    //   );
  
    //   const res = await resData.json();
  
    //   setApiData(res.userData);
    // };

    const getAdmin = async (id) => {
        const response = await axios.get("/api/managerProfile/managerP", {
            params: {
                id: id
            }
        });
        setAdmin(response.data.userData);
    };

    const getGA = async (id) => {
        const response = await axios.get("/api/managerProfile/managerP", {
            params: {
                id: id
            }
        });
        setGA(response.data.userData);
    };

    const getAdmins = async () => {
        const response = await axios.get("/api/GA/getAdmins", {
            params: {
                id: GA._id
            }
        });
        setAdmins(response.data.userData);
    }

    const RouteRegistroGAManager = () => {
        if (router) {
            router.push({
                pathname: `/providers/GA/registroAdmin`,
            });
        }
    };

    const deleteEntry = async (entry) => {
        try {
            await axios.delete("/api/buyerProfile/deleteUser", { params: { id: entry} });
            getAdmins();
        }
        catch (error) {
            console.log("Error borrando usuario: ", error);
        }
    };

    useEffect(() => {
        if (!session) return
        setA_id(session.id);
    }, [session]);

    useEffect(() => {
        const fetchData = async () => {
            if (admin_id)
                await getAdmin(admin_id);
        };
        fetchData();
    }, [admin_id]);

    useEffect(() => {
        const fetchData = async () => {
            if (admin)
                await getGA(admin.grupo_automotriz_id);
        };
        fetchData();
    }, [admin]);

    useEffect(() => {
        const fetchData = async () => {
            if (GA)
                await getAdmins();
        };
        fetchData();
    }, [GA]);

    useEffect(() => {
        if (admins) {
            setFilteredResults(
                admins.filter((entry) =>
                    entry.nombres.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.apellidos.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.numero_telefonico.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
    }, [admins, searchValue]);

    const handleSearchChange = (event) => {
        if (event.target) {
            setSearchValue(event.target.value);
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
                                    <>
                                    <EditSellerData data={params.row}
                                    userType="gaManager"/>
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
                            <PopUpComponent
                                title="Eliminar cuenta"
                                popUpContent={
                                    <div className="text-center mt-3"> <p> ¿Estas segurx que quieres eliminar tu cuenta? </p>
                                        <p> Al hacer click en &quot;Eliminar cuenta&quot; estas confirmando de forma definitiva que quieres eliminar tu cuenta. </p>
                                        <Button
                                            variant="contained"
                                            onClick={() => deleteEntry(params.row._id)}
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
        [admins]
    );

    return (
        <>
            <GALayout>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        // alignItems: "center",
                        // justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <div className="m-5">
                        <h1
                            style={{
                                fontFamily: "Raleway",
                                textAlign: "start",
                            }}
                        >Información de Grupo Automotiz</h1>
                        <div className="container">
                            <div className="mt-5 row">
                                <div className="col-6">
                                    <h5> <span id={styles.campos}> Nombre: </span> <span id={styles.contenido}>{GA?.nombres}</span></h5>
                                </div>
                                <div className="col-6">
                                    <h5> <span id={styles.campos}>Teléfono: </span> <span id={styles.contenido}>{admin?.numero_telefonico}</span></h5>
                                </div>
                            </div>
                            <div className="mt-3 row">
                                <div className="col-6">
                                    <h5> <span id={styles.campos}>Email: </span> <span id={styles.contenido}>{GA?.legal.email}</span></h5>
                                </div>
                                <div className="col-6">
                                    <h5> <span id={styles.campos}>Dirección: </span> <span id={styles.contenido}>{GA?.direccion.calle + ' ext. ' + GA?.direccion.numero_exterior + ' int. ' + GA?.direccion.numero_interior + ', ' + GA?.direccion.ciudad + ', ' + GA?.direccion.estado + ', CP: ' + GA?.direccion.codigo_postal}</span></h5>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="p-5" style={{width: "100%"}}
                    >
                        <h2> <b>Gestión de administradores alternos</b> </h2>
                        {

                            admins ?
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
                                                onClick={RouteRegistroGAManager}
                                                style={{
                                                    flex: '25%',
                                                    backgroundColor: '#F55C7A',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    height: '50%',
                                                    padding: '0.5rem 1rem',
                                                }}
                                            > + Registrar admin </button>
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
                                    <p>No hay administradores</p>
                                </div>
                        }
                    </div>
                </div>
            </GALayout>
        </>
    );
};
