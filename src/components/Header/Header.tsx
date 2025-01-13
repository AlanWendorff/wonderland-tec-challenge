import { selectIsWalletConnected } from '@store/account/account.selectors';
import { AppBar, Container, Toolbar, Box, Typography } from '@mui/material';
import { MINT, ROOT, TRANSFER } from '@constants/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSelector } from 'react-redux';
import Balance from './components/Balance';
import NavLink from './components/NavLink';

const Header = () => {
  const isWalletConnected = useSelector(selectIsWalletConnected);

  return (
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
              <NavLink to={MINT}>Mint</NavLink>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {isWalletConnected ? (
              <Balance />
            ) : (
              <Typography variant='body1' color='inherit' sx={{ px: 5 }}>
                Connect wallet to see your balance
              </Typography>
            )}
            <ConnectButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
