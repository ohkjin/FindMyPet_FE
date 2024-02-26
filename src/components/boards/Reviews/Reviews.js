import React, { useEffect, useRef, useState } from 'react'
import TailReviewList from './TailReviewList'
import Pagination from 'react-js-pagination';
import '../../../UI/PaginationCSS.css'
import FindShelter from '../../Find/api/FindShelter';
import { publicApi } from '../../user/token/PublicApi';
import { useNavigate, useParams } from 'react-router-dom';
import FindShelterDetail from '../../Find/api/FindShelterDetail';
import { userAuth } from '../../user/token/TokenAtom';
import { useRecoilValue } from 'recoil';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { privateApi } from '../../user/token/PrivateApi';


export default function Reviews() {
//  보호소를 찾고 받은 번호로 get 요청
  const [totalPages, setTotalPages] = useState(1);
  const { shelterPath } = useParams();
  const shelterPathLong = parseInt(shelterPath);
  const [params,setParams] = useState({
    page: null,
  })
  const [reviewDetails, setReviewDetails] = useState([])
  const userToken = useRecoilValue(userAuth)
  const navigate = useNavigate();
  const contentRef = useRef();
  const [rating,setRating] = useState(0);

  // -- 페이지 로딩 --//
  // 셀터 선택시 로딩
  useEffect(() => {
    if(shelterPathLong===0){
      return
    }
    console.log("shelterPathLong",typeof shelterPathLong);
    // console.log("tp",totalPages)
    publicApi({
      url:`/reviews/${shelterPathLong}`,
      method:'get',
      params:params,
    })
    .then((content)=>{
      // console.log("content",content)
      // console.log("shelterCd",shelterCd)
      if(totalPages===0){
                // console.log("totalPage",res.data.content.totalPages)
                setTotalPages(content.totalPages)
              }
      setReviewDetails(content.content);
    })
    .catch((err)=>
      console.log(err)
    )
  }, [shelterPath,params])

  const handleReviewSubmit = (e) =>{
    e.preventDefault();
    // console.log("review Input",shelterPathLong,rating,contentRef.current.value)
    if(contentRef.current.value===''||rating==0){
      alert('내용을 입력하고 평점을 정해주세요')
      return
    }
    privateApi({
      url:'/review',
      method:'post',
      data:{
        shelter:shelterPathLong,
        rating:rating,
        content:contentRef.current.value,
      }
    })
    .then((res)=>{
      navigate(0);
    })
    .catch((err)=>
      console.log(err)
    )
  }
  
  const handleRating =(e,ratingInput)=>{
    e.preventDefault();
    setRating(ratingInput);
  }
  const handlePageButton = (number) => {
    setParams({
      ...params,
      page:number,
    })
  }

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
  //-- 보호소 선택 --//
const handleSelectShelter = (e) =>{
  e.preventDefault();
  // console.log("shelterCode",typeof e.target.value,e.target.value)
  navigate(`/reviews/${e.target.value}`);
}
  return (
    <div className='totalContainer'>
      <div className='innerContainer mt-10 min-w-96 p-5 md:p-24 lg:p-32 flex flex-col items-center'>
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:space-x-8">
        <div><FindShelter handleSelectShelter={handleSelectShelter} className='whiteContainer'/></div>
        <div className='whiteContainer'>{shelterPathLong!=0&&<FindShelterDetail shelter={shelterPathLong}/>}</div>
        </div>
        {/* <div className='Radio w-full flex flex-row justify-start items-start space-x-4'>
          <TailRadioButton text={'최신순'} handleButton={(e) => handleSelOrder(e, 'registered')} selected={params.order === null || params.order === 'registered'? true : false} />
          <TailRadioButton text={'조회순'} handleButton={(e) => handleSelOrder(e, 'view')} selected={params.order === 'view' ? true : false} />
        </div> */}
        <div className='border-2 border-gray-100' />
      <div className='whiteContainer w-full'>
        <div className='WriteSection_Label my-3 text-lg font-bold '>
          리뷰
        </div>
        {shelterPathLong!=0&&
        <form method='post' onSubmit={handleReviewSubmit} className='Comment_Input flex flex-col bg-white border-2 border-gray-200 rounded-lg p-3'>
          <div className="flex flex-row m-1">
                <button onClick={(e)=>handleRating(e,1)}>{rating>=1?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
                <button onClick={(e)=>handleRating(e,2)}>{rating>=2?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
                <button onClick={(e)=>handleRating(e,3)}>{rating>=3?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
                <button onClick={(e)=>handleRating(e,4)}>{rating>=4?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
                <button onClick={(e)=>handleRating(e,5)}>{rating>=5?<AiFillStar className='text-lg text-yellow-400'/>:<AiOutlineStar className='text-lg text-yellow-400'/>}</button>
              </div>
              <input id='review' onClick={userToken?null:(()=>navigate('../../user/loginalert'))} ref={contentRef} maxLength={45} name='review' defaultValue='' placeholder='리뷰을 입력해주세요' className='p-1 m-1' />
          <button type='submit' className='bg-yellow-300 p-1 px-6 text-xs text-yellow-900 rounded-xl self-end'>등록</button>
        </form>
        }
        <div className='Review_contents w-full my-5'>
          {reviewDetails.length===0&&<div className='flex justify-center text-gray-500 text-lg'>검색 결과가 없습니다</div>}
          {reviewDetails.map((b, idx) => <div key={`reviewList${idx}`}><TailReviewList review={b} /><div className='border-2 border-yellow-200/20'/><div className='border-2 border-gray-200/20'/></div>)}
        </div>
      </div>
        
        <div className='Review_pagenum m-5 flex flex-row justify-center items-center'>
            <Pagination
                activePage={params.page}
                totalItemsCount={totalPages*20}
                // prevPageText={'◀'}
                // nextPageText={'▶'}
                pageRangeDisplayed={3}
                onChange={handlePageButton}
              />
         
        </div>
      </div>
    </div>
  )
}
