import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { getTeamById } from "@actions/team";
import { TeamModelType } from "@utils/types/models/team";

const SharedTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<TeamModelType | null>(null);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getTeamById(id);
        if (!("error" in data)) {
          setTeam(data);
        }
      })();
    }
  }, [id]);

  const handleDownload = async () => {
    if (qrContainerRef.current) {
      const canvas = await html2canvas(qrContainerRef.current);
      const link = document.createElement("a");
      link.download = `${team?.name || "equipe"}_qr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  if (!team) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6">Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {team.name}
      </Typography>

      <Box
        ref={qrContainerRef}
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <QRCode value={(team as any)._id} size={200} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Número: {team.number}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {team.leader?.name ? `Líder: ${team.leader.name}` : "Sem líder"}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          ID: {(team as any)._id}
        </Typography>
      </Box>

      <Button variant="contained" onClick={handleDownload} sx={{ mt: 2 }}>
        Download
      </Button>
    </Box>
  );
};

export default SharedTeam;
