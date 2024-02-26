import { useEffect, useState } from "react";
import { findApi } from "./FindApi";


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
      if(shelter==0){
        return
      }
      async function getShelterDetail(){
        for(let i=0;i<3;i++){
          let url = `/abandonmentPublic?serviceKey=${apikey}`
          url =`${url}&bgnde=${lastMonth}&endde=${today}&upkind=${upkindArr[i]}&care_reg_no=${shelter}`
          url = url + '&pageNo=1&numOfRows=1&_type=json'
        try{
          const item = await findApi(url);
          // console.log("shelterDetail",i,item)
          if(item){
            setDetail({
              careNm:item[0].careNm,
              careAddr:item[0].careAddr,
              careTel:item[0].careTel,
              orgNm:item[0].orgNm,
            });
            break;
          }else{
            setDetail({
              careNm:'보호중인 동물이 없습니다',
              careAddr:'',
              careTel:'',
              orgNm:'',
            });
          }
        }catch(err){
          console.log("공공데이터 api Error:",err);
        }
      }
    }
      getShelterDetail();
      // for(let i=0;i<3;i++){
      //   let url = `/abandonmentPublic?serviceKey=${apikey}`
      //   url =`${url}&bgnde=${lastMonth}&endde=${today}&upkind=${upkindArr[i]}&care_reg_no=${shelter}`
      //   url = url + '&pageNo=1&numOfRows=1&_type=json'
      //   const item0 = getShelterDetail(url)
      //   .then((item0)=>{
      //     console.log("shelterDetail",i,item0)
      //     if(item0){
      //     setDetail({
      //       careNm:item0.careNm,
      //       careAddr:item0.careAddr,
      //       careTel:item0.careTel,
      //       orgNm:item0.orgNm,
      //     })
      //   }
      //   })
      //   if(item0){
      //     break;
      //   }
      // }
    },[shelter])
   


  return (
    <div className="m-5">
      <div className="space-y-3">
        <div className='px-5 py-1 text-amber-950 font-bold border-[3px]  bg-yellow-100/50 border-yellow-400/50 rounded-full'>
          {detail.careNm}
          </div>
          <div className="px-5 text-sm text-gray-500">
          <table>
            <tbody>
        <tr>
          <td>관할기간: </td>
          <td>{detail.orgNm}</td>
        </tr>
        <tr className="">
          <td>보호 주소: </td>
          <td>{detail.careAddr}</td>
        </tr>
        <tr className="">
          <td>보호소 전화번호: </td>
          <td>{detail.careTel}</td>
        </tr>
        </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
