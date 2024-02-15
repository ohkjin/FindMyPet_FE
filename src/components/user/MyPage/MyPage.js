import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAuth } from '../atom/TokenAtom'
import {  useNavigate } from 'react-router-dom';
import welcome from '../../../assets/images/welcome/tricatwelcome.jpg'
import { getToken, removeAllToken } from '../atom/TokenManager';
import axios from 'axios';
export default function MyPage() {
  const [errMessage, setErrMessage] = useState(<></>);
  const [userDetail,setUserDetail]=useState('')
  const navigate = useNavigate()
  const setIsLogin = useSetRecoilState(userAuth);
  
  useEffect(()=>{
  try{
    const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
    axios.get(`${API_SERVER}/user/mypage`, {
        headers: {
          Authorization: `Bearer ${getToken('accessToken')}`
        },
    }).then(res=>{
      console.log(res.data);
      setUserDetail(res.data);
    })
    .catch(err=>{
      setErrMessage(<div className='text-red-400'>({err.response.status}) {err.response.data}</div>)
    })
    }catch(e){
      console.log(e)
    }
  },[])
 
  const handleLogout = () => {
    removeAllToken();
    setIsLogin(null);    
    navigate('/user/login')
  }
  const handleWithdraw = () => {
    try{
      const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
      axios.delete(`${API_SERVER}/user/mypage`, {
          headers: {
            Authorization: `Bearer ${getToken('accessToken')}`
          },
      }).then(res=>{
        console.log(res.data);
        removeAllToken();
        setIsLogin(null);
        navigate('/home')
      })
      .catch(err=>{
        setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.status})${err.response.data}`:`${err.message}`}</div>)
      })
      }catch(e){
        console.log(e)
      } 
  }
  
  return (
    <div className='MyPageContainer container w-full flex flex-col justify-center items-center'>
      <div className='w-4/5 flex flex-col'>
      <img src={welcome} alt='welcome cat'/>
      <div>
        {userDetail.nickname&&<div>{userDetail.nickname}님의 개인페이지입니다</div>}
        {userDetail.userId&&<div>{userDetail.userId}</div>}
        {errMessage}
      </div>
      <button onClick={()=>navigate(`/edit?userId=${userDetail.userId}&${userDetail.nickname}`)} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>회원정보 수정</button>
      <button onClick={handleLogout} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>로그아웃</button>
      <button onClick={handleWithdraw} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>회원탈퇴</button>
    </div>
    </div>
  )
}
