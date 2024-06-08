import React from 'react'
import { DateFormatToEs } from '../../util/date/DateFormatToEs';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MarkdownContent from './MarkdownContent';
// import Comments from '../comments/Comments';

import { Avatar, Typography, IconButton, Box, Chip, Card, CardMedia, CardContent, Divider } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';


const PostContent = ({ postData }) => {

    const navigate = useNavigate();
    const categories = postData["categories"].map((categorie) => <RouterLink to={`/search?categorie=${categorie.name}`} key={categorie["id"]}><Chip sx={{ marginRight: 1, marginBottom: 1 }} size='small' key={categorie["id"]} label={categorie["name"]} /></RouterLink>);

    return (
        <Card sx={{ marginTop: 2 }}>
            <Box bgcolor="#f5f5f5" padding={2}>
                <Box>
                    <Typography variant="h1">{postData.title}</Typography>
                    <Box sx={{ marginTop: 1, marginBottom: 1, alignItems: 'center' }} display={'flex'}>
                        <Avatar sx={{ marginRight: 1 }} src={postData.users.picture && postData.users.picture}>{postData.users.username[0].toUpperCase()}</Avatar>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant="caption">{postData.users.username}</Typography>
                            <Typography variant="caption">{DateFormatToEs(postData.date)}</Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ width: '100%' }}>
                        <Typography variant="caption" sx={{ marginRight: 1, marginBottom: 1 }}>Categorias:</Typography>
                        <Box display={'flex'} flexWrap="wrap">
                            {categories}
                        </Box>
                    </Box>
                </Box>
                {postData.featuredImage && <Box display="flex" justifyContent="center" sx={{ marginTop: 1, backgroundColor: 'transparent' }}>
                    <CardMedia
                        component="img"
                        height="300"
                        alt={"alt"}
                        sx={{ objectFit: "contain" }}
                        image={`${postData["featuredImage"]}`}
                        title={`${postData["slug"]}Image`}
                    />
                </Box>}
            </Box>
            <Divider />
            <CardContent>
                <MarkdownContent content={postData.content} />
            </CardContent>
            {/* 
            <Divider />
            <Comments postData={postData}/>
            */}
        </Card>
    )
}

export default PostContent