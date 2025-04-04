import { Grid, Button, Typography, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Layout from '@components/layout';
import UserNavbar from '@components/userNavbar';
import { menuLinks } from './menuLinks';
import useUserStore from '@stores/user';

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useUserStore(x => x.user);

  const adjustedColor = theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];
  const userRole = user?.role || 'normal';

  return (
    <Layout title='Painel'>
      <UserNavbar />
      <Box display="flex" justifyContent="center" alignItems="center" height="auto">
        <Grid container spacing={2} justifyContent="center" gap={2} padding={2}>
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
