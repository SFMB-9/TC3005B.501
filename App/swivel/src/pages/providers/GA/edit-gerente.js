"use client"

import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/edit_GA.module.css';
import GANavbar from '@/components/providers/GA/navbar';
import axios from 'axios';
import { useRouter } from "next/router";

export default function SearchResults() {

    const router = useRouter();
    const { id } = router.query

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
  
    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/GA/pull-gerente', { params: { id: id }});
            setName(response.data.manager.nombres);
            setSurname(response.data.manager.apellidos);
            setEmail(response.data.manager.email);
            setPhone(response.data.manager.numero_telefonico);
        } 
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    // Fetch results when the component mounts
    useEffect(() => {
        fetchResults();
    }, []);

    const submitHandler = async () => {
        await axios.put('/api/GA/pull-gerente', { id: id, name: name, surname: surname, email: email, phone: phone })
    };

    const cancelHandler = () => {
        router.push(`/providers/GA/detalles-agencia`);
    };

    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Editar Perfil</h1>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <h5>Nombre(s)</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            type='text'
                            id="nombre"
                            label={name}
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Apellido(s)</h5>
                        <TextField
                            className={styles.inputField}
                            type='text'
                            id="apellido"
                            label={surname}
                            variant="outlined"
                            fullWidth
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                    <h5>Correo</h5>
                    <TextField
                        className={styles.longInputField}
                        id="correo"
                        type='text'
                        label={email}
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <h5>Teléfono</h5>
                    <TextField
                        className={styles.longInputField}
                        id="telefono"
                        type='text'
                        label={phone}
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        className={styles.button}
                        disableElevation
                        sx={{
                            backgroundColor: '#979797',
                            fontFamily: 'lato',
                            fontWeight: 'bold',
                            ':hover': { backgroundColor: '#BABABA' },
                        }}
                        onClick={cancelHandler}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.button}
                        disableElevation
                        onClick={submitHandler}
                        sx={{
                            backgroundColor: '#F55C7A',
                            fontFamily: 'lato',
                            fontWeight: 'bold',
                            ':hover': { backgroundColor: '#BABABA' },
                        }}
                    >
                        Guardar
                    </Button>
                </div>

                </div>
             </div>

        </div>
    );
};    