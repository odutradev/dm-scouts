import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { CreateTeamData } from "@actions/team/types";
import useAction from "@hooks/useAction";
import { createTeam } from "@actions/team";

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialForm: CreateTeamData = {
  name: "",
  group: "",
  leaderID: "",
  branch: "wolfcub",
  local: "",
  description: "",
};

const CreateTeamModal = ({ open, onClose }: Props) => {
  const [form, setForm] = useState<CreateTeamData>(initialForm);
  const [keepCreating, setKeepCreating] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleChange =
    (field: keyof Omit<CreateTeamData, "branch">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
      if (field === "name") {
        setNameError(!value.trim());
      }
    };

  const handleBranchChange = (event: SelectChangeEvent) => {
    setForm((prev) => ({
      ...prev,
      branch: event.target.value as "wolfcub" | "scout" | "senior" | "pioneer",
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setNameError(true);
      return;
    }
    useAction({
      action: async () => await createTeam(form),
      toastMessages: {
        success: "Time criado",
        error: "Ocorreu um erro ao criar o time",
        pending: "Criando time",
      },
      callback: () => {
        if (keepCreating) {
          setForm({
            ...initialForm,
            branch: form.branch,
          });
        } else {
          setForm(initialForm);
          setKeepCreating(false);
          onClose();
        }
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle align="center">Criar novo time</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} mt={2} alignItems="center">
          <TextField
            label="Nome"
            value={form.name}
            onChange={handleChange("name")}
            error={nameError}
            helperText={nameError ? "Campo obrigatório" : ""}
            fullWidth
            required
          />
          <TextField
            label="ID do Líder"
            value={form.leaderID}
            onChange={handleChange("leaderID")}
            fullWidth
          />
          <TextField
            label="Grupo"
            value={form.group}
            onChange={handleChange("group")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="branch-label">Ramo</InputLabel>
            <Select labelId="branch-label" value={form.branch} label="Ramo" onChange={handleBranchChange}>
              <MenuItem value="wolfcub">Lobinho</MenuItem>
              <MenuItem value="scout">Escoteiro</MenuItem>
              <MenuItem value="senior">Sênior</MenuItem>
              <MenuItem value="pioneer">Pioneiro</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Local"
            value={form.local}
            onChange={handleChange("local")}
            fullWidth
          />
          <TextField
            label="Descrição"
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox checked={keepCreating} onChange={(e) => setKeepCreating(e.target.checked)} />
          }
          label="Continuar criando"
        />
        <Box display="flex" gap={2}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {keepCreating ? "Salvar e criar novo" : "Salvar"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeamModal;
