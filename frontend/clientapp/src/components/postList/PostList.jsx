import React from 'react'
import PostListCard from '../postListCard/PostListCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const PostList = ({ postArr }) => {
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 2 }} >
            {postArr.map(item => (
                <PostListCard key={item["id"]} postData={item} />
            ))}
        </Stack>

    )
}
export default PostList



/*const PostList = ({ postArr }) => {

    const renderPostList = () => {
        return postArr.map(item => (
            <Grid key={item.id} item xs="12" md="6" lg="6">
                <PostListCard key={item.id} postData={item} />
            </Grid>
        ));
    };
    return (
        <Grid container  justifyContent="flex-start" columnSpacing={3} rowSpacing={5}>
            {renderPostList()}
        </Grid>
    )
}
export default PostList*/