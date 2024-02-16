import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TailAnimalButton from './UI/TailAnimalButton';
export default function Find() {
  // const API_SERVER = 'http://10.125.121.183'
  // const prefix = `${API_SERVER}/user/login`
  // https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=W4298Kl3xl0gOfyeKSAkiQQObfABjtbHzbcmfAuJAhKztl9AzOAGLFDS2xyrwq4xA%2B53iQM0jx8vzT28xfYdVg%3D%3D&bgnde=20231101&endde=20231230&upkind=422400&neuter_yn=U&pageNo=1&numOfRows=10&_type=json
  //유기날짜 시작과 검색 종료는 무조건 한달차이로
  const [petObjList, setPetObjList] = useState('');
  const [selected, setSelected] = useState({
    species:'417000',
  });

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
    // setPetObjList
  }, [])
  useEffect(() => {
    console.log(petObjList)
  }, [petObjList])

  const onSelectSpecies = (e) => {
    e.preventDefault();
    setSelected({
      ...selected,
      species:e.target.value,
    })
    console.log(selected)
  }

  return (
    <div className='Find container flex justify-center items-center w-full'>
      <div className='Find_Contents w-4/5 min-w-96 p-10 flex flex-col items-center'>
        <div className='Find_Select w-full flex flex-row justify-center items-center'>
          <div className='Select_Species'>
            <TailAnimalButton icon={'🐕'} handleButton={onSelectSpecies} code={417000} />
            <TailAnimalButton icon={'🐈'} handleButton={onSelectSpecies} code={422400} />
            <TailAnimalButton icon={'🐢'} handleButton={onSelectSpecies} code={429900} />
          </div>
          <div className='Select_Breed '>
            
          </div>
        </div>
      </div>
    </div>
  )
}
