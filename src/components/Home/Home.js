<<<<<<< HEAD
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { userAtom } from '../user/atom/TokenAtom';
=======
>>>>>>> fe_home
// import welcomeHome from '../../assets/images/welcome/welcomeHome.jpg'
export default function Home() {
<<<<<<< HEAD
  const isLogin = useRecoilValue(userAtom);
  useEffect(()=>{

  },[])
=======
>>>>>>> fe_home
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='BgImage w-4/5 ' >
        {/* <div className={`max-w-lvw min-h-lvh bg-[url('./assets/images/welcome/welcomeHome.jpg')] bg-cover`}> */}
        <div>
        </div>
        {/* <img src={welcomeHome} alt='welcome Home'/> */}
      </div>
        <div className='Title '>
          Home
        </div>
        <div>
          {isLogin}
        </div>
    </div>
  )
}
