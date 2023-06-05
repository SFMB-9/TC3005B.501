/*
Luis Javier Karam
30/5/2023

Page to view a list of all the automotive groups related to the SA user that is logged in and the ability 
to edit and delete them.
*/


import axios from "axios";
import React from 'react';
import { useState, useEffect } from 'react';

import Searchbar from '@/components/general/searchbar';
import DataTable from '@/components/general/Table';
import SANavbar from '@/components/SA/navbar';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import styles from '@/styles/portal_generic.module.css';
import { DeleteForever, Edit } from '@mui/icons-material';
import PopUpComponent from '@/components/general/Popup';

import { useSession } from "next-auth/react";

export default function SA_automotiveGroups() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const { data: session } = useSession();

useEffect( () => {

        const getUsersData = async () => {

            try{
                const resp = await axios.get(
                    "/api/superadmin/getSAUsers")
 
                setUsers(resp.data.allUsers)
            } catch(err){
                console.log(err)
            }
        };

        if(session){
            getUsersData()
        } else {
      router.push("/auth/login");
    }

    }, [session]);


    const createUserHandler = async () => {
        router.push(`/sa/register-admin`);
    }

    const columns = [

        { field: 'nombres', headerName: 'Administrdor', width: 300 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'numero_telefonico', headerName: 'Teléfono', width: 250 },

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

    const rows = users;


    const [isOpen, setIsOpen] = useState(false); // Define isOpen state


    return (
        <div>
            <SANavbar />
            <div className={styles.mainContainer}>
                <h4 className={styles.pageTitle}>Gestión de Administradores</h4>
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
                    <Button variant="contained" color="primary" onClick={createUserHandler} className={styles.button}>
                        Agregar SA
                    </Button>
                </div>
            </div>
        </div>
    );
}
