import { selectIsWalletConnected } from '@store/account/account.selectors';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Root = () => {
  const isWalletConnected = useSelector(selectIsWalletConnected);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant='h2'
        color='primary'
        sx={{
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}
      >
        Welcome to Wonderland Challenge
      </Typography>

      {!isWalletConnected && (
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{
            marginTop: 2,
            fontSize: '2rem',
            fontStyle: 'italic',
          }}
        >
          Connect wallet to start
        </Typography>
      )}
    </Box>
  );
};

export default Root;
