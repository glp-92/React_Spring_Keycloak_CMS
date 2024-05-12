import React from 'react'
import MainPostCard from '../mainPostCard/MainPostCard';
import PostList from '../postList/PostList'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LandingPage = ({ posts }) => {
    return (
        <Box sx={{width:'100%'}}>
            {posts.length ? (
                <Stack spacing={2}>
                    <MainPostCard postData={posts[0]} />
                    {posts.length > 1 && (<Typography variant="h1" sx={{ textAlign: 'center' }} gutterBottom>Reciente</Typography>)}
                    <PostList postArr={posts.slice(1)} />
                </Stack>
            ) : (
                <h2>En mantenimiento</h2>
            )}
        </Box>
    )
}

export default LandingPage