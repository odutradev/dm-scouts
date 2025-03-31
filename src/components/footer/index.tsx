import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import useSystemStore from '@stores/system';
import { IconButton } from '@mui/material';

import { FooterContainer, FooterRight, DevelopedByText, FooterLink } from './styles';

const Footer = () => {
  const store = useSystemStore(x => x);

  const handleToggleTheme = () => {
    store.updateSystem({
      theme: store.system.theme === "default" ? "dark" : (store.system.theme === "dark" ? "light" : "dark")
    });
  };

  return (
    <FooterContainer>
      <IconButton onClick={handleToggleTheme} aria-label="trocar tema">
        {store.system.theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
      <FooterRight>
        <DevelopedByText variant="body2">
          developed by
        </DevelopedByText>
        <FooterLink 
          href="https://odutra.com" 
          target="_blank" 
          rel="noopener"
        >
          odutra.com
        </FooterLink>
      </FooterRight>
    </FooterContainer>
  );
};

export default Footer;
