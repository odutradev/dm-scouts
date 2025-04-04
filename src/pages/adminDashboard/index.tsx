import React, { useState, useEffect } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import UserNavbar from '@components/userNavbar';
import Layout from '@components/layout';
import useSystemStore from '@stores/system';
import useAction from '@hooks/useAction';
import { updateConfig } from '@actions/admin';
import GoBackButton from '@components/goBackButton';

const AdminConfigEdit = () => {
  const { config } = useSystemStore((x) => x.system);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    status: 'inactive',
    mode: '',
    initialScore: '',
    maintenanceMode: '',
    allowTeamRegistration: '',
    allowBaseRegistration: '',
    allowScoreApplication: '',
    lastUpdate: '',
  });

  useEffect(() => {
    if (config) {
      setFormValues({
        status: config.status,
        mode: config.mode,
        initialScore: config.initialScore.toString(),
        maintenanceMode: config.maintenanceMode ? 'true' : 'false',
        allowTeamRegistration: config.allowTeamRegistration ? 'true' : 'false',
        allowBaseRegistration: config.allowBaseRegistration ? 'true' : 'false',
        allowScoreApplication: config.allowScoreApplication ? 'true' : 'false',
        lastUpdate: new Date(config.lastUpdate).toLocaleString(),
      });
    }
  }, [config]);

  const handleToggleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    if (newStatus !== null) {
      setPendingValue(newStatus);
      setConfirmOpen(true);
    }
  };

  const handleConfirm = () => {
    if (pendingValue !== null) {
      setFormValues((prev) => ({ ...prev, status: pendingValue }));
    }
    setConfirmOpen(false);
    setPendingValue(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setPendingValue(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () =>
    useAction({
      action: async () =>
        await updateConfig({
          ...formValues,
          initialScore: Number(formValues.initialScore),
        } as any),
      toastMessages: {
        success: 'Configurações atualizadas',
        error: 'Ocorreu um erro ao atualizar',
        pending: 'Atualizando configurações',
      },
      callback: () => {},
    });

  return (
    <Layout title="Configurações - Edição">
      <GoBackButton/>
      <UserNavbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', mx: 'auto', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ToggleButtonGroup value={formValues.status} exclusive onChange={handleToggleChange}>
            <ToggleButton value="active">Edição Habilitada</ToggleButton>
            <ToggleButton value="inactive">Edição Desabilitada</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Dialog open={confirmOpen} onClose={handleCancel}>
          <DialogTitle>
            {pendingValue === 'active' ? 'Habilitar Edição' : 'Desabilitar Edição'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {pendingValue === 'active'
                ? 'Deseja habilitar a edição? Isso permitirá modificar as configurações.'
                : 'Deseja desabilitar a edição? As configurações permanecerão visíveis, mas não poderão ser alteradas.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} variant="outlined" color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Box component="form" noValidate autoComplete="off">
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                name="mode"
                label="Modo"
                value={formValues.mode}
                onChange={handleChange}
                fullWidth
                disabled={formValues.status !== 'active'}
              >
                <MenuItem value="" disabled>
                  Selecione um modo
                </MenuItem>
                <MenuItem value="GJE">Grande jogo escoteiro</MenuItem>
                <MenuItem value="JDC">Jogo da cidade</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="initialScore"
                label="Pontuação Inicial"
                value={formValues.initialScore}
                onChange={handleChange}
                type="number"
                fullWidth
                disabled={formValues.status !== 'active'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                name="maintenanceMode"
                label="Manutenção"
                value={formValues.maintenanceMode}
                onChange={handleChange}
                fullWidth
                disabled={formValues.status !== 'active'}
              >
                <MenuItem value="true">Ativado</MenuItem>
                <MenuItem value="false">Desativado</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                name="allowTeamRegistration"
                label="Registro de Equipe"
                value={formValues.allowTeamRegistration}
                onChange={handleChange}
                fullWidth
                disabled={formValues.status !== 'active'}
              >
                <MenuItem value="true">Permitido</MenuItem>
                <MenuItem value="false">Não Permitido</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                name="allowBaseRegistration"
                label="Registro de Base"
                value={formValues.allowBaseRegistration}
                onChange={handleChange}
                fullWidth
                disabled={formValues.status !== 'active'}
              >
                <MenuItem value="true">Permitido</MenuItem>
                <MenuItem value="false">Não Permitido</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                name="allowScoreApplication"
                label="Aplicação de Pontuação"
                value={formValues.allowScoreApplication}
                onChange={handleChange}
                fullWidth
                disabled={formValues.status !== 'active'}
              >
                <MenuItem value="true">Permitido</MenuItem>
                <MenuItem value="false">Não Permitido</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="lastUpdate"
                label="Última Atualização"
                value={formValues.lastUpdate}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default AdminConfigEdit;
