import React, { useEffect, useState } from 'react'
import { GetCategories } from '../../util/requests/Categories';
import { Link as RouterLink } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Unstable_Grid2';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

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
    <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none', marginBottom: 2 }} position="static"   >
      <Grid container spacing={2}>
        <Grid xs={8} sx={{ alignContent: 'center' }}>
          <Breadcrumbs sx={{ ml: 2 }} maxItems={2} separator="" aria-label="breadcrumb">
            {categories.map(categorie => (
              <Link component={RouterLink} underline="hover" color="inherit" to={`/search?categorie=${categorie.name}`} key={categorie["id"]}>
                {categorie.name}
              </Link>
            ))}
          </Breadcrumbs>
        </Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }} xs={4}>
          <IconButton
            component="a"
            href="https://github.com/glp-92"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ mr: 2, fontSize: '1.5rem' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/guillermo-lopez-pazos/"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ mr: 2, fontSize: '1.5rem' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Footer