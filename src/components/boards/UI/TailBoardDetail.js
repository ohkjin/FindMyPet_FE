import React from 'react'
import TailComment from './TailComment'

export default function TailBoardDetail({detail, handleEdit}) {
  return (
    <div className='BoardDetail w-full h-screen  bg-yellow-200'>
      <div className='BoardDetail w-full '>
        <div className='w-full'>
          <div className='Cate '>
            {detail.category}
          </div>
          <div>
            {detail.title}
          </div>
          <div>
            {detail.registered}
          </div>
          <div className='border border-slate-200' />
        </div>
        <div>
          <div className=''>
            {detail.content}
          </div>
          <div className=''>
            <button onClick={handleEdit} className='w-50 h-50 bg-green-300'>버튼</button>
            <div className='UserInfo'>
            {detail.view}
            {detail.writer}
          </div>
          </div>
        </div>
      </div>
      <div className='Comments'>
        {detail.commentList && detail.commentList.map((c, idx) => <div key={`comment${idx}`}><TailComment comment={c}/></div>)}
      </div>
    </div>
  )
}
