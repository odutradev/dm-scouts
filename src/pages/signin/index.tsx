import { Container, Box, TextField, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { Visibility,VisibilityOff,Clear,Person,Lock,} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import * as yup from 'yup';

import { UserAuthSchema } from '@utils/validations/user';
import useConfig from '@hooks/useConfig';
import useAction from '@hooks/useAction';
import Footer from '@components/footer';
import { signIn } from '@actions/user';
import { SignInData } from './types';

const SignIn = () => {
  const [credentials, setCredentials] = useState<SignInData>({ id: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const config = useConfig();

  const handleInputChange = (field: keyof SignInData) => (event: React.ChangeEvent<HTMLInputElement>) => setCredentials((prev) => ({ ...prev, [field]: event.target.value }));
  const handleClearIdentifier = () => setCredentials((prev) => ({ ...prev, id: '' }));
  const handleTogglePasswordVisibility = () =>  setShowPassword((prev) => !prev);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credentials.id.trim() || !credentials.password.trim()) return setErrorMessage("Preencha todos os campos");

    setErrorMessage('');
    setSuccess(false);
    setLoading(true);

    try {
      await UserAuthSchema.validate(credentials);

      useAction({
        action: async () => await signIn(credentials),
        onError: () => {
          setErrorMessage("Ocorreu um erro ao fazer login.");
          setLoading(false);
        },
        toastMessages: {
          success: "Autenticação realizada com sucesso",
          error: "Ocorreu um erro na autenticação",
          pending: "Realizando autenticação"
        },
        callback: () => {
          setSuccess(true);
          setLoading(false);
          setTimeout(() => {
            navigate('/dashboard');
          }, 500);
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  };

  const systemName = config?.mode ? (config.mode === 'GJE' ? ' ao Grande Jogo Escoteiro' : ' ao Jogo da Cidade') : '';

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            {`Bem-vindo de volta${systemName}!`}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Faça login para continuar sua jornada
          </Typography>

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
              onChange={handleInputChange('id')}
              error={!!errorMessage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                endAdornment: credentials.id && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearIdentifier}
                      edge="end"
                      sx={{
                        p: 0.5,
                        mr: 0.5,
                        outline: 'none',
                        '&:focus': { outline: 'none' },
                      }}
                      disableRipple
                      disableFocusRipple
                    >
                      <Clear fontSize="small" sx={{ color: '#999' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange('password')}
              error={!!errorMessage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{
                        p: 0.5,
                        mr: 0.5,
                        outline: 'none',
                        '&:focus': { outline: 'none' },
                      }}
                      disableRipple
                      disableFocusRipple
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" sx={{ color: '#999' }} />
                      ) : (
                        <Visibility fontSize="small" sx={{ color: '#999' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {errorMessage && (
              <Typography color="error" variant="body2" align="center">
                {errorMessage}
              </Typography>
            )}

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: success ? 'success.main' : undefined,
                '&:hover': {
                  backgroundColor: success ? 'success.dark' : undefined,
                },
              }}
            >
              Entrar
            </LoadingButton>

            <Typography variant="body2" align="center">
              Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
            </Typography>
          </Box>
          <Footer />
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
