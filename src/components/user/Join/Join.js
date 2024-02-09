import React from 'react'
import LoginJoinForm from '../UI/LoginJoinForm'
import kakao from '../../../assets/images/oauth/kakao_join_medium_wide.png'
import welsh from '../../../assets/images/welcome/tricatwelcome.jpg'

function Join() {
  const inputMap = new Map([
    ['이메일',"email"],
    ['닉네임', 'text'],
    ['비밀번호', 'password'],
    ['비밀번호 확인','password']
  ]);

  const handleJoin = () => {
    
  }
  return (
    <div className='login container flex justify-center items-center w-full'>
      <div className='login_contents w-4/5 min-w-96 p-10 flex flex-col items-center'>
        <div className='login_img'>
          <img src={welsh} alt='welcome welsh' className='w-[400px]' />
        </div>
        <LoginJoinForm kakao={kakao} functionText={'회원가입'} inputMap={inputMap} handleButton={handleJoin}/>
      </div>
    </div>
  )
}

export default Join