
import { PhotoIcon } from '@heroicons/react/24/solid'
import TailAnimalButton from '../../Find/UI/TailAnimalButton'
import { useEffect, useRef, useState } from 'react';
import sidoObjList from '../../../data/find/sido.json'
import axios from 'axios';
import TailSelectSigungu from './TailSelectSigungu';
import TailSelectShelter from './TailSelectShelter';
import TailRating from '../../../UI/notUsed/TailRating';

export default function TailReviewForm({handleFormSubmit,handleCancel,detail}) {
 

const [inputs, setInputs] = useState({
    shelter: detail?detail.shelter:'',
    rating: detail?detail.rating:0,
    content: detail?detail.content:'',
})

//-- 보호소 선택 --//
const baseurl = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc'
const sidoRef = useRef();
const [sigunguObjList, setSigunguObjList] = useState([]);
const gunguRef = useRef();
const [shelterObjList, setShelterObjList] = useState([]);
// 시도 선택시 value에 넣은 시도코드가 돌아온다
const handleSelectSido = (e)=>{
  e.preventDefault();
  // console.log(e.target.value)
  if(e.target.value!==''){
    const apikey= process.env.REACT_APP_API_KEY
    const url = `${baseurl}/sigungu?serviceKey=${apikey}&upr_cd=${e.target.value}&_type=json`
    axios.get(url)
    .then(res=>{
      if(res.data){
        // console.log(res.data.response.body.items.item)
        setSigunguObjList(res.data.response.body.items.item)
        // console.log(Object.keys(sidoObjList[0]))
      }
      })
    .catch(err=>console.log(err))
  }
}
const handleSelectSigungu = (e)=>{
  e.preventDefault();
  console.log(e.target.value)
  if(e.target.value!==''){
    const apikey= process.env.REACT_APP_API_KEY
    const url =`${baseurl}/shelter?serviceKey=${apikey}&upr_cd=${sidoRef.current.value}&org_cd=${e.target.value}&_type=json`
    axios.get(url)
    .then(res=>{
      if(res.data){
        console.log(res.data.response.body.items.item)
        setShelterObjList(res.data.response.body.items.item)
      }
      })
    .catch(err=>console.log(err))
  }
}
// 보호소
const handleSelectShelter = (e) =>{
  e.preventDefault();
  setInputs({
    ...inputs,
    shelter:e.target.value,
  });
}

// 평점
  const [rating, setRating] = useState(0);
  const handleRating = (e,ratingInput) =>{
      e.preventDefault();
      setRating(ratingInput);
      setInputs({
        ...inputs,
        rating:ratingInput,
      });
      // console.log(inputs)
  }

//내용
  const handleContentChange = (e) => {
    e.preventDefault();
    setInputs({
        ...inputs,
        content:e.target.value,
    })
  }

  return (
    <form onSubmit={(event)=>handleFormSubmit(event,inputs)}>
      <div className="mt-20 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
   
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="Category sm:col-span-4">
              <>
              <div className="mt-4 block font-tenada text-sm font-medium leading-6 text-gray-900">
              보호소 선택
              </div>
              <div className=" mt-2 flex flex-col">
              <TailSelectSigungu handleChange={handleSelectSido} selRef={sidoRef} optionWithValue={sidoObjList} init={`-- 시도 선택 --`}/>
              {sidoRef!==''&&<TailSelectSigungu handleChange={handleSelectSigungu} selRef={gunguRef} optionWithValue={sigunguObjList} init={`-- 시군구 선택 --`}/>}
              {gunguRef!==''&&<TailSelectShelter handleChange={handleSelectShelter} optionWithValue={shelterObjList} init={`-- 보호소 선택 --`}/>}
            </div>
            </>
            </div>
            
            <div className="Title sm:col-span-4">
              <label htmlFor="username" className="block font-tenada text-sm font-medium leading-6 text-gray-900">
                평점
              </label>
              <div className="mt-2">
              <div className="flex flex-row">
                <button onClick={(e)=>handleRating(e,1)}>{inputs.rating>=1?'😺':'⚪'}</button>
                <button onClick={(e)=>handleRating(e,2)}>{inputs.rating>=2?'😺':'⚪'}</button>
                <button onClick={(e)=>handleRating(e,3)}>{inputs.rating>=3?'😺':'⚪'}</button>
                <button onClick={(e)=>handleRating(e,4)}>{inputs.rating>=4?'😺':'⚪'}</button>
                <button onClick={(e)=>handleRating(e,5)}>{inputs.rating>=5?'😺':'⚪'}</button>
              </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block font-tenada text-sm font-medium leading-6 text-gray-900">
                내용
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                  placeholder='내용을 입력해주세요'
                  maxLength={256}
                  onChange={handleContentChange}
                  defaultValue={inputs.content}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-tenada leading-7 text-gray-900">체크 사항</h2>
          <div className="mt-2 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-yellow-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-bold text-gray-900">
                      가ㅓㅣㅎ머ㅣㄴ어ㅏㅣ
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-bold text-gray-900">
                      댓글 허용
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
          type="button"
          onClick={handleCancel}
          className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          취소
        </button>
        <button
          type="submit"
          className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          제출
        </button>
      </div>
    </form>
  )
}
