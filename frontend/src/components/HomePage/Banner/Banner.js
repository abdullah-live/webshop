import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Banner = ({ message, onClose }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#ff9800',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        position: 'fixed',
        top: 0,
        zIndex: 1300, // higher than AppBar
      }}
    >
      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center' }}>
        {message}
      </Typography>
      <IconButton
        color="inherit"
        size="small"
        onClick={onClose}
        sx={{ position: 'absolute', right: 10 }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default Banner;
