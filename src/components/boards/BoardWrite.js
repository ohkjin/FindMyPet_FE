import TailBoardForm from './UI/TailBoardForm'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../user/token/TokenAtom';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import TailReviewForm from './UI/TailReviewForm';
import LoginAlertPage from '../../UI/LoginAlertPage'
import { privateApi } from '../user/token/PrivateApi';

//-- 글쓰기 --//
// board/write/write_type 으로 write_type에서 받고 일반글과 후기로 나뉜다
// inputs 값을 각각의 TailForm(Board,Review)에서 받고 그것을 각각의 api로 보낸다
export default function BoardWrite() {
    const { write_type } = useParams();
    const userToken = useRecoilValue(userAuth);
    const navigate = useNavigate();
    const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
    const [errMessage,setErrMessage] = useState(<></>);
    
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
        privateApi({
            url:'/board',
            method:'post',
            data:inputs})
          .then((res)=>{
            navigate('/boards');
          })
          .catch((err)=>
            console.log(err)
          )

    }
    
    return (
        <div className='totalContainer'>
            <div className='innerContainer shadow-3xl m-10'>
                {errMessage}
                {userToken ?
                    write_type==='0'?
                    <TailBoardForm handleFormSubmit={handleSubmit}/>
                    :
                    <TailReviewForm handleFormSubmit={handleSubmit}/>
                    :
                    <LoginAlertPage/>
                }
            </div>
        </div>
    )
}
