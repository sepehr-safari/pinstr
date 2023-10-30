import { Outlet } from 'react-router-dom';

import { ProfileBanner } from '@/features';
import { PageContainer } from '@/shared/layouts';

export const Layout = () => {
  return (
    <>
      <PageContainer>
        <ProfileBanner />

        <div className="mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl 4xl:max-w-screen-4xl 5xl:max-w-screen-5xl">
          <Outlet />
        </div>
      </PageContainer>
    </>
  );
};
