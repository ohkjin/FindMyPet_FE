import React from 'react'
import { useSetRecoilState } from 'recoil'
import { stLogin } from '../atom/LoginAtom'
import {  useNavigate } from 'react-router-dom';
export default function MyPage() {
  const navigate = useNavigate()
  const setIsLogin = useSetRecoilState(stLogin);
  const handleLogout = () => {
    setIsLogin(false);
    navigate('/home')
  }
  return (
    <button onClick={handleLogout} className='bg-yellow-300 w-10 h-10'></button>
  )
}
