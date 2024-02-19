import React from 'react'
import TailComment from './TailComment'

export default function TailBoardDetail(detail) {
  return (
    <div>
         <div className='BoardDetail'>
        <header className=''>
        <div className='Cate'>
          {detail.category}
        </div>
        <div>
          {detail.title}
        </div>
        <div className='border border-slate-200'/>
        </header>
        <body>
        <div className=''>
          {detail.content}
        </div>
        <div className='UserInfo'>
        </div>
        </body>
        </div>
        <div className='Comments'>
        {detail.commentList&&detail.commentList.map((comment,idx)=><TailComment key={`comment${}`}/>)}
        </div>
    </div>
  )
}
