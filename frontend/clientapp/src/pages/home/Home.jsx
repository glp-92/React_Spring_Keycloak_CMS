import React, { useState, useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import { GetPostList } from '../../util/requests/GetPostList';
import Loading from '../../components/loading/Loading';
import LandingPage from '../../components/landingPage/LandingPage';

import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h1" sx={{ textAlign: 'center' }} gutterBottom>Últimas entradas</Typography>
      <main>
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
      </main>
      <Pagination sx={{ marginTop: 4 }} size='small' count={npages} shape="rounded" page={page + 1} onChange={handlePageChange} />
    </Container>
  )
}

export default Home;