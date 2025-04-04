import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Layout from "@components/layout";
import GoBackButton from "@components/goBackButton";
import UserNavbar from "@components/userNavbar";
import { getUserBases } from "@actions/base";
import useUserStore from "@stores/user";

const AddUserScorePage = () => {
  const [code, setCode] = useState("");
  const [bases, setBases] = useState<any[]>([]);
  const [selectedBase, setSelectedBase] = useState("");
  const user = useUserStore((x) => x.user);

  const fetchBases = async () => {
    const data = await getUserBases(user?._id as string);
    if (!("error" in data)) {
      setBases(data);
      if (data.length === 1) {
        setSelectedBase((data[0] as any)._id);
      }
    }
  };

  useEffect(() => {
    fetchBases();
  }, []);

  const handleActivateScanner = () => {
    alert("QR Code Scanner ainda não implementado.");
  };

  const handleSearch = () => {
    console.log("Buscando usuário com código:", code);
  };

  const handleBaseChange = (event: SelectChangeEvent<string>) => {
    setSelectedBase(event.target.value);
  };

  const handleAddScore = () => {
    console.log("Adicionando score para o usuário com código:", code, "na base:", selectedBase);
  };

  return (
    <Layout title="Adicionar Score ao Usuário">
      <GoBackButton />
      <UserNavbar />
      <Box display="flex" flexDirection="column" alignItems="center" p={3} width="60%" margin="auto">
        <Typography variant="h5" mb={3}>
          Adicionar Score
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} width="100%">
          {/* Dropdown de bases acima do input */}
          <FormControl fullWidth>
            <InputLabel id="base-select-label">Selecione a Base</InputLabel>
            <Select
              labelId="base-select-label"
              value={selectedBase}
              label="Selecione a Base"
              onChange={handleBaseChange}
              disabled={bases.length === 1}
            >
              {bases.map((base: any) => (
                <MenuItem key={base._id} value={base._id}>
                  {base.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleActivateScanner}>
            Ativar Scanner QR Code
          </Button>
          <TextField
            label="Código do Usuário"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddUserScorePage;
