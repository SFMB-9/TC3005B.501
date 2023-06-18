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

    const [agency, setAgency] = useState({});
    const [manager, setManager] = useState({});
    const [address, setAddress] = useState({});
    const [approval, setApproval] = useState({});
    const [ga, setGa] = useState({});
    const [legal, setLegal] = useState({});
    const { data: session } = useSession();
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

            const getGADetail = async () => {

            try{
                const resp = await axios.post(
                    "/api/superadmin/detailAgReq",
                    {id:userId}
                    )

  
                setAgency(resp.data.agencyDetails);
                setAddress(resp.data.agencyDetails.direccion);


                setManager(resp.data.managerDetails.legal);
                setApproval(resp.data.reqFound);

                setGa(resp.data.managerDetails);

                const newDocuments = resp.data.reqFound.documentos.map((doc,i) =>{
                    return { ...doc, _id: i};
                });
                setDocuments(newDocuments)


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
    });

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


const rowsDoc = documents
    const columnsDoc = [

        {field: "nombre_documento",
        headerName: "Documento",
        headerAlign: "center",
        align: "center",
        minWidth: 150,
        flex: 1,},

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
            <MenuItem value="pendiente">En Proceso</MenuItem>
            <MenuItem value="aceptado">Aprobado</MenuItem>
            <MenuItem value="rechazado">Rechazado</MenuItem>
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
          <Button onClick={handleEditClick}>Editar</Button>
        </div>
      );
    }
  },

  {field:"descarga",
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
                <h1 className={styles.pageTitle}>Solicitud# {approval._id}</h1> {/*Cambiar Folio por numero de solicitud*/}
                <h4>Resumen de solicitud: Creacion de Agencia</h4> {/*Cambiar por tipo de solicitud*/}
                <div className={styles.row}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Detalle de solicitante</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>{manager.nombres + " " + manager.apellidos}</p> {/*Cambiar por nombre de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>{manager.numero_telefonico}</p> {/*Cambiar por apellido de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>{manager.email}</p> {/*Cambiar por correo de solicitante*/}
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
                                    <p className={styles.boldText}>Agencia:</p>
                                    <p>{agency.nombres}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Tipo:</p>
                                    <p>Agencia</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>GA Cliente:</p>
                                    <p>{ga.nombres}</p>
                                </div>
                            </div>

                            <div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Dirección:</p>
                                    <p>{`${address.calle} ${address.numero_exterior} ${address["numero_interior"]} ${address.ciudad} ${address.estado} ${address.codigo_postal}`}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Representante:</p>
                                    <p>{manager.nombres} {manager.apellidos}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Correo:</p>
                                    <p>{manager.email}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Sitio web:</p>
                                    <p>{ga.url_grupo_automotriz}</p>
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
                        ></DataTable>
            </div>
        </div>
    );
}
