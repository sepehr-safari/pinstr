import { Location, Route, Routes, useLocation } from 'react-router-dom';

import { Home, Login, NoMatch } from '@/pages';
import { BottomSlideover, MainLayout, Profile } from '@/pages/Layouts';
import { Boards, Pins } from '@/components';

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="p/">
            <Route index element={<NoMatch />} />
            <Route path=":npub" element={<Profile />}>
              <Route index element={<Boards />} />
              <Route path=":boardName" element={<Pins />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="p/" element={<BottomSlideover />}>
            <Route index element={<NoMatch />} />
            <Route path=":npub" element={<Profile />}>
              <Route index element={<Boards />} />
              <Route path=":boardName" element={<Pins />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}
