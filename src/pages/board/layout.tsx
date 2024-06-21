import { Outlet } from 'react-router-dom';

import { BoardBanner, BoardSummary } from '@/features';
import { MainContainer } from '@/shared/layouts';

export const Layout = () => {
  return (
    <>
      <BoardBanner />

      <div className="relative flex flex-col">
        {/* <StickyContainer>
          <ProfileCard />
          <BoardSummary />
        </StickyContainer> */}

        <BoardSummary />

        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
};
