import React from 'react'

export default function TailComment({comment}) {
  return (
    <div>
        <div className='Name'>{comment.writer}</div>
        <div className='Date'>{comment.registered}</div>
        <div className='Content'>{comment.content}</div>
    </div>
  )
}
