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
    <Button component={Link} to={ROOT} variant='contained' color='primary' sx={{ mt: 2 }}>
      Go to Home
    </Button>
  </Box>
);

export default NotFound;
