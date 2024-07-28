import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

import { Loader } from '../Loader';

export const RequireAuth = React.memo(FuncComponent);

function FuncComponent({
  children,
}: {
  children?: React.ReactNode,
}) {
  const { checked, loaded } = useReduxSelector(selectFromStore('author'));
  const location = useLocation();

  if (loaded && !checked) {
    return <Loader />;
  }

  if (!checked) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }


  return children || <Outlet />;
}
