import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutateUser } from '@/shared/hooks/mutations';
import { useUser } from '@/shared/hooks/queries';

export const Page = () => {
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
