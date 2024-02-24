// import React, { useEffect, useRef, useState } from 'react'
// import TailReviewList from './UI/TailReviewList'
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import TailAnimalButton from '../../Find/UI/TailAnimalButton';
// import TailRadioButton from '../../../UI/TailRadioButton';
// import Pagination from 'react-js-pagination';
// import '../../UI/PaginationCSS.css'
// import TailSelect from '../../Find/UI/TailSelect';


export default function Reviews() {
 // 보호소를 찾고 받은 번호로 get 요청
  // const [errMessage, setErrMessage] = useState(<></>);
  // const [searchParams,setSearchParams] = useSearchParams();
  // const [totalPages, setTotalPages] = useState(1);

  // const [params,setParams] = useState({
  //   page: null,
  //   order:null,
  // })
  // const [reviewDetails, setReviewDetails] = useState([])

  //-- 페이지 로딩 --//
  //셀터 선택시 로딩
  // useEffect(() => {
  //   // console.log("params",params);
  //   console.log("tp",totalPages)
  //   publicApi({
  //     url:`/reviews${}`,
  //     method:'get',
  //     params:params,
  //   })
  //   .then((content)=>{
  //     // console.log(content)
  //     if(totalPages===0){
  //               // console.log("totalPage",res.data.content.totalPages)
  //               setTotalPages(content.totalPages)
  //             }
  //     setBoardDetails(content.content);
  //   })
  //   .catch((err)=>
  //     console.log(err)
  //   )
  // }, [params])


  
  // const handlePageButton = (number) => {
  //   setParams({
  //     ...params,
  //     page:number,
  //   })
  // }

  // //default가 최신순
  // const handleSelOrder = (e,order) => {
  //   e.preventDefault();
  //   searchRef.current.value = '';
  //   searchParams.delete('writer');
  //   setSearchParams(searchParams.toString());
  //   setParams({
  //     ...params,
  //     order:order,
  //     keyword:'',
  //   })
  // }

  return (
    <div className='totalContainer'>
      {/* <div className='innerContainer whiteContainer mt-10 min-w-96 p-5 md:p-24 lg:p-32 flex flex-col items-center'>
        <div className="w-full flex flex-row justify-start items-start space-x-4">
          <TailAnimalButton icon={''} text={'전체'} handleButton={(e) => handleSelCate(e, null)} selected={params.category === null ? true : false} />
          <TailAnimalButton icon={''} text={'커뮤니티'} handleButton={(e) => handleSelCate(e, 'COMMUNITY')} selected={params.category === 'COMMUNITY' ? true : false} />
          <TailAnimalButton icon={''} text={'Q&A'} handleButton={(e) => handleSelCate(e, 'QA')} selected={params.category === 'QA' ? true : false} />
        </div>
        <div className='Review_search my-5 w-full'>
          <form onSubmit={handleSearch} className='w-full flex flex-row justify-center items-center'>
            <input type='text' ref={searchRef} placeholder='찾으시는 글이 있으신가요?' className='w-4/5 px-5 py-1 border-2 border-yellow-300 rounded-3xl' />
            <button type='submit' className='px-3 py-1 mx-5 my-2 text-sm font-bold bg-yellow-300 border-2 border-yellow-300 rounded-3xl hover:bg-slate-800 hover:text-yellow-300'>
              검색
            </button>
          </form>
        </div>
        <div className='Radio w-full flex flex-row justify-start items-start space-x-4'>
          <TailRadioButton text={'최신순'} handleButton={(e) => handleSelOrder(e, 'registered')} selected={params.order === null || params.order === 'registered'? true : false} />
          <TailRadioButton text={'조회순'} handleButton={(e) => handleSelOrder(e, 'view')} selected={params.order === 'view' ? true : false} />
        </div>
        <div className='Review_contents w-full my-5'>
          {errMessage}
          {reviewDetails.length===0&&<div className='flex justify-center text-gray-500 text-lg'>검색 결과가 없습니다</div>}
          {reviewDetails.map((b, idx) => <div key={`reviewList${idx}`}><TailReviewList review={b} /><div className='border-2 border-yellow-200/20'/><div className='border-2 border-gray-200/20'/></div>)}
        </div>
        <div className='Review_pagenum m-5 flex flex-row justify-center items-center'>
            <Pagination
                activePage={params.page}
                totalItemsCount={totalPages}
                itemsCountPerPage={2}
                // prevPageText={'◀'}
                // nextPageText={'▶'}
                pageRangeDisplayed={5}
                onChange={handlePageButton}
              />
         
        </div>
      </div> */}
    </div>
  )
}
