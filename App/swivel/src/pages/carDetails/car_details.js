/*
Tonatiuh Reyes

Page to show the details of a car selected from the catalog.
*/

import React, { useState, useEffect } from "react";
import { Grid, AppBar, Toolbar, Container, Typography, Button, Box  } from "@mui/material";

import car from "./car.json";

export default function CarDetails() {
  const [state, setState] = React.useState({
    
  
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  return (
    <>
      <Container maxWidth={1900}>
        <Button variant="text" href="/catalog">Regresar al Catálogo</Button>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={5}>
            <Grid container justifyContent="center" direction="column" alignItems="center" >
              <Grid item>Imagen</Grid>
              <Grid container direction="row" spacing={2} justifyContent="flex-end" item>
                <Grid item xs={6.5}>display imagenes</Grid>
                <Grid item >iconos</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ p: 2, border: '1px dashed grey' }}>
              <Grid direction="column">
                <Grid></Grid>
                <Typography>Año: {car.year}</Typography>
                <Typography>{car.brand} {car.model}</Typography>
                <Typography>Agencia: {car.carDealer.name}</Typography>
                <Typography>Ubicación: {car.carDealer.address}</Typography>
                <Typography>${car.price} MXN</Typography>
                <Grid>
                  <Typography>Elegir Color</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <Grid container direction="row" alignItems="center">
            <Grid item xs>imagen</Grid>
            <Grid item xs container direction="column">
              <Grid item>{car.brand} {car.model}</Grid>
              <Grid item>{car.year}</Grid>
            </Grid>
            <Grid item xs>$ {car.price} MXN</Grid>
            <Grid item xs container direction="column">
              <Grid item><Button variant="contained" onClick={()=> {
                window.open(`/compra/?car=${car.key}&dealer=${car.carDealer}&price=${car.price}&color=${car.color}`);
              }}>Comprar</Button></Grid>
              <Grid item><Button variant="contained" onClick={()=> {
                window.open(`/prueba-de-manejo/?car=${car.key}&dealer=${car.carDealer}`);
              }}>Prueba de manejo</Button></Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="primary" sx={{ bgcolor: "transparent", border: " 1px solid black"}}>
        <Toolbar>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={2}><Button variant="text" href="#resumen"><Typography color="black" >Resumen del auto</Typography></Button></Grid>
            <Grid item xs={2}><Button variant="text" href="#caracteristicas"><Typography color="black" >Características</Typography></Button></Grid>
            <Grid item xs={2}><Button variant="text" href="#extras"><Typography color="black">Extras</Typography></Button></Grid>
            <Grid item xs={2}><Button variant="text" href="#financiamiento"><Typography color="black">Financiamiento</Typography></Button></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      <Container Width={1900}>
      <Typography id="resumen">Resumen del auto</Typography>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={5} container direction="column" spacing={2}>
            <Grid item container spacing={2}><Typography>Tipo de combustible</Typography><Typography>{car.basic.fuel}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Tipo de vehiculo</Typography><Typography>{car.basic.type}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Color de interiores</Typography><Typography>{car.basic.interiorColor}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Pasajeros</Typography><Typography>{car.basic.seats}</Typography></Grid>
          </Grid>
          <Grid item xs={5} container direction="column" spacing={2}>
            <Grid item container spacing={2}><Typography>Capacidad Combustible</Typography><Typography>{car.basic.fuelCapacity}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Transmisión</Typography><Typography>{car.basic.transmision}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Tracción</Typography><Typography>{car.basic.traction}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Ficha Técnica</Typography><Typography>a</Typography></Grid>
          </Grid>
        </Grid>
        <Box height={1900}></Box>
      </Container>
      <Container Width={1900}>
      <Typography id="caracteristicas">Características</Typography>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={5} container direction="column" spacing={2}>
            <Grid item container spacing={2}><Typography>Tipo de combustible</Typography><Typography>{car.basic.fuel}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Tipo de vehiculo</Typography><Typography>{car.basic.type}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Color de interiores</Typography><Typography>{car.basic.interiorColor}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Pasajeros</Typography><Typography>{car.basic.seats}</Typography></Grid>
          </Grid>
          <Grid item xs={5} container direction="column" spacing={2}>
            <Grid item container spacing={2}><Typography>Capacidad Combustible</Typography><Typography>{car.basic.fuelCapacity}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Transmisión</Typography><Typography>{car.basic.transmision}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Tracción</Typography><Typography>{car.basic.traction}</Typography></Grid>
            <Grid item container spacing={2}><Typography>Ficha Técnica</Typography><Typography>a</Typography></Grid>
          </Grid>
        </Grid>
      </Container>
      <Container Width={1900}>
      <Typography id="extras">Extras</Typography>
        
      </Container>
      <Container Width={1900}>
      <Typography id="financiamiento">Financiamiento</Typography>
        
      </Container>
      
    </>
  );
}