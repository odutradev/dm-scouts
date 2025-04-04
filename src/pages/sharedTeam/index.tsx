import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { getTeamById } from "@actions/team";
import { TeamModelType } from "@utils/types/models/team";
import GoBackButton from "@components/goBackButton";

const SharedTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<TeamModelType | null>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

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
    if (downloadRef.current) {
      const canvas = await html2canvas(downloadRef.current, { backgroundColor: null });
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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, p: 2 }}>
      <GoBackButton/>
      <Box
        ref={downloadRef}
        sx={{
          width: 350,
          p: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          textAlign: "center",
          boxShadow: 3,
          color: "#333",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          {team.name}
        </Typography>

        <Box sx={{ backgroundColor: "#fff", p: 2, borderRadius: 1, display: "inline-block" }}>
          <QRCode value={(team as any)._id} size={180} />
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          CODIGO: {team.number}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {team.leader?.name ? `Líder: ${team.leader.name}` : "Sem líder"}
        </Typography>
        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          ID: {(team as any)._id}
        </Typography>
      </Box>

      <Button variant="contained" onClick={handleDownload} sx={{ mt: 3 }}>
        Download
      </Button>
    </Box>
  );
};

export default SharedTeam;
