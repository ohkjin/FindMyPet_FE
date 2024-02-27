import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import welcome from '../../../assets/images/welcome/tricatwelcome.jpg'

export default function UserPage() {
  const [userDetail, setUserDetail] = useState('')
  const navigate = useNavigate()
  const { user_name } = useParams();


  return (
    <div className='totalContainer'>
      <div className='innerContainer flex flex-col justify-center items-center'>
        <div className='grid grid-cols-3'>
          <div className='whiteContainer max-w-72'>
            <img src={welcome} alt='welcome cat' className='w-full rounded-full border-4 border-yellow-300' />
            <div className='w-full my-4'>
              {user_name && <div className='p-1 border-b-2 border-dashed border-yellow-300 rounded-lg font-bold flex justify-center'>{user_name}님의 페이지</div>}
            </div>
          </div>
          <div className='col-start-2 col-span-2 grid grid-cols-2 lg:grid-cols-3'>
          <div className='whiteContainer flex flex-col justify-center items-center aspect-square'>
            <div className='text-2xl'>✍</div>
            <div className='font-bold text-3xl'>0</div>
            <div className='text-gray-300'>게시글</div>
            </div>
            <div className='whiteContainer flex flex-col justify-center items-center aspect-square'>
            <div className='text-2xl'>⭐</div>
            <div className='font-bold text-3xl'>0</div>
            <div className='text-gray-300'>리뷰</div>
            </div>
            <div className='whiteContainer flex flex-col justify-center items-center aspect-square'>
            <div className='text-2xl'>🔖</div>
            <div className='font-bold text-3xl'>0</div>
            <div className='text-gray-300'>댓글</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
