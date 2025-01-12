import useGetBalance from '@hooks/useGetBalance';
import { Box, Typography } from '@mui/material';

const Balance = () => {
  const { dai, usdc } = useGetBalance();

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', px: 5 }}>
      <Typography variant='body1' color='inherit'>
        DAI: {dai.isLoading ? 'Loading...' : `${dai.balance.toFixed(2)} DAI`}
      </Typography>

      <Typography variant='body1' color='inherit'>
        USDC: {usdc.isLoading ? 'Loading...' : `${usdc.balance.toFixed(2)} USDC`}
      </Typography>
    </Box>
  );
};

export default Balance;
