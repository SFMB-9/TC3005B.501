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
  IconButton,
  Typography,
  CardActionArea,
} from "@mui/material";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


// Función que devuelve la carta con la información del auto.
export default function CarCard(props) {
  const [favorite, setFavorite] = useState(false);

  const theme = createTheme({
    palette: {
      contrast: {
        main: '#F55C7A',
      },
    },
  });
  const cardMaxWidth = 500;
  return (
    <Card sx={{ maxWidth: cardMaxWidth, maxHeight: 330 }}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={props.carImage}
          alt="car"
        />
        <IconButton
          onClick={() => setFavorite(!favorite)}
          sx={{
            position: 'absolute',
            top: 3.5,
            right: 3.5,
            fontSize: '1.4rem',
            color: '#F55C7A' /*favorite ? '#F55C7A' : 'grey',*/
          }}>
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <CardActionArea component="a" href={props.carUrl}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Raleway',
            fontSize: "1.2rem"
          }}>
            {props.carBrand} {props.carModel}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Lato',
            fontSize: '1.8vh'
          }}>
            {props.carYear} · {props.carLocation} · {props.carBrand} {props.carAgency}
          </Typography>
          <Typography gutterBottom variant="body2" sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Lato'
          }}>
            <FormatColorFillIcon sx={{ fontSize: 15, marginRight: '0.5rem' }} />
            Disponible en {props.carColor} {props.carColor > 1 ? "colores" : "color"}
          </Typography>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <Typography gutterBottom variant="h6" sx={{
                marginBottom: '0',
                fontFamily: 'Lato',
                fontWeight: 'bolder',
                fontSize: "1.2rem"
              }}>
                ${Intl.NumberFormat().format(props.carPrice)} MXN
              </Typography>
            </div>
            <ThemeProvider theme={theme}>
              <div><ArrowForwardIcon sx={{ fontSize: 25, color: "#F55C7A" }} /></div>
            </ThemeProvider>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
