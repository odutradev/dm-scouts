import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";

import Layout from "@components/layout";
import UserNavbar from "@components/userNavbar";
import GoBackButton from "@components/goBackButton";

import { getUserTeams } from "@actions/team";
import type { TeamModelType } from "@utils/types/models/team";
import useUserStore from "@stores/user";

const UserTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamModelType[]>([]);
  const user = useUserStore(x => x.user)
  const navigate = useNavigate();

  const fetchUserTeams = async () => {
    const data = await getUserTeams(user?._id as string);
    if (!("error" in data)) {
      setTeams(data);
    }
  };

  useEffect(() => {
    fetchUserTeams();
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`/dashboard/user/team/${id}`);
  };

  return (
    <Layout title="Minhas Equipes">
      <GoBackButton />
      <UserNavbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Minhas Equipes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Ramo</TableCell>
                <TableCell>Código</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team) => (
                <TableRow
                  key={(team as any)._id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRowClick((team as any)._id)}
                >
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{translateBranch(team.branch)}</TableCell>
                  <TableCell>{team.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

const translateBranch = (branch: TeamModelType["branch"]) => {
  switch (branch) {
    case "wolfcub":
      return "Lobinho";
    case "scout":
      return "Escoteiro";
    case "senior":
      return "Sênior";
    case "pioneer":
      return "Pioneiro";
    default:
      return "-";
  }
};

export default UserTeamsPage;
