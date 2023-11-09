import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="max-w-screen-md pt-8 pb-12">
          <Outlet />
        </div>
      </div>
    </>
  );
};
