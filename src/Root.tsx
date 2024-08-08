import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { RequireAuth } from './components/RequireAuth';
import { NotFoundPage } from './pages/NotFound.page';
import { LoginPage } from './pages/Login.page';
import { TodoPage } from './pages/Todo.page';
import { SignupPage } from './pages/Signup.page';
import { ActivationPage } from './pages/ActivationPage';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { path: '/', element: <HomePage />, },
      {
        path: '/', element: <RequireAuth />,
        children: [
          { path: 'tasks', element: <TodoPage />, },
        ],
      },
      { path: 'login', element: <LoginPage />, },
      { path: 'signup', element: <SignupPage /> },
      {
        path: 'activate',
        children: [
          {
            path: ':activationToken',
            element: <ActivationPage />
          }
        ],
      },
      { path: '*', element: <NotFoundPage />, },
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
