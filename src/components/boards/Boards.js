import React, { useEffect, useRef, useState } from 'react'
import TailBoardList from './UI/TailBoardList'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import TailAnimalButton from '../Find/UI/TailAnimalButton';
import TailRadioButton from '../../UI/TailRadioButton';
import Pagination from 'react-js-pagination';


export default function Boards() {
  // 카테고리 사항을 보내줌, 추가검색: %Like%, 조회수별, 시간별
  // 보드번호, 페이지, 페이지 번호, 페이지 총 갯수를 받음
  // 분류 사항을 보낸뒤 페이지 총 갯수(15)를 받은뒤 3개로 나누어서 뿌림, 그 후 4번쨰부터 받고 싶을때 새로운 페이지 요청
  const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;
  const [errMessage, setErrMessage] = useState(<></>);
  const [searchParams] = useSearchParams();
  const pageNo = searchParams.get('page')
  const [totalPages, setTotalPages] = useState(10);
  const [pageArray,setPageArray]=useState([1]);
  const [buttons,setButtons]=useState([]);
  const [params,setParams] = useState({
    page: pageNo,
    category:null,
    order:null,
    keyword:'',
  })
  const [boardDetails, setBoardDetails] = useState([])

  //-- 페이지 로딩 --//
  //제일 처음과, param이 변할떄 페이지 가져오기
  useEffect(() => {
    // console.log("params",params);
    // axios.get(`${API_SERVER}/boards?`, {
    //   params: params,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => {
    //     if (res.data) {
    //       if(totalPages===0){
    //         setTotalPages(res.data.totalPages)
    //       }
    //       setBoardDetails(res.data.content);
    //       setErrMessage(<></>);
    //     } else {
    //       console.log(res)
    //       return
    //     }
    //   }).catch(err => {
    //     setErrMessage(<div className='text-red-400'>{err.response ? `(${err.response.status}) ${err.response.data}` : err.message}</div>)
    //   })
  }, [params])

  //-- 총 페이지로 페이지 번호로 나누기 --// 
  useEffect(()=>{
    // 10%3
    console.log(((Math.floor(params.page/3)+1)*3+1)<=totalPages)
    if(totalPages===0){
      return
    }
    const pageLimit = 3;
    // 총 페이지를 array로
    const tmp = [];
    for(let i=1;i<=totalPages;i++){
      tmp.push(i);
      if(i===pageLimit){
        break;
      }
    }
    // 페이지 갯수 제한 까지의 array가 담긴다
    setPageArray(tmp); 
    console.log("pageArray",pageArray); 
  },[totalPages])

  // 항목 선택시 검색 초기화
  const handlePageButton = (number) => {
    
  }
  // 다음 항목: 페이지 숫자를 받아서 button에서 보낸수를 합한 후 그곳으로 보냄
  const handleNextButton = (e,move) => {
    let tmp = [];
    // if(move<=0&&pageArray.length!==3){
    //     for(let i=move*3;i<=move*3+3;i+=Math.sign(move)){
    //       tmp.push(i);
    //       if(i===totalPages){
    //         break;
    //       }
    //     }
    //   }
    //   tmp = pageArray.map(p=>p+3*move).filter(p=> p<=totalPages);
    // }
    
    // let tmp = pageArray.map(p=>p+3*move).filter(p=> p<=totalPages);
    setParams({
      ...params,
      page:pageArray[0]+3*move,
    })
    setPageArray(tmp);
  }

  const handleSelCate = (e,cate) => {
    e.preventDefault();
    //카테고리 변경일떄만 전체 페이지 초기화
    setTotalPages(0);
    searchRef.current.value = '';
    setParams({
      ...params,
      category:cate,
      keyword:'',
    })
  }
  //default가 최신순
  const handleSelOrder = (e,order) => {
    e.preventDefault();
    searchRef.current.value = '';
    setParams({
      ...params,
      order:order,
      keyword:'',
    })
  }

  //검색 마다 조회 => 서버부하 가능성 => (onChange -> onSubmit)
  const searchRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("searchRef",searchRef);
    setParams({
      ...params,
      keyword:searchRef.current.value,
    })
  }
  
  
  return (
    <div className='totalContainer'>
      <div className='innerContainer whiteContainer mt-10 min-w-96 p-5 lg:p-20 flex flex-col items-center'>
        <div className="w-full flex flex-row justify-start items-start space-x-4">
          <TailAnimalButton icon={''} text={'전체'} handleButton={(e) => handleSelCate(e, null)} selected={params.category === null ? true : false} />
          <TailAnimalButton icon={''} text={'커뮤니티'} handleButton={(e) => handleSelCate(e, 'COMMUNITY')} selected={params.category === 'COMMUNITY' ? true : false} />
          <TailAnimalButton icon={''} text={'Q&A'} handleButton={(e) => handleSelCate(e, 'QA')} selected={params.category === 'QA' ? true : false} />
        </div>
        <div className='Board_search my-5 w-full'>
          <form onSubmit={handleSearch} className='w-full flex flex-row justify-center items-center'>
            <input type='text' ref={searchRef} placeholder='찾으시는 글이 있으신가요?' className='w-4/5 px-5 py-1 border-2 border-yellow-300 rounded-3xl' />
            <button type='submit' className='px-3 py-1 mx-5 my-2 text-sm font-bold bg-yellow-300 border-2 border-yellow-300 rounded-3xl hover:bg-slate-800 hover:text-yellow-300'>
              검색
            </button>
          </form>
        </div>
        <div className='Radio w-full flex flex-row justify-start items-start space-x-4'>
          <TailRadioButton text={'최신순'} handleButton={(e) => handleSelOrder(e, null)} selected={params.order === null ? true : false} />
          <TailRadioButton text={'조회순'} handleButton={(e) => handleSelOrder(e, 'view')} selected={params.order === 'view' ? true : false} />
        </div>
        <div className='Board_contents w-full my-5'>
          {errMessage}
          {boardDetails.map((b, idx) => <div key={`boardList${idx}`}><TailBoardList board={b} /><div className='border-2 border-yellow-200/20'/><div className='border-2 border-gray-200/20'/></div>)}
        </div>
        <div className='Board_pagenum m-5 flex flex-row justify-center items-center'>
          {/* <Pagination
            activePage={params.page}
            itemsCountPerPage={3}
            totalItemsCount={totalPages}
            pageRangeDisplayed={10}
            /> */}
          {params.page-3>=1?
          <button onClick={(e)=>handleNextButton(e,-1)} className='mx-1 text-slate-700'>◀</button>
          :
          <div className='mx-1 text-slate-300'>◀</div>}
          {pageArray&&pageArray.map((num)=><button key={`pageBt${num}`} onClick={handlePageButton} className='mx-1 w-5 h-5 flex justify-center items-center text-yellow-500 text-sm font-bold border-2 border-yellow-500 rounded-full'>{num}</button>)}
          {((Math.floor(params.page/3)+1)*3+1)<=totalPages?
          <button onClick={(e)=>handleNextButton(e,1)} className='mx-1 text-slate-700'>▶</button>
          :
          <div className='mx-1 text-slate-300'>▶</div>}
        </div>
      </div>
    </div>
  )
}
