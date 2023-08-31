import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/logic/queries';

export const Logout = () => {
  const { pubkey, doLogout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (pubkey) {
      doLogout();
    } else {
      navigate('/', { replace: true });
    }
  }, [pubkey, navigate, doLogout]);

  return <div></div>;
};
