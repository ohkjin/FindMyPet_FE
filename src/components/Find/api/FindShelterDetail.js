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

  const [detail,setDetail] = useState({
    careNm:'',
    careAddr:'',
    careTel:'',
    chargeNm:'',
    officetel:'',
    orgNm:'',
  });
    const upkindArr = [417000,422400,429900];
    
    // useEffect는 undefined나 함수를 리턴해야하는데
    //async func는 promise를 리턴하기에 async func은 따로 안에서 만들어야한다
    useEffect(()=>{
      // console.log(url)
      async function getShelterDetail(url){
        try{
          const item = await findApi(url);
          if(item){
            return item[0];
          }
        }catch(err){
          console.log("공공데이터 api Error:",err)
        }
      }
  
      for(let i=0;i<3;i++){
        let url = `/abandonmentPublic?serviceKey=${apikey}`
        url =`${url}&bgnde=${lastMonth}&endde=${today}&upkind=${upkindArr[i]}&care_reg_no=${shelter}`
        url = url + '&pageNo=1&numOfRows=1&_type=json'
        const item0 = getShelterDetail(url)
        .then((item0)=>{
          // console.log("shelterDetail",item0)
          setDetail({
            careNm:item0.careNm,
            careAddr:item0.careAddr,
            careTel:item0.careTel,
            chargeNm:item0.chargeNm,
            officetel:item0.officetel,
            orgNm:item0.orgNm,
          })
        })
        .catch(err=>console.log(err))
        if(item0){
          break;
        }
      }
    },[])
   


  return (
    <div>
      <div>
        <div>{detail.careNm}</div>
        <div>{detail.orgNm}</div>
        <div>{detail.careAddr}</div>
        <div>{detail.careTel}</div>
        <div>{detail.officetel}</div>
        <div>{detail.chargeNm}</div>
      </div>
    </div>
  )
}
