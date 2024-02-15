import React from 'react'
import { useSetRecoilState } from 'recoil'
import { userAuthentication } from '../atom/TokenAtom'
import {  useNavigate } from 'react-router-dom';
import { privateApi } from '../api/TokenApi';
import welcome from '../../../assets/images/welcome/tricatwelcome.jpg'
import { removeAllToken } from '../atom/TokenManager';
export default function MyPage() {
  const navigate = useNavigate()
  const setIsLogin = useSetRecoilState(userAuthentication);
  try{
    privateApi.get('/user/mypage')
    .then(res=>console.log(res.data))
  }catch(e){
    console.log(e)
  }

  const handleLogout = () => {
    setIsLogin(null);
    removeAllToken();
    navigate('/home')
  }
  
  return (
    <div className='MyPageContainer container w-full flex flex-col justify-center items-center'>
      <div className=' w-4/5'>
      <img src={welcome} alt='welcome cat'/>
    <button onClick={handleLogout} className='bg-yellow-300 w-10 h-10'></button>
    </div>
    </div>
  )
}
