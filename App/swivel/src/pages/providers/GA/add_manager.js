import React, { useState } from 'react';
import styles from '@/styles/add_manager.module.css';
import GANavbar from '@/components/providers/GA/navbar';
import { Container,Typography, TextField, Button } from "@mui/material";


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
        <>
        <GANavbar />
        <Container className="pt-3 p-5">
            <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                fontSize={{ xs: 25, md: 28, lg: 33 }}
                className="pt-2 pb-4"
            >
                Agregar Gerente
            </Typography>
            <Typography
                fontFamily="Lato"
                color="#1F1F1F"
                className="pb-3"
                fontWeight="bold"
                fontSize={{ xs: 16, md: 17, lg: 19 }}
            >
                Ingresa los datos del gerente
            </Typography>
            <form>
                <div className="d-sm-flex justify-content-between mb-4">
                    <div className="row">
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Nombre(s)
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="nombres"
                                label="Nombre(s)"
                                variant="outlined"
                                size="small"
                                type="text"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.nombres}
                                onChange={handleChange}
                                error={!!errors.nombres}
                                helperText={errors.nombres} 
                            />
                        </div>
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Apellido(s)
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="apellidos"
                                label="Apellido(s)"
                                variant="outlined"
                                size="small"
                                type="text"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.apellidos}
                                onChange={handleChange}
                                error={!!errors.apellidos}
                                helperText={errors.apellidos}
                            />
                        </div>
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Teléfono
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="telefono"
                                label="Teléfono"
                                variant="outlined"
                                size="small"
                                type="text"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.telefono}
                                onChange={handleChange}
                                error={!!errors.telefono}
                                helperText={errors.telefono}
                            />
                        </div>
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Agencia
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="agencia"
                                label="Agencia"
                                variant="outlined"
                                size="small"
                                type="text"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.agencia}
                                onChange={handleChange}
                                error={!!errors.agencia}
                                helperText={errors.agencia}
                            />
                        </div>
                        <Typography
                            fontFamily="Lato"
                            color="#1F1F1F"
                            className="pt-5 pb-1"
                            fontWeight="bold"
                            fontSize={{ xs: 16, md: 17, lg: 19 }}
                        >
                            Credenciales
                        </Typography>
                        <div >
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Correo Electrónico
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="correo"
                                label="Correo Electrónico"
                                variant="outlined"
                                size="small"
                                type="text"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.correo}
                                onChange={handleChange}
                                error={!!errors.correo}
                                helperText={errors.correo}
                            />
                        </div>
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Contraseña
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="contraseña"
                                label="Contraseña"
                                variant="outlined"
                                size="small"
                                type="password"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.contraseña}
                                onChange={handleChange}
                                error={!!errors.contraseña}
                                helperText={errors.contraseña}
                            />
                        </div>
                        <div className="col-xl-6 col-md-8">
                            <Typography
                                fontFamily="Lato"
                                color="#8A8A8A"
                                className="pb-3"
                                fontSize={{ xs: 15, md: 16, lg: 18 }}
                            >
                                Confirmar Contraseña
                            </Typography>
                            <TextField
                                required
                                className="mb-3 w-100"
                                id="confirmarContraseña"
                                label="Confirmar Contraseña"
                                variant="outlined"
                                size="small"
                                type="password"
                                
                                pattern="[a-zA-Z]+"
                                inputProps={{ min: "0", style: { fontFamily: "Lato" } }}
                                InputLabelProps={{ style: { fontFamily: "Lato" } }}
                                value={formValues.confirmarContraseña}
                                onChange={handleChange}
                                error={!!errors.confirmarContraseña}
                                helperText={errors.confirmarContraseña}
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
        </Container>
        </>
    );
}
