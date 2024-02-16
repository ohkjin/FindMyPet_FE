import React from 'react'

export default function TailSelect({selRef,handleChange}) {
  return (
    <select ref={selRef}
            onChange={handleChange}
            className='bg-yellow-200 h-8 w-48 rounded-lg focus:bg-yellow-300'
            >
    </select>
  )
}
