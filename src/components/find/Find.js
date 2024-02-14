import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Find() {
    // const API_SERVER = 'http://10.125.121.183'
    // const prefix = `${API_SERVER}/user/login`
    const [petList,setPetList] = useState('');
    useEffect(()=>{
        const prefix = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?serviceKey=W4298Kl3xl0gOfyeKSAkiQQObfABjtbHzbcmfAuJAhKztl9AzOAGLFDS2xyrwq4xA%2B53iQM0jx8vzT28xfYdVg%3D%3D&numOfRows=3&pageNo=1&_type=json'
        const res = axios.get(prefix)
        .then(res=>console.log(res.data.response.body.items.item))
    
    },[])
    // const res = axios.get('')
  return (
    <div>Find
        <div>
            {/* {petList} */}
        </div>
    </div>
  )
}
