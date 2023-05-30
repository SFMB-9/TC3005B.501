import React from 'react';
import BuyerNavbar from '@/components/buyer/navbar';
import styles from '@/styles/agency_details.module.css';
import { Button, TextField } from '@mui/material';
import DataTable from '@/components/general/Table';
import { DeleteForever, Edit } from '@mui/icons-material';

export default function agencyDetails() {
    return (
        <div>
            <BuyerNavbar /> {/* TODO cambiar por el navbar de agencia */}

            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Detalle de la Agencia</h1>
                <h2 className={styles.agencyName}>Toyota Polanco</h2>

                <div className={styles.editHeader}>
                    <h4 className={styles.sectionTitle}>Datos de la Agencia</h4>
                    <Edit className={styles.icon} />
                </div>
                <div className={styles.inputFieldContainer}>
                    <div>
                        <div>
                            <h5>Nombre</h5>
                            <TextField className={styles.inputField} id="nombre" label="Current Nombre" variant="outlined" fullWidth />
                        </div>

                        <div>
                            <h5>Marca</h5>
                            <TextField className={styles.inputField} id="marca" label="Current Marca" variant="outlined" fullWidth />
                        </div>

                        <div>
                            <h5>Telefono</h5>
                            <TextField className={styles.inputField} id="telefono" label="Current Telefono" variant="outlined" fullWidth />
                        </div>

                    </div>

                    <div>
                        <div>
                            <h5>Correo electrónico</h5>
                            <TextField className={styles.inputField} id="correo" label="Current Correo electrónico" variant="outlined" fullWidth />
                        </div>

                        <div>
                            <h5>Grupo Automotriz</h5>
                            <TextField className={styles.inputField} id="grupo" label="Current Grupo Automotriz" variant="outlined" fullWidth />
                        </div>
                    </div>
                </div>

                <div>
                    <h5>Dirección</h5>
                    <TextField className={styles.longInputField} id="direccion" label="Current Direccion" variant="outlined" fullWidth />
                </div>

                <p className={styles.registrationDate}>Registrado el 01/01/2023</p>

                <Button
                    variant="contained"
                    disableElevation
                    className={styles.button}
                    sx={{
                        backgroundColor: '#F55C7A',
                        fontFamily: 'lato',
                        fontWeight: 'bold',
                        ':hover': { backgroundColor: '#BABABA' },
                    }}
                >
                    Guardar Cambios
                </Button>


                <div className={styles.tableHeaderContainer}>
                    <h4 className={styles.sectionTitle}>Gerentes</h4>
                    <Button
                        variant="contained"
                        className={styles.button}
                        disableElevation
                        sx={{
                            backgroundColor: '#F55C7A',
                            fontFamily: 'lato',
                            fontWeight: 'bold',
                            ':hover': { backgroundColor: '#BABABA' },
                        }}
                    >
                        Agregar Gerente
                    </Button>
                </div>

                {/* Tabla de gerentes */}
                <div className={styles.firstTableContainer}>
                    <DataTable
                        save={false}
                        columns={[
                            { field: 'Nombre', headerName: 'Nombre', width: 200 },
                            { field: 'Mail', headerName: 'Mail', width: 200 },
                            {
                                field: 'delete',
                                headerName: 'Borrar (PERMANENTE)',
                                type: 'delete',
                                width: 200,
                                renderCell: () => (
                                    <Button>
                                        <DeleteForever />
                                    </Button>
                                ),
                            },
                            {
                                field: 'actions',
                                headerName: 'Editar',
                                type: 'actions',
                                width: 100,
                                renderCell: () => (
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        sx={{
                                            backgroundColor: '#F55C7A',
                                            fontFamily: 'lato',
                                            fontWeight: 'bold',
                                            ':hover': { backgroundColor: '#BABABA' },
                                        }}
                                    >
                                        Editar
                                    </Button>
                                ),
                            },
                        ]}
                        rows={[
                            { _id: 1, Nombre: 'John Doe', Mail: 'john@example.com' },
                            { _id: 2, Nombre: 'Jane Smith', Mail: 'jane@example.com' },
                            { _id: 3, Nombre: 'Bob Johnson', Mail: 'bob@example.com' },
                            // Add more dummy rows here if needed
                        ]}
                    />
                </div>

                <div className={styles.tableHeaderContainer}>
                    <h4 className={styles.sectionTitle}>Vendedores</h4>
                    <Button
                        variant="contained"
                        disableElevation
                        className={styles.button}
                        sx={{
                            backgroundColor: '#F55C7A',
                            fontFamily: 'lato',
                            fontWeight: 'bold',
                            ':hover': { backgroundColor: '#BABABA' },
                        }}
                    >
                        Agregar Vendedor
                    </Button>
                </div>

                {/* Tabla de vendedores */}
                <div className={styles.secondTableContainer}>
                    <DataTable
                        save={false}
                        columns={[
                            { field: 'Nombre', headerName: 'Nombre', width: 200 },
                            { field: 'Mail', headerName: 'Mail', width: 200 },
                            { field: 'Telefono', headerName: 'Telefono', width: 200 },
                        ]}
                        rows={[
                            { _id: 1, Nombre: 'John Doe', Mail: 'john@example.com', Telefono: '1234567890' },
                            { _id: 2, Nombre: 'Jane Smith', Mail: 'jane@example.com', Telefono: '9876543210' },
                            { _id: 3, Nombre: 'Bob Johnson', Mail: 'bob@example.com', Telefono: '5555555555' },
                            // Add more dummy rows here if needed
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
