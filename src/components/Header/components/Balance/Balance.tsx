import useGetBalance from '@hooks/useGetBalance';
import { Box, Typography } from '@mui/material';

const Balance = () => {
  const { dai, usdc } = useGetBalance();

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', px: 2 }}>
      <Typography variant='subtitle1' color='inherit'>
        {dai.isLoading ? 'Loading...' : `${dai.balance.toFixed(2)} DAI`}
      </Typography>

      <Typography variant='subtitle1' color='inherit'>
        {usdc.isLoading ? 'Loading...' : `${usdc.balance.toFixed(2)} USDC`}
      </Typography>
    </Box>
  );
};

export default Balance;
