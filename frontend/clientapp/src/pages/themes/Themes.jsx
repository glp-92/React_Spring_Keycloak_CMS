import React, { useState, useEffect } from 'react'
import { GetThemes } from '../../util/requests/Themes';
import ThemeCard from '../../components/themeCard/ThemeCard';

import { List, ListItem, Box, Typography } from '@mui/material';

const Themes = () => {

    const [themes, setThemes] = useState([]);

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await GetThemes();
            const fetchedThemes = await response.json();
            setThemes(fetchedThemes);
        }
        fetchThemes();
    }, [])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Temas
            </Typography>
            <List
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {themes.map((theme) => (
                    <ListItem key={theme.id} sx={{ p:2, width: '50%' }} disablePadding>
                        <ThemeCard themeData={theme} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Themes