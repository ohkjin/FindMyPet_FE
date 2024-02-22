import React, { useEffect, useState } from 'react'
import TailBoardList from './UI/TailBoardList'
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';


export default function Boards() {
  // 카테고리 사항을 보내줌, 추가검색: %Like%, 조회수별, 시간별
  // 보드번호, 페이지, 페이지 번호, 페이지 총 갯수를 받음
  // 분류 사항을 보낸뒤 페이지 총 갯수(15)를 받은뒤 3개로 나누어서 뿌림, 그 후 4번쨰부터 받고 싶을때 새로운 페이지 요청
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;
  const [errMessage,setErrMessage] = useState(<></>);
  const [searchParams] = useSearchParams();
  const pageNo = searchParams.get('page')
  const [pageDetail,setPageDetail] = useState({
    page:1,
    totalPages:1,
  });
  const [boardDetails,setBoardDetails] = useState([])
  useEffect(()=>{
    axios.get(`${API_SERVER}/boards?`, {
      params: {
        page:pageNo,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if(res.data){
          setPageDetail({
            ...pageDetail,
            totalPages:res.data.totalPages
          });
          setBoardDetails(res.data.content);
        }else{
          console.log(res)
          return
        }
      }).catch(err => {
        setErrMessage(<div className='text-red-400'>{err.response?`(${err.response.status}) ${err.response.data}`:err.message}</div>)
      })
  },[])
  const handlePageButton = (number) => {

  }
  return (
    <div className='totalContainer'>
      <div className='innerContainer whiteContainer mt-10 min-w-96 flex flex-col justify-center items-center'>
        <div className='Board_search m-5 w-full'>
          <form className='w-full flex flex-row justify-center items-center'>
          <input type='text' placeholder='찾으시는 글이 있으신가요?' className='w-4/5 px-5 py-1 border-2 border-yellow-300 rounded-3xl'/>
          </form>
        </div>
        <div className='Board_contents m-5'>
          {errMessage}
          {boardDetails.map((b, idx) => <div key={`boardList${idx}`}><TailBoardList board={b}/></div>)}
        </div>
        <div className='Board_pagenum m-5 flex flex-row justify-center items-center'>
          <button className='mx-1 text-slate-700'>◀</button>
          <button onClick={handlePageButton} className='mx-1 w-5 h-5 flex justify-center items-center text-yellow-500 text-sm font-bold border-2 border-yellow-500 rounded-full'>1</button>
          <button onClick={handlePageButton} className='mx-1 w-5 h-5 flex justify-center items-center text-yellow-500 text-sm font-bold border-2 border-yellow-500 rounded-full'>2</button>
          <button className='mx-1 text-slate-700'>▶</button>

        </div>
      </div>
    </div>
  )
}
