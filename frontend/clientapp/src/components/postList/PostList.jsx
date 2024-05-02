import React from 'react'
import PostListCard from '../postListCard/PostListCard';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const PostList = ({ postArr }) => {
    return (
        <Container maxWidth="lm">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2, md: 2 }}>
                {postArr.map(item => (
                    <PostListCard key={item["id"]} postData={item} />
                ))}
            </Stack>
        </Container>

    )
}

export default PostList