import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/informacion_usuarioSA.module.css';
import axios from 'axios';
import SANavbar from '@/components/SA/navbar';
import { useRouter } from 'next/router';

export default function informacionUsuarioSA() {
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
            setName(userData.nombre || '');
            setLastName(userData.apellido_paterno || '');
            setMiddleName(userData.apellido_materno || '');
            setEmail(userData.correo || '');
            setPhone(userData.numero_telefono || '');
        } catch (error) {
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
        router.push(`/superadmin/index`);
    };

    const inputLabelProps = {
        shrink: true,
    };

    return (
        <div>
            <SANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Información de usuario</h1>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>

                        <h5>Nombre(s)</h5>
                        <TextField
                            className={styles.inputField}
                            id="nombre"
                            value={name}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={inputLabelProps}
                            placeholder="Ingrese su nombre"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Apellidos</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="apellidoPaterno"
                            value={lastName}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={inputLabelProps}
                            placeholder="Ingrese su apellido paterno"
                            onChange={(e) => setLastName(e.target.value)}
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
                        InputLabelProps={inputLabelProps}
                        placeholder="Ingrese su correo electrónico"
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
                        InputLabelProps={inputLabelProps}
                        placeholder="Ingrese su número de teléfono"
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
    );
}
