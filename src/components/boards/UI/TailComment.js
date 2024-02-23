import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userAuth, userNickname } from '../../user/token/TokenAtom';
import axios from 'axios';

export default function TailComment({comment}) {
  const nickname = useRecoilValue(userNickname);
  const [isEditing,setIsEditing] = useState(false);
  const commentRef = useRef();
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;
  const userToken = useRecoilValue(userAuth);
  const [errMessage,setErrMessage] = useState(<></>);
  const handleEdit = ()=>{
    if(isEditing===false){
      setIsEditing(true);
    }else{
      // console.log(comment.commentId)
      // console.log(commentRef.current.value)
      axios.put(`${API_SERVER}/user/comment/${comment.commentId}`,
        {
          content:commentRef.current.value
        },
        {
          headers: {
           "Content-Type": `application/json`,
            Authorization: `Bearer ${userToken}`
          },
        })
        .then(res => {
          console.log(res)
          if (!res.headers) {
            setErrMessage(<div className='text-red-400'>No Header returned</div>)
            return
          }
          setIsEditing(false);
          window.location.reload();
        }).catch(err => {
          setErrMessage(<div className='text-red-400'>{err.response ? `(${err.response.status}) ${err.response.data}` : err.message}</div>)
        })
    }
    
  }
  const handleDelete = ()=>{
    axios.delete(`${API_SERVER}/user/comment/${comment.commentId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          },
        })
        .then(res => {
          console.log(res)
          if (!res.headers) {
            setErrMessage(<div className='text-red-400'>No Header returned</div>)
            return
          }
          window.location.reload();
        }).catch(err => {
          setErrMessage(<div className='text-red-400'>{err.response ? `(${err.response.status}) ${err.response.data}` : err.message}</div>)
        })
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
      {errMessage}
      <div className='flex flex-row justify-between items-center'>
        {isEditing?
        <input type='text' ref={commentRef} maxLength={45} defaultValue={comment.content} className='w-3/4 rounded-md border-2 border-dashed border-gray-200'/>
        :
        <div className='Content'>{comment.content}</div>
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
