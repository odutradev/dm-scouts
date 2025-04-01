import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import React, { useState } from 'react';
import * as yup from "yup";

import { UserAuthSchema } from '@utils/validations/user';
import useConfig from '@hooks/useConfig';
import useAction from '@hooks/useAction';
import Footer from '@components/footer';
import { signIn } from '@actions/user';
import { SignInData } from './types';

const SignIn = () => {
  const [credentials, setCredentials] = useState<SignInData>({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const config = useConfig();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credentials.id.trim() || !credentials.password.trim()) return setErrorMessage("Preencha todos os campos");
    setErrorMessage('');

    try {
      await UserAuthSchema.validate(credentials);
    
      useAction({
        action: async () => await signIn(credentials),
        onError: () => setErrorMessage("Ocorreu um erro ao fazer login."),
        toastMessages: {
          success: "Autenticação realizada com sucesso",
          error: "Ocorreu um erro na autenticação",
          pending: "Realizando autenticação"
        },
        callback: (data) => {
          console.log("User", data)
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorMessage(error.message);
      }
    }
  };

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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifier"
              label="Identificador"
              name="identifier"
              autoComplete="username"
              autoFocus
              value={credentials.id}
              onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
              error={!!errorMessage}
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
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              error={!!errorMessage}
            />
            {errorMessage && (
              <Typography color="error" variant="body2" align="center">
                {errorMessage}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Entrar
            </Button>
            <Typography variant="body2" align="center">
              Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignIn;
