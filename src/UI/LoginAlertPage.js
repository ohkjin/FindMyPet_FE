import React from 'react'
import TailYellowButton from './TailYellowButton'
import { useNavigate } from 'react-router-dom';

export default function LoginAlertPage() {
    const navigate = useNavigate();
    const handleNavigate = (whereTo) =>{
        navigate(whereTo);
    }
    return (
        <div className='Alert h-screen w-full flex flex-col items-center'>
            <div className='AlertSpace basis-1/5'></div>
            <div className='AlertBox basis-2/5 bg-yellow-50 border-4 border-yellow-300  rounded-3xl flex flex-col items-center'>
                <div className='AlertText font-tenada font-bold text-xl mt-24 mx-3'>로그인이 필요한 서비스입니다! 🐾</div>
                <div className='AlertButton grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-10'>
                    <TailYellowButton handleClick={() => handleNavigate(-1)} leftT={'👈'} rightT={'뒤로 가버리기'} />
                    <TailYellowButton handleClick={() => handleNavigate('/user/login')} leftT={'로그인 하러가기'} rightT={'👉'} />
                </div>
            </div>
        </div>
    )
}
