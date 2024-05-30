import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/action';

function HeaderAfterLogIn({ userName }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.auth)

  const handleLogOut = async () => {
    dispatch(userAction.logOut())
    if (!auth) {
      notification.success({ message: 'Log out successfully', duration: 3 });
      navigate('/login', { replace: true });
    }
  }
  const items = [
    {
      key: 1,
      label: (
        <NavLink to="recent">
          Recent Viewed
        </NavLink>
      )
    },
    {
      key: 2,
      label: "Bookmarks"
    },
    {
      type: 'divider',
    },
    {
      key: 3,
      label: (
        <a href='/login'>
          Log out
        </a>
      )
    }
  ]
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);
  const [darkMode, setDarkMode] = useState(currentHour >= 17 || currentHour <= 5);
  useEffect(() => {
    darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
  })
  return (
    <div className='w-screen'>
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
          <Dropdown placement='bottomRight' menu={{ items }} arrow>
            <div className='cursor-pointer flex'>
              <div className='mt-5'>{userName}</div>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>
          </Dropdown>

        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HeaderAfterLogIn;