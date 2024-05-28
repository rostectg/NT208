import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import HeaderAfterLogIn from './components/HeaderAfterLogIn';
import Input from './components/Input';
import SnapshotEntity from './components/SnapshotEntity';

function App() {


  return (
    <div className=''>
      <Routes>
        <Route element={<Header />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route element={<PrivateRoute>
          <HeaderAfterLogIn />
        </PrivateRoute>}>
          <Route path='/' element={<Input />} />
          <Route path='/:id' element={<SnapshotEntity />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
