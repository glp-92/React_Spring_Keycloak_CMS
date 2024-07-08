import { useState, useEffect } from 'react'
import { GetPostList } from '../../../util/requests/GetPostList';
import { DeletePost } from '../../../util/requests/Posts';

import { useNavigate } from "react-router-dom";

const usePost = () => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [postPage, setPostPage] = useState(0);
  const [nPostPages, setNPostPages] = useState(0);

  const handleCreatePost = () => {
    navigate(`/wpannel/writer`);
  }

  const handleEditPost = (post) => {
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

  useEffect(() => {
    fetchPosts(postPage);
  }, [postPage])

  return {
    posts,
    postPage,
    setPostPage,
    nPostPages,
    handleCreatePost,
    handleEditPost,
    handleDeletePost
  }
}

export default usePost