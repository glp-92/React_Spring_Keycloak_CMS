import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import { GetPostList } from '../../util/requests/GetPostList';
import { DeletePost } from '../../util/requests/Posts';
import { GetCategories, CreateCategorie, DeleteCategorie, UpdateCategorie } from '../../util/requests/Categories';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AdminPannel = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inputCategorie, setInputCategorie] = useState('');
    const [page, setPage] = useState(0);
    const [npages, setNPages] = useState(0);

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
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        };
        if (confirm('Esta accion borrara el Post de la base de datos, continuar?')) {
            deletePost();
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    }

    const handleCreateCategorie = async () => {
        const token = localStorage.getItem("jwt");
        const newCategorieName = inputCategorie.toLowerCase();
        try {
            const response = await CreateCategorie(newCategorieName, token);
            if (response.ok) {
                const createdCategorie = await response.json()
                setCategories(prevCategories => [...prevCategories, createdCategorie]);
                setInputCategorie('');
            }
            else {
                throw new Error(`Erroneous answer from server`);
            }
        } catch (error) {
            console.error("Error. Categorie not created!", error);
        }
    }

    const handleEditCategorieLabel = (newName, index) => {
        const newCategories = [...categories];
        newCategories[index]["name"] = newName;
        newCategories[index]["slug"] = newName;
        setCategories(newCategories);
    }

    const handleUpdateCategorie = async (index) => {
        const token = localStorage.getItem("jwt");
        const categorie = categories[index];
        try {
            let response = await UpdateCategorie(categorie, token);
            if (!response.ok) {
                throw new Error(`Erroneous answer from server`);
            }
        } catch (error) {
            console.log("Error. Categorie not updated!", error);
        }
    }

    const handleDeleteCategorie = async (id, index) => {
        if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
            const token = localStorage.getItem("jwt");
            if (!token) return false;
            try {
                let response = await DeleteCategorie(id, token);
                if (!response.ok) {
                    throw new Error(`Erroneous answer from server`);
                }
                setCategories(prevCategories => prevCategories.filter(categorie => categorie.id !== id));
            } catch (error) {
                console.log("Error. Categorie not deleted!", error);
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async (page) => {
            const posts = await GetPostList(page, null);
            if (posts != null) {
                setPosts(posts["content"]);
                setNPages(posts["totalPages"])
            }
            else {
                setPosts([]);
            }
        }
        const fetchCategories = async () => {
            try {
                let response = await GetCategories();
                if (!response.ok) {
                    throw new Error(`Error fetching categories`);
                }
                setCategories(await response.json());
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
        fetchPosts(page);
    }, [page])

    return (
        <Box >
            <Typography align='center' component="h1" variant="h5">
                Panel de Administracion
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
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h3" variant="h5">
                    Categorias
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 0 }}>
                    <TextField type="text" margin="normal" fullWidth id="title" label="Nombre de categoria" name="newCategory" value={inputCategorie} onChange={(e) => { setInputCategorie(e.target.value) }} />
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        onClick={handleCreateCategorie}
                        sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                <Divider variant="middle" />
                <List dense>
                    {categories.map((categorie, index) => (
                        <ListItem key={index} alignItems="center" sx={{ mt: 0, mb: 0 }}>
                            <TextField type="text" fullWidth margin="normal" defaultValue={categorie["name"]} onChange={(e) => handleEditCategorieLabel(e.target.value, index)} />
                            <IconButton
                                size="large"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                onClick={() => handleUpdateCategorie(index)}
                                sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                            >
                                <UpdateIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="secondary"
                                aria-label="menu"
                                onClick={() => handleDeleteCategorie(categorie.id, index)}
                                sx={{ fontSize: '1.5rem' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h3" variant="h5">
                    Posts
                </Typography>
                <Stack spacing={2}>
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
                <Pagination count={npages} page={page} onChange={handlePageChange} />
            </Box>
        </Box>
    )


}

export default AdminPannel