import React from 'react'

export default function TailSelect({optItems,selRef,handleChange,init}) {
  
  let options = ''
  if(optItems){
    options = optItems.map((op,idx)=><option key={`op${idx}`} value={op} className='hover:bg-black'>{op}</option>);
  }
  
  return (
    <select ref={selRef}
            onChange={handleChange}
            className='bg-yellow-200 h-8 w-48 rounded-lg focus:bg-yellow-300'
            >
            <option value='' className=''>{init}</option>
            {options&&options}
    </select>
  )
}
