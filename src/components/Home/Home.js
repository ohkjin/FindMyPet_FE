import React, { useEffect } from 'react'
import welcomeHome from '../../assets/images/welcome/welcomeHome.jpg'
import axios from 'axios'
export default function Home() {
  
  useEffect(()=>{
      const API_SERVER = 'http://10.125.121.184'
      const prefix = `${API_SERVER}/member2/1`
      const res = axios.get(prefix)
      .then(res=>console.log(res.data))
      console.log(res.data)

      // fetch(prefix)
      //   .then((resp)=>resp.json())
      //   .then((data)=>console.log(data))
      //   .catch(err => console.log(err))
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
