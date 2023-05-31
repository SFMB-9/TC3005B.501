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
      dark: "#2A3BCE",
      light: "#F6BC66",
    },
    contrast: {
      main: "#111439",
    },
    secondary: {
      main: "#F68E70",
      dark: "#8149AA",
      light: "#D9D9D9",
    },
    alternate: {
      main: "#F6BC66",
    },
    warning: {
      main: "#F6BC66",
    },
    custom: {
      main: "8f8e8c",
      dark: "F6BC66",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
