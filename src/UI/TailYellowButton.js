import React from 'react'

export default function TailYellowButton({text,handleClick}) {
  return (
    <button type='button' onClick={handleClick} className='h-9 px-3 py-1 mx-5 text-sm font-bold bg-yellow-300 border-2 border-yellow-300 rounded-3xl hover:bg-slate-800 hover:text-yellow-300'>
        {text}
    </button>
  )
}
