import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';
import * as authSlice from '../../slices/auth.slice';

export const PageHeader = React.memo(FuncComponent);

function FuncComponent() {
  const {
    author,
  } = useReduxSelector(selectFromStore('author'));
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  return (
    <div
      className='page__header
    custom-page-container 
    w-full py-4 sm:py-6 md:py-10 bg-gray-800'
    >
      <div className='header__nav flex justify-between'>
        <div
          className='
        header__nav-start flex gap-4
        text-lg sm:text-xl font-bold'
        >
          <Link
            to='/'
            className='w-fit p-2
          bg-indigo-400 text-white rounded hover:opacity-70'
          >
            <p className='flex items-center justify-center'>
              Home
            </p>
          </Link>

          <Link
            to='/tasks'
            className='w-fit p-2
          bg-indigo-400 text-white rounded hover:opacity-70'
          >
            <p className='flex items-center justify-center'>
              Tasks
            </p>
          </Link>
        </div>

        <div
          className='
        header__nav-end flex gap-4 justify-end
        text-lg sm:text-xl font-bold'
        >
          {author ? (
            <button className='w-fit p-2 
          bg-red-400 text-white rounded hover:opacity-70'
              onClick={() => {
                dispatch(authSlice.logoutThunk())
                  .then(() => {
                    navigate('/');
                  })
              }}
            >
              <p className='flex items-center justify-center'>
                {'Log Out'}
              </p>
            </button>
          ) : (
            <>
              <Link
                to='/signup'
                className='w-fit p-2 
          bg-system-warn text-white rounded hover:opacity-70'
              >
                <p className='flex items-center justify-center'>
                  Sign up
                </p>
              </Link>

              <Link
                to='/login'
                className='w-fit p-2 
          bg-system-success text-white rounded hover:opacity-70'
              >
                <p className='w-fit flex items-center justify-center font-bold'>
                  Log in
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
