import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';
import { TOKEN_OPTIONS } from '@constants/web3';
import TTokenNames from '../../types/tokenNames.type';
import useTransfer from '@hooks/useTransfer';
import useApprove from '@hooks/useApprove';

const Transfer = () => {
  const [selectedToken, setSelectedToken] = useState<TTokenNames>('dai');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [amount, setAmount] = useState<string | null>(null);

  const { txStatus, handleTransfer } = useTransfer({ amount });
  const { approveStatus, handleApprove } = useApprove({ amount });

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleIsSnackbarOpen = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Web3 Token Transfer
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label='Wallet Address'
          variant='outlined'
          fullWidth
          value={walletAddress}
          onChange={handleAddressChange}
        />
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
          label='Amount'
          variant='outlined'
          type='number'
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color='primary'
            variant='contained'
            aria-label='approve token balance'
            disabled={approveStatus.isPending || approveStatus.isConfirming}
            onClick={() => {
              handleApprove(walletAddress, selectedToken);
              handleIsSnackbarOpen();
            }}
            sx={{ width: '48%' }}
          >
            {approveStatus.isPending ? (
              <Box display='flex' justifyContent='center'>
                <CircularProgress size={28} />
              </Box>
            ) : approveStatus.isConfirming ? (
              'Confirming...'
            ) : (
              `Approve`
            )}
          </Button>

          <Button
            color='secondary'
            variant='contained'
            aria-label='transfer token balance'
            disabled={txStatus.isPending || txStatus.isConfirming}
            onClick={() => {
              handleTransfer(walletAddress, selectedToken);
              handleIsSnackbarOpen();
            }}
            sx={{ width: '48%' }}
          >
            {txStatus.isPending ? (
              <Box display='flex' justifyContent='center'>
                <CircularProgress size={28} />
              </Box>
            ) : txStatus.isConfirming ? (
              'Confirming...'
            ) : (
              `Transfer ${selectedToken.toUpperCase()}`
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Transfer;
