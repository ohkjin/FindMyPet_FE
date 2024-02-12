import React, { useRef, useState } from 'react'
import LoginJoinForm from '../UI/LoginJoinForm'
import kakao from '../../../assets/images/oauth/kakao_join_medium_wide.png'
// import welsh from '../../../assets/images/welcome/tricatwelcome.jpg'
import { userJoin } from '../api/JoinApi'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

function Join() {
  const [email, setEmail] = useState('');
  const [emailAlert,setEmailAlert] = useState('');
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const emailRef = useRef();
  const [pwd,setPwd] = useState('');
  const [pwdAlert,setPwdAlert] = useState('');
  const [pwdCheckAlert,setPwdCheckAlert] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [popup,setPopup] = useState({
    open: false,
    title: '',
    message: '',
    callback: null,
  })

  const userDetail = {
    email: email,
    password: pwd,
    username: username
  }
  const handleEmail = (e) => {
    e.preventDefault();
    console.log(!emailRegex.test(e.target.value))
    if(!emailRegex.test(e.target.value)){
      setEmailAlert('올바른 이메일 형식이 아닙니다.')
      return
    }
    setEmailAlert('')
    setEmail(e.target.value)
  }
  const handlePwd = (e) => {
    e.preventDefault()
    if(e.target.value.length<8 || e.target.value.length>20){
      setPwdAlert('비밀번호는 문자와 숫자만을 사용하여 8-20자로 입력해주세요.')
      return
    }
    setPwdAlert('')
    setPwd(e.target.value);
  }

  const handlePwdCheck = (e) => {
    e.preventDefault()
    if(pwd!==e.target.value){
      setPwdCheckAlert('비밀번호가 동일하지 않습니다. 다시 입력해주세요.')
      return
    }
    setPwdCheckAlert('')
  }
 
  const handleJoin = (e) => {
    e.preventDefault();
    userJoin(userDetail)
      .then(data => {
        if (data.code === 1) {
          setPopup({
            open: true,
            title: 'Confirm',
            message: '회원가입 성공!',
            callback: function () { navigate('/user/login') }
          })
        } else {
          let message = data.message;
          if (data.code === 0) {
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
  const inputs =  <>
  <input type='email' ref={emailRef} onChange={handleEmail} placeholder='이메일' className='mt-10 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  <div className='text-sm text-red-500'>{emailAlert}</div>
  <input type='text' onChange={e => setUsername(e.target.value)} placeholder='닉네임' className='mt-3 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  <input type='password' onChange={handlePwd} placeholder='비밀번호' className='mt-3 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  <div className='text-sm text-red-500'>{pwdAlert}</div>
  <input type='password' onChange={handlePwdCheck} placeholder='비밀번호 확인' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  <div className='text-sm text-red-500'>{pwdCheckAlert}</div>
</>


  return (
    <div className='login container flex justify-center items-center w-full'>
      <div className='login_contents w-4/5 min-w-96 p-10 flex flex-col items-center'>
        <div className='login_img'>
          {/* <img src={welsh} alt='welcome welsh' className='w-[400px]' /> */}
        </div>
        {popup.open && (
          <Popup 
          open={popup.open}
          title={popup.title}
          message={popup.message}
          callback={popup.callback}
          />
        )}
        <LoginJoinForm kakao={kakao} functionText={'회원가입'}  inputs = {inputs} handleButton={handleJoin} emailShown={true}/>
      </div>
    </div>
  )
}

export default Join