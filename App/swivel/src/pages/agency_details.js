/*
Luis Javier Karam Galland
28-05-2023

Vista de detalle de agencia, con tablas de gerentes y vendedores.
*/

import React from 'react'
import BuyerNavbar from '@/components/buyer/navbar' //TODO cambiar por el navbar de agencia
import styles from '@/styles/agency_details.module.css'
import { Button } from '@mui/material'
import Table from '@/components/general/Table'

export default function agencyDetails() {
    return (
        <div>
            <BuyerNavbar /> {/* TODO cambiar por el navbar de agencia */}

            <div className={styles.mainContainer}>


                <h1 className={styles.pageTitle}>Detalle de la Agencia</h1>
                <h2 className={styles.agencyName}>Toyota Polanco</h2>

                <div>
                    <h4>Datos de la Agencia</h4>
    // Simbolo de lapiz aqui
                </div>

                <div> // Inputs aqui
                    <h5>Nombre</h5>
                    <h5>Marca</h5>
                    <h5>Telefono</h5>
                    <h5>Direccion</h5>
                    <h5>Correo electrónico</h5>
                    <h5>Grupo Automotriz</h5>
                </div>

                <p className={styles.registrationDate}>Registrado el 01/01/2023</p>

                <Button
                    variant="contained"
                    disableElevation
                    sx={{
                        backgroundColor: "#F55C7A",
                        fontFamily: "lato",
                        fontWeight: "bold",
                        ":hover": { backgroundColor: "#BABABA" },
                    }}
                >
                    Guardar Cambios
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    sx={{
                        backgroundColor: "#F55C7A",
                        fontFamily: "lato",
                        fontWeight: "bold",
                        ":hover": { backgroundColor: "#BABABA" },
                    }}
                >
                    Eliminar Agencia
                </Button>

                <div>
                    <h4 className={styles.sectionTitle}> Gerentes </h4>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: "#F55C7A",
                            fontFamily: "lato",
                            fontWeight: "bold",
                            ":hover": { backgroundColor: "#BABABA" },
                        }}
                    >
                        Agregar Gerente
                    </Button>
                </div>

// Tabla de gerentes

                <div>
                    <h4 className={styles.sectionTitle}> Vendedores </h4>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: "#F55C7A",
                            fontFamily: "lato",
                            fontWeight: "bold",
                            ":hover": { backgroundColor: "#BABABA" },
                        }}
                    >
                        Agregar Vendedor
                    </Button>
                </div>

// Tabla de vendedores
            </div>
        </div>
    )
}