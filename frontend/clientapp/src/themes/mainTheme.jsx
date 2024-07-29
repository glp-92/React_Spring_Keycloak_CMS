import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    palette: {
        progress: {
            light: '#64b5f6',
            main: '#1a237e',
        },
        icons: {
            light: '#E9EAF0',
            dark: '#555454',
            medium: '#757575',
        }

    },
    typography: {
        fontFamily: 'IBM Plex Mono, monospace',
        h1: {
            fontSize: '1.3rem', // Ajustar tamaño de fuente para h1
        },
        h2: {
            fontSize: '1.2rem', // Ajustar tamaño de fuente para h2
        },
        h3: {
            fontSize: '1.15rem', // Ajustar tamaño de fuente para h3
        },
        h4: {
            fontSize: '1.1rem', // Ajustar tamaño de fuente para h3
        },
        h5: {
            fontSize: '1.05rem', // Ajustar tamaño de fuente para h3
        },
        h6: {
            fontSize: '1rem',
        },
        body1: {
            fontSize: '0.95rem', // Ajustar tamaño de fuente para body1
        },
        body2: {
            fontSize: '0.9rem', // Ajustar tamaño de fuente para body2
        },
        subtitle1: {
            fontSize: '0.75rem',
        },
        subtitle2: {
            fontSize: '0.7rem',
        },
        caption: {
            fontSize: '0.9rem',
        },
        overline: {
            fontSize: '0.625rem',
        },
        button: {
            fontSize: '0.95rem',
        },
    },
});