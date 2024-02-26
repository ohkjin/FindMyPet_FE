import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userNickname } from '../../user/token/TokenAtom';
import { privateApi } from '../../user/token/PrivateApi';
import { useNavigate } from 'react-router-dom';
import TailWriter from '../../../UI/TailWriter';

export default function TailComment({comment}) {
  const nickname = useRecoilValue(userNickname);
  const [isEditing,setIsEditing] = useState(false);
  const commentRef = useRef();
  const navigate = useNavigate();
  console.log("nick",typeof nickname,`c${nickname}c`)
  console.log("comment nick",typeof comment.writer,`c${comment.writer}c`)
  console.log(comment.writer==nickname)
  const handleEdit = (e)=>{
    e.preventDefault();
    if(isEditing===false){
      setIsEditing(true);
    }else{
      // console.log(comment.commentId)
      // console.log(commentRef.current.value)
      privateApi({
        url:`/comment/${comment.commentId}`,
        method:'put',
        data:{
          content:commentRef.current.value
        }
      })
      .then((res)=>{
        setIsEditing(false);
        navigate(0);
      })
      .catch((err)=>
        console.log(err)
      )
    }
    
  }
  const handleDelete = (e)=>{
    e.preventDefault();
    window.confirm('삭제하시겠습니까?');
    privateApi({
      url:`/comment/${comment.commentId}`,
      method:'delete',
    })
    .then((res)=>{
      navigate(0);
    })
    .catch((err)=>
      console.log(err)
    )
  }
  
  // console.log("user",userNick,"commenter",comment.writer)
  // console.log(userNickname===comment.writer)
  // const randomIconIdx = Math.floor(Math.random()*icons.length);

  return (
    <div className='whiteContainer'>
      <div className='flex flex-row justify-between items-center'>
        {/* <div className='Name font-bold'>{icons[comment.commentId%icons.length]} {comment.writer}</div> */}
        <TailWriter writer={comment.writer}/>
        <div className='Date text-sm text-gray-300'>{comment.registered}</div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        {isEditing?
        <input type='text' ref={commentRef} maxLength={45} defaultValue={comment.content} className='w-3/4 rounded-md border-2 border-dashed border-gray-200'/>
        :
        <div className='Content m-3'>{comment.content}</div>
        }
        {nickname===comment.writer&&
        <div className='Buttons flex flex-col md:flex-row  justify-between items-center'>
            <button onClick={handleEdit} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2 '>
              {isEditing?'변경':'수정'}
            </button>
            <button onClick={handleDelete} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2'>삭제</button>
          </div>
        }
        </div>
    </div>
  )
}
