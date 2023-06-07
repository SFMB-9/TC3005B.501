import React from 'react'
import { useState, useEffect } from 'react';
import GANavbar from '@/components/providers/GA/navbar'
import styles from '@/styles/edit_GA.module.css';
import { Button, TextField, Grid, FormHelperText } from '@mui/material';
import DataTable from '@/components/general/Table';
import { DeleteForever, Edit } from '@mui/icons-material';
import PopUpComponent from '@/components/general/Popup';
import { useRouter } from 'next/router';
import Searchbar from '@/components/general/searchbar';
import axios from 'axios';



export default function informacionGA() {
    const router = useRouter();
    const id = "6477e14bae27e558e56c3c13";

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [paginaWeb, setPaginaWeb] = useState('');
    const [calle, setCalle] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [estado, setEstado] = useState('');



    const columns = [
        { field: 'Nombre', headerName: 'Nombre', width: 300 },
        { field: 'Correo', headerName: 'Correo', width: 300 },
        { field: 'Telefono', headerName: 'Telefono', width: 300 },
        {
            field: 'delete',
            headerName: 'Eliminar',
            type: 'delete',
            width: 200,
            renderCell: (params) => (
                <PopUpComponent
                    title="Confirmar Eliminación"
                    popUpContent={
                        <div className={styles.popupText}>
                            <h4>¿Estás seguro de que deseas eliminar esta agencia?</h4>
                            <p className={styles.warningText}>Esta acción no se puede deshacer.</p>
                        </div>
                    }
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
    ]

    const rows = [
        { _id: 1, Nombre: 'Alberto', Correo: 'group1@example.com', Estado: 'Active', Telefono: '123456789' },
        { _id: 2, Nombre: 'Group 2', Correo: 'group2@example.com', Estado: 'Inactive', Telefono: '987654321' },
        // Add more dummy rows as needed
      ];
      

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }))
    };

    const [isOpen, setIsOpen] = useState(false); // Define isOpen state


    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Información de grupo automotriz</h1>
                <h4 className={styles.boldText}> Datos de grupo </h4>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <h5>Nombre</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="nombre"
                            label="Nombre de grupo"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <h5>Teléfono</h5>
                        <TextField
                            className={styles.inputField}
                            id="telefono"
                            label="+5215512345678"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <h5>Pagina web</h5>
                    <TextField
                        className={styles.longInputField}
                        id="nombre"
                        label="dominio.com"
                        variant="outlined"
                        fullWidth
                        onChange={e => setPhone(e.target.value)}
                        disabled
                    />
                </div>

                <h4 className={styles.boldText}> Dirección </h4>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <h5>Calle</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="calle"
                            label="Calle"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <h5>Código Postal</h5>
                        <TextField
                            className={styles.inputField}
                            id="codigoPostal"
                            label="12000"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <h5>Ciudad</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="ciudad"
                            label="Nombre de grupo"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <h5>Estado</h5>
                        <TextField
                            className={styles.inputField}
                            id="estado"
                            label="Jalisco"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>

                <h1 className={styles.tableTitle}>Gestión de administradores alternos</h1>
                <Grid item xs={12} md={9} sm={8}>
                    <Searchbar className={styles.searchbar} />
                </Grid>
                <DataTable
                    columns={columns}
                    rows={rows}
                    title="Administradores alternos"
                    getRowId={(row) => row.id} // Provide a unique identifier for each row
                />
                <div className={styles.addButtonContainer}>
                    <Button variant="contained" color="primary" 
                    onClick={handleChange} // CHANGE THIS
                    className={styles.button}>
                        Agregar Administrador Alterno
                    </Button>
                </div>


            </div>
        </div>
    )
}