import React from 'react'
import { useState } from 'react';
import GANavbar from '@/components/providers/GA/navbar'
import styles from '@/styles/agency_details.module.css';
import { Button, TextField, FormHelperText } from '@mui/material';
import DataTable from '@/components/general/Table';
import { DeleteForever, Edit } from '@mui/icons-material';
import PopUpComponent from '@/components/general/Popup';
import { useRouter } from 'next/router';
import axios from 'axios';


export default function informacionGA() {
    const router = useRouter();
    const id = "6477e14bae27e558e56c3c13";

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [paginaWeb, setPaginaWeb] = useState('');
    const [calle, setCalle] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [estado, setEstado] = useState('');



    const columns = []
    const rows = []

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }))};



    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                <h1>Información de grupo automotriz</h1>
                <h3> Datos de grupo </h3>
                <div className={styles.row}>
                    <div>
                        <h5>Nombre</h5>
                        <TextField
                            className={nombre}
                            id="nombre"
                            label="Nombre de grupo"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h5>Teléfono</h5>
                        <TextField
                            className={telefono}
                            id="telefono"
                            label="+5215512345678"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <h5>Pagina web</h5>
                    <TextField
                        className={nombre}
                        id="nombre"
                        label="dominio.com"
                        variant="outlined"
                        fullWidth
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                <h3> Dirección </h3>
                <div className={styles.row}>
                    <div>
                        <h5>Calle</h5>
                        <TextField
                            className={calle}
                            id="calle"
                            label="Calle"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h5>Código Postal</h5>
                        <TextField
                            className={codigoPostal}
                            id="codigoPostal"
                            label="12000"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <h5>Ciudad</h5>
                        <TextField
                            className={ciudad}
                            id="ciudad"
                            label="Nombre de grupo"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h5>Estado</h5>
                        <TextField
                            className={estado}
                            id="estado"
                            label="Jalisco"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h1>Gestión de administradores alternos</h1>
                <DataTable
                    columns={columns}
                    rows={rows}
                />

            </div>
        </div>
    )
}