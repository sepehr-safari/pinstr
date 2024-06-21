import { Outlet } from 'react-router-dom';

// import { ProfileBanner } from '@/features';
import { PageContainer } from '@/shared/layouts';

export const Layout = () => {
  return (
    <>
      <PageContainer>
        {/* <div className="mx-auto max-w-screen-4k"> */}
        <Outlet />
        {/* </div> */}
      </PageContainer>
    </>
  );
};
