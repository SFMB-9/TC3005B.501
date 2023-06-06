import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/add_SAdmin.module.css';
import axios from 'axios';
import SANavbar from '@/components/SA/navbar';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function addSAdmin() {



    const router = useRouter();

    const { data: session } = useSession();
    
    useEffect(() => {
      if(!session){
        router.push("/auth/login");
      }
    })

    const [name, setName] = useState('');
    const [paternalLN, setpaternalLN] = useState('');
    const [maternalLN, setmaternalLN] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');





    const submitHandler = async () => {

        if (password != confirmPassword){
            return
        }

        await axios.post('/api/register', JSON.stringify({
            "nombres": name,
            "apellidos": paternalLN + maternalLN,
            "email":email,
            "numero_telefonico":phone,
            "password":password,
            "tipo_usuario":"admin"
        }),{ headers: {"Content-Type": "application/json"}});
        router.back();
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
                <h2 className={styles.pageTitle}>Agregar administrador</h2>
                <h4 className={styles.sectionTitle}>Ingresa los datos del administrador</h4>
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
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <h5>Apellido Paterno</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="apellidoPaterno"
                            value={paternalLN}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={inputLabelProps}
                            placeholder="Ingrese su apellido paterno"
                            onChange={(e) => setpaternalLN(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <h5>Apellido Materno</h5>
                        <TextField
                            className={styles.inputField}
                            id="apellidoMaterno"
                            value={maternalLN}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={inputLabelProps}
                            placeholder="Ingrese su apellido materno"
                            onChange={(e) => setmaternalLN(e.target.value)}
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
                <div className={styles.inputContainer}>
                    <h5>Contraseña</h5>
                    <TextField
                        className={styles.longInputField}
                        id="password"
                        type="password"
                        value={password}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={inputLabelProps}
                        placeholder="Ingrese su contraseña"
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
                        InputLabelProps={inputLabelProps}
                        placeholder="Confirme su contraseña"
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
