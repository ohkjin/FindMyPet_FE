import axios from "axios"
import { useRecoilValue } from "recoil"
import { getToken } from "../token/TokenManager";

const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;
const userToken = getToken('accessToken');
let preventNullToken ='';
if(userToken){
    preventNullToken = userToken;
}

export const privateApi = axios.create({
    baseURL:API_SERVER+'/user',
    timeout:2000,
}) 

//사용법
// import privateApi from './privateApi'
// privateApi({
//  url:'/login',
//  method:'get',
//  data:data
// })

privateApi.interceptors.request.use(
    (config) => {
        // Modify the request config if needed
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] =  'Bearer ' + preventNullToken;
        return config;
      },
   (err)=>{
        console.log(err);
        return Promise.reject(err);
   }
)
privateApi.interceptors.response.use(
    (res)=>{
    if(!res.data){
            alert('데이터가 없습니다');
            return;
            }
     return res.data.content;
    },
    (err)=>{
        console.log(err);
        alert(err.response.data.status.message)
        return Promise.reject(err);
    }
)


// export const privateApi = async (prefix)=>{
//     const res = await instance.get(prefix)
//     if(res.data){
//         return res.data.response.body.items.item
//     }
//     return [];
// }

// const onSelectSpecies = (code) => {
//     setSpecies(code);
//     const apikey = process.env.REACT_APP_API_KEY;
//     let url = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?'
//     url += 'serviceKey=' + apikey
//     url += `&bgnde=20240120&endde=20240220`
//     url += `&upkind=${code}&neuter_yn=U&pageNo=1&numOfRows=100&_type=json`
//     axios.get(url)
//       .then(res => {
//         if(res.data){
//           // console.log("data", res.data.response.body.items.item)
//           let tmp = res.data.response.body.items.item;
//           setPetObjList(tmp);
//           tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={`${dog.orgNm}`}/>)
//           setPetCardList(tmp);
//         }
//         })
//   }


