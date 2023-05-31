"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { TextField, Button, Typography, Container } from '@mui/material';
import GANavbar from '@/components/providers/GA/navbar';

export default function SearchResults() {

    const router = useRouter();
    const { id } = router.query

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
  
    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/GA/pull-gerente', { params: { id: id }});
            setName(response.data.manager.nombres);
            setSurname(response.data.manager.apellidos);
            setEmail(response.data.manager.email);
            setPhone(response.data.manager.numero_telefonico);
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
        await axios.put('/api/GA/pull-gerente', { id: id, name: name, surname: surname, email: email, phone: phone })
    };

    const cancelHandler = () => {
        router.push(`providers/new_GA/detalles-agencia`);
    };

    return (
        <>
            <GANavbar/>
            <Container sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'flex-start', gap: '25px' }}>
                <Typography variant="h2">Agregar Gerente</Typography>
                <Container sx={{  flexDirection: 'column', display: 'flex', justifyContent: 'flex-start', gap: '25px' }}>
                    <Typography variant='h3'>Ingresa los datos del gerente</Typography>
                    <Container sx={{ display: 'grid', gridTemplateColumns: 'repeat(2 , 1fr)', gridTemplateRows: 'repeat(3 , 1fr)', gridColumnGap: '10px', gridRowGap: '5px'}}>
                        <TextField
                            sx={{ minWidth:150, maxWidth: 570, gridArea: '1/1/2/2'}}
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Nombre(s)"
                            placeholder="Nombre(s)"
                            size="medium"
                            margin="none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            sx={{minWidth:150, maxWidth: 570, gridArea: '1/2/2/3'}}
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Apellidos"
                            placeholder="Apellidos"
                            size="medium"
                            margin="none"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <TextField
                            
                            sx={{minWidth:150, maxWidth: 570, gridArea: '2/1/3/2'}}
                            color="primary"
                            variant="outlined"
                            type="text"
                            label= "Teléfono"
                            placeholder="Teléfono"
                            size="medium"
                            margin="none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}    
                        />
                        <TextField
                            
                            sx={{minWidth:150, maxWidth: 570, gridArea: '3/1/4/2'}}
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Agencia (automático)"
                            placeholder="Agencia"
                            size="medium"
                            margin="none"
                        />
                    </Container>
                </Container>
                <Container sx={{  flexDirection: 'column', display: 'flex', justifyContent: 'flex-start', gap: '10px'  }}>
                    <Typography variant='h3'>Credenciales</Typography>
                    <Container sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1f)', gridTemplateRows: 'repeat(5, 1f)', gridColumnGap: '10px', gridRowGap: '5px'}}>
                        <TextField
                            
                            sx={{minWidth:150, maxWidth: 570, gridArea: '1/1/2/2'}}
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            size="medium"
                            margin="none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>
                        <TextField
                            
                            sx={{minWidth:150, maxWidth: 570, gridArea: '2/1/3/2'}}
                            color="primary"
                            variant="outlined"
                            type="password"
                            label="Contraseña"
                            placeholder="Contraseña"
                            size="medium"
                            margin="none"
                        ></TextField>
                        <TextField
                            
                            sx={{minWidth:150, maxWidth: 570, gridArea: '2/2/3/2'}}
                            color="primary"
                            variant="outlined"
                            type="password"
                            label="Confirmar contraseña"
                            placeholder="Confirmar contraseña"
                            size="medium"
                            margin="none"
                        ></TextField>
                    </Container>
                </Container>
                <Container sx={{  flexDirection: 'row', display: 'flex', justifyContent: 'center', gap: '25px' }}>
                    <Button
                        
                        sx={{width: 153}}
                        variant="contained"
                        color="primary"
                        onClick={submitHandler}
                    >Agregar</Button>
                    <Button
                        
                        sx={{width: 153}}
                        variant="contained"
                        color="custom"
                        onClick={cancelHandler}
                    >Cancelar</Button>
                </Container>
                <Container sx={{display: 'flex'}}></Container>
            </Container>
        </>
    );
};    