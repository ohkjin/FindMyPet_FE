import { getToken } from "../atom/TokenManager"
import axios from "axios"

const API_SERVER = process.env.REACT_APP_API_SERVER_HOST

//-- Token이 필요한 api요청을 보내는 instance --//
export const privateApi = axios.create({
    baseURL:API_SERVER,
    headers:{
        Authorization: `Bearer ${getToken('accessToken')}`,
    },
})

//-- refreshToken api --//
export  const  postTokenRefresh = async ()=>{
    const res = await privateApi.post('user/refresh',{
        refreshToken: getToken('refreshToken'),
    });
    return res;
}

privateApi.interceptors.request.use(
(config)=>{
    const token = getToken('accessToken');
    //토큰없을시 로그인으로
    if(!token){
        // Replace the current URL with a new one
        window.location.replace('/user/login');
        return config;
    }
    config.headers["Content-Type"]='application/json';
    config.headers["Authorization"]= 'Bearer '+token;
    return config;
},
(err)=>{
    console.log(err);
    //에러코드 전달
    return Promise.reject(err);
})

privateApi.interceptors.response.use(
(res)=>{
    return res;
},
//async used for the wait for the refreshToken
async (err)=>{
    if(err.response&&err.response.status===500){
        const errCode = err.response.data.errorCode;
        if(errCode===7001){
            await postTokenRefresh(privateApi);
            const accessToken = getToken('accessToken');
            err.config.headers.Authorization=`Bearer ${accessToken}`;
            return privateApi(err.config);
        }
    }
}
)