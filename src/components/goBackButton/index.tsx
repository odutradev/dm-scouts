import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackButton = ({ text = 'Voltar' }) => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      variant="outlined"
      color="primary"
      sx={{ mb: 2 }}
    >
      {text}
    </Button>
  );
};

export default GoBackButton;