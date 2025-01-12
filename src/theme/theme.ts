import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#9C2524',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth !important',
          overflow: 'hidden',
        },
        body: {
          paddingTop: '4rem',
          backgroundColor: '#121212',
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
      },
    },
  },
});

export default theme;
