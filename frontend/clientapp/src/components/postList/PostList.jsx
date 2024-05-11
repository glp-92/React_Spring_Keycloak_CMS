import React from 'react'
import PostListCard from '../postListCard/PostListCard';
import Stack from '@mui/material/Stack';

const PostList = ({ postArr }) => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2, md: 2 }}>
            {postArr.map(item => (
                <PostListCard key={item["id"]} postData={item} />
            ))}
        </Stack>

    )
}

export default PostList