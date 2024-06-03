import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeaderAfterLogIn from './components/HeaderAfterLogIn';
import Input from './components/Input';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import RecentViewed from './components/RecentViewed';
import Register from './components/Register';
import SnapshotEntity from './components/SnapshotEntity';

function App() {
  const [userName, setUserName] = useState("")
  const auth = useSelector((state) => state.user.auth)

  //Handle current time
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
    <div>
      <Routes>
        <Route element={<Header darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route path='login' element={<LoginPage setUserName={setUserName} />} />
          <Route path='register' element={<Register setUserName={setUserName} />} />
        </Route>
        <Route element={<PrivateRoute auth={auth}>
          <HeaderAfterLogIn userName={userName} darkMode={darkMode} setDarkMode={setDarkMode} />
        </PrivateRoute>}>
          <Route path='/' element={<Input />} />
          <Route path=':id' element={<SnapshotEntity />} />
          <Route path='recent' element={<RecentViewed />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
