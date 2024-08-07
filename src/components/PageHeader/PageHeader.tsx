import React from 'react';
import { Link } from 'react-router-dom';
import { useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

export const PageHeader = React.memo(FuncComponent);

function FuncComponent() {
  const {
    author,
  } = useReduxSelector(selectFromStore('author'));

  return (
    <div
      className='page__header
    custom-page-container 
    w-full py-4 sm:py-6 md:py-10 bg-gray-800'
    >
      <div className='header__buttons flex gap-4 justify-end'>
        {author ? (
          <button className='w-fit p-2 
          bg-red-400 text-white rounded hover:opacity-70'
          >
            <p className='flex items-center justify-center font-bold'>
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
              <p className='flex items-center justify-center font-bold'>
                {'Sign up'}
              </p>
            </Link>

            <Link
              to='/login'
              className='w-fit p-2 
          bg-system-success text-white rounded hover:opacity-70'
            >
              <p className='w-fit flex items-center justify-center font-bold'>
                {'Log in'}
              </p>
            </Link>
          </>
        )}

      </div>
    </div >
  );
}
