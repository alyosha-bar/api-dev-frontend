import './App.css'

import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Account from './pages/Account'
import HomePage from './pages/HomePage'



function App() {

  return (
    <>  
      <Navbar></Navbar>
      {/* <div> Please make me rich! </div> */}

      <Routes>
        {/* protected routes */}
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/account/:id' element={<Account />} />

        
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
