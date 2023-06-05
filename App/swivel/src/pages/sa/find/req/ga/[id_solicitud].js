import React from 'react';
import styles from '@/styles/vista_solicitud_general.module.css';
import SANavbar from '@/components/SA/navbar';
import DataTable from '@/components/general/Table';
import { useRouter } from 'next/router';
import { useState, useEffect} from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function vistaSolicitud() {

    const router = useRouter();
    const userId = router.query.id_solicitud;

    const [user, setUser] = useState({});
    const [legal, setLegal] = useState({});
    const [address, setAddress] = useState({});
    const [approval, setApproval] = useState({});
    const [agencies, setAgencies] = useState([]);
    const [documents, setDocuments] = useState([]);
    const { data: session } = useSession();


    useEffect( () => {

        const getGADetail = async () => {

            try{
                const resp = await axios.post(
                    "/api/superadmin/detailGaReq",
                    {id:userId}
                    )

 
                setUser(Object.values(resp.data.groupDetails)[0]);
                setAddress(Object.values(resp.data.groupDetails)[0].direccion);
                setLegal(Object.values(resp.data.groupDetails)[0].legal);
                setApproval(Object.values(resp.data.groupApproval)[0]);




                setAgencies(resp.data.groupAgencies);

                


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






 



    return (
        <div>
            <SANavbar />
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
                            <p className={styles.status}>Estatus de la solicitud: {approval.estatus}</p>
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

                        <p className={styles.status}>Solicitud Realizada: {approval.fecha_inicio}</p>
                    </div>

                </div>
                <h4>Documentos</h4>
                {/*Aqui van los documentos*/}
            </div>
        </div>
    );
}
