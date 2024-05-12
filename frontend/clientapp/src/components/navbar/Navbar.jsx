import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); //preventdefault evita actualizar la pagina
    if (searchText == "" || searchText.length > 20) {
      console.log("Error en entrada de busqueda")
      return;
    }
    navigate(`/search?keyword=${searchText}`);
  }

  return (
    <AppBar color="default" position="static" sx={{ marginBottom: 2 }}  >
      <Toolbar sx={{ display: 'flex', justifyContent: "space-evenly" }}>
        <IconButton
          component={Link} // Usando el componente Link en lugar de 'a'
          to="/" //
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, fontSize: '1.5rem' }}
        >
          <HomeIcon />
        </IconButton>
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: 2 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            onChange={(e) => { setSearchText(e.target.value) }}
          />
          <IconButton type="submit" sx={{ p: '10px', fontSize: '1.5rem' }} aria-label="search" size="large">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar