import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { RequireAuth } from './components/RequireAuth';
import { NotFoundPage } from './pages/NotFound.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        path: '/', element: <App />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  // {
  //   path: 'signup',
  //   element: <LoginPage />
  // },
  // {
  //   path: 'logout',
  //   element: <LoginPage />
  // },
  {
    path: '*',
    element: <NotFoundPage />
  },
], {
  basename: '/task-manager_react-vite/',
});

export const Root = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
