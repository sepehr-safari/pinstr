import { Outlet } from 'react-router-dom';

import { ProfileBanner } from '@/ui/components';
import { MaxWidthContainer, PageContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  return (
    <>
      <PageContainer>
        <ProfileBanner />

        <MaxWidthContainer>
          <Outlet />
        </MaxWidthContainer>
      </PageContainer>
    </>
  );
};
