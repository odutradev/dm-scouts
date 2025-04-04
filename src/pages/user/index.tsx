import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

import Layout from "@components/layout";
import UserNavbar from "@components/userNavbar";
import GoBackButton from "@components/goBackButton";

import { getUserById, updateUserById, deleteUserById } from "@actions/admin";
import useAction from "@hooks/useAction";
import { UserModelType } from "@utils/types/models/user";

const roleMap: Record<UserModelType["role"], string> = {
  normal: "Normal",
  admin: "Administrador",
  leadership: "Chefe de Base",
};

const statusMap: Record<UserModelType["status"], string> = {
  loggedIn: "Logado",
  registered: "Registrado",
  blocked: "Bloqueado",
};

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [originalUser, setOriginalUser] = useState<Partial<UserModelType>>({});
  const [editUser, setEditUser] = useState<Partial<UserModelType>>({});
  const [editMode, setEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getUserById(id);
        if (!("error" in data)) {
          setOriginalUser(data);
          setEditUser(data);
        }
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (event: any) => {
    setEditUser((prev) => ({ ...prev, role: event.target.value }));
  };

  const handleSave = () => {
    const updatedFields: Partial<UserModelType> = {
      _id: (editUser as any)._id,
    };

    Object.entries(editUser).forEach(([key, value]) => {
      if (key !== "_id" && value !== (originalUser as any)[key]) {
        (updatedFields as any)[key] = value;
      }
    });

    return useAction({
      action: async () => await updateUserById(updatedFields),
      toastMessages: {
        success: "Usuário atualizado",
        error: "Erro ao atualizar usuário",
        pending: "Atualizando usuário...",
      },
      callback: () => setEditMode(false),
    });
  };

  const handleDeleteConfirm = () => {
    return useAction({
      action: async () => await deleteUserById((editUser as any)._id),
      toastMessages: {
        success: "Usuário deletado com sucesso",
        error: "Erro ao deletar usuário",
        pending: "Deletando usuário...",
      },
      callback: () => navigate("/admin/users"),
    });
  };

  return (
    <Layout title="Editar Usuário">
      <GoBackButton />
      <UserNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          margin: "auto",
          mt: 4,
          p: 2,
        }}
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="ID Público"
              name="id"
              value={editUser.id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Nome"
              name="name"
              value={editUser.name || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Email"
              name="email"
              value={editUser.email || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            {editMode && editUser.role !== "admin" ? (
              <FormControl fullWidth>
                <InputLabel id="cargo-label">Cargo</InputLabel>
                <Select
                  labelId="cargo-label"
                  value={editUser.role || ""}
                  onChange={handleRoleChange}
                  label="Cargo"
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="leadership">Chefe de Base</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <TextField
                label="Cargo"
                value={roleMap[editUser.role as UserModelType["role"]] || ""}
                fullWidth
                disabled
              />
            )}
          </Grid>

          <Grid item>
            <TextField
              label="Status"
              value={statusMap[editUser.status as UserModelType["status"]] || ""}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            <TextField
              label="Descrição"
              name="description"
              value={editUser.description || ""}
              onChange={handleChange}
              fullWidth
              multiline
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Data de Criação"
              value={
                editUser.createAt
                  ? new Date(editUser.createAt).toLocaleString()
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            <TextField
              label="Grupo"
              name="group"
              value={editUser.group || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="_id"
              value={(editUser as any)._id || ""}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            {editMode ? (
              <Button variant="contained" onClick={handleSave} fullWidth>
                Salvar
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setEditMode(true)}
                fullWidth
              >
                Editar Usuário
              </Button>
            )}
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
              fullWidth
            >
              Deletar Conta
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja deletar este usuário? Esta ação não poderá ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default EditUserPage;
