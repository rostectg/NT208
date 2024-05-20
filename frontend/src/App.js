import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import LogIn from './components/LogIn';
import HeaderAfterLogIn from './components/HeaderAfterLogIn';
import InputAfterLogIn from './components/InputAfterLogIn';

function App() {
  return (
    <div className=''>
      <HeaderAfterLogIn />
      <Routes>
        <Route path='/' element={<InputAfterLogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
