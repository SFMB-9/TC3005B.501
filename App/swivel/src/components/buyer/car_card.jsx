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

// Función que devuelve la carta con la información del auto.
export default function CarCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="180"
        image={props.carImage}
        alt="car"
      />
      <CardActionArea component="a" href={props.carUrl}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            marginBottom: '1px',
            fontFamily: 'Raleway'
          }}>
            {props.carBrand} {props.carModel}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary" sx={{
            marginBottom: '-0.5px',
            fontFamily: 'Lato'
          }}>
            {props.carYear} · {props.carLocation} · {props.carBrand} {props.carAgency}
          </Typography>
          <Typography gutterBottom variant="body2" sx={{
            marginBottom: '-0.5px',
            fontFamily: 'Lato'
          }}>
            {props.carColor} 
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{
            marginBottom: '-0.5px',
            fontFamily: 'Raleway'
          }}>
            ${props.carPrice} MXN
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
