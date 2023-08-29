import { Outlet } from 'react-router-dom';

import { Footer } from '@/components';
import { MainNavbar } from '@/components/Navbars';
import { BoardSlideover, PinSlideover } from '@/components/Slideovers';

export const MainLayout = () => {
  return (
    <>
      <BoardSlideover />
      <PinSlideover />

      <MainNavbar />
      <div className="pt-16 mb-9 h-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
