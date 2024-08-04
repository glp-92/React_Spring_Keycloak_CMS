import React from 'react'
import { Link } from 'react-router-dom';
import DrawerList from './DrawerList';

import { AppBar, Toolbar, Container, IconButton, Box } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

const NavBar = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: "#555454", marginBottom: 2 }} >
      <Container maxWidth="md">
        <Toolbar sx={{ display: 'flex' }}>
          <DrawerList />
          <Box flex={1} display={'flex'} justifyContent={'center'}>
            <IconButton
              component={Link}
              to="/"
              edge="start"
              aria-label="menu"
              sx={{ margin:0, color: "icons.light", aspectRatio: '1', borderRadius: 4 }}
            >
              <HomeIcon sx={{fontSize:'2rem'}} />
            </IconButton>
          </Box>
          <Box flex={1}/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar