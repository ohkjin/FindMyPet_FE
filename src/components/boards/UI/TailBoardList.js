import React from 'react'
import triCat from '../../../assets/images/welcome/tricatwelcome.jpg'
import tabbyCat from '../../../assets/images/welcome/tabbywelcome.jpg'
import dog from '../../../assets/images/welcome/welshcorgiwavingpaw.jpg'
import { Link, useNavigate } from 'react-router-dom'

export default function TailBoardList({ board }) {

  const pics = [dog, tabbyCat, triCat]
  // const randomIdx = Math.floor(Math.random() * pics.length);
  const icons =['🦮','🐈','🐇','🦔','🐢','🐕','🐟','🐓','🐕‍🦺','🦜','🐍','🐩','🐆']
  const randomIconIdx = Math.floor(Math.random()*icons.length);
  const navigate =useNavigate();

  return (
    <li key={board.boardId} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <div className='text-sm font-bold'>
          {board.category}
        </div>
        <img
          src={pics[board.boardId%pics.length]}
          alt='random images'
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className='font-bold md:text-lg text-yellow-900/80'>
              <Link to={`../board/${board.boardId}`}>{board.title}</Link>
            </h3>
            <p className="ml-4 text-xs md:text-sm text-gray-300">{board.registered}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{board.content}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-xs md:text-sm text-gray-500">
          <p className='px-1 border-[3px] hover:bg-orange-400 bg-yellow-100/50 border-yellow-400/50 rounded-full'>
             <button
              type="button"
              className="font-bold hover:text-indigo-500"
              onClick={()=>{navigate(`/boards?writer=${board.writer}`);}}
            >
              {icons[randomIconIdx]} {board.writer}
            </button>
          </p>
          <p>조회수: {board.view} </p>
          <p>댓글수: {board.commentCount} </p>
        </div>
      </div>
    </li>
  )
}
