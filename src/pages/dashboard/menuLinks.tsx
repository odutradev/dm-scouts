import { Dashboard, Settings, Info } from '@mui/icons-material';

export const menuLinks = {
  admin: [
    { icon: <Dashboard fontSize="large" />, label: 'Painel', path: '/admin/dashboard' },
    { icon: <Settings fontSize="large" />, label: 'Configurações', path: '/admin/configuracoes' },
    { icon: <Info fontSize="large" />, label: 'Sobre', path: '/admin/sobre' }
  ],
  normal: [
    { icon: <Dashboard fontSize="large" />, label: 'Painel', path: '/dashboard' },
    { icon: <Info fontSize="large" />, label: 'Sobre', path: '/sobre' }
  ],
  leadership: [
    { icon: <Dashboard fontSize="large" />, label: 'Painel', path: '/leader/dashboard' },
    { icon: <Settings fontSize="large" />, label: 'Configurações', path: '/leader/configuracoes' }
  ]
};
