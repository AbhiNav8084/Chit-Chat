import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore.js'; 
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast'


const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser)
   return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className='animate-spin size-10' />
    </div>
   );

  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={ !authUser ? <SignUpPage/>: <Navigate to="/" />} />
        <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login" /> } />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App