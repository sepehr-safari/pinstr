import { Location, Route, Routes, useLocation } from 'react-router-dom';

import {
  HomePage,
  Login,
  Logout,
  MainLayout,
  NoMatch,
  ProfileLayout,
  ProfilePage,
  SlideoverLayout,
} from '@/ui/pages';
import { BoardLayout, BoardPage } from '@/ui/pages/Profile/Board';
import { TagPage } from '@/ui/pages/Tag';

export const AppRouter = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="p">
            <Route index element={<NoMatch />} />

            <Route path=":npub" element={<ProfileLayout />}>
              <Route index element={<ProfilePage />} />

              <Route path=":title" element={<BoardLayout />}>
                <Route index element={<BoardPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="t">
            <Route index element={<NoMatch />} />

            <Route path=":tag" element={<TagPage />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="p" element={<SlideoverLayout />}>
            <Route index element={<NoMatch />} />

            <Route path=":npub" element={<ProfileLayout />}>
              <Route index element={<ProfilePage />} />

              <Route path=":title" element={<BoardLayout />}>
                <Route index element={<BoardPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};
