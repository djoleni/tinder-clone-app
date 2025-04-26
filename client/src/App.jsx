import {Navigate, Route, Routes} from 'react-router-dom'
import { useEffect } from 'react'

import AuthPage from "./pages/AuthPage"
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'

import { Toaster } from 'react-hot-toast'


function App() {
  const {checkAuth, authUser, checkingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(checkingAuth) return null;


    

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background-image:linear-gradient(to_right,_#f0f0f0_1px,_transparent_1px),linear-gradient(to_bottom,_#f0f0f0_1px,_transparent_1px)] [background-size:6rem_4rem]">
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/auth'/>}/>
        <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to='/' />}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to='/auth'/>}/>
        <Route path="/chat/:id" element={authUser ? <ChatPage/> : <Navigate to='/auth'/>}/>
      </Routes>

      <Toaster />

    </div>
  ) 
}

export default App
