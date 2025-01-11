import { AppBar, Button, Container, Toolbar, Box, Typography, useTheme } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const isWalletConnected = false;

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
            {isWalletConnected && (
              <Typography variant='body1'>Account balance: {0.000000314} $QUIZ</Typography>
            )}

            <Button
              sx={{ ml: 3, backgroundColor: theme.palette.secondary.main }}
              variant='contained'
              aria-label='Connect to wallet'
            >
              {isWalletConnected ? '0xAdress' : 'CONNECT WALLET'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
