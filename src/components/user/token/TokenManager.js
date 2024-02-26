import { Cookies } from "react-cookie";

const cookies = new Cookies()

const expDt = new Date();
expDt.setDate(Date.now()+1000*60*60*24);

// const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
// let httpTF = true
// if(API_SERVER==='http://10.125.121.183:8080'){
//   httpTF = false
// }

// 시간 지정을 안할시 창을 닫으면 사라진다
export const setAccessToken=(access)=>{
    cookies.set("accessToken",access,{path:'/',expDt,httpOnly:false})
}
export const setUserCookie=(nickname)=>{
    cookies.set("nickname",nickname,{path:'/',expDt,httpOnly:false})
}

export const removeAllToken=()=>{
    cookies.remove("accessToken",{path:'/'});
    cookies.remove("nickname",{path:'/'});
}

// 타입을 확실시 하기 위해서 String으로
// number 를 돌려준다 => null이 아닌 ''값이 됨
export const getToken=(tokenName)=>{
    const tokenValue = cookies.get(tokenName);
    const stringValue = typeof tokenValue === 'string' ? tokenValue : String(tokenValue);
    return tokenValue?stringValue:null;
}

export const getAllToken=()=>{
    return cookies.getAll()
}
