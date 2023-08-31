import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutateUser } from '@/logic/mutations';
import { useUser } from '@/logic/queries';

export const Logout = () => {
  const { pubkey } = useUser();
  const { logout } = useMutateUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!pubkey) {
      navigate('/', { replace: true });
    } else {
      logout.mutate();
    }
  }, [pubkey, navigate, logout]);

  return <div></div>;
};
