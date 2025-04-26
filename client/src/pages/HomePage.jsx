import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {

  const {logout} = useAuthStore();
  
  return (  
    <div className='flex flex-col items-center gap-5'>
      HomePage
      <button onClick={logout} className='p-4 cursor-pointer border-purple border-2 rounded-2xl hover:bg-pink-500 hover:text-white'>
        Logout
      </button>

    </div>
  )
}

export default HomePage