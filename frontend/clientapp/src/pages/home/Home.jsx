import React, { useState, useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import { GetPostList } from '../../util/requests/GetPostList';
import Loading from '../../components/loading/Loading';
import LandingPage from '../../components/landingPage/LandingPage';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const Home = () => {
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
      const posts = await GetPostList(page, null);
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width:'100%'}}>
        {isLoading ? (
          <Loading />
        ) : (
          page === 0 ? (
            <LandingPage posts={posts} />
          ) :
            (
              <PostList postArr={posts} />
            )
        )
        }
      <Pagination sx={{ marginTop: 4 }} size='small' count={npages} shape="rounded" page={page + 1} onChange={handlePageChange} />
    </Box>
  )
}

export default Home;