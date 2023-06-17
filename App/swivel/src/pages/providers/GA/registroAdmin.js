"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/add_manager.module.css";
import GANavbar from "@/components/providers/GA/navbar";
import { useSession } from "next-auth/react";
import AuthComponent from "@/components/login/auth_component";

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
            let gaIdRaw = await fetch(`/api/GA/GA-get-id?_id=${session.id}`,
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

                if (session) {
                    router.back();
                } else {
                    router.push("/auth/providers/login");
                }


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
        router.back();
    };

    if (session) {
        return (
            <div>
                <GANavbar />
                <div className={styles.mainContainer}>
                    <form onSubmit={submitHandler}>
                        <div className="container">
                            <div className="row mt-4">
                                <h3 className={styles.boldText}>Ingresa los datos del administrador</h3>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12 col-md-6">
                                    <h5>Nombre(s)</h5>
                                    <TextField
                                        size="small"
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
                                <div className="col-12 col-md-6">
                                    <h5>Apellido(s)</h5>
                                    <TextField
                                        size="small"
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
                            <div className="row mt-4">
                                <div className="col-12 col-md-6">
                                    <h5>Correo electrónico</h5>
                                    <TextField
                                        size="small"
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
                                <div className="col-12 col-md-6">
                                    <h5>Teléfono</h5>
                                    <TextField
                                        size="small"
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
                            <div className="row mt-4">
                                <h3 className={styles.boldText}>Crear una contraseña</h3>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12 col-md-6">
                                    <h5>Contraseña</h5>
                                    <TextField
                                        size="small"
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
                                <div className="col-12 col-md-6">
                                    <h5>Confirmar Contraseña</h5>
                                    <TextField
                                        size="small"
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

                            <div className="row mt-4">
                                <div className="col-12 col-md-6">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleCancel}
                                        className="w-100"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className="w-100"
                                    >
                                        Registrar administrador
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
    else {
        return (
            <>
                <AuthComponent
                    title="Regístrate ahora"
                    backImage=""
                    cardImage="/providers_login_image.png"
                    backColor="white"
                    titleText="Portal Swivel GA"
                    bodyText="Inicia sesión para administrar tu grupo automotriz"
                    textColor="black"
                    fields={
                        <form onSubmit={submitHandler}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            size="small"
                                            className={styles.inputField}
                                            type="text"
                                            //className="form-control" no aplica 
                                            placeholder="Nombre(s)"
                                            fullWidth
                                            label="Nombre(s)"
                                            value={name}
                                            pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            error={!!errors.nombres}
                                            helperText={errors.nombres}
                                            style={{ marginBottom: "0.8rem" }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            size="small"
                                            className={styles.inputField}
                                            type="text"
                                            //className="form-control" no aplica 
                                            placeholder="Apellido(s)"
                                            fullWidth
                                            label="Apellido(s)"
                                            value={surname}
                                            pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+"
                                            onChange={(e) => setSurname(e.target.value)}
                                            required
                                            error={!!errors.nombres}
                                            helperText={errors.nombres}
                                            style={{ marginBottom: "0.8rem" }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            size="small"
                                            className={styles.longInputField}
                                            type="text"
                                            //className="form-control"
                                            placeholder="Email"
                                            variant="outlined"
                                            fullWidth
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={!!errors.correo}
                                            helperText={errors.correo}
                                            required
                                            style={{ marginBottom: "0.8rem" }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            size="small"
                                            className={styles.longInputField}
                                            type="text"
                                            //className="form-control"
                                            placeholder="Teléfono"
                                            variant="outlined"
                                            fullWidth
                                            label="Teléfono"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            error={!!errors.telefono}
                                            helperText={errors.telefono}
                                            required
                                            style={{ marginBottom: "0.8rem" }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            size="small"
                                            className={styles.inputField}
                                            type="password"
                                            placeholder="Contraseña"
                                            variant="outlined"
                                            fullWidth
                                            label="Contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={!!errors.contraseña}
                                            helperText={errors.contraseña}
                                            required
                                            style={{ marginBottom: "0.8rem" }}
                                        //type="password"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <TextField
                                            size="small"
                                            className={styles.inputField}
                                            type="password"
                                            label="Confirmar contraseña"
                                            placeholder="Contraseña"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.confirmarContraseña}
                                            helperText={errors.confirmarContraseña}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            //type="password"
                                            required
                                            style={{ marginBottom: "0.8rem" }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            style={{
                                                flex: '25%',
                                                backgroundColor: '#F55C7A',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                width: '100%',
                                                padding: '0.5rem 1rem',
                                            }}
                                        >
                                            Registrarme como administrador
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                />
            </>
        );
    }
}

export default RegistroAdmin;
