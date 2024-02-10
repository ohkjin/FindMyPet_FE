import React, { useState } from 'react'
import LoginJoinForm from '../UI/LoginJoinForm'
import kakao from '../../../assets/images/oauth/kakao_join_medium_wide.png'
import welsh from '../../../assets/images/welcome/tricatwelcome.jpg'
import { userJoin } from '../api/JoinApi'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

function Join() {

  const navigate = useNavigate();
  const [popup,setPopup] = useState({
    open: false,
    title: '',
    message: '',
    callback: null,
  })
  let email = ''
  let password = ''
  let username = ''
  const userDetail = {
    email: email,
    password: password,
    username: username
  }
  const inputMap = new Map([
    ['이메일', "email"],
    ['닉네임', 'text'],
    ['비밀번호', 'password'],
    ['비밀번호 확인', 'password']
  ]);
  //  const inputMap = <form className='flex flex-col my-5'>
  //  <input type='email' placeholder='이메일' className='mt-10 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  //  <input type='password' placeholder='비밀번호' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  //  <button type='submit' onClick={handleButton} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>{functionText}</button>
  // </form>
  const handleJoin = () => {
    userJoin(userDetail)
      .then(res => {
        if (res.data.code === 1) {
          setPopup({
            open: true,
            title: 'Confirm',
            message: '회원가입 성공!',
            callback: function () { navigate('/user/login') }
          })
        } else {
          let message = res.data.message;
          if (res.data.code === 0) {
            message = '중복된 유저입니다'
          }
          setPopup({
            open: true,
            title: 'Error',
            message: message
          })
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className='login container flex justify-center items-center w-full'>
      <div className='login_contents w-4/5 min-w-96 p-10 flex flex-col items-center'>
        <div className='login_img'>
          <img src={welsh} alt='welcome welsh' className='w-[400px]' />
        </div>
        {popup.open && (
          <Popup 
          open={popup.open}
          title={popup.title}
          message={popup.message}
          callback={popup.callback}
          />
        )}
        <LoginJoinForm kakao={kakao} functionText={'회원가입'} inputMap={inputMap} handleButton={handleJoin} />
      </div>
    </div>
  )
}

export default Join