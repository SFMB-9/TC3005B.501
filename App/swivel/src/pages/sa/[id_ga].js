import React from 'react';
import styles from '@/styles/vista_solicitud_general.module.css';
import SANavbar from '@/components/SA/navbar';
import DataTable from '@/components/general/Table';
import { Button } from '@mui/material';

export default function detailsGA() {



    const columns = [{ field: 'Nombre', headerName: 'Nombre', width: 250 },
    { field: 'Correo', headerName: 'Correo', width: 200 },
    { field: 'Telefono', headerName: 'Teléfono', width: 200 },]

    const rows = []

    return (
        <div>
            <SANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Detalle del grupo automotriz</h1> {/*Cambiar Folio por numero de solicitud*/}
                <h4 className={styles.subTitle}>NOMBRE AGENCIA</h4> {/*Cambiar por nombre de agencia*/}
                <div className={styles.row}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Grupo Automotriz</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>Nombre completo</p> {/*Cambiar por nombre de GA*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>algo@gmail.com</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>0000000000000</p> {/*Cambiar por telefono de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Dirección:</p>
                                        <p>Lago alberto</p> {/*Cambiar por direccion de solicitante*/}
                                    </div>

                                </div>
                            </div>
                            <p className={styles.status}>Solicitud realizada: {/*fecha*/}</p>
                        </div>
                    </div>

                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Aprobado Por:</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>Usuario SA</p> {/*Cambiar por nombre de quien aprobo*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>algo@gmail.com</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>0000000000000</p> {/*Cambiar por telefono de solicitante*/}
                                    </div>

                                </div>

                            </div>
                            <p className={styles.status}>Aprobado el: {/*fecha*/}</p>
                        </div>
                    </div>


                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}> Representante Legal</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>Alberto</p> {/*Cambiar por nombre de quien aprobo*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>algo@gmail.com</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>0000000000000</p> {/*Cambiar por telefono de solicitante*/}
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
