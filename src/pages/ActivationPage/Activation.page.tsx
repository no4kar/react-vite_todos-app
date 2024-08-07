import React from 'react';
import {
  useParams,
} from 'react-router-dom';

import * as authSlice from '../../slices/auth.slice';
import { useReduxSelector, useReduxDispatch } from '../../store/hooks';
import { selectFromStore } from '../../store/store';
import { Loader } from '../../components/Loader';

// import { Loader } from '../../components/Loader';

export const ActivationPage = React.memo(FuncComponent);

function FuncComponent() {
  const { errorMsg, activated } = useReduxSelector(selectFromStore('author'));
  const { activationToken = 'unknown' } = useParams();
  const dispatch = useReduxDispatch();

  console.info(activationToken);

  React.useEffect(() => {
    dispatch(authSlice.activationThunk(activationToken));
  }, []);

  let content: JSX.Element = (
    <Loader />
  );

  if (errorMsg && !activated) {
    content = (
      <p className='bg-red-100 text-system-error border border-red-400 p-4 rounded'>
        {errorMsg}
      </p>
    );
  }

  if (!errorMsg && activated) {
    content = (
      <p>Your account is now active</p>
    );
  }

  return (
    <div className='custom-page-container py-4 sm:py-6 md:py-10'>
      <div className='w-full max-w-md p-8 mx-auto
      bg-gray-800 text-gray-400 rounded-lg shadow-md space-y-6'>
        <div
          className='flex items-center justify-center flex-col gap-4'
        >
          <h2 className='text-2xl font-robotomono-bold font-bold text-white'>
            Account activation
          </h2>
          {content}
          {/* {errorMsg && !activated ? (
            <p className='bg-red-100 text-system-error border border-red-400 p-4 rounded'>
              {errorMsg}
            </p>
          ) : (
            <p>Your account is now active</p>
          )} */}
        </div>
      </div>
    </div>
  );
}
