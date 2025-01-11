import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Layout from '@components/Layout';
import theme from '@theme/theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout />
  </ThemeProvider>
);

export default App;
