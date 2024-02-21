import React from 'react'

export default function TailComment({comment}) {
  const handleEdit = ()=>{
    
  }
  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <div className='Name'>{comment.writer}</div>
        <div className='Date'>{comment.registered}</div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <div className='Content'>{comment.content}</div>
        <div className='Buttons flex flex-col md:flex-row  justify-between items-center'>
            <button onClick={handleEdit} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2 '>수정</button>
            <button onClick={handleEdit} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2'>삭제</button>
          </div>
        </div>
    </div>
  )
}
