import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { userAtom } from '../user/atom/TokenAtom';
// import welcomeHome from '../../assets/images/welcome/welcomeHome.jpg'
// import axios from 'axios'
export default function Home() {
  const isLogin = useRecoilValue(userAtom);
  useEffect(()=>{

  },[])
  return (
    <div className={``}>
      <div className='BgImage flex flex-col justify-center items-center' >
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
