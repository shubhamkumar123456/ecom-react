import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sign from './pages/Sign';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import { useEffect, useState } from 'react';
import Confirmbooking from './pages/Confirmbooking';

function App() {

  const [update, setupdate] = useState(false);
  const [uploade, setuploade] = useState(true);
  const [Logins, setLogins] = useState(false);

  // console.log(Logins)
  // let userDtail = JSON.parse(localStorage.getItem('userDtail'))|| ""
  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem('userDtail')) || ""
    if (userDetail) {
      setLogins(true)
    }

  }, [Logins])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar Logins={Logins} setLogins={setLogins} />
        <Routes>
          {!Logins && <Route path='/' element={<Navigate to={'/Login'} />} />}
          {Logins && <Route path='/' element={<Home setupdate={setupdate} update={update} />} />}
          <Route path='/' element={<Home setupdate={setupdate} update={update} />} />
          <Route path='/CartPage' element={<CartPage setuploade={setuploade} uploade={uploade} />} />
          <Route path='/Signup' element={<Sign />} />
          <Route path='/Confirmbooking' element={<Confirmbooking />} />
          {Logins && <Route path='/Login' element={<Navigate to={'/'} />} />}
          {!Logins && <Route path='/Login' element={<Login Logins={Logins} setLogins={setLogins} to={'/'} />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
