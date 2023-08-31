import { Outlet } from 'react-router-dom';

import { Footer, WarnModal } from '@/ui/components';
import { MainNavbar } from '@/ui/components/Navbars';
import { BoardSlideover, PinSlideover } from '@/ui/components/Slideovers';

export const MainLayout = () => {
  return (
    <>
      <BoardSlideover />
      <PinSlideover />
      <WarnModal />

      <MainNavbar />

      <div className="pt-16 mb-9 h-full">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
