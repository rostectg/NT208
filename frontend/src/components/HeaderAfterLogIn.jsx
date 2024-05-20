import React from 'react';
import { useEffect, useState } from 'react';


function HeaderAfterLogIn(props) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);
  const [darkMode, setDarkMode] = useState(currentHour >= 17 || currentHour <= 5);
  console.log(darkMode)
  useEffect(() => {
    darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
  })
  return (
    <div className='header fixed top-2 left-0 right-0 h-12 md:h-16 grid grid-cols-12'>
      <div className='header__logo col-span-3 lg:col-span-1'>
        <img
          className='h-6 mt-3 ml-4 cursor-pointer'
          src={darkMode ? 'sun.png' : 'moon.png'}
          onClick={() => setDarkMode(!darkMode)}
          alt=''
        />
      </div>

      <div className='col-span-7 md:col-span-8 lg:col-span-9'></div>


      <div className='col-span-2 mt-2 flex 
      md:col-span-1 
      lg:col-span-2 lg:ml-16
      '>
        <div className='mr-3 leading-9'>Võ Thị Hưởng</div>
        <img
          className='h-11 w-11 rounded-full'
          src='user-logo.jpg'
          alt=''
        />

      </div>

    </div>
  );
}

export default HeaderAfterLogIn;