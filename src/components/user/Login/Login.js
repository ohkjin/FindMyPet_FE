import React, { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAuth, userNickname } from '../token/TokenAtom'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import Popup from 'reactjs-popup';
import kakao from '../../../assets/images/oauth/kakao_login_medium_wide.png'
import welsh from '../../../assets/images/welcome/welshcorgiwavingpaw.jpg'
import LoginJoinForm from '../UI/LoginJoinForm';
import axios from 'axios';
import { removeAllToken, setAccessToken, setUserCookie } from '../token/TokenManager';


export default function Login() {
  //-- Restful Api --//
  // const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
  const API_SERVER = 'http://10.125.121.183:8080'
  const prefix = `${API_SERVER}/user/login`

  //-- for input --//
  const emailRef = useRef()
  const pwdRef = useRef()
  const inputs = <>
    <input type='email' maxLength={30} ref={emailRef} placeholder='이메일' className='mt-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
    <input type='password' maxLength={30} ref={pwdRef} placeholder='비밀번호' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
  </>

  //-- for State Management --//
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(userAuth);
  const setUserNick = useSetRecoilState(userNickname);
  const [popup, setPopup] = useState({
    open: false,
    title: '',
    message: '',
    callback: null,
  })
  const [errMessage, setErrMessage] = useState(<></>);
  
  //-- Login --//
  const handleLogin = (e) => {
    e.preventDefault();
    if (emailRef.current.value === '' || pwdRef.current.value === '') {
      setErrMessage(<div className='text-red-500'>이메일과 비밀번호 전부 입력해주세요</div>)
      return
    }
    console.log(emailRef.current.value, pwdRef.current.value)
    try {
      removeAllToken();
      axios.post(`${prefix}`, {
        userId: emailRef.current.value,
        password: pwdRef.current.value
        // userId: 'asdf@asdf.com',
        // password: 'asdfasdf'
      })
        .then(res => {
          // console.log("res",res)
          // console.log("headers",res.headers)
          if(!res.headers){
            setErrMessage(<div className='text-red-400'>No Header returned</div>)
            return
          }
          if(!res.data){
            setErrMessage(<div className='text-red-400'>No Data returned</div>)
            return
          }
          //토큰 저장
          const accessToken = res.headers.authorization.slice(7);
          // console.log(accessToken);
          setAccessToken(accessToken);
          setIsLogin(accessToken);
          //닉네임 저장
          // console.log(res.data.nickname);
          setUserCookie(res.data.nickname);
          setUserNick(res.data.nickname);
          navigate('/');
        }).catch(err => {
          console.log(err)
          setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.data.status}) ${err.response.data.message}`:err.message}</div>)
          setPopup({
            open: true,
            title: 'Error',
            message: err.message,
          })
        })
    } catch (e) {
      console.log(e)
      return null
    }
  }
  const handleKakaoLogin = () => {

  }
  return (
    <div className='totalContainer'>
      <div className='innerContainer whiteContainer min-w-96 flex flex-col items-center'>
        <div className='login_img'>
          <img src={welsh} alt='welcome welsh' className='w-[400px]' />
        </div>
        {errMessage}
        {popup.open && (
          <Popup
            open={popup.open}
            title={popup.title}
            message={popup.message}
            callback={popup.callback}
          />
        )}
        <LoginJoinForm kakao={kakao} handleKakao={handleKakaoLogin} functionText={'로그인'} inputs={inputs} handleButton={handleLogin} emailShown={false} />
        <div className='login_else divide-x divide-slate-300 mb-10'>
          <Link to='/user/findpwd' className='m-1 px-3 text-slate-500'>비밀번호 찾기</Link>
          <Link to='/user/join' className='m-1 px-3 text-slate-500'>회원가입</Link>
        </div>
      </div>
    </div>
  )
}
