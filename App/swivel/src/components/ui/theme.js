import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f6bc66',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Lato',
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '14px',
        fontFamily: 'inherit',
        textTransform: 'none',
        backgroundColor: 'rgba(255,255,255,0.1)',
        '&:hover': {
          backgroundColor: '#f6bc66',
        },
      },
    },
    MuiTextField: {
      root: {
        borderRadius: '14px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        
      },
    },
  },
});

export default theme;