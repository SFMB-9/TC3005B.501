import React from 'react';
import axios from "axios";
import styles from '@/styles/vista_solicitud_general.module.css';
import SANavbar from '@/components/SA/navbar';
import DataTable from '@/components/general/Table';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect} from 'react';
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/general/LoadingScreen";

export default function DetailsGA() {

    const router = useRouter();
    const userId = router.query.id_ga;

    const [user, setUser] = useState({});
    const [legal, setLegal] = useState({});
    const [address, setAddress] = useState({});
    const [approval, setApproval] = useState({});
    const [agencies, setAgencies] = useState([]);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {

        const getGADetail = async () => {

            try{
                const resp = await axios.post(
                    "/api/superadmin/detailGa",
                    {id:userId}
                    )

 
                setUser(resp.data.groupDetails);
                setAddress(resp.data.groupDetails.direccion);
                setLegal(resp.data.groupDetails.legal);
                setApproval(resp.data.groupApproval);




                setAgencies(resp.data.groupAgencies);
                setIsLoading(false)

                


            } catch(err){
                console.log(err)
            }
        };

        if(session){
            getGADetail()
        } else {
      router.push("/auth/login");
    }

    }, [session]);






    const columns = [{ field: '_id', headerName: 'ID', width: 250 },
    { field: 'nombres', headerName: 'Nombre', width: 200 },
    { field: 'dir', headerName: 'Dirección', width: 200, renderCell: (params) => (
      <div>
        {`${params.row.direccion.calle || ''} ${params.row.direccion.numero_exterior || ''}`}
      </div>
    )


},]

    const rows = agencies

    return (
        <div>
            <SANavbar />
            {isLoading && <LoadingScreen />}
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Detalle del grupo automotriz</h1> {/*Cambiar Folio por numero de solicitud*/}
                <h4 className={styles.subTitle}>{user.nombres}</h4> {/*Cambiar por nombre de agencia*/}
                <div className={styles.row}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Grupo Automotriz</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>{user.nombres}</p> 
                                    </div>
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
                            
                        </div>
                    </div>

                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Aprobación</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Revisor:</p>
                                        <p>Usuario SA</p> {/*Cambiar por nombre de quien aprobo*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>ID Solicitud:</p>
                                        <p>algo@gmail.com</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Estatus</p>
                                        <p>0000000000000</p> {/*Cambiar por telefono de solicitante*/}
                                    </div>
                                                                <p className={styles.status}>Solicitud Realizada: {approval.fecha_inicio}</p>
                            <p className={styles.status}>Ultimo Estatus: {approval.estatus} al  {approval.fecha_estatus}</p>


                                </div>

                            </div>

                        </div>
                    </div>


                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}> Representante Legal</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>{legal.nombres + " " + legal.apellidos}</p> {/*Cambiar por nombre de quien aprobo*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>{legal.email}</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>{legal.numero_telefonico}</p> {/*Cambiar por telefono de solicitante*/}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>





                </div>
                <h4 className={styles.sectionTitle}>Agencias</h4>

                <div className={styles.tableContainer}>
                    <DataTable columns={columns} rows={rows} />
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.button}
                        variant="contained"
                        href="/solicitudes">
                        Eliminar cuenta
                    </Button>
                </div>
            </div>
        </div >
    );
}
