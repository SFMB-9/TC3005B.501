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
    },
    info: {
      main: "#000000",
      dark: "#FFFFFF",
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});