
import { Box } from '@mui/material'
import React, { ReactElement } from 'react';
import { Link } from 'react-router';

const NavItem = ({ to, children }: {to: string, children: ReactElement}) => {

  return (
    <Box
      component={Link}
      to={to}
      sx={{
        fontSize: 20,
        fontWeight: 500,
        paddingBottom: 1,
        fontFamily: 'antonio',
        color: 'secondary.main',
        textDecoration: 'none',
        '&:hover': {
          color: '#f97859',
        },
        mr: 3
      }}
      onClick={() => window.scrollTo(0, 0)}
    >
      {React.cloneElement(children)}
    </Box>
  )
}

export default NavItem
