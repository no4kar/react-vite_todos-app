import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { RequireAuth } from './components/RequireAuth';
import { NotFoundPage } from './pages/NotFound.page';
import { LoginPage } from './pages/Login.page';
import { TodoPage } from './pages/Todo.page';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      {
        path: '/', element: <RequireAuth />,
        children: [
          { index: true, element: <TodoPage />, },
          { path: 'home', element: <TodoPage />, },
        ],
      },
      { path: 'login', element: <LoginPage />, },
      { path: '*', element: <NotFoundPage />, },

      // {
      //   path: 'signup',
      //   element: <LoginPage />
      // },
      // {
      //   path: 'logout',
      //   element: <LoginPage />
      // },
    ],
  },
], {
  basename: '/task-manager_react-vite/',
});

export const Root = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
