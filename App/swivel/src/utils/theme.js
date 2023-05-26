/*
  Autor: Mateo Herrera
  Fecha: 2023-04-15
  
  Archivo de configuración de temas de la aplicación.
*/

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F55C7A",
    },
    contrast: {
      main: "#111439",
    },
    secondary: {
      main: "#F68E70",
    },
    alternate: {
      main: "#F6BC66",
    },
    warning: {
      main: "#F6BC66",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
