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
import NotifySuccess from '@components/NotifySuccess';
import useTransfer from '@hooks/useTransfer';
import useApprove from '@hooks/useApprove';

const Transfer = () => {
  const [selectedToken, setSelectedToken] = useState<TTokenNames>('dai');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');

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
            variant='contained'
            color='primary'
            sx={{ width: '48%' }}
            disabled={approveStatus.isPending || approveStatus.isConfirming}
            onClick={() => {
              handleApprove(walletAddress, selectedToken);
              handleIsSnackbarOpen();
            }}
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
            variant='contained'
            color='secondary'
            sx={{ width: '48%' }}
            disabled={txStatus.isPending || txStatus.isConfirming}
            onClick={() => {
              handleTransfer(walletAddress, selectedToken);
              handleIsSnackbarOpen();
            }}
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

          <NotifySuccess
            open={isSnackbarOpen && approveStatus.isConfirmed}
            onClose={handleIsSnackbarOpen}
            text='¡Approve successful!'
          />

          <NotifySuccess
            open={isSnackbarOpen && txStatus.isConfirmed}
            onClose={handleIsSnackbarOpen}
            text='¡Transfer successful!'
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transfer;
