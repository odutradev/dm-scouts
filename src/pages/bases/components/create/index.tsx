import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { createBase } from "@actions/base";
import useAction from "@hooks/useAction";
import { BaseModelType } from "@utils/types/models/base";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface CreateBaseData {
  name: string;
  number: number;
  branch: BaseModelType["branch"];
  leader: {
    id: string;
    name: string;
  };
  local: string;
  status: BaseModelType["status"];
  type: BaseModelType["type"];
  description?: string;
}

const CreateBaseModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState<CreateBaseData>({
    name: "",
    number: 0,
    branch: "scout",
    type: "fixed",
    status: "active",
    local: "",
    leader: {
      id: "",
      name: "",
    },
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      leader: {
        ...prev.leader,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () =>
    useAction({
      action: async () => await createBase(form as any),
      toastMessages: {
        success: "Base criada com sucesso!",
        error: "Erro ao criar base.",
        pending: "Criando base...",
      },
      callback: onClose,
    });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Criar Nova Base</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Número"
            name="number"
            type="number"
            value={form.number}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Local"
            name="local"
            value={form.local}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Ramo"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="wolfcub">Lobinho</MenuItem>
            <MenuItem value="scout">Escoteiro</MenuItem>
            <MenuItem value="senior">Sênior</MenuItem>
            <MenuItem value="pioneer">Pioneiro</MenuItem>
            <MenuItem value="all">Todos</MenuItem>
          </TextField>
          <TextField
            select
            label="Tipo"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="fixed">Fixa</MenuItem>
            <MenuItem value="mobile">Móvel</MenuItem>
            <MenuItem value="secret">Secreta</MenuItem>
            <MenuItem value="special">Especial</MenuItem>
          </TextField>
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="active">Ativa</MenuItem>
            <MenuItem value="inactive">Inativa</MenuItem>
          </TextField>
          <TextField
            label="ID do Chefe"
            name="id"
            value={form.leader.id}
            onChange={handleLeaderChange}
            fullWidth
          />
          <TextField
            label="Nome do Chefe"
            name="name"
            value={form.leader.name}
            onChange={handleLeaderChange}
            fullWidth
          />
          <TextField
            label="Descrição"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBaseModal;
