import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import NavbarMain from './common/Navbar';
import { Register } from './auth/register/Register';
import Home from './common/Home';
import { Profile } from './user/Profile';
import { Error404 } from './common/Error404';
import { useEffect, useState } from 'react';
import { getAuthInfo } from './service/auth.service';
import { Settings } from './user/Settings';
import { ShowPost } from './post/ShowPost';
import CommunityPage from './community/CommunityPage';

function App() {

  const [auth, setAuth] = useState({});

  async function getAuth()
  {
    const result = await getAuthInfo();

    if(!result.success)
    {
      return;
    }

    setAuth(result.data);
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
    <NavbarMain user={auth} />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Home auth={auth}/>}></Route>
        <Route path="/profile/:id" element={ <Profile auth={auth}/>}></Route>
        <Route path="/post/:id" element={ <ShowPost auth={auth}/>}></Route>
        <Route path="/error404" element={<Error404 />}></Route>
        <Route path="/settings" element={<Settings auth={auth} />}></Route>
        <Route path="/community/:id" element={<CommunityPage auth={auth}/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  );

}

export default App;
