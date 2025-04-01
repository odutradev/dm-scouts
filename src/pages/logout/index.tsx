import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Loading from '@components/loading';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    const timeout = setTimeout(() => {
      navigate('/signin');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <Loading message="Você está sendo deslogado..."/>;
};

export default Logout;
