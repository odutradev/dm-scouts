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
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Layout from "@components/layout";
import GoBackButton from "@components/goBackButton";
import UserNavbar from "@components/userNavbar";
import { getUserBases } from "@actions/base";
import { getTeamByCode } from "@actions/team";
import useUserStore from "@stores/user";
import useAction from "@hooks/useAction";
import { createScore } from "@actions/scores";

const AddUserScorePage = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [bases, setBases] = useState<any[]>([]);
  const [selectedBase, setSelectedBase] = useState("");
  const [team, setTeam] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [extraScoreEnabled, setExtraScoreEnabled] = useState(false);
  const [extraScore, setExtraScore] = useState<number>(0);
  const [extraScoreReason, setExtraScoreReason] = useState("");
  const [observations, setObservations] = useState("");
  const [inputIn, setInputIn] = useState("");
  const [outputIn, setOutputIn] = useState("");
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

  const handleBaseChange = (event: SelectChangeEvent<string>) => {
    setSelectedBase(event.target.value);
  };

  const handleSearch = async () => {
    const teamData = await getTeamByCode(code);
    if (!("error" in teamData)) {
      setTeam(teamData);
      setStep(2);
    } else {
      alert("Equipe não encontrada!");
    }
  };

  const handleAddScore = async () => {
    const data = {
      baseLeaderID: user?._id,
      teamLeaderID: team?.teamLeader?.id || "",
      baseID: selectedBase,
      teamID: team._id,
      score: score,
      extraScore: extraScoreEnabled ? extraScore : 0,
      extraScoreReason: extraScoreEnabled ? extraScoreReason : "",
      observations: observations,
      inputIn: inputIn ? new Date(`1970-01-01T${inputIn}:00`) : undefined,
      outputIn: outputIn ? new Date(`1970-01-01T${outputIn}:00`) : undefined,
    };

    if (!data.baseLeaderID || data.score === undefined || !data.baseID) {
      alert("Dados inválidos: baseLeaderID, score e baseID são obrigatórios.");
      return;
    }

    useAction({
    action: async () => await createScore(data as any),
    toastMessages: {
        success: 'Score adicionado',
        error: 'Ocorreu um erro ao adicionar o score',
        pending: 'Adicionzando score',
    },
    callback: () => {
        handleBack()
    },
      });
    };
    
    const handleBack = () => {
        setStep(1);
        setCode("")
    setTeam(null);
    setScore(0);
    setExtraScoreEnabled(false);
    setExtraScore(0);
    setExtraScoreReason("");
    setObservations("");
    setInputIn("");
    setOutputIn("");
  };

  return (
    <Layout title="Adicionar Score">
      <GoBackButton />
      <UserNavbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={3}
        width="60%"
        margin="auto"
      >
        {step === 1 && (
          <>
            <Box display="flex" flexDirection="column" gap={2} width="100%">
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
                label="Código da Equipe"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
              />
              <Button
                variant="outlined"
                onClick={handleSearch}
                disabled={!code || !selectedBase}
              >
                Buscar
              </Button>
            </Box>
          </>
        )}
        {step === 2 && team && (
          <>
            <Box display="flex" flexDirection="column" gap={2} width="100%">
              <Typography variant="body1" textAlign="center">
                Equipe encontrada: <strong>{team.name}</strong>
              </Typography>
              <Typography variant="subtitle1" textAlign="center">
                Pontuação
              </Typography>
              <ToggleButtonGroup
                value={score}
                exclusive
                onChange={(_event, newValue) => {
                  if (newValue !== null) setScore(newValue);
                }}
                aria-label="pontuação"
                sx={{ width: "100%" }}
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <ToggleButton
                    key={value}
                    value={value}
                    aria-label={String(value)}
                    sx={{ flex: 1 }}
                  >
                    {value}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={extraScoreEnabled}
                    onChange={(e) => setExtraScoreEnabled(e.target.checked)}
                  />
                }
                label="Ativar pontuação extra"
                sx={{ alignSelf: "center" }}
              />
              {extraScoreEnabled && (
                <>
                  <Typography variant="subtitle1" textAlign="center">
                    Extra Score
                  </Typography>
                  <ToggleButtonGroup
                    value={extraScore}
                    exclusive
                    onChange={(_event, newValue) => {
                      if (newValue !== null) setExtraScore(newValue);
                    }}
                    aria-label="extra pontuação"
                    sx={{ width: "100%" }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <ToggleButton
                        key={value}
                        value={value}
                        aria-label={String(value)}
                        sx={{ flex: 1 }}
                      >
                        {value}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <TextField
                    label="Motivo do Extra Score"
                    value={extraScoreReason}
                    onChange={(e) => setExtraScoreReason(e.target.value)}
                    fullWidth
                  />
                </>
              )}
              <TextField
                label="Observações"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                fullWidth
                multiline
              />
              <TextField
                label="Horário de Entrada"
                type="time"
                value={inputIn}
                onChange={(e) => setInputIn(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Horário de Saída"
                type="time"
                value={outputIn}
                onChange={(e) => setOutputIn(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={handleBack}>
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAddScore}
                  disabled={score === 0}
                >
                  Adicionar Score
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default AddUserScorePage;
