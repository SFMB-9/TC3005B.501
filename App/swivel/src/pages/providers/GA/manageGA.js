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

export default function ManageGA() {
    const router = useRouter();

    const [GA, setGA] = useState();
    const [admin, setAdmin] = useState();
    const [admins, setAdmins] = useState();
    const [admin_id, setA_id] = useState();

    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const { data: session } = useSession();

    const fetchData = async () => {
      const resData = await fetch(
        `/api/managerProfile/managerP?id=${session.id}`
      );
  
      const res = await resData.json();
  
      setApiData(res.userData);
    };

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

    const RoutRegistroGAManager = () => {
        if (router) {
            router.push({
                pathname: `/providers/GA/registroAdmin?GA=${GA?.nombre}`,
            });
        }
    };

    const deleteEntry = async (entry) => {
        console.log("This entry", entry);
        try {
            await axios.delete("/api/buyerProfile/deleteUser", { params: { id: entry} });
            getAdmins();
        }
        catch (error) {
            console.log("Error borrando usuario: ", error);
        }
    };

    useEffect(() => {
        setA_id("647af5ebfb2360082e89094b");
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            console.log(admin_id);
            if (admin_id)
                await getAdmin(admin_id);

        };
        fetchData();
    }, [admin_id]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(admin);
            if (admin)
                await getGA(admin.grupo_automotriz_id);
        };
        fetchData();
    }, [admin]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(GA);
            if (GA)
                await getAdmins();
        };
        fetchData();
    }, [GA]);

    useEffect(() => {
        if (admins) {
            setFilteredResults(
                admins.filter((entry) =>
                    entry.nombres.toLowerCase().includes(searchValue.toLowerCase()) //||
                    // entry.apellidos.toLowerCase().includes(searchValue.toLowerCase()) ||
                    // entry.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                    // entry.numero_telefonico.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
    }, [admins, searchValue]);

    console.log(admins);
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
                                    <>
                                    <EditSellerData data={params.row}
                                    userType="gaManager"/>
                                    {console.log('yujuu', params.row)}
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
                                        <p> Al hacer click en "Confirmar" estas confirmando de forma definitiva que quieres eliminar tu cuenta. </p>
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
                        >Información de Grupo Automotiz</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <h4>Nombre: <span>{GA?.nombres}</span></h4>
                                </div>
                                <div className="col-6">
                                    <h4>Teléfono: <span>{admin?.numero_telefonico}</span></h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <h4>Email: <span>{GA?.legal.email}</span></h4>
                                </div>
                                <div className="col-6">
                                    <h4>Dirección: <span>{GA?.direccion.calle + ' ext. ' + GA?.direccion.numero_exterior + ' int. ' + GA?.direccion.numero_interior + ', ' + GA?.direccion.ciudad + ', ' + GA?.direccion.estado + ', CP: ' + GA?.direccion.codigo_postal}</span></h4>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        style={{
                            padding: "4rem",
                            width: "100%",
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "Raleway",
                                textAlign: "start",
                            }}
                        >Gestión de administradores alternos</h1>
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
                                                onClick={RoutRegistroGAManager}
                                                style={{
                                                    flex: '25%',
                                                    backgroundColor: '#F55C7A',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    height: '50%',
                                                    padding: '0.5rem 1rem',
                                                }}
                                            > Registrar admin  + </button>
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