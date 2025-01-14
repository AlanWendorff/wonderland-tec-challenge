import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer, Slide } from 'react-toastify';
import { CONFIG } from './config/wagmi.config';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { store } from '@store/app.store';
import { WagmiProvider } from 'wagmi';
import Layout from '@components/Layout';
import theme from '@theme/theme';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReduxProvider store={store}>
      <WagmiProvider config={CONFIG}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ToastContainer
              role='alert'
              position='top-right'
              hideProgressBar={false}
              newestOnTop={true}
              transition={Slide}
              autoClose={3000}
            />
            <Layout />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  </ThemeProvider>
);

export default App;
