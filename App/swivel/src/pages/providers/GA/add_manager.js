import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/add_manager.module.css';
import GANavbar from '@/components/providers/GA/navbar';

export default function AddManager() {
    const [formValues, setFormValues] = useState({
        nombres: '',
        apellidos: '',
        telefono: '',
        agencia: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
    });

    const [errors, setErrors] = useState({
        nombres: '',
        apellidos: '',
        telefono: '',
        agencia: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleAddManager = (event) => {
        event.preventDefault();

        let isValid = true;
        const newErrors = { ...errors };

        // Check if any of the fields are empty
        for (const key in formValues) {
            if (formValues[key] === '') {
                newErrors[key] = 'This field is required';
                isValid = false;
            } else {
                newErrors[key] = '';
            }
        }

        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.correo)) {
            newErrors.correo = 'Please enter a valid email';
            isValid = false;
        }

        // Check if the passwords match
        if (formValues.contraseña !== formValues.confirmarContraseña) {
            newErrors.confirmarContraseña = 'Passwords do not match';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return; // Exit the function if any validation fails
        }

        console.log('Form values:', formValues);
        // Upload form data or perform other operations
    };

    const handleCancel = () => {
        // Handle cancel logic here
        console.log('Cancel');
    };

    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Agregar Gerente</h1>
                <h3 className={styles.boldText}>Ingresa los datos del gerente</h3>
                <form>
                    <div className={styles.inputContainer}>
                        <div className={styles.row}>
                            <div className={styles.inputFieldContainer}>
                                <h5>Nombre(s)</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="nombres"
                                    label="Nombre(s)"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.nombres}
                                    onChange={handleChange}
                                    error={!!errors.nombres}
                                    helperText={errors.nombres}
                                />
                            </div>
                            <div className={styles.inputFieldContainer}>
                                <h5>Apellido(s)</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="apellidos"
                                    label="Apellido(s)"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.apellidos}
                                    onChange={handleChange}
                                    error={!!errors.apellidos}
                                    helperText={errors.apellidos}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Teléfono</h5>
                        <TextField
                            className={styles.longInputField}
                            id="telefono"
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            value={formValues.telefono}
                            onChange={handleChange}
                            error={!!errors.telefono}
                            helperText={errors.telefono}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Agencia</h5>
                        <TextField
                            className={styles.longInputField}
                            id="agencia"
                            label="Agencia"
                            variant="outlined"
                            fullWidth
                            value={formValues.agencia}
                            onChange={handleChange}
                            error={!!errors.agencia}
                            helperText={errors.agencia}
                        />
                    </div>

                    <h3 className={styles.boldText}>Credenciales</h3>
                    <div className={styles.inputContainer}>
                        <h5>Correo Electrónico</h5>
                        <TextField
                            className={styles.longInputField}
                            id="correo"
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            value={formValues.correo}
                            onChange={handleChange}
                            error={!!errors.correo}
                            helperText={errors.correo}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.row}>
                            <div className={styles.inputFieldContainer}>
                                <h5>Contraseña</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="contraseña"
                                    label="Contraseña"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.contraseña}
                                    onChange={handleChange}
                                    error={!!errors.contraseña}
                                    helperText={errors.contraseña}
                                    type="password"
                                />
                            </div>
                            <div className={styles.inputFieldContainer}>
                                <h5>Confirmar Contraseña</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="confirmarContraseña"
                                    label="Confirmar Contraseña"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.confirmarContraseña}
                                    onChange={handleChange}
                                    error={!!errors.confirmarContraseña}
                                    helperText={errors.confirmarContraseña}
                                    type="password"
                                />
                            </div>
                        </div>
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
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            className={styles.button}
                            disableElevation
                            sx={{
                                backgroundColor: '#F55C7A',
                                fontFamily: 'lato',
                                fontWeight: 'bold',
                                ':hover': { backgroundColor: '#BABABA' },
                            }}
                            onClick={handleAddManager}
                        >
                            Agregar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
