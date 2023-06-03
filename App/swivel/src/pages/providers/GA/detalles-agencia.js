/*
Luis Javier Karam
30/5/2023

Page to view the details of an agency and edit them as well as add and remove managers and sellers
*/

import React, { useState, useEffect } from "react";
import GANavbar from '@/components/providers/GA/navbar';
import styles from '@/styles/agency_details.module.css';
import { Button, TextField, FormHelperText } from '@mui/material';
import DataTable from '@/components/general/Table';
import { DeleteForever, Edit } from '@mui/icons-material';
import PopUpComponent from '@/components/general/Popup';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AgencyDetails() {

    const router = useRouter();

    const [agency, setAgency] = useState(null);
    const [managers, setManagers] = useState(null);
    const [sellers, setSellers] = useState(null);
    const [marca, setMarca] = useState('')
    const [GA, setGA] = useState(null)

    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [calle, setCalle] = useState('')
    const [num_ext, setNX] = useState('')
    const [num_int, setNI] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [PC, setPC] = useState('')

    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/GA/pull-agencia', { params: { id: router.query.id } });
            setAgency(response.data.agency);
            setManagers(response.data.managers);
            setSellers(response.data.sellers);
            setMarca(response.data.agency.nombres.split(' ')[0]);
            setGA(response.data.GA.nombres);

            setPhone(agency.numero_telefonico);
            setEmail(agency.email);

            setCalle(agency.direccion.calle);
            setNX(agency.direccion.numero_exterior);
            setNI(agency.direccion.numero_interior);
            setCity(agency.direccion.ciudad);
            setState(agency.direccion.estado);
            setCountry(agency.direccion.pais);
            setPC(agency.direccion.codigo_postal);

        }
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const deleteEntry = async (entry) => {
        try {
            await axios.delete('/api/GA/eliminar-gerente', { id: entry });

            fetchResults();
        }
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const editEntry = (entry) => {
        router.push(`providers/new_GA/edit-gerente?id=${entry}`);
    };

    const addManager = () => {
        router.push(`providers/manager/signup?GA_id=${agency.grupo_automotriz_id}&agency_id=${router.query.id}`);
    };

    const addSeller = () => {
        router.push(`providers/seller/signup?id=${router.query.id}`);
    };

    const saveAgency = async () => {
        try {
            await axios.put('/api/GA/actualizar-agencia', { id: id, phone: phone, email: email, calle: calle, num_ext: num_ext, num_int: num_int, city: city, state: state, country: country, PC: PC });

            fetchResults();
        }
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };


    const sellerColumns = [
        {
            field: 'Nombre',
            headerName: 'Nombre',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'Correo',
            headerName: 'Correo',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'Telefono',
            headerName: 'Teléfono',
            minWidth: 150,
            flex: 1,
        }
    ];

    const managerColumns = [
        { field: 'Nombre', headerName: 'Nombre', width: 200 },
        { field: 'Mail', headerName: 'Correo', width: 200 },
        {
            field: 'delete',
            headerName: 'Borrar (PERMANENTE)',
            type: 'delete',
            width: 200,
            renderCell: (params) => (
                <PopUpComponent
                    title="Confirmar Eliminación"
                    popUpContent={<div className={styles.popupText}>
                        <h4>¿Estás seguro de que deseas eliminar este gerente?</h4>
                        <p className={styles.warningText}>Esta acción no se puede deshacer.</p>
                    </div>}
                    btnOpen={
                        <Button>
                            <DeleteForever />
                        </Button>
                    }
                    btnClose={
                        <div>
                            <Button
                                variant="contained"
                                disableElevation
                                className={styles.popupButton}
                                sx={{
                                    backgroundColor: '#F55C7A',
                                    fontFamily: 'lato',
                                    fontWeight: 'bold',
                                    ':hover': { backgroundColor: '#BABABA' },
                                }}
                                onClick={() => handleDelete(params.row._id)}
                            >
                                Eliminar
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                className={styles.popupButton}
                                sx={{
                                    backgroundColor: '#E0E0E0',
                                    fontFamily: 'lato',
                                    fontWeight: 'bold',
                                    ':hover': { backgroundColor: '#BABABA' },
                                }}
                                onClick={() => setIsOpen(false)} // Use setIsOpen from useState
                            >
                                Cancelar
                            </Button>
                        </div>
                    }
                    setIsOpen={setIsOpen} // Pass setIsOpen function as a prop
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Editar',
            type: 'actions',
            width: 100,
            renderCell: () => (
                <Button
                    variant="contained"
                    disableElevation
                    sx={{
                        backgroundColor: '#F55C7A',
                        fontFamily: 'lato',
                        fontWeight: 'bold',
                        ':hover': { backgroundColor: '#BABABA' },
                    }}
                >
                    Editar
                </Button>
            ),
        },

    ]

    const sellerRows = sellers.map((entry) => (
        <li key={entry._id}>
            <div>
                <strong>Name:</strong> {entry.nombres}
            </div>

            <div>
                <strong>Last Name:</strong> {entry.apellidos}
            </div>

            <div>
                <strong>Email:</strong> {entry.email}
            </div>

            <div>
                <strong>Cellphone:</strong> {entry.numero_telefonico}
            </div>
        </li>
    ));

    const managerRows = managers.map((entry) => (
        <li key={entry._id}>
            <div>
                <strong>Name:</strong> {entry.nombres}
            </div>

            <div>
                <strong>Last Name:</strong> {entry.apellidos}
            </div>

            <div>
                <strong>Email:</strong> {entry.email}
            </div>

            <div>
                <strong>Cellphone:</strong> {entry.numero_telefonico}
            </div>

            <button onClick={() => deleteEntry(entry._id.toString())}>Delete</button>
            <button onClick={() => editEntry(entry._id)}>Edit</button>
        </li>
    ));


    // Old front implementation

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        console.log('Deleting item with ID:', id);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false); // Define isOpen state


    return (
        <div>
            <GANavbar />

            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Detalle de la Agencia</h1>

                <div className={styles.editHeader}>
                    <h4 className={styles.sectionTitle}>Datos de la Agencia</h4>
                    <Edit className={styles.icon} />
                </div>
                <div className={styles.inputFieldContainer}>
                    <div>
                        <div>
                            <h5>Nombre (No se puede editar)</h5>
                            <TextField
                                className={styles.inputField}
                                id="nombre"
                                label={agency.nombres}
                                variant="outlined"
                                fullWidth
                                enabled={false}
                            />
                        </div>

                        <div>
                            <h5>Marca (No se puede editar)</h5>
                            <TextField
                                className={styles.inputField}
                                id="marca"
                                label={marca}
                                variant="outlined"
                                fullWidth
                                enabled={false}
                            />
                        </div>

                        <div>
                            <h5>Teléfono</h5>
                            <TextField
                                className={phone}
                                id="telefono"
                                label={phone}
                                variant="outlined"
                                fullWidth
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <h5>Correo electrónico</h5>
                            <TextField
                                className={styles.inputField}
                                id="correo"
                                label={email}
                                variant="outlined"
                                fullWidth
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <h5>Grupo Automotriz (No se puede editar) </h5>
                            <TextField
                                className={styles.inputField}
                                id="grupo"
                                label={GA}
                                variant="outlined"
                                fullWidth
                                enabled={false}
                            />
                        </div>
                    </div>
                </div>


                <h4 className={styles.sectionTitle}>Dirección de agencia</h4>
                <div>
                    <h5>Calle</h5>
                    <TextField
                        className={styles.longInputField}
                        id="direccion"
                        label={calle}
                        variant="outlined"
                        fullWidth
                        onChange={e => setCalle(e.target.value)}
                    />
                </div>
                <div>
                    <div>
                        <h5>Número Exterior</h5>
                        <TextField
                            className={styles.longInputField}
                            id="num_ext"
                            label={num_ext}
                            variant="outlined"
                            fullWidth
                            onChange={e => setNX(e.target.value)}
                        />
                    </div>

                    <div>
                        <h5>Número Interior</h5>
                        <TextField
                            className={styles.longInputField}
                            id="num_int"
                            label={num_int}
                            variant="outlined"
                            fullWidth
                            onChange={e => setNI(e.target.value)}
                        />
                    </div>
                    <div>
                        <h5>Ciudad</h5>
                        <TextField
                            className={styles.longInputField}
                            id="ciudad"
                            label={city}
                            variant="outlined"
                            fullWidth
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <h5>Estado</h5>
                        <TextField
                            className={styles.longInputField}
                            id="estado"
                            label={state}
                            variant="outlined"
                            fullWidth
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                    <div>
                        <h5>País</h5>
                        <TextField
                            className={styles.longInputField}
                            id="pais"
                            label={country}
                            variant="outlined"
                            fullWidth
                            onChange={e => setCountry(e.target.value)}
                        />
                    </div>
                    <div>
                        <h5>Código Postal</h5>
                        <TextField
                            className={styles.longInputField}
                            id="codigo_postal"
                            label={PC}
                            variant="outlined"
                            fullWidth
                            onChange={e => setPC(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.saveButtonContainer}>
                <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    className={styles.Button}
                    onClick={() => saveAgency()}
                    sx={{
                        backgroundColor: '#F55C7A',
                        fontFamily: 'lato',
                        fontWeight: 'bold',
                        ':hover': { backgroundColor: '#BABABA' },
                    }}
                >
                    Guardar Cambios
                </Button>
            </div>


            <div className={styles.tableHeaderContainer}>
                <h4 className={styles.sectionTitle}>Gerentes</h4>
                <Button
                    variant="contained"
                    className={styles.button}
                    onClick={() => addManager()}
                    disableElevation
                    sx={{
                        backgroundColor: '#F55C7A',
                        fontFamily: 'lato',
                        fontWeight: 'bold',
                        ':hover': { backgroundColor: '#BABABA' },
                    }}
                >
                    Agregar Gerente
                </Button>
            </div>

            {/* Tabla de gerentes */}
            <div className={styles.firstTableContainer}>
                <DataTable
                    save={false}
                    columns={managerColumns}
                    rows={managers}
                />
            </div>
            <div className={styles.tableHeaderContainer}>
                <h4 className={styles.sectionTitle}>Vendedores</h4>
                <Button
                    variant="contained"
                    disableElevation
                    className={styles.button}
                    onClick={() => addSeller()}
                    sx={{
                        backgroundColor: '#F55C7A',
                        fontFamily: 'lato',
                        fontWeight: 'bold',
                        ':hover': { backgroundColor: '#BABABA' },
                    }}
                >
                    Agregar Vendedor
                </Button>
            </div>

            {/* Tabla de vendedores */}
            <div className={styles.secondTableContainer}>
                <DataTable
                    save={false}
                    columns={[
                        { field: 'Nombre', headerName: 'Nombre', width: 200 },
                        { field: 'Mail', headerName: 'Correo', width: 200 },
                        { field: 'Telefono', headerName: 'Teléfono', width: 200 },
                    ]}
                    rows={sellerRows}
                />
            </div>
        </div>

    );
}
