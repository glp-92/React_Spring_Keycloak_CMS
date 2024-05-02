import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './router/Router'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '1.5rem'
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
)
