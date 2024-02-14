import React, { useEffect } from 'react'
import welcomeHome from '../../assets/images/welcome/welcomeHome.jpg'
// import axios from 'axios'
export default function Home() {
  
  useEffect(()=>{

  },[])
  return (
    <div>
      <div className='BgImage container' >
        <img src={welcomeHome} alt='welcome Home'/>
      </div>
        <div className='Title '>
          Home
        </div>
    </div>
  )
}
