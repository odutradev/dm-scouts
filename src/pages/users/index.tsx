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
  Button,
  Paper,
} from "@mui/material";

import GoBackButton from "@components/goBackButton";
import UserNavbar from "@components/userNavbar";
import Layout from "@components/layout";

import { getAllUsers } from "@actions/admin";
import type { UserModelType } from "@utils/types/models/user";
import CreateUserModal from "./components/create";

const Users = () => {
  const [users, setUsers] = useState<UserModelType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      if (!("error" in data)) {
        setUsers(data);
      }
    })();
  }, []);

  const handleUserClick = (id: string) => {
    navigate(`/admin/user/${id}`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Layout title="Usuários">
      <GoBackButton />
      <UserNavbar />

      <Box
        display="flex"
        flexDirection="column"
        height="auto"
        minHeight="60vh"
        width="100%"
        overflow="hidden"
      >
        <Box
          flex={1}
          p={3}
          display="flex"
          flexDirection="column"
          overflow="auto"
        >
          <Box display="flex" justifyContent="center" mb={3}>
            <Button variant="contained" onClick={handleOpenModal}>
              Criar Usuário
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Grupo</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Função</TableCell>
                  <TableCell>Criado em</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleUserClick(user.id)}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.group || "-"}</TableCell>
                    <TableCell>{translateStatus(user.status)}</TableCell>
                    <TableCell>{translateRole(user.role)}</TableCell>
                    <TableCell>{formatDate(user.createAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <CreateUserModal open={openModal} onClose={handleCloseModal} />
    </Layout>
  );
};

const translateStatus = (status: UserModelType["status"]) => {
  switch (status) {
    case "loggedIn":
      return "Online";
    case "registered":
      return "Registrado";
    case "blocked":
      return "Bloqueado";
    default:
      return "-";
  }
};

const translateRole = (role: UserModelType["role"]) => {
  switch (role) {
    case "admin":
      return "Administrador";
    case "leadership":
      return "Liderança";
    case "normal":
      return "Usuário";
    default:
      return "-";
  }
};

const formatDate = (date?: Date) => {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default Users;
