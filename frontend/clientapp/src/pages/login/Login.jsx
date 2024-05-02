import React, { useState, useEffect } from 'react'
import './Login.css'
import { Navigate } from 'react-router-dom';
import { ValidateToken } from '../../util/requests/ValidateToken';
import { LoginRequest } from "../../util/requests/Login";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = () => {
  const [logged, setLogged] = useState(false);

  const handleLogin = async (e) => { // Envia el formulario de login, carga el token en almacenamiento
    e.preventDefault(); // Previene el comportamiento por defecto, en caso de un form, refrescar la pagina
    const data = new FormData(e.currentTarget);
    const login_response = await LoginRequest(data.get("username"), data.get("password"))
    if (login_response.access_token) {
      setLogged(true);
    }
    // setIsLoading(false);
  };

  useEffect(() => { // Se verifica si se esta logueado actualmente y se redirige al panel de administracion
    const fetchTokenValid = async () => {
      const isValid = await ValidateToken();
      setLogged(isValid);
    }
    fetchTokenValid();
  }, [])

  return (
    <Container component="main" maxWidth="lm">
      {logged && (
        <Navigate to="/wpannel" replace={true} />
      )}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

        </Box>
      </Box>
    </Container>
  )
}

export default Login;