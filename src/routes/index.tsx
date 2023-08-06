import { Location, Route, Routes, useLocation } from 'react-router-dom';

import { Board, Home, NoMatch } from '@/pages';
import { BottomSlideover, MainLayout } from '@/pages/Layouts';

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/p/npub/:boardName" element={<Board />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/p/npub/:boardName" element={<BottomSlideover />}>
            <Route index element={<Board />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
