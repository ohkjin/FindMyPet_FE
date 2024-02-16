import { Cookies } from "react-cookie";

const cookies = new Cookies()

const expDt = new Date();
expDt.setDate(Date.now()+1000*60*60*24*7);

// const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
// let httpTF = true
// if(API_SERVER==='http://10.125.121.183:8080'){
//   httpTF = false
// }

export const setAccessToken=(access)=>{
    cookies.set("accessToken",access,{path:'/',expDt,httpOnly:false})
}

export const removeAllToken=()=>{
    cookies.remove("accessToken",{path:'/'})
}

export const getToken=(tokenName)=>{
    return cookies.get(tokenName)
}

export const getAllToken=()=>{
    return cookies.getAll()
}
