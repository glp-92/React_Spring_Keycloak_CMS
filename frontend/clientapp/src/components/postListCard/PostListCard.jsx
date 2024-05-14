import React from 'react'
import { Link } from 'react-router-dom';
import { DateFormatToEs } from '../../util/date/DateFormatToEs';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

/*
import Avatar from '@mui/material/Avatar';
{postData["users"]["username"] && (
    <Box sx={{ display: 'inline', margin: 1 }}>
        <Chip avatar={<Avatar>{postData["users"]["username"].substring(0, 1).toUpperCase()}</Avatar>} label={postData["users"]["username"]} />
    </Box>)}*/

const PostListCard = ({ postData }) => {

    const categories = postData["categories"].map((categorie) => <Box key={categorie["id"]}><Chip size='small' key={categorie["id"]} label={categorie["name"]} /></Box>);

    return (
        <Link to={`/post/${postData["slug"]}`} style={{ textDecoration: 'none', width: '100%' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 1, borderRadius: 2, ":hover": { opacity: 0.8 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {postData.featuredImage && <CardMedia
                        sx={{ minWidth: '20%', flexShrink: 0, aspectRatio: '1', marginRight: 1 }}
                        image={`${postData["featuredImage"]}`}
                        title={`${postData["slug"]}Image`}
                    />}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography gutterBottom variant="h2" component="div">
                            {postData["title"]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {postData["excerpt"]}
                        </Typography>
                    </CardContent>
                </Box>
                <Divider sx={{ marginBottom: 1, flex: 2 }} />
                <Stack direction="row-reverse" spacing={1} justifyContent="space-between">
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <EditCalendarIcon color="action" />
                        <Typography sx={{ marginLeft: 1 }} variant="subtitle2" color="text.secondary">
                            {DateFormatToEs(postData["date"])}
                        </Typography >
                    </Box>
                    {categories}
                </Stack>
            </Card>
        </Link>
    )
}

export default PostListCard;