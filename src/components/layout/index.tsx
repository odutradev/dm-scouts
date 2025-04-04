import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Container, Content } from "./styles";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import Loading from "@components/loading";
import Footer from "@components/footer";

import type { LayoutProps } from "./types";

import MenuDrawer from "./components/menu";
import useMountOnce from "@hooks/useMountOnce";
import { getUser } from "@actions/user";
import { getConfig } from "@actions/admin";
const Layout = ({ children, isLoading = false, showFooter = true, title = "DM Scouts", showSimpleMenu = false, disableGetUser = false, disableGetConfig = false }: LayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const theme = useTheme();

    useEffect(() => {
        document.title = title;
    }, [title]);

    useMountOnce(async () => {
        if (!disableGetConfig) await getConfig();
        if (!disableGetUser) await getUser();
    });
    
    return (
        <Container>
            {
                showSimpleMenu && (
                <>                
                    <Button 
                        onClick={() => setMenuOpen(true)} 
                        variant="contained" 
                        sx={{ 
                            position: "absolute", 
                            top: 16, 
                            left: "50%", 
                            transform: "translateX(-50%)", 
                            backgroundColor: theme.palette.action.disabledBackground, 
                            color: theme.palette.text.primary, 
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                            width: '200px',
                        }}
                        startIcon={<MenuIcon />}
                    >
                        Menu
                    </Button>
                    <MenuDrawer 
                        menuOpen={menuOpen} 
                        setMenuOpen={setMenuOpen} 
                    />
                </>
                )
            }


            <Content>{isLoading ? <Loading /> : children}</Content>
            {showFooter && <Footer />}
        </Container>
    );
};

export default Layout;
