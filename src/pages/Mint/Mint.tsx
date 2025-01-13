import useMintToken from '@hooks/useMintToken';
import { Box, Typography, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import TTokenNames from '../../types/tokenNames.type';
import { useState } from 'react';
import TOKEN_OPTIONS from '@constants/web3';

const Mint = () => {
  const { isConfirming, isConfirmed, isPending, handleMintToken } = useMintToken();
  const [selectedToken, setSelectedToken] = useState<TTokenNames>('dai');

  return (
    <Box display='flex' flexDirection='column' gap={3} maxWidth='400px' margin='auto'>
      <Typography variant='h5' textAlign='center'>
        Mint Token
      </Typography>

      <Select
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value as TTokenNames)}
        fullWidth
        displayEmpty
      >
        <MenuItem value='' disabled>
          Select a token
        </MenuItem>

        {TOKEN_OPTIONS.map((token) => (
          <MenuItem key={token} value={token}>
            {token.toUpperCase()}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant='contained'
        onClick={() => handleMintToken(selectedToken)}
        disabled={isPending || isConfirming}
        fullWidth
      >
        {isPending
          ? 'Executing...'
          : isConfirming
            ? 'Confirming...'
            : `Mint ${selectedToken.toUpperCase()}`}
      </Button>

      {isConfirmed && (
        <Typography variant='body1' color='success.main' textAlign='center'>
          ¡Mint success!
        </Typography>
      )}

      {(isPending || isConfirming) && (
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Mint;
