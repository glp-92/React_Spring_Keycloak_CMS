import React, { useState, useEffect } from 'react'
import { GetCategories } from '../../util/requests/Categories';
import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemText, Box, Typography } from '@mui/material';

const Categories = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const handleSelectedCategorie = (categorie) => {
        navigate(`/search?categorie=${categorie.name}`);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await GetCategories();
            const fetchedCategories = await response.json();
            setCategories(fetchedCategories);
        }
        fetchCategories();
    }, [])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Categorías
            </Typography>
            <List
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {categories.map((category) => (
                    <ListItem key={category.id} sx={{ width: '50%' }} disablePadding>
                        <ListItemButton onClick={() => handleSelectedCategorie(category)} sx={{ justifyContent: 'center' }}>
                            <ListItemText primary={category.name} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Categories