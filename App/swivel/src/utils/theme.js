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
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        "&$focused": {
          border: "none",
        },
      },
      input: {
        padding: "8px",
        width: "100%",
        borderRadius: "4px",
        border: "1px solid #ccc",
        "&:focus": {
          outline: "none",
          boxShadow: "0px 0px 2px #F55C7A",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "4px",
        "& $notchedOutline": {
          borderColor: "#ccc",
        },
        "&:hover $notchedOutline": {
          borderColor: "#F68E70",
        },
        "&$focused $notchedOutline": {
          borderColor: "#F55C7A",
          borderWidth: "2px",
        },
      },
      input: {
        padding: "8px",
        width: "100%",
      },
      notchedOutline: {},
    },
  },
});