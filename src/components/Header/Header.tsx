import { AppBar, Container, Toolbar, Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Balance from './components/Balance';

const Header = () => (
  <AppBar position='fixed'>
    <Container maxWidth='xl'>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Balance />
          <ConnectButton />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
