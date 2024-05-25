import React, { useState, useEffect, useRef } from 'react'
import Markdown from 'markdown-to-jsx'
import { DateFormatToEs, DateFormatToEsFull } from '../../util/date/DateFormatToEs';
import { CreateComment, DeleteComment } from '../../util/requests/Comments';
import { Link as RouterLink } from "react-router-dom";
import { ValidateToken } from '../../util/requests/ValidateToken';

import { Link, Typography, Box, Chip, Card, Button, CardMedia, CardContent, Divider, IconButton, TextField, Snackbar, Pagination } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

const commentsPerPage = 5;

const PostContent = ({ postData }) => {

    const commentFormRef = useRef(null);
    const [comments, setComments] = useState(postData.comments.sort((a, b) => new Date(b.date) - new Date(a.date)));
    const [paginatedComments, setPaginatedComments] = useState(postData.comments.slice(0, commentsPerPage));
    const [logged, setLogged] = useState(false);
    const [coppied, setCoppied] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [nCommentPages, setNCommentPages] = useState(Math.ceil(postData.comments.length / commentsPerPage));
    const [currentCommentPage, setCurrentCommentPage] = useState(1);

    const categories = postData["categories"].map((categorie) => <RouterLink to={`/search?categorie=${categorie.name}`} key={categorie["id"]}><Chip size='small' key={categorie["id"]} label={categorie["name"]} /></RouterLink>);

    const handleCopyClick = () => {
        setCoppied(true);
    };

    const handleCopyEnd = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCoppied(false);
    };

    const handleSendComment = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const commentPayload = {
                "name": data.get("name"),
                "email": data.get("email"),
                "comment": data.get("comment"),
                "postId": postData["id"]
            }
            let response = await CreateComment(commentPayload);
            if (!response.ok) {
                throw new Error(`Error creating comment: ${response.status}`);
            }
            const createdComment = await response.json();
            setComments(prevComments => [createdComment, ...prevComments]);
            setServerError(false);
            commentFormRef.current.reset();
        } catch (error) {
            console.error("Error sending comment:", error);

            if (error.message.includes("503")) {
                setServerError(true);
            } else {
                // Handle other errors (e.g., display an error message to the user)
                console.error("Unexpected error:", error);
            }
        }
    }

    const handleDeleteComment = async (comment) => {
        if (confirm('Esta accion borrara el Comentario, continuar?')) {
            try {
                const response = await DeleteComment(comment.id);
                if (!response.ok) {
                    throw new Error(`Error deleting comment: ${response.status}`);
                }
                setComments((prevComments) => prevComments.filter(c => c.id !== comment.id));
            } catch (error) {
                console.error("Error sending comment:", error);
            }
        }
    }

    const handleCommentPageChange = (e, value) => {
        setPaginatedComments(comments.slice((value - 1) * commentsPerPage, value * commentsPerPage));
        if (e) {
            setCurrentCommentPage(value);
        }
        else {
            setCurrentCommentPage(1);
        }
    }

    useEffect(() => {
        const fetchTokenValid = async () => {
            const isValid = await ValidateToken();
            setLogged(isValid);
        }
        fetchTokenValid();
    }, [])

    useEffect(() => {
        setNCommentPages(Math.ceil(comments.length / commentsPerPage));
        setPaginatedComments(comments.slice((currentCommentPage - 1) * commentsPerPage, currentCommentPage * commentsPerPage));
    }, [comments])

    return (
        <Card sx={{ marginTop: 2 }}>
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
                                            onClick={() => { navigator.clipboard.writeText(children); handleCopyClick() }}
                                            sx={{ fontSize: 20, aspectRatio: '1', borderRadius: 4 }}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                        <Snackbar
                                            open={coppied}
                                            autoHideDuration={1000}
                                            onClose={handleCopyEnd}
                                            message="Codigo copiado"
                                        />
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
                {paginatedComments.map(
                    (comment, index) =>
                        <Box key={index} marginBottom={1}>
                            <Box padding={1} bgcolor="#f5f5f5" display='flex' flexDirection='column' className='comment' key={comment["id"]}>
                                <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'left', md: 'center' }}>
                                    <Typography variant="caption">{comment["name"]}</Typography>
                                    <Box display='flex' alignItems='center' marginLeft={{ md: "auto" }}>
                                        <Typography variant="subtitle2">{DateFormatToEsFull(comment["date"])}</Typography>
                                        {logged && <IconButton color="default" onClick={() => handleDeleteComment(comment)}>
                                            <DeleteIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                        }
                                    </Box>
                                </Box>
                                <Divider />
                                <Typography variant="caption" sx={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
                                    {comment["comment"]}
                                </Typography>
                            </Box>
                        </Box>
                )}
                {nCommentPages > 1 &&
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Pagination size='small' count={nCommentPages} shape="rounded" page={currentCommentPage} onChange={handleCommentPageChange} />
                    </Box>
                }
                <Box ref={commentFormRef} component="form" display='flex' flexDirection='column' onSubmit={handleSendComment} noValidate sx={{ margin: 3 }}>
                    <Typography variant="body1" marginBottom={1}>Añadir Comentario</Typography>
                    <Box display='flex' justifyContent='space-around' flexDirection={{ xs: 'column', md: 'row' }}>
                        <TextField sx={{ flex: 1 }} required id="name" label="Nombre" name="name" />
                        <TextField sx={{ marginLeft: { md: 1, xs: 0 }, marginTop: { xs: 1, md: 0 }, flex: 2 }} required id="email" label="Correo electronico" name="email" />
                    </Box>
                    <TextField sx={{ flex: 1, marginTop: 1 }} multiline rows={4} required id="comment" label="Comentario" name="comment" />
                    <Button
                        type="submit"
                        variant="contained"
                        color="inherit"
                        sx={{ mt: 1, mb: 2, width: 100 }}
                    >
                        Enviar
                    </Button>
                    {serverError ? (
                        <Typography color="error" variant="body2">
                            No se aceptan mas mensajes por el momento
                        </Typography>
                    ) : (<Typography color="transparent" variant="body2">
                        -
                    </Typography>)}
                </Box>
            </CardContent>
            <CardContent>
                <Typography variant="body1">{postData.users.name}</Typography>
            </CardContent>
        </Card>
    )
}

export default PostContent