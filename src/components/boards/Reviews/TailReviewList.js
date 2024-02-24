import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userAuth, userNickname } from '../../user/token/TokenAtom';
import { privateApi } from '../../user/token/PrivateApi';
import { useNavigate } from 'react-router-dom';
// From Review
export default function TailReviewList({review}) {
  const nickname = useRecoilValue(userNickname);
  const [isEditing,setIsEditing] = useState(false);
  const reviewRef = useRef();
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;
  const userToken = useRecoilValue(userAuth);
  const [errMessage,setErrMessage] = useState(<></>);
  const navigate = useNavigate();
  const handleEdit = (e)=>{
    e.preventDefault();
    if(isEditing===false){
      setIsEditing(true);
    }else{
      // console.log(review.reviewId)
      // console.log(reviewRef.current.value)
      privateApi({
        url:`/review/${review.reviewId}`,
        method:'put',
        data:{
          content:reviewRef.current.value
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
    privateApi({
      url:`/review/${review.reviewId}`,
      method:'delete',
    })
    .then((res)=>{
      navigate(0);
    })
    .catch((err)=>
      console.log(err)
    )
  }
  
  // console.log("user",userNick,"reviewer",review.writer)
  // console.log(userNickname===review.writer)
  const icons =['🦮','🐕‍🦺','🐕','🐈','🐇','🦔','🐢','🐟','🐓','🦜','🐍','🐩']
  const randomIconIdx = Math.floor(Math.random()*icons.length);

  return (
    <div className='whiteContainer'>
      <div className='flex flex-row justify-between items-center'>
        <div className='Name font-bold'>{icons[randomIconIdx]} {review.writer}</div>
        <div className='Date text-sm text-gray-300'>{review.registered}</div>
      </div>
      {errMessage}
      <div className='flex flex-row justify-between items-center'>
        {isEditing?
        <input type='text' ref={reviewRef} maxLength={45} defaultValue={review.content} className='w-3/4 rounded-md border-2 border-dashed border-gray-200'/>
        :
        <div className='Content'>{review.content}</div>
        }
        {nickname===review.writer&&
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
