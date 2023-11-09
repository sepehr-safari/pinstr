import { Location, Route, Routes, useLocation } from 'react-router-dom';

import { HomePage } from './home';
import { LoginPage } from './login';
import { LogoutPage } from './logout';
import { MainLayout } from './main-layout';
import { NoMatchPage } from './no-match';
import { ProfileLayout, ProfilePage } from './profile';
import {
  BoardLayout,
  BoardPage,
  EditBoardPage,
  EditBoardLayout,
  AddPinLayout,
  AddPinPage,
  EditPinLayout,
  EditPinPage,
} from './board';
import { SlideoverLayout } from './slideover-layout';
import { CreateBoardLayout, CreateBoardPage } from './create-board';

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

                <Route path="edit-board" element={<EditBoardLayout />}>
                  <Route index element={<EditBoardPage />} />
                </Route>

                <Route path="add-pin" element={<AddPinLayout />}>
                  <Route index element={<AddPinPage />} />
                </Route>

                <Route path="edit-pin" element={<EditPinLayout />}>
                  <Route index element={<EditPinPage />} />

                  <Route path=":pinIndex" element={<EditPinPage />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="create-board" element={<CreateBoardLayout />}>
            <Route index element={<CreateBoardPage />} />
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
