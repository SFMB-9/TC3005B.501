import React from 'react';
import { Box, Typography } from '@mui/material';

const UnderConstruction = () => {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography 
            fontFamily="Lato"
            color="#8A8A8A"
            fontSize={{ xs: 17, md: 20, lg: 24 }}>
          This page is under construction
        </Typography>
                         
      </Box>
    );
  };
  
  export default UnderConstruction;