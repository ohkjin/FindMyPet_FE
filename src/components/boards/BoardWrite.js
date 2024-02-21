import TailBoardForm from './UI/TailBoardForm'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../user/token/TokenAtom';
import TailYellowButton from '../../UI/TailYellowButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import TailReviewForm from './UI/TailReviewForm';

//-- 글쓰기 --//
// board/write/write_type 으로 write_type에서 받고 일반글과 후기로 나뉜다
// inputs 값을 각각의 TailForm(Board,Review)에서 받고 그것을 각각의 api로 보낸다
export default function BoardWrite() {
    const { write_type } = useParams();
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
        let prefix = ''
        if(write_type==='0'){
            if(inputs.title===''||inputs.content===''){
                setErrMessage('제목과 내용을 전부 입력해주세요')
                return
            }
            prefix = '/user/board';
        }else if(write_type==='1'){
            if(inputs.shelter===''||inputs.rating===0||inputs.content===''){
                setErrMessage('보호소를 선택하고 내용을 입력해주세요')
                return
            }
            prefix = '/user/review';
        }else{
            return
        }
       
        setErrMessage('');
    
        axios.post(`${API_SERVER}${prefix}`, 
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
                    write_type==='0'?
                    <TailBoardForm handleFormSubmit={handleSubmit}/>
                    :
                    <TailReviewForm handleFormSubmit={handleSubmit}/>
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
