import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '6rem', sm: '8rem' }, color: 'primary.main' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Ops! Página não encontrada.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        Parece que você se perdeu no caminho... Que tal voltar para o início?
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
      >
        Voltar para a página inicial
      </Button>
    </Box>
  );
};

export default NotFound;
