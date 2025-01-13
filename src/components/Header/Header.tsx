import { AppBar, Container, Toolbar, Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Balance from './components/Balance';
import { ROOT, TRANSFER } from '@constants/routes';
import NavLink from './components/NavLink';

const Header = () => (
  <AppBar position='fixed'>
    <Container maxWidth='xl'>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <NavLink to={ROOT}>Home</NavLink>
            <NavLink to={TRANSFER}>Transfer</NavLink>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Balance />
          <ConnectButton />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
