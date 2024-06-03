import React from 'react';
import { Link, Outlet } from 'react-router-dom';


function Header({darkMode, setDarkMode}) {
  
  return (
    <div>
      <div className='header fixed top-2 left-0 right-0 h-12 md:h-16 grid grid-cols-12'>
        <div className='header__logo col-span-3 lg:col-span-1'>
          <img
            className='h-6 mt-3 ml-4 cursor-pointer'
            src={darkMode ? 'sun.png' : '/moon.png'}
            onClick={() => setDarkMode(!darkMode)}
            alt=''
          />
        </div>

        <div className='col-span-3 md:col-span-5 lg:col-span-9'></div>

        <button className='
      header__signup col-span-3 text-center leading-9
      md:col-span-2
      lg:col-span-1 lg:text-lg lg:font-medium'
        >
          <Link to='/register'>Sign up</Link>
        </button>

        <button className='
      header__login col-span-3 text-center h-8 w-20 bg-blue-600 text-slate-50 my-auto rounded-md 
      md:col-span-2
      lg:col-span-1 lg:h-11 lg:w-28 lg:text-lg lg:font-medium lg:rounded-lg'
        >
          <Link to='/login'>Log in</Link>
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Header;