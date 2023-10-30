import { Outlet } from 'react-router-dom';

import { SettingsModal, WarnModal } from '@/features';

import { CreateBoardSlideover, EditBoardSlideover, Navbar, PinSlideover } from '@/features';

import { Footer } from '@/shared/components';

export const MainLayout = () => {
  return (
    <>
      <CreateBoardSlideover />
      <EditBoardSlideover />
      <PinSlideover />
      <WarnModal />
      <SettingsModal />

      <Navbar />

      <div className="pt-16 mb-9 h-full">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
