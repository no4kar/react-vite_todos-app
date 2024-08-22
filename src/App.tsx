import React from 'react';
import { Outlet } from 'react-router-dom';

import * as authSlice from './slices/auth.slice';
import { useReduxDispatch, useReduxSelector } from './store/hooks';
import { selectFromStore } from './store/store';

import { PageHeader } from './components/PageHeader';
import { Notification } from './components/Notification';

import './App.scss';
export const App = React.memo(FuncComponent);

function FuncComponent() {
  const {
    errorMsg,
  } = useReduxSelector(selectFromStore('author'));
  const dispatch = useReduxDispatch();

  React.useEffect(() => {
    // check auth
    dispatch(authSlice.refreshThunk());
  }, []);

  return (
    <div
      className='min-h-screen
      bg-gray-800 text-white font-robotomono-normal
      grid grid-cols-1 grid-rows-[auto,1fr,auto]'
    >
      <PageHeader />

      <main>
        <Outlet />
      </main>

      <footer>
        <div className='h-10 custom-page-container bg-gray-900' />
      </footer>

      {errorMsg && (
        <div
          className='fixed bottom-4 right-4'
        >
          <Notification onClose={() => dispatch(authSlice.errorReset())}>
            <p>{errorMsg}</p>
          </Notification>
        </div>
      )}
    </div>
  );
}
