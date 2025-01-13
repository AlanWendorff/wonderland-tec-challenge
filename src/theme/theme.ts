import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#121212', // Color primario original (oscuro)
    },
    secondary: {
      main: '#9C2524', // Color secundario original (rojo)
    },
    background: {
      default: '#F5F5F5', // Fondo claro
      paper: '#FFFFFF', // Fondo del contenido
    },
    text: {
      primary: '#212121', // Texto principal (oscuro)
      secondary: '#757575', // Texto secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#333', // Color del título principal
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          overflow: 'hidden',
        },
        body: {
          backgroundColor: '#FAFAFA', // Fondo más claro
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // Centrar los componentes
        },
        h5: {
          color: '#333', // Cambiar el color de los h5
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Sombra sutil en botones
          '&:hover': {
            backgroundColor: '#9C2524', // Cambio de color de hover (secundario)
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Aumentar la sombra al hacer hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra ligera en contenedores
          padding: '1rem', // Relleno más elegante
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#121212', // Usar el color primario para los progresos
        },
      },
    },
  },
});

export default theme;
