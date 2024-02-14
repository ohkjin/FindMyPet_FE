// import React, { useState } from 'react'
// import axios from 'axios'
export default function Test() {
    // const API_SERVER = 'http://10.125.121.183:8080'
    // const prefix = `${API_SERVER}/user/login`
    // const [test,setTest] = useState(<></>)
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const email = e.target.email.value;
    //     const pwd = e.target.pwd.value;
    //     try {
    //     setTest(<div></div>)
    //     }catch(e){
    //         console.log(e)
    //     }
    // }
  return (
    <div className='container flex flex-col items-center'>
        <h1>Test</h1>
        <div>
            {/* <form onSubmit={handleSubmit} className='flex flex-col'>
            <input type='email' name='email' placeholder='이메일' className='mt-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
            <input type='password' name='pwd' placeholder='비밀번호' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
            <button type='submit' className='bg-yellow-300'>Login</button>
            </form> */}
        </div>
        <div>
            {test}
        </div>
    </div>
  )
}
