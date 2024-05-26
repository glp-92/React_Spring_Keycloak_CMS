import React from 'react'
import MainPostCard from '../mainPostCard/MainPostCard';
import PostList from '../postList/PostList'
import MaintenanceSVG from '../../assets/maintenance.svg'

import { Stack, Typography, Box } from '@mui/material';

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
                <Box sx={{ height:'40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography borderRadius={1} padding={1} bgcolor='lightgray' variant="h1">ERROR</Typography>
                    <Typography marginTop={4} variant="caption">Pagina en mantenimiento</Typography>
                </Box>
            )}
        </>
    )
}

export default LandingPage