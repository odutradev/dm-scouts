import { Person, AdminPanelSettings, BusinessCenter } from '@mui/icons-material';
import { Box, Typography, Chip } from '@mui/material';

import useUserStore from '@stores/user';

const UserNavbar = () => {
  const user = useUserStore(x => x.user);

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
    <Box display="flex" justifyContent="space-between" alignItems="center" height="auto" mb={3} gap={"10vw"}>
      <Typography variant="h6">Bem-vindo, {formatUserName(user?.name)}!</Typography>
      <Chip 
        icon={roleIcons[userRole]} 
        label={roleLabels[userRole]} 
        color={roleColors[userRole]} 
      />
    </Box>
  );
};

export default UserNavbar;
