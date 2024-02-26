import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
import TailAnimalButton from './UI/TailAnimalButton';
import TailSelect from './UI/TailSelect';
import TailFindCard from './UI/TailFindCard'
import axios from 'axios';
import TailRegionDropDown from './UI/TailRegionDropDown';
import Pagination from 'react-js-pagination';
import '../../UI/PaginationCSS.css'
import { findApi } from './api/FindApi';

export default function Find() {
  const apikey = process.env.REACT_APP_API_KEY
  // const API_SERVER = 'http://10.125.121.183'
  // const prefix = `${API_SERVER}/user/login`
  // https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=W4298Kl3xl0gOfyeKSAkiQQObfABjtbHzbcmfAuJAhKztl9AzOAGLFDS2xyrwq4xA%2B53iQM0jx8vzT28xfYdVg%3D%3D&bgnde=20231101&endde=20231230&upkind=422400&neuter_yn=U&pageNo=1&numOfRows=10&_type=json
  //유기날짜 시작과 검색 종료는 무조건 한달차이로
  const [petObjList, setPetObjList] = useState([]);
  const [petCardList, setPetCardList] = useState('');
  const [breedList, setBreedList] = useState('')
  // const [selected, setSelected] = useState({
  //   speciesCd:'',
  // });
 
  //-- 날짜 --//
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

  
  //-- 축종 고르기 --//
  const [species,setSpecies] = useState('');
  const onSelectSpecies = (sp) => {
    setSpecies(sp);
  }
  // useEffect(()=>{
  //   const apikey = process.env.REACT_APP_API_KEY;
  //   let url = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?'
  //   url += 'serviceKey=' + apikey
  //   url += `&bgnde=${lastMonth}&endde=${today}`
  //   url += `&upkind=${species}`
  //   url += '&state=notice&pageNo=1&numOfRows=100&_type=json'
  //   axios.get(url)
  //     .then(res => {
  //       if(res.data){
  //         // console.log(url)
  //         // console.log("data", res.data.response.body.items.item)
  //         let tmp = res.data.response.body.items.item;
  //         setPetObjList(tmp);
  //         setTotalPages(res.data.response.body.numOfRows)
  //         tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={`${dog.orgNm}`}/>)
  //         setPetCardList(tmp);
  //       }
  //       })
  // },[species])

  // useEffect(()=>{

  // },[page,breed])

  //-- 품종 고르기 --//
  const handleSelectBreed = (e) => {
    e.preventDefault();
    let breed = e.target.value;
    // console.log(breed)
    // let breed = breedRef.current.value;
    let tmp = petObjList.filter(a=>a.kindCd.replace(/^\[.*?\]\s/, '')===breed);
    tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={dog.orgNm}/>)
    setPetCardList(tmp);
  }
  //-- 보호소 고르기 --//
   const [codes,setCodes] = useState({
        sido:'',
        gungu:'',
        shelter:'',
    })
  const handleSelectShelter =(e)=>{
    e.preventDefault();
    // console.log("shelterNm",e.target,"id",e.target.value)
    setCodes({
      ...codes,
      shelter:e.target.value,
  })
  }
  useEffect(()=>{
    console.log("codes",codes)
    console.log("spec",species)
    // https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=W4298Kl3xl0gOfyeKSAkiQQObfABjtbHzbcmfAuJAhKztl9AzOAGLFDS2xyrwq4xA%2B53iQM0jx8vzT28xfYdVg%3D%3D&bgnde=20240130&endde=20240226&upkind=417000&upr_cd=6110000&org_cd=3220000&care_reg_no=311322200900001&state=notice&pageNo=1&numOfRows=100&_type=json
    let prefix = `/abandonmentPublic?serviceKey=${apikey}`
    prefix =`${prefix}&bgnde=${lastMonth}&endde=${today}&upkind=${species}`
    if(codes.sido!==''){
      prefix=prefix+`&upr_cd=${codes.sido}`
    }
    if(codes.gungu!==''){
      prefix=prefix+`&org_cd=${codes.gungu}`
    }
    if(codes.shelter!==''){
      prefix=prefix+`&care_reg_no=${codes.shelter}`
    }
    prefix = prefix + '&state=notice&pageNo=1&numOfRows=100&_type=json'
    findApi(prefix)
    .then(body => {
        // console.log(url)
        // console.log("data", res.data.response.body.items.item)
        let tmp = body.items.item
        setPetObjList(tmp);
        setTotalPages(body.numOfRows)
        tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={`${dog.orgNm}`}/>)
        setPetCardList(tmp);
    })
    .catch(err=>console.log(err))
    // findApi(`/sigungu?serviceKey=${apikey}&upr_cd=${e.target.value}&_type=json`)
    //             .then((item) => {
    //                 // console.log(item);
    //                 // 군구,보호소 초기화
    //                 if(!item){return}
    //                 gunguRef.current.value = '';
    //                 shelterRef.current.value = '';
    //                 setSigunguObjList(item);
    //             })
    //             .catch(err => console.log(err))
    // const apikey = process.env.REACT_APP_API_KEY;
    // let url = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?'
    // url += 'serviceKey=' + apikey
    // url += `&bgnde=20240120&endde=20240220`
    // url += `&upkind=${species}`
    // url += '&neuter_yn=U&pageNo=1&numOfRows=100&_type=json'
    // axios.get(url)
    //   .then(res => {
    //     if(res.data){
    //       // console.log(url)
    //       // console.log("data", res.data.response.body.items.item)
    //       let tmp = res.data.response.body.items.item;
    //       setPetObjList(tmp);
    //       setTotalPages(res.data.response.body.numOfRows)
    //       tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={`${dog.orgNm}`}/>)
    //       setPetCardList(tmp);
    //     }
    //     })
  },[species,codes])

  //-- 품종리스트 --//
  // ObjectList에서 다 뽑아내기
  useEffect(() => {
    if(!petObjList){
      return
    }
    //dog json이 있는 경우 각종 리스트
    //1. 견종리스트
    let breedtmp = petObjList.map(d=>d.kindCd.replace(/^\[.*?\]\s/, ''));
    // let breedtmp = dog.map(d=>d.kindCd.replace('[강아지] ', ''));
    breedtmp = new Set(breedtmp);
    breedtmp = [...breedtmp].sort();
    // console.log(breedtmp)
    setBreedList(breedtmp);
  }, [petObjList])

   
  //-- 페이징 --//
  //바뀐 카드데이터를 잘라서 내보냄
  const [page,setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 18;
  const startIndex = (page-1)*itemsPerPage;
  const [tags,setTags] = useState('');
  useEffect(()=>{
    if(!petCardList){
      return
    }
    const endIndex = Math.min(startIndex + itemsPerPage, totalPages);
    let tm = petCardList.slice(startIndex,endIndex);
    setTags(tm);
  },[petCardList,page])

  

  return (
    <div className='totalContainer'>
      <div className='innerContainer min-w-96 p-10 flex flex-col items-center'>
        <div className='Find_Select w-full mb-5 grid md:grid-cols-3 sm:grid-auto-flow justify-center items-center bg-yellow-50 rounded-lg px-2 py-2 space-y-3 md:space-y-0 shadow-md'>
          {/* <div className='Select_Kind m-3 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-auto-flow'> */}
          <div className='Select_Species flex justify-center'>
            <TailAnimalButton icon={'🐕'} text='강아지' handleButton={() => onSelectSpecies('417000')} selected={species==='417000'?true:false}/>
            <TailAnimalButton icon={'🐈'} text='고양이' handleButton={() => onSelectSpecies('422400')} selected={species==='422400'?true:false}/>
            <TailAnimalButton icon={'🐢'} text='기타' handleButton={() => onSelectSpecies('429900')} selected={species==='429900'?true:false}/>
          </div>
          <div className='Select_Breed flex justify-center items-center'>
            <TailSelect handleChange={handleSelectBreed} optItems={breedList} init={`-- ${species==='417000'?'견종':species==='422400'?'묘종':'품종'} 선택 --`}/>
          </div>
          <div className='Select_Region flex justify-center items-center'>
            <TailRegionDropDown handleSelectShelter={handleSelectShelter} codes={codes} setCodes={setCodes}/>
            </div>
          {/* </div> */}
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
          {tags}
        </div>
        <div className='Review_pagenum m-5 flex flex-row justify-center items-center'>
            <Pagination
                activePage={page}
                totalItemsCount={totalPages}
                itemsCountPerPage={itemsPerPage}
                pageRangeDisplayed={3}
                onChange={setPage}
              />
         
        </div>
      </div>
    </div>
  )
}
