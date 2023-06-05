import React from 'react';
import styles from '@/styles/vista_solicitud_general.module.css';
import DataTable from '@/components/general/Table';

export default function vistaSolicitud() {










    return (
        <div>
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Solicitud #FOLIO</h1> {/*Cambiar Folio por numero de solicitud*/}
                <h4>Resumen de solicitud: Creacion de agencia</h4> {/*Cambiar por tipo de solicitud*/}
                <div className={styles.row}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h5 className={styles.cardTitle}>Detalle de solicitante</h5>
                            <div className={styles.cardInfoContainer}>
                                <div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Nombre:</p>
                                        <p>Nombre completo</p> {/*Cambiar por nombre de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Telefono:</p>
                                        <p>0000000000000</p> {/*Cambiar por apellido de solicitante*/}
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.boldText}>Correo:</p>
                                        <p>algo@gmail.com</p> {/*Cambiar por correo de solicitante*/}
                                    </div>
                                </div>
                            </div>
                            <p className={styles.status}>Estatus de la solicitud: {/*status*/}</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h5 className={styles.cardTitle}>Detalle de la solicitud</h5>
                        <div className={styles.cardInfoContainer}>
                            <div className={styles.leftContainer}>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Cliente:</p>
                                    <p>Nombre agencia</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Tipo:</p>
                                    <p>Agencia</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>GA vinculado:</p>
                                    <p>Nombre G.A.</p>
                                </div>
                            </div>

                            <div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Dirección:</p>
                                    <p>NL. #12415</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Telefono:</p>
                                    <p>0000000000000</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Correo:</p>
                                    <p>algo@gmail.com</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.boldText}>Sitio web:</p>
                                    <p>www.algo.com</p>
                                </div>
                            </div>
                        </div>

                        <p className={styles.status}>Estatus de la solicitud: {/*status*/}</p>
                    </div>

                </div>
                <h4>Documentos</h4>
                {/*Aqui van los documentos*/}
            </div>
        </div>
    );
}
