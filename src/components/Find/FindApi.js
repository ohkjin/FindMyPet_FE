import axios from "axios"


const instance = axios.create({
    baseURL:'https://apis.data.go.kr/1543061/abandonmentPublicSrvc',
    timeout:2000,
}) 

instance.interceptors.request.use(
    (config) => {
        // Modify the request config if needed
        return config;
      },
   (err)=>{
        return Promise.reject(err);
   }
)
instance.interceptors.response.use(
    (res)=>{
    // console.log(res)
     return res;
    },
    (err)=>{
        return Promise.reject(err);
    }
)


export const findApi = async (prefix)=>{
    const res = await instance.get(prefix)
    if(res.data){
        return res.data.response.body.items.item
    }
    return [];
}

//--//-- findApi 응용 --//--//


// // apiEncoding
// const apikey = process.env.REACT_APP_API_KEY

// // 날짜
// const formatDate = (originalDate) => {
//     const formattedDate = originalDate.toLocaleDateString('ko-KR', {
//         day: '2-digit',
//         year: 'numeric',
//         month: '2-digit',
//       }).replace(/[^0-9]/g, ''); // Remove non-numeric characters    
//     return formattedDate;
// }
// const today = formatDate(new Date());
// const current = new Date();
// current.setMonth(today.getMonth()-1);
// current.setDate(1);
// const lastMonth = formatDate(current);

// //-- 보호소 정보 뽑아내기 --//
// //얻은 셀터 코드로 api를 호출하여(모든 품종 확인) 보호소 상세 정보 뽑아내기 
// //abandonmentPublic?serviceKey=&bgnde=20240124&endde=20240124&upkind=417000&care_reg_no=328350202100001&pageNo=1&numOfRows=10&_type=json
//  const findShelterDetailApi = (shelter) => {
//     const upkindArr = [417000,422400,429900];
//     let url = `/abandonmentPublic?serviceKey=${apikey}`
//     url =`${url}bgnde=${lastMonth}&endde=${today}&upkind=${upkindArr[0]}&care_reg_no=${shelter}`
//     url = url + '&pageNo=1&numOfRows=1&_type=json'
//     findApi(url)
//     .then((item) => {
//         console.log(item);
//     })
//     .catch(err => console.log(err))
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


