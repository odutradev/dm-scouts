import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, IconButton, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";  // Importando o hook useNavigate
import ExitToAppIcon from "@mui/icons-material/ExitToApp";  // Ícone de logout

const MenuDrawer: React.FC<{ menuOpen: boolean; setMenuOpen: (open: boolean) => void }> = ({ menuOpen, setMenuOpen }) => {
    const theme = useTheme();
    const navigate = useNavigate();  // Hook para redirecionamento

    // Lista de itens do menu (nome e link)
    const menuItems = [
        { name: "Opção 1", link: "/opcao-1" },
        { name: "Opção 2", link: "/opcao-2" },
        { name: "Opção 3", link: "/opcao-3" },
    ];

    const handleMenuItemClick = (link: string) => {
        navigate(link); // Redireciona para o link da opção clicada
        setMenuOpen(false); // Fecha o menu
    };

    const handleLogout = () => {
        navigate("/logout"); // Redireciona para a página de logout
        setMenuOpen(false); // Fecha o menu
    };

    return (
        <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)}>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton 
                            onClick={() => handleMenuItemClick(item.link)}  // Chama a função de redirecionamento
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: '80%' 
                            }}
                        >
                            <ListItemText primary={item.name} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ my: 2 }} />  {/* Divisor com margem */}
                <ListItem disablePadding>
                    <ListItemButton 
                        onClick={handleLogout} 
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%' }}
                    >
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: theme.palette.error.main 
                            }}
                        >
                            <ExitToAppIcon sx={{ marginRight: 1 }} />  {/* Espaçamento entre o ícone e o texto */}
                            <ListItemText primary="Encerrar sessão" sx={{ textAlign: 'center', color: theme.palette.error.main }} />
                        </Box>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default MenuDrawer;
