import React from 'react'
import { Link } from 'react-router-dom';
import { DateFormatToEs } from '../../util/date/DateFormatToEs';
import { TruncateText } from '../../util/formatting/TruncateText';

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

    const categories = postData["categories"].map((categorie) => <Box sx={{ margin: 1 }} key={categorie["id"]}><Chip size='small' key={categorie["id"]} label={categorie["name"]} /></Box>);

    return (
        <Link to={`/post/${postData["slug"]}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, ":hover": { opacity: 0.8 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {postData.featuredImage && <Box bgcolor={'#f5f5f5'}>
                        <CardMedia
                            component="img"
                            height="150"
                            alt={"alt"}
                            sx={{ objectFit: "contain" }}
                            image={`${postData["featuredImage"]}`}
                            title={`${postData["slug"]}Image`}
                        />
                    </Box>}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h2" component="div">
                            {postData["title"]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {TruncateText(postData["excerpt"], 150)}
                        </Typography>
                    </CardContent>
                </Box>
                <Divider sx={{ flex: 1 }} />
                <Stack direction="row-reverse" sx={{ margin: 1 }} spacing={1} justifyContent="space-between">
                    <Box sx={{ ml:'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <EditCalendarIcon sx={{ml:'auto', mr:1}} color="action" />
                        <Typography sx={{ ml: 'auto', mr: 1 }} variant="subtitle2" color="text.secondary">
                            {DateFormatToEs(postData["date"])}
                        </Typography >
                    </Box>
                    <Box sx={{flex:3}} display={'flex'} flexWrap="wrap">
                        {categories}
                    </Box>
                </Stack>
            </Card>
        </Link>
    )
}

export default PostListCard;