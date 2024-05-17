import React from 'react'
import Markdown from 'markdown-to-jsx'
import { DateFormatToEs } from '../../util/date/DateFormatToEs';
import { Link as RouterLink } from "react-router-dom";

import { Link, Typography, Box, Chip, Card, Button, CardMedia, CardContent, Divider, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PostContent = ({ postData }) => {

    const categories = postData["categories"].map((categorie) => <RouterLink to={`/search?categorie=${categorie.name}`} key={categorie["id"]}><Chip size='small' key={categorie["id"]} label={categorie["name"]} /></RouterLink>);

    const comments = postData["comments"].map(
        (comment) =>
            <div className='comment' key={comment["id"]}>
                <p>{comment["name"]}</p>
                <p>{comment["comment"]}</p>
            </div>
    )

    return (
        <Card sx={{marginTop:2}}>
            <Box bgcolor="#f5f5f5" padding={2}>
                <Box>
                    <Typography variant="h1">{postData.title}</Typography>
                    <Typography variant="caption">{DateFormatToEs(postData.date)}</Typography>
                    <Box display={'flex'}>
                        <Typography variant="caption" sx={{ marginRight: 1 }}>Categoria:</Typography>
                        {categories}
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
                <Markdown
                    options={{
                        overrides: {
                            span: {
                                component: ({ children }) => (
                                    <Typography lineHeight={1.5} variant="body1" component="span">
                                        {children}
                                    </Typography>
                                ),
                            },
                            p: {
                                component: ({ children }) => (
                                    <Box display={'flex'} flexDirection={'column'}>
                                        <Typography lineHeight={1.5} variant="body1" component="span">
                                            {children}
                                        </Typography>
                                    </Box>
                                ),
                            },
                            code: {
                                component: ({ children }) => (
                                    <Box bgcolor={'#f5f5f5'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography lineHeight={1.5} component="span" margin={1} sx={{ overflow: 'auto', maxWidth: '100%' }}>
                                            {children}
                                        </Typography>
                                        <IconButton
                                            component={Button}
                                            color="inherit"
                                            onClick={() => navigator.clipboard.writeText(children)}
                                            sx={{ fontSize: 20, aspectRatio: '1', borderRadius: 4 }}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Box>
                                ),
                            },
                            li: {
                                component: ({ children }) => (
                                    <Typography lineHeight={1.5} variant="body1" component="li">
                                        {children}
                                    </Typography>
                                ),
                            },
                            img: {
                                component: ({ alt, src }) => (
                                    <Box sx={{ display: 'flex', margin: 2, flexDirection: 'column', alignItems: 'center' }}>
                                        <img alt={alt} src={src} style={{ maxWidth: '500px', maxHeight: '500px', width: 'auto', height: 'auto' }} />
                                        <Typography lineHeight={1.5} variant="caption" component="p">
                                            {alt}
                                        </Typography>
                                    </Box>
                                ),
                            },
                            h1: {
                                component: ({ children }) => (
                                    <Typography lineHeight={1.5} variant="h1">
                                        {children}
                                    </Typography>
                                ),
                            },
                            h2: {
                                component: ({ children }) => (
                                    <Typography lineHeight={1.5} variant="h2">
                                        {children}
                                    </Typography>
                                ),
                            },
                            h3: {
                                component: ({ children }) => (
                                    <Typography lineHeight={1.5} variant="h3">
                                        {children}
                                    </Typography>
                                ),
                            },
                            h4: {
                                component: ({ children }) => (
                                    <Typography lineHeight={1.5} variant="h4">
                                        {children}
                                    </Typography>
                                ),
                            },
                            a: {
                                component: ({ children, href }) => (
                                    <Link href={href} target="_blank" color="secondary" underline="hover">
                                        {children}
                                    </Link>
                                ),
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