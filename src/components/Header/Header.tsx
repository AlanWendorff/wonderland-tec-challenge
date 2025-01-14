import { selectIsCorrectNetwork, selectIsWalletConnected } from '@store/account/account.selectors';
import { AppBar, Container, Toolbar, Box } from '@mui/material';
import { MINT, ROOT, TRANSFER } from '@constants/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSelector } from 'react-redux';
import Balance from './components/Balance';
import NavLink from './components/NavLink';

const Header = () => {
  const isWalletConnected = useSelector(selectIsWalletConnected);
  const isCorrectNetwork = useSelector(selectIsCorrectNetwork);

  return (
    <AppBar position='fixed'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexGrow: 1,
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <NavLink to={ROOT}>Home</NavLink>
              <NavLink to={TRANSFER}>Transfer</NavLink>
              <NavLink to={MINT}>Mint</NavLink>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }} />

            <Box sx={{ display: 'flex' }}>
              {isWalletConnected && isCorrectNetwork && <Balance />}
              <ConnectButton />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

