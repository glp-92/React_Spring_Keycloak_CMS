import React from 'react'
import Markdown from 'markdown-to-jsx'

import { Typography, Box, Chip, Card, CardHeader, CardMedia, CardContent, Divider } from '@mui/material';

const PostContent = ({ postData }) => {

    const categories = postData["categories"].map((categorie) => <Box key={categorie["id"]}><Chip size='small' key={categorie["id"]} label={categorie["name"]} /></Box>);
    // const categories = postData["categories"].map((categorie) => <p className='categorie' key={categorie["id"]}>{categorie["name"]}</p>);

    const comments = postData["comments"].map(
        (comment) =>
            <div className='comment' key={comment["id"]}>
                <p>{comment["name"]}</p>
                <p>{comment["comment"]}</p>
            </div>
    )

    return (
        <Card sx={{ width: '100%' }}>
            <Box>
                <Typography>{postData.title}</Typography>
                <Typography>{postData.date}</Typography>
                {categories}
            </Box>
            <Box display="flex" justifyContent="center" sx={{backgroundColor:'transparent'}}>
                <CardMedia
                    sx={{ width: '20%',  aspectRatio: '1', margin: 1 }}
                    image={`${postData["featuredImage"]}`}
                    title={`${postData["slug"]}Image`}
                />
            </Box>
            <CardContent>
                <Markdown>{postData.content}</Markdown>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography variant="subtitle1">Comentarios</Typography>
                {comments}
            </CardContent>
            <CardContent>
                <Typography variant="body1">{postData.users.name}</Typography>

            </CardContent>
        </Card>
    )
}

export default PostContent