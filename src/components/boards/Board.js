import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAuth } from '../user/token/TokenAtom';
import axios from 'axios';
import TailBoardDetail from './UI/TailBoardDetail';
import TailBoardForm from './UI/TailBoardForm';

export default function Board() {
  const { board_id } = useParams();
  const userToken = useRecoilValue(userAuth);
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
  const [edit,setEdit] = useState(false);
  // const apiLink = `${API_SERVER}/user/board/${board_id}`
  const apiLink = `${API_SERVER}/user/board/6`
  const [errMessage,setErrMessage] = useState(<></>);
  const [boardDetail, setBoardDetail] = useState({
    category: 0,
    title: 'none',
    content: 'none',
    registered: '',
    view: 0,
    writer: 'none',
    commentList: [],//List안에 유저와 내용이 담겨야함
})

  useEffect(()=>{
    axios.get(apiLink, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
    })
      .then(res => {
        console.log(res)
        if(!res.data){
          setErrMessage(<div className='text-red-400'>데이터가 없습니다</div>)
          return
        }
        setBoardDetail(res.data)
      }).catch(err => {
        setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.status}) ${err.response.data}`:err.message}</div>)
      })
  },[])


  const handleGoEdit=()=>{
    setEdit(true);
  }

  const handleSubmitEdit = (e,inputs) => {
    console.log(inputs)
    console.log(userToken)
    e.preventDefault();
    if(inputs.title===''||inputs.content===''){
        setErrMessage('제목과 내용을 전부 입력해주세요')
        return
    }
    setErrMessage('');
    axios.put(apiLink, 
        inputs, 
        {
        headers: {
          Authorization: `Bearer ${userToken}`
        },
      })
        .then(res => {
          console.log(res)
          if(!res.headers){
            setErrMessage(<div className='text-red-400'>No Header returned</div>);
            return;
          }
          setEdit(false);
        }).catch(err => {
          setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.status}) ${err.response.data}`:err.message}</div>)
        })
  }
  return (
    <div className='Board flex justify-center items-center w-full'>
      <div className='Board_container w-4/5 min-w-96 p-10 flex flex-col items-center'>
        {errMessage}
        {edit?<TailBoardForm detail={boardDetail} handleFormSubmit={handleSubmitEdit}/>
        :<TailBoardDetail detail={boardDetail} handleEdit={handleGoEdit}/>}
      </div>
    </div>
  )
}
