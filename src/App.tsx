import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from './config/rainbowkit';
import Layout from '@components/Layout';
import theme from '@theme/theme';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </ThemeProvider>
);

export default App;
