"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/add_manager.module.css";
import GANavbar from "@/components/providers/GA/navbar";


const RegistroAdmin = () => {

    const router = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({}); 
    const [GA, setGA] = useState();

    useEffect(() => {
        const fetchGA = async () => {
            const response = await axios.get("/api/managerProfile/managerP", {
                params: {
                    id: "6477e6e3ae27e558e56c3c18"
                }
            });
            setGA(response.data.userData);
        };

        fetchGA();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(GA);
        try {
            const response = await axios.post("/api/GA/Admin-register", {
                tipo_usuario: 'GA',
                nombre_agencia: GA.nombres,
                nombres: name,
                last_name: surname,
                email: email,
                password: password,
                numero_telefonico: phone,
                grupo_automotriz_id: GA._id
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
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
                                    //type="password"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                <div className={styles.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={styles.button}
                        >
                            Register
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleCancel}
                            className={styles.button}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>    
            </div>
            
    )
}

export default registroAdmin;
