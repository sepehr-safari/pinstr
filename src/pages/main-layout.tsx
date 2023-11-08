import { Outlet } from 'react-router-dom';

import { SettingsModal } from '@/features';

import { Navbar, PinSlideover } from '@/features';

import { Footer } from '@/shared/components';

export const MainLayout = () => {
  return (
    <>
      <PinSlideover />
      <SettingsModal />

      <Navbar />

      <div className="pt-16 mb-9 h-full">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
