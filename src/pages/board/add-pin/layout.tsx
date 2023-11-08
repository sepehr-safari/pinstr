import { Outlet, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components';

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full justify-start">
        <div className="w-full">
          <Button
            variant="text"
            size="none"
            label="&larr; Back"
            onClick={() => navigate(-1)}
            className="mb-4"
          />

          <Outlet />
        </div>
      </div>
    </>
  );
};
