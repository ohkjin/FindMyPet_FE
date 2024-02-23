import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAuth } from '../user/token/TokenAtom';
import TailBoardDetail from './UI/TailBoardDetail';
import TailBoardForm from './UI/TailBoardForm';
import { privateApi } from '../user/token/PrivateApi';

export default function Board() {
  const { boardId } = useParams();
  const userToken = useRecoilValue(userAuth);
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
  const [edit,setEdit] = useState(false);
  const apiLink = `${API_SERVER}/user/board/${boardId}`
  const navigate = useNavigate();
  // const apiLink = `${API_SERVER}/user/board/6`
  const [errMessage,setErrMessage] = useState(<></>);
  const [boardDetail, setBoardDetail] = useState({
    boardId:1,
    category: 0,
    title: 'none',
    content: 'none',
    registered: '',
    view: 0,
    writer: 'none',
    commentList: [],//List안에 유저와 내용이 담겨야함
})

  useEffect(()=>{
    privateApi({
      url:`/board/${boardId}`,
      method:'get',})
    .then((content)=>{
      // console.log(content)
      setBoardDetail(content)
    })
    .catch((err)=>
      console.log(err)
    )
  },[])

  // 수정 폼 열기
  const handleGoEdit=()=>{
    setEdit(true);
  }
  // 수정 폼 닫기
  const handleCancelEdit=()=>{
    setEdit(false);
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

    privateApi({
      url:`/board/${boardId}`,
      method:'put',
      data:inputs})
    .then((res)=>{
      window.location.reload();
      setEdit(false);
    })
    .catch((err)=>
      console.log(err)
    )
    
  }
  const handleSubmitDelete=(e)=>{
    e.preventDefault();
    window.confirm('정말 삭제하시겠습니까?');
    privateApi({
      url:`/board/${boardId}`,
      method:'delete',
    })
    .then((res)=>{
      navigate('../boards');
    })
    .catch((err)=>
      console.log(err)
    )
  }
  return (
    <div className='totalContainer'>
      <div className='innerContainer'>
        {errMessage}
        {edit?<TailBoardForm className='whiteContainer' detail={boardDetail} handleFormSubmit={handleSubmitEdit} handleCancel={handleCancelEdit}/>
        :<TailBoardDetail detail={boardDetail} handleEdit={handleGoEdit} handleDelete={handleSubmitDelete}/>}
      </div>
    </div>
  )
}
