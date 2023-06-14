import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import styles from "@/styles/add_manager.module.css";
import GANavbar from "@/components/providers/GA/navbar";
import { useSession } from "next-auth/react";

export default function MergedSignup() {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [GA, setGA] = useState("");

    const router = useRouter();
    // const GA = router.query.GA_id;
    const agency = router.query.agency_id;

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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { data } = await axios.post("/api/register", {
                    nombres: name,
                    apellidos: surname,
                    email: email.toLocaleLowerCase(),
                    password: password,
                    tipo_usuario: "manager",
                    agencia_id: agency,
                    grupo_automotriz_id: GA,
                    numero_telefonico: phone,
                });
                router.back();

                console.log(data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (GA) {
        return (
            <div>
                <GANavbar />
                <div className={styles.mainContainer}>
                    <h1 className="mb-4">Agregar Gerente</h1>
                    <form onSubmit={submitHandler}>
                        <div className="container">
                            <div className="row">
                                <h3 className={styles.boldText}>Ingresa los datos del gerente</h3>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12 col-md-6">
                                    <h5>Nombre(s)</h5>
                                    <TextField
                                        className={styles.inputField}
                                        size="small"
                                        id="nombres"
                                        variant="outlined"
                                        placeholder="Nombre(s)"
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        error={!!errors.nombres}
                                        helperText={errors.nombres}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <h5>Apellido(s)</h5>
                                    <TextField
                                        className={styles.inputField}
                                        size="small"
                                        id="apellidos"
                                        variant="outlined"
                                        placeholder="Apellido(s)"
                                        fullWidth
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        error={!!errors.apellidos}
                                        helperText={errors.apellidos}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <h5>Teléfono</h5>
                                    <TextField
                                        className={styles.longInputField}
                                        size="small"
                                        id="telefono"
                                        placeholder="Teléfono"
                                        variant="outlined"
                                        fullWidth
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        error={!!errors.telefono}
                                        helperText={errors.telefono}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <h3 className={styles.boldText}>Credenciales</h3>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <h5>Correo Electrónico</h5>
                                    <TextField
                                        className={styles.longInputField}
                                        size="small"
                                        id="correo"
                                        variant="outlined"
                                        placeholder="Correo Electrónico"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.correo}
                                        helperText={errors.correo}
                                    />
                                </div>
                            </div>
                                <div className="row mt-4">
                                    <div className="col-12 col-md-6">
                                        <h5>Contraseña</h5>
                                        <TextField
                                            className={styles.inputField}
                                            size="small"
                                            id="contraseña"
                                            variant="outlined"
                                            placeholder="Contraseña"
                                            fullWidth
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={!!errors.contraseña}
                                            helperText={errors.contraseña}
                                            type="password"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h5>Confirmar Contraseña</h5>
                                        <TextField
                                            className={styles.inputField}
                                            size="small"
                                            id="confirmarContraseña"
                                            variant="outlined"
                                            placeholder="Confirmar Contraseña"
                                            fullWidth
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            error={!!errors.confirmarContraseña}
                                            helperText={errors.confirmarContraseña}
                                            type="password"
                                        />
                                    </div>
                                </div>
                            <div className="row mt-4 mb-5">
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
                                    Registrar
                                </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <p>Cargando...</p>
        );
    }
}
