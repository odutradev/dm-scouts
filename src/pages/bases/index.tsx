import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import GoBackButton from "@components/goBackButton";
import UserNavbar from "@components/userNavbar";
import Layout from "@components/layout";

import { getAllBases } from "@actions/base";
import type { BaseModelType } from "@utils/types/models/base";
import CreateBaseModal from "./components/create";

const Bases = () => {
  const [bases, setBases] = useState<BaseModelType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchBases = async () => {
    const data = await getAllBases();
    if (!("error" in data)) {
      setBases(data);
    }
  };

  useEffect(() => {
    fetchBases();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = async () => {
    setOpenModal(false);
    await fetchBases();
  };

  const handleRowClick = (id: string) => {
    navigate(`/admin/base/${id}`);
  };

  return (
    <Layout title="Bases">
      <GoBackButton />
      <UserNavbar />

      <Box display="flex" flexDirection="column" minHeight="60vh" width="100%">
        <Box flex={1} p={3} display="flex" flexDirection="column" overflow="auto">
          <Box display="flex" justifyContent="center" mb={3}>
            <Button variant="contained" onClick={handleOpenModal}>
              Criar Base
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Número</TableCell>
                  <TableCell>Ramo</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Líder</TableCell>
                  <TableCell>Local</TableCell>
                  <TableCell>Criada em</TableCell>
                  <TableCell>Última Atualização</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bases.map((base) => (
                  <TableRow
                    key={base.name}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick((base as any)._id)}
                  >
                    <TableCell>{base.name}</TableCell>
                    <TableCell>{base.number}</TableCell>
                    <TableCell>{translateBranch(base.branch)}</TableCell>
                    <TableCell>{translateType(base.type)}</TableCell>
                    <TableCell>{translateStatus(base.status)}</TableCell>
                    <TableCell>{base.leader.name}</TableCell>
                    <TableCell>{base.local}</TableCell>
                    <TableCell>{formatDate(base.createAt)}</TableCell>
                    <TableCell>
                      {base.lastUpdate ? formatDate(base.lastUpdate) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <CreateBaseModal open={openModal} onClose={handleCloseModal} />
    </Layout>
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

const translateStatus = (status: BaseModelType["status"]) =>
  status === "active" ? "Ativa" : "Inativa";

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

const formatDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default Bases;
