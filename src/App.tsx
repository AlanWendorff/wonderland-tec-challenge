import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { CONFIG } from './config/rainbowkit.config';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { WagmiProvider } from 'wagmi';
import Layout from '@components/Layout';
import theme from '@theme/theme';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <WagmiProvider config={CONFIG}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </ThemeProvider>
);

export default App;
