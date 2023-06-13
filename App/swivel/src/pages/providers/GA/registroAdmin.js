"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/add_manager.module.css";
import GANavbar from "@/components/providers/GA/navbar";
import { useSession } from "next-auth/react";


const RegistroAdmin = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({}); 
    const [GA, setGA] = useState("");

    useEffect(() => {
        const getIdGA = async () => {
          let gaIdRaw = await fetch(`http://localhost:3000/api/GA/GA-get-id?_id=${session.id}`,
            { method: 'GET' });
    
          const gaId = await gaIdRaw.json();
    
          return gaId.user.grupo_automotriz_id;
        }
    
        if (router.isReady && session) {
          getIdGA().then((ga_id) =>
            setGA(ga_id)
          );
        }
    }, [router.isReady, session]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const result = await axios.post("/api/register", {
                    nombres: name,
                    apellidos: surname,
                    email: email,
                    password: password,
                    numero_telefonico: phone,
                    tipo_usuario: "ga_admin",
                    grupo_id: GA
                });

                router.back();

                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
    };

    //input validation  
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!name) {
            newErrors.nombres = "Please enter your name";
            isValid = false;
        }

        if (!surname) {
            newErrors.apellidos = "Please enter your surname";
            isValid = false;
        }

        if (!phone) {
            newErrors.telefono = "Please enter your phone number";
            isValid = false;
        }

        if (!email) {
            newErrors.correo = "Please enter your email";
            isValid = false;
        }

        if (!password) {
            newErrors.contraseña = "Please enter your password";
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmarContraseña = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCancel = () => {
    };

    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Registrar administrador de GA</h1>
                <h3 className={styles.boldText}>Ingresa los datos del administrador</h3>
                <form onSubmit={submitHandler}>
                    <div className={styles.inputContainer}>
                        <div className={styles.row}> 
                            <div className={styles.inputFieldContainer}>
                                <h5>Nombre(s)</h5>
                                <TextField
                                    className={styles.inputField}
                                    type="text"
                                    //className="form-control" no aplica 
                                    placeholder="Nombre(s)"
                                    fullWidth
                                    value={name}
                                    pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    error={!!errors.nombres}
                                    helperText={errors.nombres}
                                />                               
                            </div>
                            <div className={styles.inputFieldContainer}>
                                <h5>Apellido(s)</h5>
                                <TextField
                                        className={styles.inputField}
                                        type="text"
                                        //className="form-control" no aplica 
                                        placeholder="Apellido(s)"
                                        fullWidth
                                        value={surname}
                                        pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                        onChange={(e) => setSurname(e.target.value)}
                                        required
                                        error={!!errors.nombres}
                                        helperText={errors.nombres}
                                    />
                            </div>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                        <div className={styles.inputFieldContainer}>
                                <h5>Email</h5>
                                <TextField
                                    className={styles.longInputField}
                                    type="text"
                                    //className="form-control"
                                    placeholder="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.correo}
                                    helperText={errors.correo}
                                    required
                                />
                        </div>
                </div>
                <div className={styles.inputContainer}>
                        <div className={styles.inputFieldContainer}>
                                <h5>Teléfono</h5>
                                <TextField
                                    className={styles.longInputField}
                                    type="text"
                                    //className="form-control"
                                    placeholder="Teléfono"
                                    variant="outlined"
                                    fullWidth
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    error={!!errors.telefono}
                                    helperText={errors.telefono}
                                    required
                                />
                        </div>
                </div>

                <h3 className={styles.boldText}>Crear una contraseña</h3>
                <div className={styles.inputContainer}>
                        <div className={styles.row}>
                            <div className={styles.inputFieldContainer}>
                                <h5>Contraseña</h5>
                                <TextField
                                    className={styles.inputField}
                                    type="password"
                                    placeholder="Contraseña"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!errors.contraseña}
                                    helperText={errors.contraseña}
                                    required
                                    //type="password"
                                />
                            </div>
                            <div className={styles.inputFieldContainer}>
                                <h5>Confirmar Contraseña</h5>
                                <TextField
                                    className={styles.inputField}
                                    type="password"
                                    placeholder="Contraseña"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.confirmarContraseña}
                                    helperText={errors.confirmarContraseña}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    //type="password"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                <div className={styles.buttonContainer}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleCancel}
                            className={styles.button}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={styles.button}
                        >
                            Registrar administrador
                        </Button>
                    </div>
                </form>
            </div>    
            </div>
            
    );
}

export default RegistroAdmin;
