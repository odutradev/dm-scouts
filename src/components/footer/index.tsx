import React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useSystemStore from '@stores/system';

const Footer: React.FC = () => {
  const store = useSystemStore(x => x);

  const handleToggleTheme = () => {
    store.updateSystem({
      theme: store.system.theme === "default"
        ? "dark"
        : (store.system.theme === "dark" ? "light" : "dark")
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        boxShadow: 3,
      }}
    >
      <IconButton onClick={handleToggleTheme} aria-label="trocar tema">
        {store.system.theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
      <Link 
        href="https://odutra.com" 
        target="_blank" 
        rel="noopener" 
        underline="none"
        sx={{ fontSize: '0.875rem' }}
      >
        desenvolvido por odutra.com
      </Link>
    </Box>
  );
};

export default Footer;
