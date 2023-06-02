/*
Luis Javier Karam
30/5/2023

Page to view a list of all the automotive groups related to the SA user that is logged in and the ability 
to edit and delete them.
*/

import React from 'react';
import { useState } from 'react';
import Searchbar from '@/components/general/searchbar';
import DataTable from '@/components/general/Table';
import SANavbar from '@/components/SA/navbar';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import styles from '@/styles/portal_generic.module.css';
import { DeleteForever, Edit } from '@mui/icons-material';
import PopUpComponent from '@/components/general/Popup';

export default function SA_automotiveGroups() {
    const router = useRouter();

    const columns = [
        { field: 'GrupoAutomotriz', headerName: 'Grupo Automotriz', width: 250 },
        { field: 'Email', headerName: 'Email', width: 200 },
        { field: 'Estado', headerName: 'Estado', width: 200 },
        { field: 'Telefono', headerName: 'Telefono', width: 200 },
        {
            field: 'verDetalle',
            headerName: 'Ver detalle',
            width: 200,
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
                    Ver detalle
                </Button>
            ),
        },
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
        { _id: 1, GrupoAutomotriz: 'GA 1', Email: 'ejemplo1@gmail.com', Estado: 'Estado 1', Telefono: '1234567890' },
        { _id: 2, GrupoAutomotriz: 'GA 2', Email: 'ejemplo2@gmail.com', Estado: 'Estado 2', Telefono: '0987654321' },
        { _id: 3, GrupoAutomotriz: 'GA 3', Email: 'ejemplo3@gmail.com', Estado: 'Estado 3', Telefono: '9876543210' },
        { _id: 4, GrupoAutomotriz: 'GA 4', Email: 'ejemplo4@gmail.com', Estado: 'Estado 4', Telefono: '5678901234' },
        { _id: 5, GrupoAutomotriz: 'GA 5', Email: 'ejemplo5@gmail.com', Estado: 'Estado 5', Telefono: '4321098765' },
        // Add more dummy rows here if needed
    ];


    const [isOpen, setIsOpen] = useState(false); // Define isOpen state


    return (
        <div>
            <SANavbar />
            <div className={styles.mainContainer}>
                <h4 className={styles.pageTitle}>Administracion de grupos automotrices</h4>
                <Grid item xs={12} md={9} sm={8}>
                    <Searchbar className={styles.searchbar} />
                </Grid>

                <div className={styles.tableContainer}>
                    <DataTable
                        rows={rows}
                        columns={columns}
                        title="Agencias"
                        getRowId={(row) => row.id} // Provide a unique identifier for each row
                    />
                </div>
                <div className={styles.addButtonContainer}>
                    <Button variant="contained" color="primary" className={styles.button}>
                        Agregar GA
                    </Button>
                </div>
            </div>
        </div>
    );
}
