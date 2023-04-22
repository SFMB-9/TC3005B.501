/*
Componente de pantalla de autenticación. Este componente se puede reutilizar en cualquier pantalla que requiera un formulario para ingresar al sistema. 

Autor: Ana Paula Katsuda Zalce
*/
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

/* 
Función que recibe las siguientes props: 
- Imagen de fondo
- Color de fondo
- Formulario que se utilizará
- Imagen para la carta de autenticación
- Texto de título
- Texto de cuerpo 
- Color de texto

La función regresa el componente reactivo de la pantalla de autenticación con los datos especificados en las props.
*/
export default function AuthComponent(props) {
    const theme = useTheme();
    // Variables que indican el tamaño de la pantalla
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    // Estilo de la carta de autenticación
    const boxStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: isSmallScreen ? '90%' : '80%',
      height: '80%',
      bgcolor: 'background.card',
      boxShadow: 24,
    };
    // Pantalla
    return (
      <div style={{
        height: '100vh',
        backgroundColor: props.backColor,
        backgroundImage: 'url(' + props.backImage + ')',
      }}>
        <Card sx={{ borderRadius: '10px'}} style={boxStyle}>
          <Grid container style={{ height: '100%' }}>
            <Grid item xs={12} sm={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} style={{height: '100%'}}>
              <CardContent style={{backgroundColor: 'white', width: '65%'}} >
                  {props.form}
                </CardContent>
            </Grid>
            <Grid item md={6} style={{height: '100%'}}>
                <CardMedia
                  component="img"
                  sx={{display: isMediumScreen ? 'none' : 'flex' , width: 'auto', height: 'auto' }}
                  image={props.cardImage}
                  alt="Welcome Background"
                />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'} } style={{
                  position: 'absolute',
                  top: '25vh',
                  }}>
                      <Box style={{marginBottom: '5%'}}>
                          <Typography wrap variant="h2" sx={{
                          color: props.textColor,
                          fontWeight: 'bolder',
                          fontSize: '3.7rem', 
                          fontFamily: 'Raleway',
                          textAlign: 'center',
                          display: isMediumScreen ? 'none' : 'flex'
                      }}> {props.titleText} </Typography>
                      </Box>
                      <Box>
                          <Typography variant="h4" wrap  sx={{
                          color: props.textColor, 
                          paddingLeft: '17%',
                          paddingRight: '14%', 
                          fontFamily: 'lato',
                          fontSize: '2.3rem',
                          display: isMediumScreen ? 'none' : 'flex',
                          textAlign: 'center'
                      }}> {props.bodyText} </Typography>
                  </Box>
              </Box>
            </Grid>
          </Grid>
       </Card>
      </div>
    );
  }
  
  
