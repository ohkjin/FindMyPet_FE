import React, { useRef, useState } from 'react'
import TailComment from './TailComment'
import { useRecoilValue } from 'recoil';
import { userAuth, userNickname } from '../../user/token/TokenAtom';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../../user/token/PrivateApi';

export default function TailBoardDetail({ detail, handleEdit,handleDelete }) {
  const [errMessage,setErrMessage] = useState(<></>);
  const commentRef = useRef();
  const userToken = useRecoilValue(userAuth);
  const nickname = useRecoilValue(userNickname);
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST
  const navigate = useNavigate();
 
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    //form by json
    // const form = e.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries())
    // console.log(formJson)
    console.log(commentRef.current.value)
    if(commentRef.current.value===''||commentRef.current.value===null){
      return
    }
    privateApi({
      url:`/comment/${detail.boardId}`,
      method:'post',
      data:{
        content:commentRef.current.value
      }
    })
    .then((res)=>{
      navigate(0);
    })
    .catch((err)=>
      console.log(err)
    )
  }

return (
  <div className='w-full'>
    <div className='whiteContainer'>
      <div className=' w-full flex flex-col justify-start items-start'>
        <div className='Cate bg-yellow-200 rounded-xl my-3 p-1 px-4 font-semibold'>
          {detail.category}
        </div>
        <div className='my-3 text-xl font-tenada'>
          {detail.title}
        </div>
        <div className='my-1 text-sm text-gray-400 flex flex-row md:flex-row'>
          <div>{detail.registered}</div>
          <div className='ml-2'>view: {detail.view}</div>
        </div>
      </div>
      <div className='border border-gray-200' />
      <div className='my-5'>
        <div className='Content my-16'>
          {errMessage}
          {detail.content}
        </div>
        <div className='flex flex-row justify-between items-center text-gray-500'>
          <div className='UserInfo m-3 bg-yellow-100 p-2 py-3 rounded-3xl'>
            🐾 {detail.writer}
          </div>
          <div className='Buttons flex flex-col md:flex-row  justify-between items-center'>
            {nickname===detail.writer&&<>
            <button onClick={handleEdit} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2 '>수정</button>
            <button onClick={handleDelete} className='w-50 h-50 bg-gray-100 text-gray-400 text-sm rounded-lg m-1 py-1 px-2'>삭제</button>
            </>}
          </div>
        </div>
      </div>
      </div>
      <div className='border-2 border-gray-100' />
      <div className='Comments'>
        <div className='Comment_Label my-3 text-lg font-bold '>
          댓글
        </div>
        <form method='post' onSubmit={handleCommentSubmit} className='Comment_Input flex flex-col bg-white border-2 border-gray-200 rounded-lg p-3'>
          <input id='comment' onClick={userToken?null:(()=>navigate('../../user/loginalert'))} ref={commentRef} maxLength={45} name='comment' defaultValue='' placeholder='댓글을 입력해주세요' className='p-1 m-1' />
          <button type='submit' className='bg-yellow-300 p-1 px-6 text-xs text-yellow-900 rounded-xl self-end'>등록</button>
        </form>
        <div className='Comment_List'>
          {detail.commentList && detail.commentList.map((c, idx) => <div key={`comment${idx}`}><TailComment comment={c} /></div>)}
        </div>
      </div>
    </div>
)
}
