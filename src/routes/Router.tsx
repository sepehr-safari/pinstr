import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '@/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
