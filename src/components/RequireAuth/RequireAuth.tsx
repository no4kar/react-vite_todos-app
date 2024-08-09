import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

import { Loader } from '../Loader';

export const RequireAuth = React.memo(FuncComponent);

function FuncComponent() {
  const { registered, loaded } = useReduxSelector(selectFromStore('author'));
  const location = useLocation();

  if (loaded && !registered) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  if (!loaded && !registered) {
    return <Loader
      style={{
        container: `custom-page-container
      py-4 sm:py-6 md:py-10
      h-full flex items-center justify-center`
      }} />;
  }

  return <Outlet />;
}
