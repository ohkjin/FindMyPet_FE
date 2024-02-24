import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAuth, userNickname } from '../token/TokenAtom'
import {  useNavigate } from 'react-router-dom';
import welcome from '../../../assets/images/welcome/tricatwelcome.jpg'
import { removeAllToken } from '../token/TokenManager';
import { privateApi } from '../token/PrivateApi';
export default function MyPage() {
  const [userDetail,setUserDetail]=useState('')
  const navigate = useNavigate()
  const setUserToken = useSetRecoilState(userAuth);
  const setUserNick = useSetRecoilState(userNickname);

  //-- 유저정보 --//
  useEffect(()=>{
    privateApi({
      url:`/mypage`,
      method:'get',})
    .then((content)=>{
      console.log(content)
      setUserDetail(content);
    })
    .catch((err)=>
      console.log(err)
    )
  },[])
 
  //-- 로그아웃 --//
  const handleLogout = () => {
    removeAllToken();
    setUserToken(null);  
    setUserNick(null);
    navigate('/user/login')
  }
  //-- 회원탈퇴 --//
  const handleWithdraw = () => {
    privateApi({
      url:`/mypage`,
      method:'delete',})
    .then((res)=>{
        removeAllToken();
        setUserToken(null);
        setUserNick(null);
        navigate('/home')
    })
    .catch((err)=>
      console.log(err)
    )
  }
  
  return (
    <div className='totalContainer'>
      <div className='innerContainer whiteContainer flex flex-col justify-center items-center'>
      <img src={welcome} alt='welcome cat' className='w-[400px]' />
      <div>
        {userDetail.nickname&&<div>{userDetail.nickname}님의 개인페이지입니다</div>}
        {userDetail.userId&&<div>{userDetail.userId}</div>}
      </div>
      <div className='flex flex-col my-5'>
      <button onClick={()=>navigate(`/user/mypage/edit?userId=${userDetail.userId}&nickname=${userDetail.nickname}`)} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold bg-gray-700 border-2 border-yellow-300 text-yellow-400'>회원정보 수정</button>
      <button onClick={handleLogout} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm bg-yellow-700 font-bold border-2 border-yellow-300 text-yellow-400'>로그아웃</button>
      <button onClick={handleWithdraw} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>회원탈퇴</button>
      </div>
    </div>
    </div>
  )
}
