import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
import TailAnimalButton from './UI/TailAnimalButton';
import TailSelect from './UI/TailSelect';
import TailFindCard from './UI/TailFindCard'

import dog from '../../data/find/dog.json'
import axios from 'axios';

export default function Find() {
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
  console.log(dog.slice(0,10))
  const [species,setSpecies] = useState('');

  useEffect(() => {
    //dog json이 있는 경우 각종 리스트
    //1. 견종리스트
    // let breedtmp = dog.map(d=>d.kindCd.replace(/^\[.*?\]\s/, ''));
    // let breedtmp = dog.map(d=>d.kindCd.replace('[강아지] ', ''));
    // breedtmp = new Set(breedtmp);
    // breedtmp = [...breedtmp].sort();
    // // console.log(breedtmp)
    // setBreedList(breedtmp);

    // let slicedDog = dog.slice(0,10);
    // let tmp = slicedDog.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.filename} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={`${dog.orgNm}`}/>)
    // setPetCardList(tmp)
  }, [])
 

  const onSelectSpecies = (code) => {
    setSpecies(code);
    const apikey = process.env.REACT_APP_API_KEY;
    let url = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?'
    url += 'serviceKey=' + apikey
    url += `&bgnde=20240120&endde=20240220`
    url += `&upkind=${code}&neuter_yn=U&pageNo=1&numOfRows=100&_type=json`
    axios.get(url)
      .then(res => {
        if(res.data){
          // console.log("data", res.data.response.body.items.item)
          let tmp = res.data.response.body.items.item;
          setPetObjList(tmp);
          tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={`${dog.orgNm}`}/>)
          setPetCardList(tmp);
        }
        })
  }
  useEffect(() => {
    //dog json이 있는 경우 각종 리스트
    //1. 견종리스트
    let breedtmp = petObjList.map(d=>d.kindCd.replace(/^\[.*?\]\s/, ''));
    // let breedtmp = dog.map(d=>d.kindCd.replace('[강아지] ', ''));
    breedtmp = new Set(breedtmp);
    breedtmp = [...breedtmp].sort();
    // console.log(breedtmp)
    setBreedList(breedtmp);
  }, [petCardList])

  const handleSelectBreed = (e) => {
    e.preventDefault();
    let breed = e.target.value;
    // console.log(breed)
    // let breed = breedRef.current.value;
    let tmp = petObjList.filter(a=>a.kindCd.replace(/^\[.*?\]\s/, '')===breed);
    tmp = tmp.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.popfile.replace("http","https")} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={dog.orgNm}/>)
    setPetCardList(tmp);
  }

  return (
    <div className='totalContainer'>
      <div className='innerContainer min-w-96 p-10 flex flex-col items-center'>
        <div className='Find_Select w-full mb-5 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-auto-flow justify-center items-center bg-yellow-50 rounded-lg px-2 py-2 shadow-md'>
          <div className='Select_Kind m-3 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-auto-flow'>
          <div className='Select_Species flex justify-center'>
            <TailAnimalButton icon={'🐕'} text='강아지' handleButton={() => onSelectSpecies('417000')} selected={species==='417000'?true:false}/>
            <TailAnimalButton icon={'🐈'} text='고양이' handleButton={() => onSelectSpecies('422400')} selected={species==='422400'?true:false}/>
            <TailAnimalButton icon={'🐢'} text='기타' handleButton={() => onSelectSpecies('429900')} selected={species==='429900'?true:false}/>
          </div>
          <div className='Select_Breed flex justify-center items-center'>
            <TailSelect handleChange={handleSelectBreed} optItems={breedList} init={`-- ${species==='417000'?'견종':species==='422400'?'묘종':'품종'} 선택 --`}/>
          </div>
          </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
          {petCardList}
        </div>
      </div>
    </div>
  )
}
