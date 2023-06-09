import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/informacion_usuarioSA.module.css';
import axios from 'axios';
import SANavbar from '@/components/SA/navbar';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function InformacionUsuarioSA() {
    const router = useRouter();
    const { data: session } = useSession();

    const [name, setName] = useState('');
    const [q, setQ] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to fetch search results from the API endpoint
    const fetchResults = async (q) => {
        try {
            const response = await axios.get("/api/managerProfile/managerP", { params: { id: q } });
            console.log(response.data.userData);
            const userData = response.data.userData;
            setName(userData.nombres || '');
            setLastName(userData.apellidos || '');
            setMiddleName(userData.apellido_materno || '');
            setEmail(userData.email || '');
            setPhone(userData.numero_telefonico || '');

            console.log(response)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Fetch results when the component mounts
    useEffect(() => {
        if(session){
            fetchResults(session.id)
            setQ(session.id)
        } else {

        }
    }, [session]);

    const submitHandler = async (q) => {
        console.log(q)
        await axios.put('/api/superadmin/update', { id:q, name:name, surname: lastName, email:email, currentPhone:phone});
    };

    const cancelHandler = () => {
        router.back();
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
                            placeholder={name}
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
                            placeholder="{lastName}"
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
                        placeholder="{email}"
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
                        placeholder="{phone}"
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
                        onClick={()=>{submitHandler(q)}}
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
