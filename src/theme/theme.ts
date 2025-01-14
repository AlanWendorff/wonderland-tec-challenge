import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#9C2524',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          overflow: 'hidden',
        },
        body: {
          backgroundColor: '#FAFAFA',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        h5: {
          color: '#333',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#9C2524',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#121212',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

theme.typography = {
  ...theme.typography,
  h5: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(2rem - 3px)',
    },
  },
  subtitle1: {
    fontSize: '.9rem',
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(1rem - 3px)',
    },
  },
  button: {
    fontSize: '1rem',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(1rem - 3px)',
    },
  },
};

export default theme;
