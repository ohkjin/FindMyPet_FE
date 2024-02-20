import TailBoardForm from './UI/TailBoardForm'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../user/token/TokenAtom';
import TailYellowButton from '../../UI/TailYellowButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function BoardWrite() {
    const userToken = useRecoilValue(userAuth);
    const navigate = useNavigate();
    const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
    const [errMessage,setErrMessage] = useState(<></>);
   
    const handleNavigate = (whereTo) =>{
        navigate(whereTo);
    }
    
    const handleSubmit = (e,inputs) => {
        console.log(inputs)
        console.log(userToken)
        e.preventDefault();
        if(inputs.title===''||inputs.content===''){
            setErrMessage('제목과 내용을 전부 입력해주세요')
            return
        }
        setErrMessage('');
        axios.post(`${API_SERVER}/user/board`, 
            inputs, 
            {
            headers: {
              Authorization: `Bearer ${userToken}`
            },
          })
            .then(res => {
              console.log(res)
              if(!res.headers){
                setErrMessage(<div className='text-red-400'>No Header returned</div>)
                return
              }
              navigate('/boards');
            }).catch(err => {
              setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.status}) ${err.response.data}`:err.message}</div>)
            })
    }
    
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-4/5 flex justify-center items-center'>
                {errMessage}
                {userToken ?
                    <TailBoardForm handleFormSubmit={handleSubmit}/>
                    :
                    <div className='Alert h-screen w-full flex flex-col items-center'>
                        <div className='AlertSpace basis-1/5'></div>
                        <div className='AlertBox basis-2/5 bg-yellow-50 border-4 border-yellow-300  rounded-3xl flex flex-col items-center'>
                            <div className='AlertText font-tenada font-bold text-xl mt-24 mx-3'>로그인이 필요한 서비스입니다! 🐾</div>
                            <div className='AlertButton grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-10'>
                                <TailYellowButton handleClick={()=>handleNavigate(-1)} leftT={'👈'}  rightT={'뒤로 가버리기'} />
                                <TailYellowButton handleClick={()=>handleNavigate('/user/login')} leftT={'로그인 하러가기'} rightT={'👉'} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
