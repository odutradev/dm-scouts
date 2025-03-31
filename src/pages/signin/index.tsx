import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import useMountOnce from '@hooks/useMountOnce';
import { getConfig } from '@actions/admin';

const LoginPage: React.FC = () => {
  const [title, setTitle] = useState<string | null>(null);

  useMountOnce(async () => {
    const response = await getConfig();
    if (!('error' in response)){
      setTitle(response.mode === "GJE" ? "Grande Jogo Escoteiro" : "Jogo da Cidade" );
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {title && (
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="identifier"
            label="Identificador"
            name="identifier"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Typography variant="body2" align="center">
            Não tem uma conta?{' '}
            <Link href="/signup">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
