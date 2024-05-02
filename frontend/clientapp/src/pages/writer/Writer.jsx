import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SavePost } from '../../util/requests/Posts';
import { GetCategories } from "../../util/requests/Categories";
import { ValidateToken } from '../../util/requests/ValidateToken';
import RichTextEditor from "../../components/richTextEditor/RichTextEditor";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Writer = () => {
  const navigate = useNavigate();
  const postToEdit = useLocation().state;

  const [content, setContent] = useState(postToEdit ? postToEdit.content : '');
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const handleSendPost = async (e) => {
    /*
      Send the post to the backend, it's divided on 2 requests
      1. Send the post content to the backend including path of images to store
        1.1. If editing, is not needed to send the slug or the authorId
        1.2. If new post, is needed to send the slug and the authorId
    */
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    for (const value of data.values()) {
      console.log(value);
    }
    try {
      const tokenValid = await ValidateToken();
      if (!tokenValid) throw new Error(`Login error: not logged`);
      const token = localStorage.getItem("jwt");
      const slug = postToEdit ? postToEdit.slug : data.get("slug")
      const commonData = {
        "title": data.get("title"),
        "slug": slug,
        "excerpt": data.get("excerpt"),
        "content": content,
        "featuredImage": data.get("featuredImage"),
        "date": null,
        "featuredPost": false,
        "categoryIds": [categories[selectedCategorie]['id']],
      }
      const body = postToEdit ? { ...commonData, ...{ "postId": postToEdit.id } } : { ...commonData, ...{ "slug": data.get("slug") } };
      const method = postToEdit ? 'PUT' : 'POST';
      let response = await SavePost(
        method,
        token,
        body
      );
      if (response.ok) {
        navigate(`/post/${slug}`);
      }
      else {
        console.log("Error en subida de post: ", response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    /*
      Get categories from backend, if is editing mode, sets categorie id on combobox
    */
    const fetchCategories = async () => {
      const response = await GetCategories();
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);

      if (postToEdit && postToEdit.categories.length > 0) {
        const categoryIndex = fetchedCategories.findIndex(category => postToEdit.categories[0].id == category.id);
        setSelectedCategorie(categoryIndex);
      }
      else {
        if (fetchCategories != null) setSelectedCategorie(0);
      }
    }
    fetchCategories();
  }, [])

  return (
    <div>
      <Button component={Link} to="/wpannel" variant="contained" color="primary" startIcon={<SendIcon sx={{transform:"rotate(180deg)"}}/>}>
        Volver a Panel
      </Button>
      <Box component="form" onSubmit={handleSendPost} noValidate sx={{ mt: 1 }}>
        <TextField margin="normal" required fullWidth id="title" label="Titulo" name="title" defaultValue={postToEdit ? postToEdit.title : null} />
        <TextField margin="normal" required fullWidth id="slug" label="Link" disabled={postToEdit ? true : false} name="slug" defaultValue={postToEdit ? postToEdit.slug : null} />
        <TextField margin="normal" required fullWidth id="excerpt" label="Resumen" name="excerpt" defaultValue={postToEdit ? postToEdit.excerpt : null} />
        <RichTextEditor value={content} setValue={setContent} placeholder="Contenido"/>
        <TextField margin="normal" required fullWidth id="featuredImage" label="URL Imagen Portada" name="featuredImage" defaultValue={postToEdit ? postToEdit.featuredImage : null} />
        <div>
          <TextField
            margin="normal"
            id="select-categorie"
            select
            label="Categoria"
            value={selectedCategorie != null ? selectedCategorie : ""}
            onChange={(e) => { setSelectedCategorie(e.target.value) }}
            sx={{ width: 200 }}
          >
            {categories.map((categorie, index) => (
              <MenuItem key={categorie.id} value={index}>
                {categorie.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2, width: 200 }}
        >
          Enviar
        </Button>
      </Box>
    </div>
  )
}

export default Writer;