import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ValidateToken } from '../../util/requests/Auth';

import { IconButton, Paper, InputBase, Divider, Box, List, ListItem, ListItemText, ListItemButton, Drawer } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const unloggedSettings = ['Login'];
const loggedSettings = ['Panel de Control', 'Logout']

const DrawerList = () => {

    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [settings, setSetting] = useState(unloggedSettings);

    const toggleDrawer = (newOpen) => () => {
        const fetchTokenValid = async () => {
            try {
                const isValid = await ValidateToken();
                if (!isValid) {
                    throw new Error(`InvalidError`);
                }
                setSetting(loggedSettings);
               
            } catch(error) {
                //console.error(`${error}`)
                setSetting(unloggedSettings);
            }
        }
        if (newOpen) fetchTokenValid();
        setOpenDrawer(newOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault(); //preventdefault evita actualizar la pagina
        if (searchText == "" || searchText.length > 20) {
            console.log("Error en entrada de busqueda")
            return;
        }
        const formattedSearchText = searchText.replace(/\s+/g, ',');
        setOpenDrawer(false);
        navigate(`/search?keyword=${formattedSearchText}`);
        setSearchText('');
    }

    return (
        <Box>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {settings.map((setting) => (
                            <ListItem key={setting} disablePadding>
                                {
                                    setting === "Login" ? <ListItemButton
                                        onClick={() => { setOpenDrawer(false); navigate(`/login`) }}
                                    >
                                        <AccountCircleIcon sx={{ mr: 1, fontSize: 20 }} />
                                        <ListItemText primary={setting} />
                                    </ListItemButton>
                                        :
                                        setting === "Logout" ? <ListItemButton
                                            onClick={() => { setOpenDrawer(false); navigate(`/logout`) }}
                                        >
                                            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                                            <ListItemText primary={setting} />
                                        </ListItemButton>
                                            :
                                            setting === "Panel de Control" ? <ListItemButton
                                                onClick={() => { setOpenDrawer(false); navigate(`/wpannel`) }}
                                            >
                                                <DashboardCustomizeIcon sx={{ mr: 1, fontSize: 20 }} />
                                                <ListItemText primary={setting} />
                                            </ListItemButton>
                                                :
                                                null
                                }
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Paper
                        component="form"
                        onSubmit={handleSearch}
                        sx={{ paddingY: 1, display: 'flex', alignItems: 'center', width: '100%', borderRadius: 0, marginLeft: 'auto' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            onChange={(e) => { setSearchText(e.target.value) }}
                            value={searchText}
                        />
                        <IconButton type="submit" sx={{ p: '10px', fontSize: 25, borderRadius: 1 }} aria-label="search" size="large">
                            <SearchIcon size='small' color="default" />
                        </IconButton>
                    </Paper>
                    <List>
                        <ListItem key={'categorias'} disablePadding>
                            <ListItemButton
                                onClick={() => { setOpenDrawer(false); navigate(`/categories`) }}
                            >
                                <ListItemText primary="Categorias" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'themes'} disablePadding>
                            <ListItemButton
                                onClick={() => { setOpenDrawer(false); navigate(`/themes`) }}
                            >
                                <ListItemText primary="Temas" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box >
            </Drawer>
            <IconButton
                size="large"
                color="default"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ fontSize: 30, aspectRatio: '1', borderRadius: 4, mr: 'auto' }}
            >
                <MenuIcon />
            </IconButton>
        </Box>
    )
}

export default DrawerList