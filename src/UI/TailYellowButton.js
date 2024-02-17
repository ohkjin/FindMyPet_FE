import React from 'react'

export default function TailYellowButton({leftT,rightT,handleClick}) {
  return (
    <button type='button' onClick={handleClick} className='px-3 py-1 mx-5 my-2 text-sm font-bold bg-yellow-300 border-2 border-yellow-300 rounded-3xl hover:bg-slate-800 hover:text-yellow-300'>
        <div className='flex flex-row justify-center items-center'>
        <div className='mx-1'>{leftT}</div>
        <div>{rightT}</div>
        </div>
    </button>
  )
}
