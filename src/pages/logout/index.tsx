import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    const timeout = setTimeout(() => {
      navigate('/signin');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="h6">
        Você está sendo deslogado...
      </Typography>
    </Box>
  );
};

export default Logout;
