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
} from "@mui/material";

import GoBackButton from "@components/goBackButton";
import UserNavbar from "@components/userNavbar";
import Layout from "@components/layout";

import { getUserTeams } from "@actions/team";
import type { TeamModelType } from "@utils/types/models/team";
import useUserStore from "@stores/user";

const Teams = () => {
  const [teams, setTeams] = useState<TeamModelType[]>([]);
  const user = useUserStore(x => x.user);
  const navigate = useNavigate();

  const fetchTeams = async () => {
    const data = await getUserTeams(user?._id as string);
    if (!("error" in data)) {
      setTeams(data);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`/shared/team/${id}?showScore=true`);
  };

  return (
    <Layout title="Meus Times">
      <GoBackButton />
      <UserNavbar />
      <Box display="flex" flexDirection="column" minHeight="60vh" width="100%">
        <Box flex={1} p={3} display="flex" flexDirection="column" overflow="auto">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Número</TableCell>
                  <TableCell>Grupo</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ramo</TableCell>
                  <TableCell>Líder</TableCell>
                  <TableCell>Local</TableCell>
                  <TableCell>Criada em</TableCell>
                  <TableCell>Última Atualização</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TableRow
                    key={team.name}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick((team as any)._id)}
                  >
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.number || "-"}</TableCell>
                    <TableCell>{team.group}</TableCell>
                    <TableCell>{translateStatus(team.status)}</TableCell>
                    <TableCell>{translateBranch(team.branch)}</TableCell>
                    <TableCell>{team.leader?.name || "-"}</TableCell>
                    <TableCell>{team.local}</TableCell>
                    <TableCell>{formatDate(team.createAt)}</TableCell>
                    <TableCell>
                      {team.lastUpdate ? formatDate(team.lastUpdate) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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

const translateStatus = (status: TeamModelType["status"]) =>
  status === "active" ? "Ativa" : "Inativa";

const formatDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default Teams;
