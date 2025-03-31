import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import React from 'react';

import Footer from '@components/footer';
import useConfig from '@hooks/useConfig';

const LoginPage: React.FC = () => {
  const config = useConfig();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {config?.mode && (
            <Typography component="h1" variant="h5">
              {config.mode === "GJE" ? "Grande Jogo Escoteiro" : "Jogo da Cidade"}
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
      <Footer  />
    </>
  );
};

export default LoginPage;
