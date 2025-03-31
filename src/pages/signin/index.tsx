import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { SignInContainer, StyledForm } from './styles';
import { SignInData } from './types';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInData>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode chamar a sua função de autenticação
    console.log('Dados para autenticação:', formData);
  };

  return (
    <SignInContainer>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Entrar
            </Button>
          </StyledForm>
        </Box>
      </Container>
    </SignInContainer>
  );
};

export default SignIn;
