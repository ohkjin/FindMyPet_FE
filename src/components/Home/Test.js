// import { useState } from "react"
// import { useCookies } from "react-cookie"

// import axios from 'axios'
// import { setToken } from "../user/atom/TokenManager"

// import TailBoardForm from '../boards/UI/TailBoardForm'
import { useNavigate } from "react-router-dom";
import { getToken } from "../user/token/TokenManager";
import { useRecoilValue } from "recoil";
import { userNickname } from "../user/token/TokenAtom";
export default function Test() {
    // const [test,setTest] = useState(<></>)
    // const [cookies,setCookies] = useCookies(["accessToken","refreshToken"])
    // const expireDt = new Date()
    // expireDt.setDate(Date.now()+1000*60*60*24)
    // // let httpTF = true
    // // if(API_SERVER==='http://10.125.121.183:8080'){
    // //   httpTF = false
    // // }
    // const accessToken='a234adf'
    // const refreshToken='qwer1234'
    // setCookies("accessToken",accessToken,{path:'/',expireDt,httpOnly:false})
    // setCookies("refreshToken",refreshToken,{path:'/',expireDt,httpOnly:false})
    // axios.defaults.headers.Authorization = 'Bearer '+ accessToken
    // console.log(cookies)
    // setToken(accessToken,refreshToken)
    const navigate = useNavigate();
    const nickname = useRecoilValue(userNickname)
    console.log(getToken('nickname'));
    console.log(nickname)

    const handleRedirect = () =>{
      // Replace the current URL with a new one
      window.location.replace("/user/login");
    }
    const handleNavigate = (board) => {
      navigate(board)
    }
    // const handleTestForm = (e, inputs) =>{
    //   e.preventDefault();
    //   console.log(inputs)
    //   setTest(<>{inputs.category}{inputs.title}{inputs.content}</>)
    // }
    // const API_SERVER = 'http://10.125.121.183:8080'
    // const prefix = `${API_SERVER}/user/login`
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

    // const API_SERVER = 'http://10.125.121.184:8080'
    // const prefix = `${API_SERVER}/member2/1`
    // const res = axios.get(prefix)
    // .then(res=>console.log(res.data))
    // console.log(res.data)

    // const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
    // const prefix = `${API_SERVER}/home/1`
    // const res = axios.get(prefix)
    // .then(res=>console.log(res.data))
    // console.log(res.data)

    // fetch(prefix)
    //   .then((resp)=>resp.json())
    //   .then((data)=>console.log(data))
    //   .catch(err => console.log(err))
  return (
    <div className='totalContainer'>
        <h1>Test</h1>
        <div className="innerContainer whiteContainer">
            {/* <form onSubmit={handleSubmit} className='flex flex-col'>
            <input type='email' name='email' placeholder='이메일' className='mt-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
            <input type='password' name='pwd' placeholder='비밀번호' className='mt-3 mb-7 w-[300px] h-[42px]  p-3 border-b border-slate-200' />
            <button type='submit' className='bg-yellow-300'>Login</button>
            </form> */}
        </div>
        <div>
          <button onClick={handleRedirect} className="h-20 w-20 bg-blue-400"/>
          <button onClick={()=>handleNavigate('/board/6')} className="h-20 w-20 bg-blue-800"/>
          </div>
    </div>
  )
}
