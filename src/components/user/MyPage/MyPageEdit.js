import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { userAuth } from '../token/TokenAtom';
import { useRecoilValue } from 'recoil';

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
        if(e.target.name==='passwordCheck'){
            if(e.target.value!==inputs.password){
                setErrMessage('비밀번호는 일치해야합니다.')
            }
            setErrMessage('')
            return
        }
       
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value,
        })

        if(e.target.name==='password'){
            if(e.target.value.length<8 || e.target.value.length>20||!pwdRegex.test(e.target.value)){
                setErrMessage('비밀번호는 문자와 숫자만을 사용하여 8-20자로 입력해주세요.')
                return
            }
        }
        setErrMessage('')
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
        console.log(inputs);
        console.log(userToken);
        try{
            const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
            axios.put(`${API_SERVER}/user/mypage`,inputs, {
                headers: {
                  Authorization: `Bearer ${userToken}`
                },
            }).then(res=>{
              console.log(res.data);
              navigate('/user/mypage')
            })
            .catch(err=>{
              setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.status})${err.response.data}`:`${err.message}`}</div>)
            })
            }catch(e){
              console.log(e)
            } 
    }
    return (
        <div className='totalContainer'>
      <div className='innerContainer whiteContainer min-w-96 p-10 flex flex-col items-center'>
                <div>
                </div>
                <div>
                    {errMessage&&<div className='text-red-500 text-sm'>{errMessage}</div>}
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                        {/* <label htmlFor='inputId'/> */}
                        <input type='email' name='inputId' value={userId} readOnly/>
                        <input type='text' name='nickname'maxLength={10} value={inputs.nickname} onChange={handleChange} placeholder={nickname}/>
                        <input type='password' name='password' maxLength={20} value={inputs.password} onChange={handleChange} placeholder='변경할 비밀번호'/>
                        <input type='password' name='passwordCheck' maxLength={20} onChange={handleChange} placeholder='비밀번호 재확인'/>
                        <button type='submit' className='w-10 h-10 bg-yellow-400'/>
                    </form>
                </div>
            </div>
        </div>
    )
}
