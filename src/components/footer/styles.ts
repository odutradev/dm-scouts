import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'space-between',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    alignItems: 'center',
    width: "100vw",
    display: 'flex',
    height: '8vh',
    bottom: 0,
    right: 0,
    left: 0
}));

export const FooterRight = styled(Box)(() => ({
    alignItems: 'center',
    display: 'flex',
}));

export const DevelopedByText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    fontWeight: 400,
}));

export const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 'bold',
}));
