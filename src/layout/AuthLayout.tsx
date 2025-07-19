
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='w-screen h-screen overflow-hidden flex items-center justify-center relative'>
        <img 
        src="/img/bg.png" 
        alt="backgroud img" 
        className='absolute w-full h-full object-cover opacity-150'
        />
        <Outlet/>
    </div>
  )
}

export default AuthLayout