import React from 'react'
import MainPostCard from '../mainPostCard/MainPostCard';
import PostList from '../postList/PostList'

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const LandingPage = ({ posts }) => {
    return (
        <Container maxWidth="lm">
            {posts.length ? (
                <Stack spacing={2}>
                    <MainPostCard postData={posts[0]} />
                    <PostList postArr={posts.slice(1)} />
                </Stack>
            ) : (
                <h2>En mantenimiento</h2>
            )}
        </Container>
    )
}

export default LandingPage