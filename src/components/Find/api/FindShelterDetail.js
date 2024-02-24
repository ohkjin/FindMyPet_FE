import { useEffect, useState } from "react";
import { findApi } from "../FindApi";


export default function FindShelterDetail({shelter}) {
  // apiEncoding
const apikey = process.env.REACT_APP_API_KEY

// 날짜
const formatDate = (originalDate) => {
    const formattedDate = originalDate.toLocaleDateString('ko-KR', {
        day: '2-digit',
        year: 'numeric',
        month: '2-digit',
      }).replace(/[^0-9]/g, ''); // Remove non-numeric characters    
    return formattedDate;
}
const today = formatDate(new Date());
const current = new Date();
current.setMonth(current.getMonth()-1);
current.setDate(1);
const lastMonth = formatDate(current);

//-- 보호소 정보 뽑아내기 --//
//얻은 셀터 코드로 api를 호출하여(모든 품종 확인) 보호소 상세 정보 뽑아내기 
//abandonmentPublic?serviceKey=&bgnde=20240124&endde=20240124&upkind=417000&care_reg_no=328350202100001&pageNo=1&numOfRows=10&_type=json

  const [detail,setDetail] = useState('');
    const upkindArr = [417000,422400,429900];
    let url = `/abandonmentPublic?serviceKey=${apikey}`
    url =`${url}&bgnde=${lastMonth}&endde=${today}&upkind=${upkindArr[2]}&care_reg_no=${shelter}`
    url = url + '&pageNo=1&numOfRows=1&_type=json'
    useEffect(()=>{
      // console.log(url)
      findApi(url)
      .then((item) => {
          if(item){
            console.log('FindShelterDetail item',item[0]);
          }
          else{
            console.log('no data')
          }
      })
      .catch(err => console.log("FindShelterDetail",err))
    },[])
   


  return (
    <div>
      {detail}
    </div>
  )
}
