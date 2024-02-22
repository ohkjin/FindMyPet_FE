import React from 'react'
import Dog from '../../../assets/images/welcome/tricatwelcome.jpg'
import { Link } from 'react-router-dom'

export default function TailBoardList({ board }) {
  return (
    <li key={board.boardId} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={Dog}
          alt='random images'
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`../board/${board.boardId}`}>{board.title}</Link>
            </h3>
            <p className="ml-4">{board.registered}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{board.content}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">작성자: {board.writer} 조회수: {board.view} 댓글수: {board.commentSize}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {board.commentList}
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
