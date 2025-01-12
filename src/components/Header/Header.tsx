import { AppBar, Container, Toolbar, Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
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
            <ConnectButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
