import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Layout from '@components/layout';
import { getBranchScores } from '@actions/scores';
import { ScoreModelType } from '@utils/types/models/score';

type Branch = 'wolfcub' | 'scout' | 'senior' | 'pioneer' | 'all';

interface TeamScore {
  teamID: string;
  teamName: string;
  totalScore: number;
}

const ScoreDashboard = () => {
  const [branch, setBranch] = useState<Branch>('all');
  const [ranking, setRanking] = useState<TeamScore[]>([]);

  const fetchScores = async (selectedBranch: Branch) => {
    const scores = await getBranchScores(selectedBranch);
    const teamMap = new Map<string, TeamScore>();

    (scores as ScoreModelType[]).forEach((score) => {
      const teamID = score.team.id;
      const teamName = score.team.name;
      const total = score.score + score.extraScore;

      if (teamMap.has(teamID)) {
        teamMap.get(teamID)!.totalScore += total;
      } else {
        teamMap.set(teamID, {
          teamID,
          teamName,
          totalScore: total,
        });
      }
    });

    const sortedRanking = Array.from(teamMap.values()).sort(
      (a, b) => b.totalScore - a.totalScore
    );

    setRanking(sortedRanking);
  };

  useEffect(() => {
    fetchScores(branch);
  }, [branch]);

  const handleBranchChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBranch: Branch | null
  ) => {
    if (newBranch) setBranch(newBranch);
  };

  return (
    <Layout title="Ranking de Equipes">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          px: 2,
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
          <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
            Ranking de Equipes
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <ToggleButtonGroup
              value={branch}
              exclusive
              onChange={handleBranchChange}
            >
              <ToggleButton value="all">Todos</ToggleButton>
              <ToggleButton value="wolfcub">Lobinho</ToggleButton>
              <ToggleButton value="scout">Escoteiro</ToggleButton>
              <ToggleButton value="senior">Sênior</ToggleButton>
              <ToggleButton value="pioneer">Pioneiro</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <List disablePadding>
              {ranking.map((team, index) => (
                <ListItem
                  key={team.teamID}
                  divider
                  sx={{
                    px: 3,
                    py: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6">{index + 1}º</Typography>
                  <ListItemText
                    primary={<Typography fontWeight={600}>{team.teamName}</Typography>}
                    secondary={`Pontuação: ${team.totalScore}`}
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default ScoreDashboard;
