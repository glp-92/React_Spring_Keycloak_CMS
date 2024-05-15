import React from 'react'
import Markdown from 'markdown-to-jsx'
import { DateFormatToEs } from '../../util/date/DateFormatToEs';
import { Link } from "react-router-dom";

import { Typography, Box, Chip, Card, CardHeader, CardMedia, CardContent, Divider } from '@mui/material';

const PostContent = ({ postData }) => {

    const categories = postData["categories"].map((categorie) => <Link to={`/search?categorie=${categorie.name}`} key={categorie["id"]}><Chip size='small' key={categorie["id"]} label={categorie["name"]} /></Link>);

    const comments = postData["comments"].map(
        (comment) =>
            <div className='comment' key={comment["id"]}>
                <p>{comment["name"]}</p>
                <p>{comment["comment"]}</p>
            </div>
    )

    return (
        <Card >
            <Box bgcolor="#f5f5f5" padding={2}>
                <Box>
                    <Typography variant="h1">{postData.title}</Typography>
                    <Typography variant="caption">{DateFormatToEs(postData.date)}</Typography>
                    <Box display={'flex'}>
                        <Typography variant="caption" sx={{ marginRight: 1 }}>Categorias:</Typography>
                        {categories}
                    </Box>
                </Box>
                {postData.featuredImage && <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'transparent' }}>
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
                <Markdown
                    options={{
                        overrides: {
                            span: {
                                component: Typography,
                                props: {
                                    variant: 'body1',
                                },
                            },
                        },
                    }}>
                    {postData.content}
                </Markdown>
            </CardContent>
            <Divider />
            <CardContent>
                <Typography variant="caption">Comentarios</Typography>
                {comments}
            </CardContent>
            <CardContent>
                <Typography variant="body1">{postData.users.name}</Typography>
            </CardContent>
        </Card>
    )
}

export default PostContent