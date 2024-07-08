import React, { useEffect, useState } from 'react'
import { GetCategories } from '../../util/requests/Categories';

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await GetCategories();
      setCategories(await response.json());
    }
    fetchCategories();
    return () => {
    }
  }, [])

  return (
    <AppBar sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent', boxShadow: 'none', border: 'none', marginBottom: 2 }} position="static"   >
      <Box ml={'auto'}>
        <IconButton
          component="a"
          size="large"
          href="https://github.com/glp-92"
          target="_blank"
          rel="noopener noreferrer"
          edge="start"
          color="default"
          aria-label="menu"
          sx={{ mr: 2, fontSize: 30 }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          size="large"
          href="https://www.linkedin.com/in/guillermo-lopez-pazos/"
          target="_blank"
          rel="noopener noreferrer"
          edge="start"
          color="default"
          aria-label="menu"
          sx={{ mr: 2, fontSize: 30 }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </AppBar>
  )
}

export default Footer