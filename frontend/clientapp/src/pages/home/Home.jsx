import React, { useState, useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import { GetPostList } from '../../util/requests/GetPostList';
import Loading from '../../components/loading/Loading';
import LandingPage from '../../components/landingPage/LandingPage';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const postsPerPage = 5;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [npages, setNPages] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  }

  //const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => { // Al llegar a home

    const fetchPosts = async (page) => {
      setIsLoading(true);
      //await sleep(1000);
      const posts = await GetPostList(page, `&perpage=${postsPerPage}`);
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

  }, [page])

  return (
    <Box sx={{ flex:1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
      {isLoading ? (
        <Loading height={300} />
      ) : (
        page === 0 ? (

          <LandingPage posts={posts} />

        ) :
          (
            <PostList postArr={posts} />
          )
      )
      }
      {
        npages > 1 &&
        <Pagination sx={{
          marginTop: 5,
          alignSelf: 'center',
        }} size='small' count={npages} shape="rounded" page={page + 1} onChange={handlePageChange} />
      }
    </Box>
  )
}

export default Home;