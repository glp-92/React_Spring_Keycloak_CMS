import React from 'react'
import MainPostCard from '../mainPostCard/MainPostCard';
import PostList from '../postList/PostList'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const LandingPage = ({ posts }) => {
    return (
        <>
            {posts.length ? (
                <Stack spacing={3}>
                    <MainPostCard postData={posts[0]} />
                    {posts.length > 1 && (<Typography variant="h4" sx={{ textAlign: 'left' }} gutterBottom>Entradas recientes</Typography>)}
                    <PostList postArr={posts.slice(1)} />
                </Stack>
            ) : (
                <h2>En mantenimiento</h2>
            )}
        </>
    )
}

export default LandingPage