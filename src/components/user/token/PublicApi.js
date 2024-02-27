import axios from "axios"

const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;

export const publicApi = axios.create({
    baseURL:API_SERVER,
    timeout:20000,
}) 

//사용법
// import publicApi from './publicApi'
// publicApi({
//  url:'/login',
//  method:'get',
//  data:data
// })

publicApi.interceptors.request.use(
    (config) => {
        // Modify the request config if needed
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        return config;
      },
   (err)=>{
        // console.log(err);
        alert(err.message);
        return Promise.reject(err);
   }
)
publicApi.interceptors.response.use(
    (res)=>{
    if(!res.data){
            return res;
            }
     return res.data.content;
    },
    (err)=>{
        // console.log(err);
        alert(err.response.data.status.message)
        return Promise.reject(err);
    }
)


