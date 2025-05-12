
import { Box } from '@mui/material'
import { Link } from 'react-router';

const NavItem = ({ to, label }: {to: string, label: string}) => {

  return (
    <Box
      component={Link}
      to={to}
      sx={{
        fontSize: 18,
        paddingBottom: 1,
        fontFamily: 'sans-serif',
        color: 'secondary.main',
        textDecoration: 'none',
        '&:hover': {
          color: '#f97859',
        },
        mr: 3
      }}
    >
      {label}
    </Box>
  )
}

export default NavItem
