import './App.css'

import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Account from './pages/Account'
import HomePage from './pages/HomePage'
import Footer from './components/homepage/Footer'
import SidebarLayout from './layouts/Sidebarlayout'
import Tokenmanagement from './components/Dashboard/Tokenmanagement'
import Apisettings from './components/Dashboard/Apisettings'
import { initialiseAuth } from './auth/authFunctions'
import { useEffect } from 'react'


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Call initialiseAuth when the app loads
    const exemptPaths = ["/login", "/signup", "/"];
    initialiseAuth(navigate, exemptPaths);
  }, [navigate]);

  return (
    <>  
      <Navbar></Navbar>
      {/* <div> Please make me rich! </div> */}

      <Routes>
        {/* protected routes */}
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<SidebarLayout />}>
          <Route path=':id' element={<Dashboard/>}></Route>
          <Route path='token/:id' element={<Tokenmanagement />}></Route>
          <Route path='settings/:id' element={<Apisettings />}></Route>
        </Route>
        <Route path='/account/:id' element={<Account />} />

        {/* unprotected routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
