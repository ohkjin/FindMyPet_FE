import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userNickname } from '../../user/token/TokenAtom';

export default function TailComment({comment}) {
  const nickname = useRecoilValue(userNickname);
  const [isEditing,setIsEditing] = useState(false);
  const commentRef = useRef();
  const handleEdit = ()=>{
    if(isEditing===false){
      setIsEditing(true);
    }else{
      setIsEditing(false);
    }
    
  }
  const handleDelete = ()=>{
    
  }
  // console.log("user",userNick,"commenter",comment.writer)
  // console.log(userNickname===comment.writer)
  const icons =['🦮','🐕‍🦺','🐕','🐈','🐇','🦔','🐢','🐟','🐓','🦜','🐍','🐩']
  const randomIconIdx = Math.floor(Math.random()*icons.length);
  return (
    <div className='whiteContainer'>
      <div className='flex flex-row justify-between items-center'>
        <div className='Name font-bold'>{icons[randomIconIdx]} {comment.writer}</div>
        <div className='Date text-sm text-gray-300'>{comment.registered}</div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        {isEditing?
        <input type='text' ref={commentRef} defaultValue={comment.content}/>
        :
        <div className='Content'>{comment.content}</div>
        }
        {nickname===comment.writer&&
        <div className='Buttons flex flex-col md:flex-row  justify-between items-center'>
            <button onClick={handleEdit} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2 '>
              {isEditing?'수정':'변경'}
            </button>
            <button onClick={handleDelete} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2'>삭제</button>
          </div>
        }
        </div>
    </div>
  )
}
