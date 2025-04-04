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

import { getBaseById, updateBaseById, deleteBaseById } from "@actions/base";
import useAction from "@hooks/useAction";
import { BaseModelType } from "@utils/types/models/base";

const typeMap: Record<BaseModelType["type"], string> = {
  fixed: "Fixa",
  mobile: "Móvel",
  secret: "Secreta",
  special: "Especial",
};

const branchMap: Record<BaseModelType["branch"], string> = {
  wolfcub: "Lobinho(a)",
  scout: "Escoteiro(a)",
  senior: "Sênior",
  pioneer: "Pioneiro(a)",
  all: "Todos",
};

const EditBasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [originalBase, setOriginalBase] = useState<BaseModelType | null>(null);
  const [editBase, setEditBase] = useState<BaseModelType | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getBaseById(id);
        if (!("error" in data)) {
          setOriginalBase(data);
          setEditBase(data);
        }
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditBase((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleBranchChange = (e: any) => {
    setEditBase((prev) => (prev ? { ...prev, branch: e.target.value } : prev));
  };

  const handleTypeChange = (e: any) => {
    setEditBase((prev) => (prev ? { ...prev, type: e.target.value } : prev));
  };

  const handleSave = () => {
    if (!editBase || !originalBase) return;

    const updatedFields: Partial<BaseModelType> = {};

    Object.entries(editBase).forEach(([key, value]) => {
      if (value !== (originalBase as any)[key]) {
        (updatedFields as any)[key] = value;
      }
    });

    return useAction({
      action: async () => await updateBaseById((editBase as any)._id, updatedFields),
      toastMessages: {
        success: "Base atualizada",
        error: "Erro ao atualizar base",
        pending: "Atualizando base...",
      },
      callback: () => setEditMode(false),
    });
  };

  const handleDeleteConfirm = () => {
    if (!editBase) return;

    return useAction({
      action: async () => await deleteBaseById((editBase as any)._id),
      toastMessages: {
        success: "Base deletada com sucesso",
        error: "Erro ao deletar base",
        pending: "Deletando base...",
      },
      callback: () => navigate("/admin/bases"),
    });
  };

  return (
    <Layout title="Editar Base">
      <GoBackButton />
      <UserNavbar />
      <Box sx={{ display: "flex", flexDirection: "column", width: "70%", margin: "auto", mt: 4, p: 2 }}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField label="Nome" name="name" value={editBase?.name || ""} onChange={handleChange} fullWidth disabled={!editMode} />
          </Grid>

          <Grid item>
            <TextField label="Descrição" name="description" value={editBase?.description || ""} onChange={handleChange} fullWidth multiline disabled={!editMode} />
          </Grid>

          <Grid item>
            <FormControl fullWidth disabled={!editMode}>
              <InputLabel id="branch-label">Ramo</InputLabel>
              <Select labelId="branch-label" value={editBase?.branch || ""} onChange={handleBranchChange} label="Ramo">
                {Object.entries(branchMap).map(([value, label]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl fullWidth disabled={!editMode}>
              <InputLabel id="type-label">Tipo</InputLabel>
              <Select labelId="type-label" value={editBase?.type || ""} onChange={handleTypeChange} label="Tipo">
                {Object.entries(typeMap).map(([value, label]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <TextField label="Número" name="number" value={editBase?.number || ""} onChange={handleChange} fullWidth disabled={!editMode} />
          </Grid>

          <Grid item>
            <TextField label="Local" name="local" value={editBase?.local || ""} onChange={handleChange} fullWidth disabled={!editMode} />
          </Grid>

          <Grid item>
            <TextField label="Chefe de Base" name="leader" value={editBase?.leader.name || ""} onChange={handleChange} fullWidth disabled={!editMode} />
          </Grid>

          <Grid item>
            {editMode ? (
              <Button variant="contained" onClick={handleSave} fullWidth>Salvar</Button>
            ) : (
              <Button variant="outlined" onClick={() => setEditMode(true)} fullWidth>Editar Base</Button>
            )}
          </Grid>

          <Grid item>
            <Button variant="outlined" color="error" onClick={() => setOpenDeleteDialog(true)} fullWidth>Deletar Base</Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja deletar esta base? Esta ação não poderá ser desfeita.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default EditBasePage;