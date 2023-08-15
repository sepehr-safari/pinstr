import { Outlet } from 'react-router-dom';

import { Footer } from '@/components';
import { MainNavbar } from '@/components/Navbars';

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <div className="pt-16 mb-9 h-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
