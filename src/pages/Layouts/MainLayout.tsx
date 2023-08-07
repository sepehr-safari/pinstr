import { Footer, MainNavbar } from '@/components';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
