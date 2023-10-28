import { Location, Route, Routes, useLocation } from 'react-router-dom';

import { HomePage } from './home';
import { LoginPage } from './login';
import { LogoutPage } from './logout';
import { MainLayout } from './main-layout';
import { NoMatchPage } from './no-match';
import { ProfileLayout, ProfilePage } from './profile';
import { BoardLayout, BoardPage } from './profile/board';
import { SlideoverLayout } from './slideover-layout';

export const AppRouter = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="p">
            <Route index element={<NoMatchPage />} />

            <Route path=":npub" element={<ProfileLayout />}>
              <Route index element={<ProfilePage />} />

              <Route path=":title" element={<BoardLayout />}>
                <Route index element={<BoardPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NoMatchPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="p" element={<SlideoverLayout />}>
            <Route index element={<NoMatchPage />} />

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
