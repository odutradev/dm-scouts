import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import menuItems from "./menuItens";

import type { MenuProps } from "./types";

const MenuDrawer = ({ menuOpen, setMenuOpen }: MenuProps) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleMenuItemClick = (link: string) => {
        navigate(link);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        navigate("/logout");
        setMenuOpen(false);
    };

    return (
        <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)}>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => handleMenuItemClick(item.link)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}>
                            <ListItemText primary={item.name} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ my: 2 }} />
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.error.main }}>
                            <ExitToAppIcon sx={{ marginRight: 1 }} />
                            <ListItemText primary="Encerrar sessão" sx={{ textAlign: 'center', color: theme.palette.error.main }} />
                        </Box>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default MenuDrawer;
