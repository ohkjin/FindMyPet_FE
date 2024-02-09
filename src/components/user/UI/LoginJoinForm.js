import React, { useState } from 'react'

export default function LoginJoinForm({kakao,handleButton, functionText, inputMap}) {
const [emailLogin,setEmailLogin] = useState(false);
// const Mappedinput = Array.from(inputMap).map(([key, value]) => (
//     <input type={value} ref={``} placeholder={key} className='mt-3 p-3 w-[300px] h-[42px] text-slate-100 border-b border-slate-200' />
// ));
  const handleEmail = () => {
    if (emailLogin === false) setEmailLogin(true);
    if (emailLogin === true) setEmailLogin(false);
  }
    return (
        <>
            <h1 className='Title font-medium text-slate-800 text-2xl m-5'>{functionText}</h1>
            <div className='Subtitle font-thin text-slate-400 text-sm '>간편하게 SNS {functionText}</div>
            <div className='Cate divide-y divide-slate-300'>
                <div className='Aouth2 pt-2 pb-5 '>
                    <button>
                        <img src={kakao} alt='kakao login' className='rounded-xl'/>
                    </button>
                </div>
                <div className='Main py-5 flex flex-col justify-center items-center'>
                    <div className='Email'>
                        <button onClick={handleEmail} className='bg-slate-200 w-[300px] h-[42px] rounded-xl text-sm'>
                             이메일로 {functionText}
                        </button>
                        {emailLogin ? (
                            <form className='flex flex-col my-5'>
                                {/* {Mappedinput?Mappedinput:''} */}
                                {/* <input type='email' placeholder='이메일' className='mt-10 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
                                <input type='password' placeholder='비밀번호' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' /> */}
                                <button type='submit' onClick={handleButton} className='mt-5 w-[300px] h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>{functionText}</button>
                            </form>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
