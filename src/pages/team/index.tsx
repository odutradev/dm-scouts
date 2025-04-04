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
import { SelectChangeEvent } from "@mui/material";

import Layout from "@components/layout";
import UserNavbar from "@components/userNavbar";
import GoBackButton from "@components/goBackButton";

import { getTeamById, updateTeamById, deleteTeamById } from "@actions/team";
import useAction from "@hooks/useAction";
import { TeamModelType } from "@utils/types/models/team";

const EditTeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [originalTeam, setOriginalTeam] = useState<Partial<TeamModelType>>({});
  const [editTeam, setEditTeam] = useState<Partial<TeamModelType>>({});
  const [editMode, setEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getTeamById(id);
        if (!("error" in data)) {
          setOriginalTeam(data);
          setEditTeam(data);
        }
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditTeam((prev) => ({
        ...prev,
        [parent]: {
          ...((prev as any)[parent] || {}),
          [child]: value,
        },
      }));
    } else {
      setEditTeam((prev) => ({
        ...prev,
        [name]: name === "group" ? Number(value) : value,
      }));
    }
  };

  const handleBranchChange = (
    event: SelectChangeEvent<"wolfcub" | "scout" | "senior" | "pioneer">
  ) => {
    setEditTeam((prev) => ({
      ...prev,
      branch: event.target.value as TeamModelType["branch"],
    }));
  };

  const handleSave = () => {
    const updatedFields: Partial<TeamModelType> = {};

    Object.entries(editTeam).forEach(([key, value]) => {
      if (key !== "_id" && value !== (originalTeam as any)[key]) {
        (updatedFields as any)[key] = value;
      }
    });

    return useAction({
      action: async () => await updateTeamById(id as string, updatedFields),
      toastMessages: {
        success: "Equipe atualizada",
        error: "Erro ao atualizar equipe",
        pending: "Atualizando equipe...",
      },
      callback: () => setEditMode(false),
    });
  };

  const handleDeleteConfirm = () => {
    return useAction({
      action: async () => await deleteTeamById(id as string),
      toastMessages: {
        success: "Equipe deletada com sucesso",
        error: "Erro ao deletar equipe",
        pending: "Deletando equipe...",
      },
      callback: () => navigate("/admin/teams"),
    });
  };

  return (
    <Layout title="Editar Equipe">
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
              label="Nome"
              name="name"
              value={editTeam.name || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Número"
              name="number"
              value={editTeam.number || ""}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            <TextField
              label="Grupo"
              name="group"
              type="number"
              value={editTeam.group || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="ID do Líder"
              name="leader.id"
              value={editTeam.leader?.id || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Nome do Líder"
              name="leader.name"
              value={editTeam.leader?.name || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <FormControl fullWidth disabled={!editMode}>
              <InputLabel id="branch-label">Ramo</InputLabel>
              <Select
                labelId="branch-label"
                value={editTeam.branch || ""}
                label="Ramo"
                onChange={handleBranchChange}
              >
                <MenuItem value="wolfcub">Lobinho</MenuItem>
                <MenuItem value="scout">Escoteiro</MenuItem>
                <MenuItem value="senior">Sênior</MenuItem>
                <MenuItem value="pioneer">Pioneiro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <TextField
              label="Local"
              name="local"
              value={editTeam.local || ""}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Descrição"
              name="description"
              value={editTeam.description || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              disabled={!editMode}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Status"
              value={editTeam.status || ""}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            <TextField
              label="Data de Criação"
              value={
                editTeam.createAt
                  ? new Date(editTeam.createAt).toLocaleString()
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            <TextField
              label="Última Atualização"
              value={
                editTeam.lastUpdate
                  ? new Date(editTeam.lastUpdate).toLocaleString()
                  : ""
              }
              fullWidth
              disabled
            />
          </Grid>

          <Grid item>
            <TextField
              label="ID Interno"
              value={id || ""}
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
                Editar Equipe
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
              Deletar Equipe
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja deletar esta equipe? Esta ação não poderá ser desfeita.
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

export default EditTeamPage;
