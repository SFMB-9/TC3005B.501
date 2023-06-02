import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/add_SAdmin.module.css';
import axios from 'axios';
import GANavbar from '@/components/providers/GA/navbar';
import { useRouter } from 'next/router';

export default function addSAdmin() {
    const router = useRouter();
    const id = "6477e14bae27e558e56c3c13";

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get("/api/managerProfile/managerP", { params: { id: id } });
            console.log(response.data.userData);
            const userData = response.data.userData;
            setName(userData.nombre || ''); // Provide an empty string as the initial value
            setLastName(userData.apellido_paterno || ''); // Provide an empty string as the initial value
            setMiddleName(userData.apellido_materno || ''); // Provide an empty string as the initial value
            setEmail(userData.correo || ''); // Provide an empty string as the initial value
            setPhone(userData.numero_telefono || ''); // Provide an empty string as the initial value
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
        await axios.put('/api/GA/editGA', { id, name, lastName, middleName, email, phone, password, confirmPassword });
    };

    const cancelHandler = () => {
        router.push(`/providers/GA`);
    };

    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Editar Perfil</h1>
                <div className={styles.inputContainer}>
                    <h5>Nombre(s)</h5>
                    <TextField
                        className={styles.inputField}
                        id="nombre"
                        value={name}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.row}>

                    <div className={styles.inputContainer}>
                        <h5>Apellido Paterno</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="apellidoPaterno"
                            value={lastName}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Apellido Materno</h5>
                        <TextField
                            className={styles.inputField}
                            id="apellidoMaterno"
                            value={middleName}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <h5>Correo</h5>
                    <TextField
                        className={styles.longInputField}
                        id="correo"
                        value={email}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <h5>Teléfono</h5>
                    <TextField
                        className={styles.longInputField}
                        id="telefono"
                        value={phone}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <h5>Contraseña</h5>
                    <TextField
                        className={styles.longInputField}
                        id="password"
                        type="password"
                        value={password}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <h5>Confirmar contraseña</h5>
                    <TextField
                        className={styles.longInputField}
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
    );
}
