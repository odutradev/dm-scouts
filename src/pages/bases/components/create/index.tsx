import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { BaseModelType } from "@utils/types/models/base";
import { createBase } from "@actions/base";
import useAction from "@hooks/useAction";

interface Props {
  open: boolean;
  onClose: () => void;
}

type CreateBaseData = {
  name: string;
  description?: string;
  leaderID: string;
  branch: BaseModelType["branch"];
  number: number;
  local: string;
  type: BaseModelType["type"];
};

const defaultData: CreateBaseData = {
  name: "",
  description: "",
  leaderID: "",
  branch: "all",
  number: 0,
  local: "",
  type: "fixed",
};

const branchOptions: BaseModelType["branch"][] = [
  "wolfcub",
  "scout",
  "senior",
  "pioneer",
  "all",
];

const typeOptions: BaseModelType["type"][] = [
  "fixed",
  "mobile",
  "secret",
  "special",
];

const CreateBaseModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState<CreateBaseData>(defaultData);
  const [keepCreating, setKeepCreating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, number: Number(e.target.value) }));
  };

  const handleCreate = () =>
    useAction({
      action: async () => await createBase(form as any),
      toastMessages: {
        success: "Base criada com sucesso",
        error: "Erro ao criar base",
        pending: "Criando base...",
      },
      callback: () => {
        if (keepCreating) {
          setForm((prev) => ({
            ...defaultData,
            branch: prev.branch,
            type: prev.type,
          }));
        } else {
          setForm(defaultData);
          setKeepCreating(false);
          onClose();
        }
      },
    });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle align="center">Criar Nova Base</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Descrição"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <TextField
            label="ID do Chefe de Base"
            name="leaderID"
            value={form.leaderID}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Ramo"
            name="branch"
            select
            value={form.branch}
            onChange={handleChange}
            fullWidth
            required
          >
            {branchOptions.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {translateBranch(branch)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Tipo"
            name="type"
            select
            value={form.type}
            onChange={handleChange}
            fullWidth
            required
          >
            {typeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {translateType(type)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Número"
            name="number"
            type="number"
            value={form.number}
            onChange={handleNumberChange}
            fullWidth
          />
          <TextField
            label="Local"
            name="local"
            value={form.local}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={keepCreating}
              onChange={(e) => setKeepCreating(e.target.checked)}
            />
          }
          label="Continuar criando"
        />
        <Box display="flex" gap={2}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreate}>
            {keepCreating ? "Criar e continuar" : "Criar"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const translateBranch = (branch: BaseModelType["branch"]) => {
  switch (branch) {
    case "wolfcub":
      return "Lobinho";
    case "scout":
      return "Escoteiro";
    case "senior":
      return "Sênior";
    case "pioneer":
      return "Pioneiro";
    case "all":
      return "Todos";
    default:
      return "-";
  }
};

const translateType = (type: BaseModelType["type"]) => {
  switch (type) {
    case "fixed":
      return "Fixa";
    case "mobile":
      return "Móvel";
    case "secret":
      return "Secreta";
    case "special":
      return "Especial";
    default:
      return "-";
  }
};

export default CreateBaseModal;
