import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/queries';

export default function Logout() {
  const { user, doLogout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) {
      doLogout();
    } else {
      navigate('/');
    }
  }, [user, navigate, doLogout]);

  return <div></div>;
}
