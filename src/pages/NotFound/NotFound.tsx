import { ROOT } from '@constants/routes';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}
  >
    <Typography variant='h2' color='primary' gutterBottom>
      END OF THE ROAD :/
    </Typography>
    <Typography variant='h4' color='text.secondary'>
      404: Not found.
    </Typography>
    <Button
      color='primary'
      variant='contained'
      aria-label='go to home'
      component={Link}
      sx={{ mt: 2 }}
      to={ROOT}
    >
      Go to Home
    </Button>
  </Box>
);

export default NotFound;
