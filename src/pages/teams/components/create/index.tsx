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
import { CreateUserData } from "@actions/admin/types";
import useAction from "@hooks/useAction";
import { createUser } from "@actions/admin";
  
  type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  const initialForm: CreateUserData = {
    id: "",
    name: "",
    group: "",
    role: "normal",
  };
  
  const CreateUserModal = ({ open, onClose }: Props) => {
    const [form, setForm] = useState<CreateUserData>(initialForm);
    const [keepCreating, setKeepCreating] = useState(false);
  
    const handleChange =
      (field: keyof Omit<CreateUserData, "role">) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      };
  
    const handleRoleChange = (event: SelectChangeEvent) => {
      setForm((prev) => ({
        ...prev,
        role: event.target.value as "normal" | "leadership",
      }));
    };
  
    const handleSubmit = () => {
        useAction({
            action: async () => await createUser(form),
            toastMessages: {
              success: 'Usuario criado',
              error: 'Ocorreu um erro ao criar o usuario',
              pending: 'Criando usuario',
            },
            callback: () => {
                if (keepCreating) {
                  setForm((prev) => ({
                    id: "",
                    name: "",
                    group: "",
                    role: prev.role,
                  }));
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
        <DialogTitle align="center">Criar novo usuário</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            mt={2}
            alignItems="center"
          >
            <TextField
              label="ID"
              value={form.id}
              onChange={handleChange("id")}
              fullWidth
            />
            <TextField
              label="Nome"
              value={form.name}
              onChange={handleChange("name")}
              fullWidth
            />
            <TextField
              label="Grupo"
              value={form.group}
              onChange={handleChange("group")}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="role-label">Função</InputLabel>
              <Select
                labelId="role-label"
                value={form.role}
                label="Função"
                onChange={handleRoleChange}
              >
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="leadership">Liderança</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
            <Button variant="contained" onClick={handleSubmit}>
              {keepCreating ? "Salvar e criar novo" : "Salvar"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CreateUserModal;
  