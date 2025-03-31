import { createRoot } from 'react-dom/client';
import { StrictMode, useMemo } from 'react';

import { toastContainerConfig } from '@assets/data/toast';
import defaultConfig from '@assets/config/default';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from '@styles/globalStyles';
import useMountOnce from '@hooks/useMountOnce';
import useSystemStore from '@stores/system';
import Router from '@routes/index';

const App = () => {
  const { theme } = useSystemStore((store) => store.system);

  useMountOnce(() => {
    console.log(`version: ${defaultConfig.version} - mode: ${defaultConfig.mode}`);
  });

  const toastExtra = useMemo(() => {
    return theme !== 'default' ? { theme } : {};
  }, [theme]);

  return (
    <>
      <GlobalStyles />
      <ToastContainer {...toastContainerConfig} {...toastExtra} />
      <Router />
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
