import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="flex w-full justify-start">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
