import React from 'react'

export default function TailSelectSigungu({optionWithValue,selRef,handleChange,init}) {
  
  let options = '';
  if(optionWithValue){
    options = optionWithValue.map((op,idx)=>(<option key={`op${idx}`} value={op.careRegNo} name={op.careNm} id={op.careNm} className='hover:bg-black'>
      {op.careNm}
    </option>))
  }
  
  return (
    <select ref={selRef}
            onChange={handleChange}
            className='m-1 bg-yellow-100 h-8 w-48 rounded-lg focus:bg-yellow-200 flex justify-center items-center'
            >
            <option value='' className='flex justify-center items-center'>{init}</option>
            {options&&options}
    </select>
  )
}
