import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { stLogin } from '../atom/LoginAtom'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import kakao from '../../../assets/images/oauth/kakao_login_medium_wide.png'
import welsh from '../../../assets/images/welcome/welshcorgiwavingpaw.jpg'

export default function Login() {
  const [emailLogin, setEmailLogin] = useState(false);
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(stLogin);

  const handleEmail = () => {
    if (emailLogin === false) setEmailLogin(true);
    if (emailLogin === true) setEmailLogin(false);
  }
  const handleLogin = () => {
    setIsLogin(true);
    navigate('/home')
  }
  return (
    <div className='login container flex justify-center items-center w-full'>
      <div className='login_contents w-4/5 min-w-96 p-10 flex flex-col items-center'>
        <div className='login_img'>
          <img src={welsh} alt='welcome welsh' className='w-[400px]' />
        </div>
        <div className='login_title'></div>
        <div className='login_cate divide-y divide-slate-300'>
          <div className='login_Aouth2 py-5 '>
            <button>
              <img src={kakao} alt='kakao login' />
            </button>
          </div>
          <div className='login_main py-5 flex flex-col justify-center items-center'>
            <div className='login_email'>
              <button onClick={handleEmail} className='bg-slate-200 w-[300px] h-[42px] rounded-md text-sm'>
                이메일로 로그인
              </button>
              {emailLogin ? (
                <form className='flex flex-col my-5'>
                  <input type='email' placeholder='이메일' className='mt-10 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
                  <input type='password' placeholder='비밀번호' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
                  <button type='submit' onClick={handleLogin} className='w-[300px] h-[42px] rounded-md text-sm font-bold border-2 border-yellow-300 text-yellow-400'>로그인</button>
                </form>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className='login_else divide-x divide-slate-300'>
          <Link to='/user/findpwd' className='m-1 px-3 text-slate-500'>비밀번호 찾기</Link>
          <Link to='/user/join' className='m-1 px-3 text-slate-500'>회원가입</Link>
        </div>
      </div>
    </div>
  )
}
