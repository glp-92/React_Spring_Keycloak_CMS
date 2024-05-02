import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box className="loading" sx={{ position:'fixed', width:'100%', top:0, left:0}}>
      <LinearProgress />
    </Box>
  )
}

export default Loading