import { Location, Route, Routes, createBrowserRouter, useLocation } from 'react-router-dom';

import { MainLayout } from './main-layout';
import { ProfileLayout } from './profile';
import { BoardLayout, EditBoardLayout, AddPinLayout, EditPinLayout } from './board';
import { SlideoverLayout } from './slideover-layout';
import { CreateBoardLayout } from './create-board';

const HomePage = () => import('./home');
const NoMatchPage = () => import('./no-match');
const LogoutPage = () => import('./logout');
const LoginPage = () => import('./login');
const ProfilePage = () => import('./profile');
const CreateBoardPage = () => import('./create-board');
const BoardPage = () => import('./board');
const EditBoardPage = () => import('./board');
const AddPinPage = () => import('./board');
const EditPinPage = () => import('./board');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        async lazy() {
          return { Component: (await HomePage()).HomePage };
        },
      }, //------
      {
        path: '/p',
        children: [
          {
            path: '/p',
            async lazy() {
              return { Component: (await NoMatchPage()).NoMatchPage };
            },
          },
          {
            path: '/p/:npub',
            element: <ProfileLayout />,
            children: [
              {
                path: '/p/:npub',
                async lazy() {
                  return { Component: (await ProfilePage()).ProfilePage };
                },
              },
              {
                path: '/p/:npub/:title',
                element: <BoardLayout />,
                children: [
                  {
                    path: '/p/:npub/:title',
                    async lazy() {
                      return { Component: (await BoardPage()).BoardPage };
                    },
                  },
                  {
                    path: '/p/:npub/:title/edit-board',
                    element: <EditBoardLayout />,
                    children: [
                      {
                        path: '/p/:npub/:title/edit-board',
                        async lazy() {
                          return { Component: (await EditBoardPage()).EditBoardPage };
                        },
                      },
                    ],
                  },
                  {
                    path: '/p/:npub/:title/add-pin',
                    element: <AddPinLayout />,
                    children: [
                      {
                        path: '/p/:npub/:title/add-pin',
                        async lazy() {
                          return { Component: (await AddPinPage()).AddPinPage };
                        },
                      },
                    ],
                  },
                  {
                    path: '/p/:npub/:title/edit-pin',
                    element: <EditPinLayout />,
                    children: [
                      {
                        path: '/p/:npub/:title/edit-pin',
                        async lazy() {
                          return { Component: (await EditPinPage()).EditPinPage };
                        },
                      },
                      {
                        path: '/p/:npub/:title/edit-pin/:pinIndex',
                        async lazy() {
                          return { Component: (await EditPinPage()).EditPinPage };
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }, // -----
      {
        path: '/create-board',
        element: <CreateBoardLayout />,
        children: [
          {
            path: '/create-board',
            async lazy() {
              return { Component: (await CreateBoardPage()).CreateBoardPage };
            },
          },
        ],
      }, // -----
      {
        path: '/login',
        async lazy() {
          return { Component: (await LoginPage()).LoginPage };
        },
      },
      {
        path: '/logout',
        async lazy() {
          return { Component: (await LogoutPage()).LogoutPage };
        },
      }, // -------
      {
        path: '*',
        async lazy() {
          return { Component: (await NoMatchPage()).NoMatchPage };
        },
      }, // ------
    ],
  },
]);

// export const AppRouter = () => {
//   const location = useLocation();
//   const state = location.state as { backgroundLocation?: Location };

//   return (
//     <>
//       <Routes location={state?.backgroundLocation || location}>
//         <Route path="/" element={<MainLayout />}>
//           <Route index lazy={() => import('./home')} />

//           <Route path="p">
//             <Route
//               index
//               lazy={async () => {
//                 return { Component: (await NoMatchPage()).NoMatchPage };
//               }}
//             />

//             <Route path=":npub" element={<ProfileLayout />}>
//               <Route
//                 index
//                 lazy={async () => {
//                   return { Component: (await ProfilePage()).ProfilePage };
//                 }}
//               />

//               <Route path=":title" element={<BoardLayout />}>
//                 <Route
//                   index
//                   lazy={async () => {
//                     return { Component: (await BoardPage()).BoardPage };
//                   }}
//                 />

//                 <Route path="edit-board" element={<EditBoardLayout />}>
//                   <Route
//                     index
//                     lazy={async () => {
//                       return { Component: (await EditBoardPage()).EditBoardPage };
//                     }}
//                   />
//                 </Route>

//                 <Route path="add-pin" element={<AddPinLayout />}>
//                   <Route
//                     index
//                     lazy={async () => {
//                       return { Component: (await AddPinPage()).AddPinPage };
//                     }}
//                   />
//                 </Route>

//                 <Route path="edit-pin" element={<EditPinLayout />}>
//                   <Route
//                     index
//                     lazy={async () => {
//                       return { Component: (await EditPinPage()).EditPinPage };
//                     }}
//                   />

//                   <Route
//                     path=":pinIndex"
//                     lazy={async () => {
//                       return { Component: (await EditPinPage()).EditPinPage };
//                     }}
//                   />
//                 </Route>
//               </Route>
//             </Route>
//           </Route>

//           <Route path="create-board" element={<CreateBoardLayout />}>
//             <Route
//               index
//               lazy={async () => {
//                 return { Component: (await CreateBoardPage()).CreateBoardPage };
//               }}
//             />
//           </Route>

//           <Route
//             path="*"
//             lazy={async () => {
//               return { Component: (await NoMatchPage()).NoMatchPage };
//             }}
//           />
//         </Route>

//         <Route
//           path="login"
//           lazy={async () => {
//             return { Component: (await LoginPage()).LoginPage };
//           }}
//         />
//         <Route
//           path="logout"
//           lazy={async () => {
//             return { Component: (await LogoutPage()).LogoutPage };
//           }}
//         />
//       </Routes>

//       {state?.backgroundLocation && (
//         <Routes>
//           <Route path="p" element={<SlideoverLayout />}>
//             <Route
//               index
//               lazy={async () => {
//                 return { Component: (await NoMatchPage()).NoMatchPage };
//               }}
//             />

//             <Route path=":npub" element={<ProfileLayout />}>
//               <Route
//                 index
//                 lazy={async () => {
//                   return { Component: (await ProfilePage()).ProfilePage };
//                 }}
//               />

//               <Route path=":title" element={<BoardLayout />}>
//                 <Route
//                   index
//                   lazy={async () => {
//                     return { Component: (await BoardPage()).BoardPage };
//                   }}
//                 />
//               </Route>
//             </Route>
//           </Route>
//         </Routes>
//       )}
//     </>
//   );
// };
