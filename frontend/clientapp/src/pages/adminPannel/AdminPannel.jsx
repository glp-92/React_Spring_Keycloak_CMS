import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import { GetPostList } from '../../util/requests/GetPostList';
import { DeletePost } from '../../util/requests/Posts';
import { GetCategoriesPageable, CreateCategory, DeleteCategory, UpdateCategory } from '../../util/requests/Categories';
import { CreateTheme, DeleteTheme, GetThemesPageable, UpdateTheme } from '../../util/requests/Themes';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const categoriesPerPage = 4;
const themesPerPage = 2;

const AdminPannel = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inputCategory, setinputCategory] = useState('');
    const [themes, setThemes] = useState([]);
    const [categoryPage, setCategoryPage] = useState(0);
    const [themePage, setThemePage] = useState(0);
    const [postPage, setPostPage] = useState(0);
    const [nCategoryPages, setNCategoryPages] = useState(0);
    const [nThemePages, setNThemePages] = useState(0);
    const [nPostPages, setNPostPages] = useState(0);

    const createNewPost = () => {
        navigate(`/wpannel/writer`);
    }

    const editPost = (post) => {
        navigate(`/wpannel/writer`, { state: post })
    }

    const handleDeletePost = (id) => {
        const deletePost = async () => {
            const token = localStorage.getItem("jwt");
            if (!token) return false;
            let response = await DeletePost(id, token);
            if (!response.ok) {
                console.log(`Error validating token: ${response.statusText}`);
                return;
            }
            fetchPosts(postPage);
            // setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        };
        if (confirm('Esta accion borrara el Post de la base de datos, continuar?')) {
            deletePost();
        }
    }

    const handleCategoryPageChange = (event, value) => {
        setCategoryPage(value - 1);
    }

    const handleThemePageChange = (event, value) => {
        setThemePage(value - 1);
    }

    const handlePostPageChange = (event, value) => {
        setPostPage(value - 1);
    }

    const fetchCategories = async (page) => {
        try {
            const response = await GetCategoriesPageable(page, categoriesPerPage);
            if (!response.ok) {
                throw new Error(`Error fetching categories`);
            }
            const fetchedCategories = await response.json();
            setCategories(fetchedCategories.content);
            setNCategoryPages(fetchedCategories.totalPages)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchThemes = async (page) => {
        try {
            const response = await GetThemesPageable(page, themesPerPage);
            if (!response.ok) {
                throw new Error(`Error fetching themes`);
            }
            const fetchedThemes = await response.json();
            setThemes(fetchedThemes.content);
            setNThemePages(fetchedThemes.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPosts = async (page) => {
        const posts = await GetPostList(page, null);
        if (posts != null) {
            setPosts(posts.content);
            setNPostPages(posts.totalPages)
        }
        else {
            setPosts([]);
        }
    }

    const handleCreateCategory = async () => {
        const token = localStorage.getItem("jwt");
        const newCategoryName = inputCategory.toLowerCase();
        try {
            const response = await CreateCategory(newCategoryName, token);
            if (response.ok) {
                const createdCategory = await response.json()
                // setCategories(prevCategories => [...prevCategories, createdCategory]);
                setinputCategory('');
                fetchCategories(categoryPage);
            }
            else {
                throw new Error(`Erroneous answer from server`);
            }
        } catch (error) {
            console.error("Error. Category not created!", error);
        }
    }

    const handleEditCategoryLabel = (newName, index) => {
        const newCategories = [...categories];
        newCategories[index]["name"] = newName;
        newCategories[index]["slug"] = newName;
        setCategories(newCategories);
    }

    const handleUpdateCategory = async (index) => {
        const token = localStorage.getItem("jwt");
        const category = categories[index];
        try {
            let response = await UpdateCategory(category, token);
            if (!response.ok) {
                throw new Error(`Erroneous answer from server`);
            }
        } catch (error) {
            console.log("Error. Category not updated!", error);
        }
    }

    const handleDeleteCategory = async (id, index) => {
        if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
            const token = localStorage.getItem("jwt");
            if (!token) return false;
            try {
                let response = await DeleteCategory(id, token);
                if (!response.ok) {
                    throw new Error(`Erroneous answer from server`);
                }
                fetchCategories(categoryPage);
                // setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            } catch (error) {
                console.log("Error. Category not deleted!", error);
            }
        }
    }

    const handleCreateTheme = async (e) => {
        e.preventDefault();
        const themeForm = new FormData(e.currentTarget);
        const slug = themeForm.get('name').toLowerCase().replace(/\s+/g, '-');
        let themeData = {};
        themeForm.forEach((value, key) => themeData[key] = value);
        themeData.slug = slug;
        const token = localStorage.getItem("jwt");
        try {
            const response = await CreateTheme(themeData, token);
            if (response.ok) {
                const createdTheme = await response.json()
                // setThemes(prevThemes => [...prevThemes, createdTheme]);
                document.getElementById("createThemeForm").reset();
                fetchThemes(themePage);
            }
            else {
                throw new Error(`Erroneous answer from server`);
            }
        } catch (error) {
            console.error("Error. Theme not created!", error);
        }
    }

    const handleUpdateTheme = async (e) => {
        e.preventDefault();
        const themeForm = new FormData(e.currentTarget);
        const slug = themeForm.get('name').toLowerCase().replace(/\s+/g, '-');
        let themeData = {};
        themeForm.forEach((value, key) => themeData[key] = value);
        themeData.slug = slug;
        const token = localStorage.getItem("jwt");
        try {
            let response = await UpdateTheme(themeData, token);
            if (!response.ok) {
                throw new Error(`Erroneous answer from server`);
            }
        } catch (error) {
            console.log("Error. Theme not updated!", error);
        }
    }

    const handleDeleteTheme = async (id, index) => {
        if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
            const token = localStorage.getItem("jwt");
            if (!token) return false;
            try {
                let response = await DeleteTheme(id, token);
                if (!response.ok) {
                    throw new Error(`Erroneous answer from server`);
                }
                // setThemes(prevThemes => prevThemes.filter(theme => theme.id !== id));
                fetchThemes(themePage);
            } catch (error) {
                console.log("Error. Theme not deleted!", error);
            }
        }
    }

    useEffect(() => {
        fetchPosts(postPage);
    }, [postPage])

    useEffect(() => {
        fetchCategories(categoryPage);
    }, [categoryPage])

    useEffect(() => {
        fetchThemes(themePage);
    }, [themePage])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 2 }}>
            <Typography align='center' variant="h2">
                Panel de Administracion
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h3" variant="h5">
                    Categorias
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 0, width: '100%' }}>
                    <TextField type="text" margin="normal" fullWidth id="title" label="Nombre de categoria" name="newCategory" value={inputCategory} onChange={(e) => { setinputCategory(e.target.value) }} />
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        onClick={handleCreateCategory}
                        sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                <List dense sx={{ width: '100%' }}>
                    {categories.map((category, index) => (
                        <ListItem key={index} alignItems="center" sx={{ mt: 0, mb: 0 }}>
                            <TextField type="text" fullWidth margin="normal" value={category["name"]} onChange={(e) => handleEditCategoryLabel(e.target.value, index)} />
                            <IconButton
                                size="large"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                onClick={() => handleUpdateCategory(index)}
                                sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                            >
                                <UpdateIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="secondary"
                                aria-label="menu"
                                onClick={() => handleDeleteCategory(category.id, index)}
                                sx={{ fontSize: '1.5rem' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                {
                    nCategoryPages > 1 &&
                    <Pagination sx={{ marginBottom: 1, marginTop: 'auto', alignSelf: 'center', }} size='small' count={nCategoryPages} shape="rounded" page={categoryPage + 1} onChange={handleCategoryPageChange} />
                }
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h3" variant="h5">
                    Temas
                </Typography>
                <Box component="form" id="createThemeForm" onSubmit={handleCreateTheme} sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 0, width: '100%' }}>
                    <Box flex={1} display={'flex'} flexDirection={'column'} >
                        <Box mb={1} display={'flex'}>
                            <TextField sx={{ flex: 1 }} type="text" fullWidth id="themeTitle" label="Nombre de tema" name="name" />
                            <TextField sx={{ ml: 1, flex: 2 }} type="text" fullWidth id="themeImage" label="Ruta de imagen del tema" name="featuredImage" />
                        </Box>
                        <TextField type="text" fullWidth id="themeExcerpt" label="Resumen del tema" name="excerpt" />
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        type="submit"
                        sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                <List dense sx={{ width: '100%' }}>
                    {themes.map((theme, index) => (
                        <ListItem key={index} alignItems="center" sx={{ mt: 0, mb: 0 }}>
                            <Box component="form" id="editThemeForm" onSubmit={handleUpdateTheme} sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 0, width: '100%' }}>
                                <Box flex={1} display={'flex'} flexDirection={'column'} >
                                    <Box mb={1} display={'flex'}>
                                        <TextField sx={{ flex: 1 }} type="text" value={theme["name"]} name="name" />
                                        <TextField sx={{ ml: 1, flex: 2 }} type="text" value={theme["featuredImage"]} name="featuredImage" />
                                    </Box>
                                    <TextField type="text" fullWidth value={theme["excerpt"]} name="excerpt" />
                                </Box>
                                <input type="hidden" name="id" value={theme.id} />
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="primary"
                                    aria-label="menu"
                                    type="submit"
                                    sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                                >
                                    <UpdateIcon />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="secondary"
                                    aria-label="menu"
                                    onClick={() => handleDeleteTheme(theme.id, index)}
                                    sx={{ fontSize: '1.5rem' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                {
                    nThemePages > 1 &&
                    <Pagination sx={{ marginBottom: 1, marginTop: 'auto', alignSelf: 'center', }} size='small' count={nThemePages} shape="rounded" page={themePage + 1} onChange={handleThemePageChange} />
                }
            </Box>
            <Box sx={{ flex: 1, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h3" variant="h5">
                    Posts
                </Typography>
                <Button
                    onClick={createNewPost}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 5, mb: 2 }}
                >
                    Crear Post
                </Button>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {posts.map(item => (
                        <Box
                            key={item["id"]}
                            display="flex"
                            alignItems="center"
                        >
                            <Typography component="h5" variant="subtitle1" flexGrow={1} sx={{ wordBreak: 'break-all' }} >
                                {`${item["title"]} | ${item["date"].slice(0, 16)}`}
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                onClick={() => editPost(item)}
                                sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                            >
                                <UpdateIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="secondary"
                                aria-label="menu"
                                onClick={() => handleDeletePost(item["id"])}
                                sx={{ fontSize: '1.5rem' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
                <Pagination sx={{ marginTop: 'auto', alignSelf: 'center', }} size='small' count={nPostPages} shape="rounded" page={postPage + 1} onChange={handlePostPageChange} />
            </Box>
        </Box>
    )


}

export default AdminPannel