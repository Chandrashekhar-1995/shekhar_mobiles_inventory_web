import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center"
    >
      <Typography
        variant="h2"
        className="font-bold mb-6 drop-shadow-md"
      >
        Coming Soon
      </Typography>
      <Typography
        variant="body1"
        className="mb-10 text-lg drop-shadow-md"
      >
        This feature is under development. Stay tuned for updates!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleGoBack}
        className="shadow-lg transform transition-transform duration-200 hover:scale-105"
      >
        Go Back
      </Button>
    </Box>
  );
};

export default ComingSoon;
