
import { PhotoIcon } from '@heroicons/react/24/solid'
import TailAnimalButton from '../../Find/UI/TailAnimalButton'
import { useState } from 'react';

export default function TailBoardForm({handleFormSubmit,handleCancel,detail}) {
  const handleSelCate = (e,seletedCate) =>{
    e.preventDefault();
    setInputs({
      ...inputs,
      category:seletedCate,
    });
  }
  const cate = {
    'COMMUNITY':0,
    'QA':1,
  }
  const [inputs, setInputs] = useState({
    category: detail?cate[detail.category]:0,
    title: detail?detail.title:'',
    content: detail?detail.content:'',
})
const handleChange = (e) => {
  e.preventDefault();
  setInputs({
      ...inputs,
      [e.target.name]:e.target.value,
  })
}

  return (
    <div className='whiteContainer px-10 lg:px-32'>
    <form onSubmit={(event)=>handleFormSubmit(event,inputs)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
   
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="Category sm:col-span-4">
              <div className="block font-tenada text-sm font-medium leading-6 text-gray-900">
                카테고리
              </div>
              <div className=" mt-2 flex flex-row">
                <TailAnimalButton icon={''} text={'커뮤니티 글'} handleButton={(e)=>handleSelCate(e,0)} selected={inputs.category===0?true:false}/>
                <TailAnimalButton icon={''} text={'Q&A'} handleButton={(e)=>handleSelCate(e,1)} selected={inputs.category===1?true:false}/>
              </div>
            </div> 
            <div className="Title sm:col-span-4">
              <label htmlFor="username" className="block font-tenada text-sm font-medium leading-6 text-gray-900">
                제목
              </label>
              <div className="mt-2">
                <div className="px-3 flex rounded-md shadow-sm ring-1 ring-inset ring-yellow-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-300 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="제목을 입력해주세요"
                    maxLength={45}
                    onChange={handleChange}
                    defaultValue={inputs.title}
                  />
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
                  onChange={handleChange}
                  defaultValue={inputs.content}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-tenada leading-6 text-gray-900">
                사진 업로드
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-yellow-900/25 bg-yellow-100 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-300 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
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
    </div>
  )
}
