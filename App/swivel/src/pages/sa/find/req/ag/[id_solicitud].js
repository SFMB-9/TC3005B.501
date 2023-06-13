import React from 'react';
import styles from '@/styles/vista_solicitud_general.module.css';
import SANavbar from '@/components/SA/navbar';
import DataTable from '@/components/general/Table';
import { useRouter } from 'next/router';
import { useState, useEffect} from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";
import LoadingScreen from "@/components/general/LoadingScreen";

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

    useEffect( () => {

        const getGADetail = async () => {

            try{
                const resp = await axios.post(
                    "/api/superadmin/detailAgReq",
                    {id:userId}
                    )

  
                setAgency(resp.data.agencyDetails);
                setAddress(resp.data.agencyDetails.direccion);
                setManager(resp.data.managerDetails);
                setApproval(resp.data.reqFound);
                setGa(resp.data.repDetails);
                setLegal(resp.data.repDetails.legal);
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
                            <p className={styles.status}>Estatus de la solicitud: {approval.estatus}</p>
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

                        <p className={styles.status}>Solicitud Realizada: {approval.fecha_inicio}</p>
                    </div>

                </div>
                <h4>Documentos</h4>
                {/*Aqui van los documentos*/}
            </div>
        </div>
    );
}
