import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Button, Typography, Divider } from "@mui/material";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { getTeamById } from "@actions/team";
import { TeamModelType } from "@utils/types/models/team";
import { ScoreModelType } from "@utils/types/models/score";
import GoBackButton from "@components/goBackButton";
import { getTeamScores } from "@actions/scores";

const SharedTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const showScore = searchParams.get("showScore") === "true";
  const [team, setTeam] = useState<TeamModelType | null>(null);
  const [scores, setScores] = useState<ScoreModelType[]>([]);
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

  useEffect(() => {
    const fetchScores = async () => {
      if (team && showScore) {
        const scoreData = await getTeamScores((team as any)._id);
        if (!("error" in scoreData)) {
          setScores(scoreData);
        }
      }
    };
    fetchScores();
  }, [team, showScore]);

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
      <GoBackButton />
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
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          {team.name}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 2,
            borderRadius: 1,
            display: "inline-block",
          }}
        >
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
      <Button variant="contained" onClick={handleDownload} sx={{ mb: 2 }}>
        Download
      </Button>
      {showScore && (
        <Box sx={{ textAlign: "center", width: "100%", maxWidth: 350 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Scores
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {scores.length > 0 ? (
            scores.map((scoreItem) => (
              <Box
                key={scoreItem._id}
                sx={{
                  p: 1,
                  mb: 1,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                <Typography variant="body2">
                  <strong>Score:</strong> {scoreItem.score}
                </Typography>
                <Typography variant="body2">
                  <strong>Extra Score:</strong> {scoreItem.extraScore}
                </Typography>
                {scoreItem.extraScoreReason && (
                  <Typography variant="body2">
                    <strong>Motivo:</strong> {scoreItem.extraScoreReason}
                  </Typography>
                )}
                <Typography variant="body2">
                  <strong>Base:</strong> {scoreItem.base.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Data:</strong>{" "}
                  {new Date(scoreItem.createAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">Sem scores para exibir.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SharedTeam;
