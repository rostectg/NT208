import { useState } from 'react';
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
  return (
    <div>
      <Routes>
        <Route element={<Header />}>
          <Route path='login' element={<LoginPage setUserName={setUserName} />} />
          <Route path='register' element={<Register setUserName={setUserName} />} />
        </Route>
        <Route element={<PrivateRoute auth={auth}>
          <HeaderAfterLogIn userName={userName} />
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
