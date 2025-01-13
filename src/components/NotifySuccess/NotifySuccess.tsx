import { Alert, Snackbar, SnackbarProps } from '@mui/material';

interface INotifySuccessProps extends SnackbarProps {
  text: string;
  onClose: () => void;
}

const NotifySuccess = ({ onClose, text, ...props }: INotifySuccessProps) => (
  <Snackbar
    onClose={onClose}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    {...props}
  >
    <Alert onClose={onClose} severity='success' variant='filled'>
      {text}
    </Alert>
  </Snackbar>
);

export default NotifySuccess;
