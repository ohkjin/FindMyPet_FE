
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { userAuth } from '../token/TokenAtom';
import { useRecoilValue } from 'recoil';
import { privateApi } from '../token/PrivateApi';

export default function MyPageEdit() {
    const [sParams] = useSearchParams();
    const userId = sParams.get('userId');
    const nickname = sParams.get('nickname');
    const pwdRegex = /^[A-Za-z0-9]*$/;
    const userToken = useRecoilValue(userAuth);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState('')
    const [inputs, setInputs] = useState({
        userId: userId,
        nickname: '',
        password: ''
    })
    const handleChange = (e) => {
        e.preventDefault();
        setErrMessage('')
        if(e.target.name==='passwordCheck'){
            if(e.target.value!==inputs.password){
                setErrMessage('비밀번호는 일치해야합니다.')
                return
            }
        }else{
            setInputs({
                ...inputs,
                [e.target.name]:e.target.value,
            })
    
            if(e.target.name==='password'){
                if(e.target.value.length<8 || e.target.value.length>20||!pwdRegex.test(e.target.value)){
                    setErrMessage('비밀번호는 문자와 숫자만을 사용하여 8-20자로 입력해주세요.');
                    return;
                }
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputs.nickname===''||inputs.password===''){
            setErrMessage('닉네임과 비밀번호를 전부 입력해주세요')
            return
        }
        if(errMessage!==''){
            setErrMessage('에러사항이 없는지 다시 확인해주세요')
            return
        }
        // console.log(inputs);
        // console.log(userToken);
        privateApi({
            url:`/mypage`,
            method:'put',
            data:inputs})
          .then((res)=>{
            navigate('/user/mypage')
          })
          .catch((err)=>
            console.log(err)
          )
    }
    return (
        <div className='totalContainer'>
      <div className='innerContainer whiteContainer min-w-96 p-10 flex flex-col items-center'>
                <div>
                    {errMessage&&<div className='text-red-500 text-sm'>{errMessage}</div>}
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-4 min-w-72'>
                        {/* <label htmlFor='inputId'/> */}
                        <input type='email' name='inputId' value={userId} readOnly className='border-[3px] rounded-xl border-yellow-300 w-full h-10 p-5'/>
                        <input type='text' name='nickname'maxLength={10} value={inputs.nickname} onChange={handleChange} placeholder={nickname} className='border-[3px] rounded-xl h-10 border-yellow-300 border-dashed w-full p-5'/>
                        <input type='password' name='password' maxLength={20} value={inputs.password} onChange={handleChange} placeholder='변경할 비밀번호'className='rounded-xl h-10 border-[3px] border-yellow-300 border-dashed w-full p-5'/>
                        <input type='password' name='passwordCheck' maxLength={20} onChange={handleChange} placeholder='비밀번호 재확인'className='rounded-xl h-10 border-[3px] border-yellow-300 border-dashed w-full p-5'/>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          변경
        </button>
        <button
          type="button"
          onClick={()=>navigate('/user/mypage')}
          className="rounded-xl bg-gray-400 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          취소
        </button>
      </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
