import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, Button } from '@mui/material';
import Layout from '@components/layout';
import UserNavbar from '@components/userNavbar';
import { UserModelType } from '@utils/types/models/user';
import useUserStore from '@stores/user';
import useAction from '@hooks/useAction';
import { updateProfile } from '@actions/user';
import GoBackButton from '@components/goBackButton';

const defaultUser: UserModelType = {
  id: '',
  name: '',
  role: 'normal',
  status: 'registered',
  email: '',
  description: '',
};

const roleMap: Record<UserModelType["role"], string> = {
  normal: 'Normal',
  admin: 'Administrador',
  leadership: 'Liderança',
};

const statusMap: Record<UserModelType["status"], string> = {
  loggedIn: 'Logado',
  registered: 'Registrado',
  blocked: 'Bloqueado',
};

const ProfilePage: React.FC = () => {
  const userFromStore = useUserStore((x) => x.user);
  const fullUser: UserModelType = { ...defaultUser, ...userFromStore };
  const [editUser, setEditUser] = useState<UserModelType>(fullUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditUser({ ...defaultUser, ...userFromStore });
  }, [userFromStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'description' || name === 'email') {
      setEditUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () =>
    useAction({
      action: async () =>
        await updateProfile(editUser),
      toastMessages: {
        success: 'Perfil Atualizado',
        error: 'Ocorreu um erro ao atualizar',
        pending: 'Atualizando perfil',
      },
      callback: () => {},
    });

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Layout title="Perfil">
      <GoBackButton/>
      <UserNavbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          margin: 'auto',
          mt: 4,
          p: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid item xs={12}>
            <TextField
              label="Nome"
              name="name"
              value={editUser.name}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cargo"
              name="role"
              value={roleMap[editUser.role]}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Status"
              name="status"
              value={statusMap[editUser.status]}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              name="description"
              value={editUser.description}
              onChange={handleChange}
              fullWidth
              multiline
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ID"
              name="id"
              value={editUser.id}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Data de Criação"
              name="createAt"
              value={
                editUser.createAt ? new Date(editUser.createAt).toLocaleString() : ''
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Grupo"
              name="group"
              value={editUser.group || ''}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Salvar
              </Button>
            ) : (
              <Button variant="outlined" color="primary" onClick={handleEdit} fullWidth>
                Editar Perfil
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
