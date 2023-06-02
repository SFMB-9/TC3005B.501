/*
Luis Javier Karam
30/5/2023

Page to view the details of an agency and edit them as well as add and remove managers and sellers
*/

import React, { useState } from 'react';
import BuyerNavbar from '@/components/buyer/navbar';
import styles from '@/styles/agency_details.module.css';
import { Button, TextField, FormHelperText } from '@mui/material';
import DataTable from '@/components/general/Table';
import { DeleteForever, Edit } from '@mui/icons-material';
import PopUpComponent from '@/components/general/Popup';

export default function AgencyDetails() {
    const [formValues, setFormValues] = useState({
        nombre: '',
        marca: '',
        telefono: '',
        direccion: '',
        correo: '',
        grupo: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        console.log('Deleting item with ID:', id);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false); // Define isOpen state


    return (
        <div>
            <BuyerNavbar /> {/* TODO: cambiar por el navbar de la agencia */}

            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Detalle de la Agencia</h1>
                <h2 className={styles.agencyName}>Toyota Polanco</h2>

                <div className={styles.editHeader}>
                    <h4 className={styles.sectionTitle}>Datos de la Agencia</h4>
                    <Edit className={styles.icon} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputFieldContainer}>
                        <div>
                            <div>
                                <h5>Nombre</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="nombre"
                                    label="Nombre actual"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <h5>Marca</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="marca"
                                    label="Marca actual"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.marca}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <h5>Teléfono</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="telefono"
                                    label="Teléfono actual"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.telefono}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div>
                                <h5>Correo electrónico</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="correo"
                                    label="Correo electrónico actual"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.correo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <h5>Grupo Automotriz</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="grupo"
                                    label="Grupo Automotriz actual"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.grupo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5>Dirección</h5>
                        <TextField
                            className={styles.longInputField}
                            id="direccion"
                            label="Dirección actual"
                            variant="outlined"
                            fullWidth
                            value={formValues.direccion}
                            onChange={handleChange}
                        />
                    </div>

                    <p className={styles.registrationDate}>Registrado el 01/01/2023</p>

                    <div className={styles.saveButtonContainer}>
                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation
                            className={styles.Button}
                            sx={{
                                backgroundColor: '#F55C7A',
                                fontFamily: 'lato',
                                fontWeight: 'bold',
                                ':hover': { backgroundColor: '#BABABA' },
                            }}
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                </form>


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
                            { field: 'Mail', headerName: 'Correo', width: 200 },
                            {
                                field: 'delete',
                                headerName: 'Borrar (PERMANENTE)',
                                type: 'delete',
                                width: 200,
                                renderCell: (params) => (
                                    <PopUpComponent
                                        title="Confirmar Eliminación"
                                        popUpContent={<div className={styles.popupText}>
                                            <h4>¿Estás seguro de que deseas eliminar este gerente?</h4>
                                            <p className={styles.warningText}>Esta acción no se puede deshacer.</p>
                                        </div>}
                                        btnOpen={
                                            <Button>
                                                <DeleteForever />
                                            </Button>
                                        }
                                        btnClose={
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    className={styles.popupButton}
                                                    sx={{
                                                        backgroundColor: '#F55C7A',
                                                        fontFamily: 'lato',
                                                        fontWeight: 'bold',
                                                        ':hover': { backgroundColor: '#BABABA' },
                                                    }}
                                                    onClick={() => handleDelete(params.row._id)}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    className={styles.popupButton}
                                                    sx={{
                                                        backgroundColor: '#E0E0E0',
                                                        fontFamily: 'lato',
                                                        fontWeight: 'bold',
                                                        ':hover': { backgroundColor: '#BABABA' },
                                                    }}
                                                    onClick={() => setIsOpen(false)} // Use setIsOpen from useState
                                                >
                                                    Cancelar
                                                </Button>
                                            </div>
                                        }
                                        setIsOpen={setIsOpen} // Pass setIsOpen function as a prop
                                    />
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
                            { field: 'Mail', headerName: 'Correo', width: 200 },
                            { field: 'Telefono', headerName: 'Teléfono', width: 200 },
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
