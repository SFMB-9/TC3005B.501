/*
  Autores: Mateo Herrera
  Fecha: 2023-04-15

  Este script reresenta el componente Card, el cual es utilizado para mostrar
  información de manera resumida en una tarjeta.
*/
import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';

// Fucncion que recibe una imagen, un titulo e informacion para mostrar en la 
// tarjeta
export default function MediaCard(props) {
  return (
    <Card sx={{ borderRadius: 4}} style={{backgroundColor: "#F6F6F6"}} className='mt-4'>
      <CardMedia
        sx={{ height: 180, borderRadius: 4, boxShadow: 3}}
        title="card image"
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <Image src={props.img} fill={true} style={{objectFit: 'cover'}} />
        </div>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontFamily='Raleway'>
          {props.title}
        </Typography>
        <Typography variant="body2" fontFamily='Lato'>
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}