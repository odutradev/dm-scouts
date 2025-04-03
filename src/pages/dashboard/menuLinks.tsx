import { Dashboard, Settings, ExitToApp } from '@mui/icons-material';

export const menuLinks = {
  admin: [
    { icon: <Dashboard fontSize="large" />, label: 'Painel', path: '/admin/dashboard' },
    { icon: <Settings fontSize="large" />, label: 'Configurações', path: '/admin/config' },
    { icon: <ExitToApp fontSize="large" />, label: 'Encerrar sessão', path: '/logout' }

  ],
  normal: [
    { icon: <Dashboard fontSize="large" />, label: 'Painel', path: '/dashboard' },
    { icon: <ExitToApp fontSize="large" />, label: 'Encerrar sessão', path: '/logout' }

  ],
  leadership: [
    { icon: <Dashboard fontSize="large" />, label: 'Painel', path: '/dashboard' },
    { icon: <ExitToApp fontSize="large" />, label: 'Encerrar sessão', path: '/logout' }
  ]
};
