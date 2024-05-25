import React, { useState, useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import { GetPostList } from '../../util/requests/GetPostList';
import Loading from '../../components/loading/Loading';
import { useLocation } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Search = () => {
  const location = useLocation();

  const queryparams = location.search.replace('?', '&');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [npages, setNPages] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  }

  useEffect(() => { // Al llegar a home
    const fetchPosts = async (page) => {
      setIsLoading(true);
      const posts = await GetPostList(page, queryparams);
      if (posts != null) {
        setPosts(posts["content"]);
        setNPages(posts["totalPages"])
      }
      else {
        setPosts([]);
      }
      setIsLoading(false);
    }
    fetchPosts(page);
  }, [page, queryparams])

  return (
    <Box sx={{ flex:1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop:3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }} gutterBottom>Resultados de búsqueda</Typography>
      {isLoading ? (
        <Loading height={200}/>
      ) : (
        posts.length ? (
          <PostList postArr={posts} />
        ) : (
          <h2>Sin resultados</h2>
        )
      )}
      {
        npages > 1 && <Pagination sx={{ marginTop: 5, alignSelf:'center' }} size='small' count={npages} shape="rounded" page={page + 1} onChange={handlePageChange} />
      }
    </Box>
  )
}

export default Search;