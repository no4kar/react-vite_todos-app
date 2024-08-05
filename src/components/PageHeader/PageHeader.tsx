import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export const PageHeader = React.memo(FuncComponent);

function FuncComponent() {
  return (
    <div
      className='page__header
    custom-page-container 
    w-full py-4 sm:py-6 md:py-10 bg-gray-800'
    >
      <div className='header__buttons flex gap-4 justify-end'>
        <Link
          to='/signup'
          className={cn(`w-fit p-2 
          bg-system-warn text-white rounded hover:opacity-70`, {
            // 'blur-[2px]': !isValid,
          })}
        >
          <p className='flex items-center justify-center font-bold'>
            {'Sign up'}
          </p>
        </Link>

        <Link
          to='/login'
          className={cn(`w-fit p-2 
          bg-system-success text-white rounded hover:opacity-70`, {
            // 'blur-[2px]': !isValid,
          })}
        >
          <p className='w-fit flex items-center justify-center font-bold'>
            {'Log in'}
          </p>
        </Link>
      </div>
    </div>
  );
}
