import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '@/styles/edit_GA.module.css';
import BuyerNavbar from '@/components/buyer/navbar'; //TODO CHANGE TO GA NAVBAR
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditGA() {
    const router = useRouter();
    const id = "6477e14bae27e558e56c3c13";

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get("/api/managerProfile/managerP", { params: { id: id } });
            console.log(response.data.userData);
            const userData = response.data.userData;
            setName(userData.nombres || ''); // Provide an empty string as the initial value
            setSurname(userData.surname || ''); // Provide an empty string as the initial value
            setEmail(userData.email || ''); // Provide an empty string as the initial value
            setPhone(userData.numero_telefonico || ''); // Provide an empty string as the initial value
        }
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Fetch results when the component mounts
    useEffect(() => {
        fetchResults();
    }, []);

    const submitHandler = async () => {
        await axios.put('/api/GA/editGA', { id, name, surname, email, phone });
    };

    const cancelHandler = () => {
        router.push(`/providers/GA`);
    };




    //Old code
    // const [formValues, setFormValues] = useState({
    //     nombre: '',
    //     apellido: '',
    //     correo: '',
    //     telefono: '',
    // });

    // const handleChange = (event) => {
    //     const { id, value } = event.target;
    //     setFormValues((prevValues) => ({
    //         ...prevValues,
    //         [id]: value,
    //     }));
    // };

    // const handleSave = (event) => {
    //     event.preventDefault();
    //     console.log('Form values:', formValues);
    //     // Upload form data
    // };

    // const handleCancel = () => {
    //     // Handle cancel logic here
    //     console.log('Cancel');
    // };

    return (
        <div>
            <BuyerNavbar />
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Editar Perfil</h1>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <h5>Nombre(s)</h5>
                        <TextField
                            className={styles.inputFieldLeft}
                            id="nombre"
                            label={name}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <h5>Apellido(s)</h5>
                        <TextField
                            className={styles.inputField}
                            id="apellido"
                            label={surname}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <h5>Correo</h5>
                    <TextField
                        className={styles.longInputField}
                        id="correo"
                        label={email}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <h5>Teléfono</h5>
                    <TextField
                        className={styles.longInputField}
                        id="telefono"
                        label={phone}
                        variant="outlined"
                        fullWidth
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
