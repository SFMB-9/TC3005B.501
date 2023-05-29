/*
Luis Javier Karam Galland
28-05-2023

Vista de detalle de agencia, con tablas de gerentes y vendedores.
*/

import React from 'react'
import BuyerNavbar from '@/components/buyer/navbar' //TODO cambiar por el navbar de agencia
import { Button } from '@mui/material'

export default function detalleAgencia() {
    return (
        <div>
            <BuyerNavbar /> {/* TODO cambiar por el navbar de agencia */}

            <h1>Detalle de la Agencia</h1>
            <h2>Toyota Polanco</h2>

            <div>
                <h3>Datos de la Agencia</h3>
                // Simbolo de lapiz aqui
            </div>

            <div> // Inputs aqui
                <h4>Nombre</h4>
                <h4>Marca</h4>
                <h4>Telefono</h4>
                <h4>Direccion</h4>
                <h4>Correo electrónico</h4>
                <h4>Grupo Automotriz</h4>
            </div>

            <p>Registrado el 01/01/2023</p>

            //Boton de guardar en medio
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
            //Boton de eliminar a la derecha
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
                <h3>Gerentes</h3>
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
                <h3>Vendedores</h3>
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
    )
}