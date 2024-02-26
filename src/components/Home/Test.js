// import { useState } from "react"
// import { useCookies } from "react-cookie"

// import axios from 'axios'
// import { setToken } from "../user/atom/TokenManager"

// import TailBoardForm from '../boards/UI/TailBoardForm'
import { useNavigate } from "react-router-dom";
import { getToken } from "../user/token/TokenManager";
import { useRecoilValue } from "recoil";
import { userNickname } from "../user/token/TokenAtom";
import TailReviewForm from "../boards/Reviews/TailReviewForm";
import { useEffect, useRef } from "react";
import FindShelterDetail from "../Find/api/FindShelterDetail";
import MyPage from "../user/MyPage/MyPage";
import MyPageEdit from "../user/MyPage/MyPageEdit";
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
    const originalDate = new Date("Sat Feb 24 2024 21:47:44 GMT+0900 (한국 표준시)");

    const formatDate = (original) => {
      const formattedDate = original.toLocaleDateString('ko-KR', {
          day: '2-digit',
          year: 'numeric',
          month: '2-digit',
        }).replace(/[^0-9]/g, ''); // Remove non-numeric characters    
      return formattedDate;
  }
    console.log(formatDate(originalDate)); // Output: "20240224"
    const fileRef = useRef();
    const handleChange = (e)=>{
      e.preventDefault();
      console.log(e.target.value)
      
    }
  
    const uploadFileBt = (e) =>{
      e.preventDefault();
      console.log(fileRef)
      console.log(e.target.value)
      fileRef.current.click()
    }
    // console.log(new Date())
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
          <div>
            {/* <FindShelterDetail shelter={344452202300001}/> */}
            {/* <TailReviewForm/> */}
            <form>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-300 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <input id="file" name="file" type="file" ref={fileRef} onChange={handleChange} className="w-100 h-100 bg-yellow-400 sr-only"/>
                      <button onClick={uploadFileBt}>Upload a file</button>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  </form>
          </div>
          <MyPage/>
          <MyPageEdit/>
    </div>
  )
}
