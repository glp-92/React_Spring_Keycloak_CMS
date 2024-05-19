import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ValidateToken } from '../../util/requests/ValidateToken';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const NavBar = () => {
  const unloggedSettings = ['Login'];
  const loggedSettings = ['Panel de Control', 'Logout']

  const [searchText, setSearchText] = useState("");
  const [menuSelected, setMenuSelected] = useState('');
  const [settings, setSetting] = useState(unloggedSettings);

  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    const fetchTokenValid = async () => {
      const isValid = await ValidateToken();
      if (isValid) {
        setSetting(loggedSettings);
      }
      else {
        setSetting(unloggedSettings);
      }
    }
    fetchTokenValid();
    setMenuSelected(event.currentTarget);
  };

  const handleCloseUserMenu = (val) => {
    setMenuSelected(null);
  };

  const handleSearch = (e) => {
    e.preventDefault(); //preventdefault evita actualizar la pagina
    if (searchText == "" || searchText.length > 20) {
      console.log("Error en entrada de busqueda")
      return;
    }
    const formattedSearchText = searchText.replace(/\s+/g, ',');
    navigate(`/search?keyword=${formattedSearchText}`);
    setSearchText('');
  }

  return (
    <AppBar color="default" position="static" sx={{ marginBottom: 2 }} >
      <Container maxWidth="md">
        <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ fontSize: 40, aspectRatio: '1', borderRadius: 4 }}
          >
            <HomeIcon />
          </IconButton>
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: 2, marginLeft: 'auto' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onChange={(e) => { setSearchText(e.target.value) }}
              value={searchText}
            />
            <IconButton type="submit" sx={{ p: '10px', fontSize: '1.5rem' }} aria-label="search" size="large">
              <SearchIcon size='small' color="default" />
            </IconButton>
          </Paper>
          <Box sx={{ marginLeft: 1 }}>
            <IconButton color="default" onClick={handleOpenMenu}>
              <AccountCircleIcon sx={{ fontSize: 35 }} />
            </IconButton>
            <Menu
              sx={{ mt: '30px' }}
              anchorEl={menuSelected}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuSelected)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  handleCloseUserMenu();
                  if (setting === "Login") {
                    navigate(`/login`);
                  } else if (setting == "Panel de Control") {
                    navigate(`/wpannel`);
                  } else if (setting == "Logout") {
                    navigate(`/logout`)
                  }
                }
                }>
                  {setting === "Login" && <LoginIcon sx={{ marginRight: 1, fontSize: 20 }} />}
                  {setting === "Logout" && <LogoutIcon sx={{ marginRight: 1, fontSize: 20 }} />}
                  {setting === "Panel de Control" && <DashboardCustomizeIcon sx={{ marginRight: 1, fontSize: 20 }} />}
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  )
}

export default NavBar