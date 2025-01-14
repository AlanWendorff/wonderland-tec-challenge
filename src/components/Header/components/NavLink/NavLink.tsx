import { Button } from '@mui/material';
import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

interface INavLinkProps extends ComponentProps<typeof Button> {
  to: string;
}

const NavLink = ({ to, children }: INavLinkProps) => (
  <Button
    component={Link}
    to={to}
    sx={{
      color: 'white',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}
  >
    {children}
  </Button>
);

export default NavLink;

