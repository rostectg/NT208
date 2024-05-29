import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import HeaderAfterLogIn from './components/HeaderAfterLogIn';
import Input from './components/Input';
import SnapshotEntity from './components/SnapshotEntity';
import { useState } from 'react';
import RecentViewed from './components/RecentViewed';
import { useSelector } from 'react-redux';

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
