import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAuth, userNickname } from '../token/TokenAtom'
import { useNavigate } from 'react-router-dom';
import welcome from '../../../assets/images/welcome/tricatwelcome.jpg'
import { removeAllToken } from '../token/TokenManager';
import { privateApi } from '../token/PrivateApi';
export default function MyPage() {
  const [userDetail, setUserDetail] = useState('')
  const navigate = useNavigate()
  const setUserToken = useSetRecoilState(userAuth);
  const setUserNick = useSetRecoilState(userNickname);

  //-- 유저정보 --//
  useEffect(() => {
    privateApi({
      url: `/mypage`,
      method: 'get',
    })
      .then((content) => {
        // console.log(content)
        setUserDetail(content);
      })
      .catch((err) =>
        console.log(err)
      )
  }, [])

  useEffect(()=>{
    console.log(userDetail)
  },[userDetail])
  //-- 로그아웃 --//
  const handleLogout = () => {
    removeAllToken();
    setUserToken(null);
    setUserNick(null);
    navigate('/user/login')
  }
  //-- 회원탈퇴 --//
  const handleWithdraw = () => {
    privateApi({
      url: `/mypage`,
      method: 'delete',
    })
      .then((res) => {
        removeAllToken();
        setUserToken(null);
        setUserNick(null);
        navigate('/home')
      })
      .catch((err) =>
        console.log(err)
      )
  }

  return (
    <div className='totalContainer'>
      <div className='innerContainer flex flex-col justify-center items-center'>
        <div className='grid grid-cols-3'>
          <div className='whiteContainer max-w-72'>
            <img src={welcome} alt='welcome cat' className='w-full rounded-full border-4 border-yellow-300' />
            <div className='w-full my-4'>
              {userDetail.nickname && <div className='p-1 border-b-2 border-dashed border-yellow-300 rounded-lg font-bold flex justify-center'>{userDetail.nickname}님의 개인페이지</div>}
              {userDetail.userId && <div className='p-1 border-b-2 border-dashed border-yellow-300 rounded-lg font-bold flex justify-center'>{userDetail.userId}</div>}
            </div>
            <div className='w-full flex flex-col my-4 space-y-3'>
              <button onClick={() => navigate(`/user/mypage/edit?userId=${userDetail.userId}&nickname=${userDetail.nickname}`)} className=' h-[42px] rounded-xl text-sm font-bold bg-gray-700 border-2 border-yellow-300 text-yellow-400'>회원정보 수정</button>
              <button onClick={handleLogout} className=' h-[42px] rounded-xl text-sm bg-yellow-700 font-bold border-2 border-yellow-300 text-yellow-400'>로그아웃</button>
              <button onClick={handleWithdraw} className=' h-[42px] rounded-xl text-sm font-bold border-2 border-yellow-300 text-yellow-400'>회원탈퇴</button>
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
