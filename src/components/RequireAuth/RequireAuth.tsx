import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

import { Loader } from '../Loader';
import { TyAuth } from '../../types/Auth.type';

export const RequireAuth = React.memo(FuncComponent);

function FuncComponent() {
  const {
    author,
    status: authStatus,
  } = useReduxSelector(selectFromStore('author'));
  const location = useLocation();

  if (authStatus === TyAuth.Status.LOADING) {
    return <Loader
      style={{
        container: `custom-page-container
        py-4 sm:py-6 md:py-10
        h-full flex items-center justify-center`
      }} />;
  }

  if (!author
    || authStatus !== TyAuth.Status.ACTIVATED) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
