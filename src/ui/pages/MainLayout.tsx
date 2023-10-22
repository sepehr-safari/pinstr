import { Outlet } from 'react-router-dom';

import { Footer, SettingsModal, WarnModal } from '@/ui/components';
import { MainNavbar } from '@/ui/components/Navbars';
import { CreateBoardSlideover, EditBoardSlideover, PinSlideover } from '@/ui/components/Slideovers';

export const MainLayout = () => {
  return (
    <>
      <CreateBoardSlideover />
      <EditBoardSlideover />
      <PinSlideover />
      <WarnModal />
      <SettingsModal />

      <MainNavbar />

      <div className="pt-16 mb-9 h-full">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
