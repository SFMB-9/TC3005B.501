import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/add_manager.module.css';
import GANavbar from '@/components/providers/GA/navbar';

export default function AddAgency() {
    const [formValues, setFormValues] = useState({
        nombre: '',
        paginaWeb: '',
        telefono: '',
        correo: '',
        ciudad: '',
        calle: '',
        codigoPostal: '', 
    });

    const [errors, setErrors] = useState({
        nombre: '',
        paginaWeb: '',
        telefono: '',
        correo: '',
        ciudad: '',
        calle: '',
        codigoPostal: '', 
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
                <h1 className={styles.pageTitle}>Registro de agencia</h1>
                <h3 className={styles.boldText}>Datos administrativos</h3>
                <form>
                    <div className={styles.inputContainer}>
                        <div className={styles.row}>
                            <div className={styles.inputFieldContainer}>
                                <h5>Nombre</h5>
                                <TextField
                                    className={styles.inputField}
                                    id="nombres"
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.nombre}
                                    onChange={handleChange}
                                    error={!!errors.nombre}
                                    helperText={errors.nombre}
                                />
                            </div>
                            <div className={styles.inputFieldContainer}>
                                <h5>Teléfono</h5>
                                <TextField
                                    className={styles.inputField}
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
                        </div>
                    </div>

                    <div className={styles.inputFieldContainer}>
                            <h5>Página web</h5>
                                 <TextField
                                    className={styles.inputField}
                                    id="paginaWeb"
                                    label="URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.paginaWeb}
                                    onChange={handleChange}
                                    error={!!errors.paginaWeb}
                                    helperText={errors.paginaWeb}
                                />
                    </div>

                    <h3 className={styles.boldText}>Ubicación</h3>
                    <div className={styles.row}>
                        <div className={styles.inputFieldContainer}> 
                        <h5>Ciudad</h5>
                                <TextField
                                    className={styles.inputField}
                                    //id=""
                                    label="Ciudad, Estado."
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.ciudad}
                                    onChange={handleChange}
                                    error={!!errors.ciudad}
                                    helperText={errors.ciudad}
                                />

                        </div>
                        
                        <div className={styles.inputFieldContainer}> 
                        <h5>Codígo postal</h5>
                                <TextField
                                    className={styles.inputField}
                                    //id=""
                                    label="Codigo postal"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.codigoPostal}
                                    onChange={handleChange}
                                    error={!!errors.codigoPostal}
                                    helperText={errors.codigoPostal}
                                />

                        </div>

                    </div>
                    <div className={styles.inputContainer}>
                        <h5>Calle</h5>
                        <TextField
                            className={styles.longInputField}
                            type="text"
                            label="Calle"
                            variant="outlined"
                            fullWidth
                            value={formValues.street}
                            onChange={handleChange}
                            error={!!errors.correo}
                            helperText={errors.correo}
                            /*onChange={(e) => setStreet(e.target.value)}
                            required*/
                            
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