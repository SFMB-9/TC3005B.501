/*
Ana Paula Katsuda Zalce
23-04-2023

Carta que contiene la información esencial de un auto para luego ser mostrada 
en el catálogo.
*/
import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

// Función que devuelve la carta con la información del auto.
export default function CarCard(props) {
  return (
    <Card sx={{ maxWidth: 500, maxHeight: 330}}>
      <CardMedia
        component="img"
        height="160"
        image={props.carImage}
        alt="car"
      />
      {/* <CardMedia>
        {props.carImage}
      </CardMedia> */}
      <CardActionArea component="a" href={props.carUrl}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Raleway',
            fontSize: '1.2rem'
          }}>
            {props.carBrand} {props.carModel}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Lato'
          }}>
            {props.carYear} · {props.carLocation} · {props.carBrand} {props.carAgency}
          </Typography>
          <Typography gutterBottom variant="body2" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Lato'
          }}>
            <FormatColorFillIcon sx={{ fontSize: 15, marginRight: '0.5rem' }} />
            Disponible en {props.carColor} {props.carColor > 1 ? "colores": "color" }
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Lato',
            fontWeight: 'bolder',
          }}>
            ${Intl.NumberFormat().format(props.carPrice)} MXN
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
