import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userNickname } from '../../user/token/TokenAtom';
import { privateApi } from '../../user/token/PrivateApi';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import TailWriter from '../../../UI/TailWriter';
// From Review

export default function TailReviewList({review}) {
  const nickname = useRecoilValue(userNickname);
  const [isEditing,setIsEditing] = useState(false);
  const { shelterPath } = useParams();
  const [errMessage,setErrMessage] = useState(<></>);
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    rating:parseInt(review.rating), // 하지 않을시 number type 
    content:review.content,
  })
  // 내용
  const handleChangeContent = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      content:e.target.value,
    })
  }
  // 평점
  const handleRating = (e,ratingInput) =>{
    e.preventDefault();
    setInputs({
      ...inputs,
      rating:parseInt(ratingInput),
    });
}
  const handleEdit = (e)=>{
    e.preventDefault();
    // console.log('inputs',typeof inputs.rating,inputs.rating,typeof inputs.content,inputs.content)
    if(isEditing===false){
      setIsEditing(true);
    }else{
      // console.log("reviewId",review.reviewId)
      // console.log(reviewRef.current.value)
      privateApi({
        url:`/review/${review.reviewId}`,
        method:'put',
        data:inputs
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

  return (
    <div className='whiteContainer'>
      <div className='flex flex-row justify-between items-center'>
      <div className='flex flex-row space-x-1 md:space-x-5'>
        <TailWriter writer={review.writer}/>
        {isEditing?
        <div className="flex flex-row border-2 border-dashed border-gray-200  rounded-md p-1 ">
        <button onClick={(e)=>handleRating(e,1)}>{inputs.rating>=1?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
        <button onClick={(e)=>handleRating(e,2)}>{inputs.rating>=2?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
        <button onClick={(e)=>handleRating(e,3)}>{inputs.rating>=3?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
        <button onClick={(e)=>handleRating(e,4)}>{inputs.rating>=4?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
        <button onClick={(e)=>handleRating(e,5)}>{inputs.rating>=5?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
        </div>
        :
        <div className="flex flex-row lg:border-2 border-yellow-200 rounded-3xl p-1 ">
                <div>{review.rating>=1?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</div>
                <div>{review.rating>=2?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</div>
                <div>{review.rating>=3?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</div>
                <div>{review.rating>=4?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</div>
                <div>{review.rating>=5?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</div>
        </div>
        } 
        </div>
        <div className='Date text-sm text-gray-300'>{review.registered}</div>
      </div>
      {errMessage}
      <div className='flex flex-row justify-between items-center'>
        {isEditing?
        <input type='text' onChange={handleChangeContent} maxLength={45} defaultValue={review.content} className='w-3/4 rounded-md border-2 border-dashed border-gray-200'/>
        :
        <div className='Content m-4'>{review.content}</div>
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
