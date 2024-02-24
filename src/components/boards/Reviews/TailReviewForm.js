import { useRef, useState } from 'react';
import sidoObjList from '../../../data/find/sido.json'
import TailSelectSigungu from '../../Find/UI/TailSelectSigungu';
import TailSelectShelter from '../../Find/UI/TailSelectShelter';
import { findApi } from '../../Find/FindApi';
import FindShelter from '../../Find/FindShelter';

export default function TailReviewForm({handleFormSubmit,handleCancel,detail}) {
 

const [inputs, setInputs] = useState({
    shelter: detail?detail.shelter:'',
    rating: detail?detail.rating:0,
    content: detail?detail.content:'',
})

//-- 보호소 선택 --//
const handleSelectShelter = (e) =>{
  e.preventDefault();
  // console.log("shelterCode",e.target.value)
  setInputs({
    ...inputs,
    shelter:e.target.value,
  });
}

// 평점

  const handleRating = (e,ratingInput) =>{
      e.preventDefault();
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
      <div className="whiteContainer space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
   
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <FindShelter handleSelectShelter={handleSelectShelter}/>
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
