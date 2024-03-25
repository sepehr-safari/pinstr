import { useNdk } from 'nostr-hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Page = () => {
  const { setSigner } = useNdk();

  const navigate = useNavigate();

  useEffect(() => {
    setSigner(undefined);

    localStorage.removeItem('pk');

    navigate('/', { replace: true });
  }, [setSigner, navigate]);

  return null;
};
