import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { PageHeader } from './components/PageHeader';

export const App = React.memo(FuncComponent);

function FuncComponent() {

  React.useEffect(() => {
  }, []);

  return (
    <div
      className='
      min-h-screen 
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
    </div>
  );
}
