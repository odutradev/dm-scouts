import { Grid, Button, Typography, Box, useTheme, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, AdminPanelSettings, BusinessCenter } from '@mui/icons-material';

import Layout from '@components/layout';
import { menuLinks } from './menuLinks';
import useUserStore from '@stores/user';

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useUserStore(x => x.user);

  const adjustedColor = theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];

  const roleLabels: Record<string, string> = {
    normal: 'Usuário Comum',
    admin: 'Administrador',
    leadership: 'Chefe de Base'
  };

  const roleColors: Record<string, "default" | "error" | "warning"> = {
    normal: 'default',
    admin: 'error',
    leadership: 'warning'
  };

  const roleIcons: Record<string, any> = {
    normal: <Person fontSize="small" />,
    admin: <AdminPanelSettings fontSize="small" />,
    leadership: <BusinessCenter fontSize="small" />
  };

  const userRole = user?.role || 'normal';

  const formatUserName = (name?: string) => {
    if (!name) return 'Usuário';
    const parts = name.trim().split(' ');
    if (parts.length < 2) return name;
    return `${parts[0][0].toUpperCase()}${parts[0].slice(1).toLowerCase()} ${parts[parts.length - 1][0].toUpperCase()}${parts[parts.length - 1].slice(1).toLowerCase()}`;
  };

  return (
    <Layout title='Painel'>
      <Box display="flex" justifyContent="space-between" alignItems="center" height="auto" mb={3} gap={"10vw"}>
        <Typography variant="h6">Bem-vindo, {formatUserName(user?.name)}!</Typography>
        <Chip 
          icon={roleIcons[userRole]} 
          label={roleLabels[userRole]} 
          color={roleColors[userRole]} 
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="auto">
        <Grid container spacing={2} justifyContent="center">
          {menuLinks[userRole].map((action, index) => (
            <Grid key={index} component={"div"}>
              <Button 
                variant="contained" 
                sx={{
                  width: 120,
                  height: 120,
                  display: 'flex',
                  padding: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  backgroundColor: adjustedColor,
                  color: theme.palette.primary.main
                }}
                onClick={() => navigate(action.path)}
              >
                {action.icon}
                <Typography variant="body1">{action.label}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashboardPage;