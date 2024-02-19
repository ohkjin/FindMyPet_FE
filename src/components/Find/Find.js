import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import TailAnimalButton from './UI/TailAnimalButton';
import TailSelect from './UI/TailSelect';
import TailFindCard from './UI/TailFindCard'

import dog from '../../data/find/dog.json'

export default function Find() {
  // const API_SERVER = 'http://10.125.121.183'
  // const prefix = `${API_SERVER}/user/login`
  // https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=W4298Kl3xl0gOfyeKSAkiQQObfABjtbHzbcmfAuJAhKztl9AzOAGLFDS2xyrwq4xA%2B53iQM0jx8vzT28xfYdVg%3D%3D&bgnde=20231101&endde=20231230&upkind=422400&neuter_yn=U&pageNo=1&numOfRows=10&_type=json
  //유기날짜 시작과 검색 종료는 무조건 한달차이로
  const [petObjList, setPetObjList] = useState('');
  // const [selected, setSelected] = useState({
  //   speciesCd:'',
  // });
  console.log(dog.slice(0,10))
  const [species,setSpecies] = useState('');

  useEffect(() => {
    // const apikey = process.env.REACT_APP_API_KEY;
    // let url = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?'
    // url += 'serviceKey=' + apikey
    // url += `&bgnde=20231101&endde=20231230`
    // url += `&upkind=417000&neuter_yn=U&pageNo=1&numOfRows=10&_type=json`
    // axios.get(url)
    //   .then(res => res)
    //   .then(data => {
    //     console.log(data.response.body.items.item)
    //     setPetObjList(data.response.body.items.item)
    //   })
    // console.log(res.data)
    let slicedDog = dog.slice(0,10);
    let tmp = slicedDog.map((dog,idx)=><TailFindCard k={`${dog.desertionNo}dog${idx}`} theme='white' imgSrc={dog.filename} title={dog.kindCd} subtitle={`${dog.age} ${dog.sexCd} ${dog.neuterYn}`} by={dog.orgNm}/>)
    setPetObjList(tmp)
  }, [])
  useEffect(() => {
    console.log(petObjList)
  }, [petObjList])

  const onSelectSpecies = (code) => {
    // e.preventDefault();
    // setSelected({
    //   ...selected,
    //   speciesCd:cd,
    // })
    setSpecies(code)
  }
  const handleSelectBreed = (e) => {

  }

  return (
    <div className='Find flex justify-center items-center w-full'>
      <div className='Find_Contents w-4/5 min-w-96 p-10 flex flex-col items-center'>
        <div className='Find_Select w-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-auto-flow justify-center items-center bg-yellow-50 rounded-lg px-2 py-2'>
          <div className='Select_Kind m-3 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-auto-flow'>
          <div className='Select_Species flex justify-center'>
            <TailAnimalButton icon={'🐕'} text='강아지' handleButton={() => onSelectSpecies('417000')} selected={species==='417000'?true:false}/>
            <TailAnimalButton icon={'🐈'} text='고양이' handleButton={() => onSelectSpecies('422400')} selected={species==='422400'?true:false}/>
            <TailAnimalButton icon={'🐢'} text='기타' handleButton={() => onSelectSpecies('429900')} selected={species==='429900'?true:false}/>
          </div>
          <div className='Select_Breed flex justify-center items-center'>
            <TailSelect handleChange={handleSelectBreed}/>
          </div>
          </div>
        </div>
        <div>
          {petObjList}
        </div>
      </div>
    </div>
  )
}
