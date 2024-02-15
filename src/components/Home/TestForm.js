import React, { useState } from 'react'

export default function TestForm({variable}) {
const [input,setInput] = useState('');
const handleInput=(e)=>{
setInput(e.target.value)
}
  return (
    <div className='bg-blue-300 w-full h-full'>
        <input type='text' className='w-30 h-10' onChange={handleInput}/>
        <button onClick={()=>variable(input)} className='w-30 h-10 bg-yellow-300'/>
    </div>
  )
}
