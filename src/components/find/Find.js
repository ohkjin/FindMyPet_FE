import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Find() {
    // const API_SERVER = 'http://10.125.121.183'
    // const prefix = `${API_SERVER}/user/login`
    // https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=W4298Kl3xl0gOfyeKSAkiQQObfABjtbHzbcmfAuJAhKztl9AzOAGLFDS2xyrwq4xA%2B53iQM0jx8vzT28xfYdVg%3D%3D&bgnde=20231101&endde=20231230&upkind=422400&neuter_yn=U&pageNo=1&numOfRows=10&_type=json
    const [petObjList,setPetObjList] = useState('');
    
    
    
    useEffect(()=>{
      const apikey = process.env.REACT_APP_API_KEY;
      let url = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?'
    url+='serviceKey='+apikey
    url+=`&bgnde=20231101&endde=20231230`
    url+=`&upkind=422400&neuter_yn=U&pageNo=1&numOfRows=10&_type=json`
      axios.get(url)
      .then(res=>res.data)
      .then(data=>{
        // console.log(data.response.body.items.item)
        setPetObjList(data.response.body.items.item)
        })
      // console.log(res.data)
      // setPetObjList
    },[])
    useEffect(()=>{
      console.log(petObjList)
    },[petObjList])
    
  return (
    <div>Find
        <div>
            {/* {petList} */}
        </div>
    </div>
  )
}
