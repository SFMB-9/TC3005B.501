import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/edit_GA.module.css';
import BuyerNavbar from '@/components/buyer/navbar'; //TODO CHANGE TO GA NAVBAR

export default function EditGA() {
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSave = (event) => {
        event.preventDefault();
        console.log('Form values:', formValues);
        // Upload form data
    };

    const handleCancel = () => {
        // Handle cancel logic here
        console.log('Cancel');
    };

    return (
        <div>
            <BuyerNavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Editar Perfil</h1>
                <form>
                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <h5>Nombre(s)</h5>
                            <TextField
                                className={styles.inputFieldLeft}
                                id="nombre"
                                label="Nombre actual"
                                variant="outlined"
                                fullWidth
                                value={formValues.nombre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <h5>Apellido(s)</h5>
                            <TextField
                                className={styles.inputField}
                                id="apellido"
                                label="Apellido actual"
                                variant="outlined"
                                fullWidth
                                value={formValues.apellido}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Correo</h5>
                        <TextField
                            className={styles.longInputField}
                            id="correo"
                            label="Correo actual"
                            variant="outlined"
                            fullWidth
                            value={formValues.correo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Teléfono</h5>
                        <TextField
                            className={styles.longInputField}
                            id="telefono"
                            label="Teléfono actual"
                            variant="outlined"
                            fullWidth
                            value={formValues.telefono}
                            onChange={handleChange}
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
                            onClick={handleSave}
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
