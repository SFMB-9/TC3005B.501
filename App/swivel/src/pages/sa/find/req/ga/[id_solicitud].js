import React from 'react';
import styles from '@/styles/vista_solicitud_general.module.css';
import SANavbar from '@/components/SA/navbar';
import DataTable from '@/components/general/Table';
import { useRouter } from 'next/router';
import { useState, useEffect} from 'react';
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/general/LoadingScreen";
import axios from "axios";
import { Select, MenuItem, Typography, Button} from "@mui/material";
import TextField from '@mui/material/TextField';

export default function VistaSolicitud() {

    const router = useRouter();
    const userId = router.query.id_solicitud;

    const [user, setUser] = useState({});
    const [legal, setLegal] = useState({});
    const [address, setAddress] = useState({});
    const [approval, setApproval] = useState({});
    const [agencies, setAgencies] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession();

        const getGADetail = async () => {

            try{
                const resp = await axios.post(
                    "/api/superadmin/detailGaReq",
                    {id:userId}
                    )

 
                setUser(resp.data.groupDetails);
                setAddress(resp.data.groupDetails.direccion);
                setLegal(resp.data.groupDetails.legal);
                setApproval(resp.data.groupApproval);
                
                
                const newDocuments = resp.data.groupDocs.map((doc,i) =>{
                    return { ...doc, _id: i};
                });

                setDocuments(newDocuments);

                setIsLoading(false)


                


            } catch(err){
                console.log(err)
            }
        }; 

    useEffect( () => {


        if(session){
            getGADetail()
        } else {
      router.push("/auth/login");
    }

    }, [session]);

    const updateAnyDocument = async (status, i) => {
        setIsLoading(true)
     const upd = await axios.post("/api/superadmin/updateAnyDocStatus", {
      id:userId,
      status:status,
      index:i
    });b

     getGADetail();
    }

    const commentAnyDocument = async (comm, i) => {
        setIsLoading(true)
     const upd = await axios.post("/api/superadmin/updateAnyDocComment", {
      id:userId,
      comment:comm,
      index:i
    });

     getGADetail();
    }


    const rowsDoc = documents;
    const columnsDoc = [
        {
        field: "nombre_documento",
        headerName: "Documento",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        },
        {
        field: "fecha_modificacion",
        type: "date",
        headerName: "Fecha de Modificación",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,
        valueFormatter: (params) =>
            new Date(params.value).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }),
        },
        {
            field: "estatus",
            headerName: "Estatus",
            headerAlign: "center",
            align: "center",
            minWidth: 150,
            flex: 1,
            type: "actions",
            renderCell: (params) => (
            <Select
                value={params.row.estatus}
                onChange={(e) => updateAnyDocument(e.target.value,params.row._id)}
                label="Estatus"
            >
                <MenuItem value="Pendiente">En Proceso</MenuItem>
                <MenuItem value="Aceptado">Aprobado</MenuItem>
                <MenuItem value="Rechazado">Rechazado</MenuItem>
            </Select>
            ),
        },
        {
            field: 'comentarios',
            headerName: 'Comentarios',
            width: 200,
            renderCell: (params) => {
              const [isEditing, setIsEditing] = useState(false);
              const [value, setValue] = useState(params.value?.toString() || '');
              const [savedValue, setSavedValue] = useState(params.value?.toString() || '');
        
              const handleEditClick = () => {
                setIsEditing(true);
              };
        
              const handleSaveClick = (value,i) => {
                console.log("hello")
                // Perform saving logic here, e.g., update the value in the data source
                commentAnyDocument(value,i)
                setSavedValue(value);
                setIsEditing(false);
              };
        
              const handleInputChange = (event) => {
                setValue(event.target.value);
              };
        
              return isEditing ? (
                <TextField
                  fullWidth
                  value={value}
                  onChange={handleInputChange}
                  autoFocus
                  onBlur={(e) => handleSaveClick(value,params.row._id)}
                />
              ) : (
                <div>
                  {savedValue}
                  <Button onClick={handleEditClick}>Edit</Button>
                </div>
              );
            }
        },
        {
            field:"descarga",
            minWidth:150,
            headerName:"Archivo",
            headerAlign:"center",
            type:"actions",
            renderCell: (params) => (
            <>
            {params.row.url && params.row.url !== " " ? (
                <a href={params.row.url} target="_blank">
                <u>Ver archivo</u>
                </a>) : (<div> No hay archivo </div>) }
            </>
            )
        }
    ]

    return (
        <div>
            <SANavbar />
            {isLoading && <LoadingScreen />}
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Solicitud #{approval._id}</h1> 
                <h4>Resumen de solicitud: Creacion de Grupo Automotriz</h4> {/*Cambiar por tipo de solicitud*/}
                <div className={styles.row}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Detalle de solicitante</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>{legal.nombres + " " + legal.apellidos}</p>
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>{legal.numero_telefonico}</p> {/*Cambiar por apellido de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>{legal.email}</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                </div>
                            </div>
                            <p className={styles.status}>Estatus de la solicitud: {approval.estatus_validacion}</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h5 className={styles.cardTitle}>Detalle de la solicitud</h5>
                        <div className={styles.cardInfoContainer}>
                            <div className={styles.leftContainer}>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Cliente:</p>
                                    <p>{user.nombres}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Tipo:</p>
                                    <p>Grupo Automotriz</p>
                                </div>

                            </div>

                            <div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Dirección:</p>
                                    <p>{`${address.calle} ${address.numero_exterior} ${address["numero_interior"]} ${address.ciudad} ${address.estado} ${address.codigo_postal}`}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>RFC:</p>
                                    <p>{user.rfc_grupo_automotriz}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Sitio Web:</p>
                                    <p>{user.url_grupo_automotriz}</p>
                                </div>
                            </div>
                        </div>

                        <p className={styles.status}>Solicitud Realizada: {approval.fecha_creacion}</p>
                    </div>

                </div>
                <h4>Documentos</h4>
                    <DataTable
                        rows={rowsDoc}
                        columns={columnsDoc}
                        getRowId={(row) => row._id} 
                    >
                    </DataTable>
            </div>
        </div>
    );
}
