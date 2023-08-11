import { Outlet } from 'react-router-dom';

import { Footer, MainNavbar } from '@/components';

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <div className="py-16 mb-9">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
