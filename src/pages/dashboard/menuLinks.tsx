import { 
  Settings, 
  ExitToApp, 
  AccountCircle, 
  Group, 
  Apartment, 
  Groups 
} from '@mui/icons-material';

export const menuLinks = {
  admin: [
    { icon: <Settings fontSize="large" />, label: 'Configurações', path: '/admin/config' },
    { icon: <AccountCircle fontSize="large" />, label: 'Perfil', path: '/dashboard/profile' },
    { icon: <Group fontSize="large" />, label: 'Usuários', path: '/admin/users' },
    { icon: <Apartment fontSize="large" />, label: 'Bases', path: '/admin/bases' },
    { icon: <Groups fontSize="large" />, label: 'Equipes', path: '/admin/teams' },
    { icon: <ExitToApp fontSize="large" />, label: 'Encerrar sessão', path: '/logout' }
  ],
  normal: [
    { icon: <AccountCircle fontSize="large" />, label: 'Perfil', path: '/dashboard/profile' },
    { icon: <Groups fontSize="large" />, label: 'Minhas Equipes', path: '/dashboard/user/teams' },
    { icon: <ExitToApp fontSize="large" />, label: 'Encerrar sessão', path: '/logout' }
  ],
  leadership: [
    { icon: <AccountCircle fontSize="large" />, label: 'Perfil', path: '/dashboard/profile' },
    { icon: <ExitToApp fontSize="large" />, label: 'Encerrar sessão', path: '/logout' }
  ]
};
