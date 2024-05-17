import React from 'react'
import PostListCard from '../postListCard/PostListCard';
import Grid from '@mui/material/Grid';

const PostList = ({ postArr }) => {
    const renderPostList = () => {
        return postArr.map(item => (
            <Grid key={item.id} item xs={12} md={6} sx={{ pr: 1, pl: 1 }}>
                <PostListCard key={item.id} postData={item} />
            </Grid>
        ));
    };
    return (
        <Grid sx={{ width: 'auto' }} container alignSelf="left" rowSpacing={2}>
            {renderPostList()}
        </Grid>
    )
}
export default PostList