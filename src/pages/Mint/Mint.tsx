import useMintToken from '@hooks/useMintToken';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import TTokenNames from '../../types/tokenNames.type';
import { useState } from 'react';
import { TOKEN_OPTIONS } from '@constants/web3';
import NotifySuccess from '@components/NotifySuccess';

const Mint = () => {
  const [amount, setAmount] = useState('');
  const { isConfirming, isConfirmed, isPending, handleMintToken } = useMintToken({ amount });
  const [selectedToken, setSelectedToken] = useState<TTokenNames>('dai');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);

    if (value === '' || (!isNaN(parsedValue) && parsedValue >= 0)) {
      setAmount(String(parsedValue));
    }
  };

  const handleIsSnackbarOpen = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

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

      <TextField
        type='number'
        value={amount}
        onChange={handleAmountChange}
        placeholder='Write amount'
        fullWidth
      />

      <Button
        variant='contained'
        onClick={() => handleMintToken(selectedToken)}
        disabled={isPending || isConfirming}
        fullWidth
      >
        {isPending ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size={28} />
          </Box>
        ) : isConfirming ? (
          'Confirming...'
        ) : (
          `Mint ${selectedToken.toUpperCase()}`
        )}
      </Button>

      <NotifySuccess
        open={isSnackbarOpen && isConfirmed}
        onClose={handleIsSnackbarOpen}
        text='¡Mint successful!'
      />
    </Box>
  );
};

export default Mint;
