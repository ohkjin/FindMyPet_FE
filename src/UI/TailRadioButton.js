import React from 'react'

export default function TailRadioButton({text,handleButton,selected}) {
  if(!selected){
    selected=false;
  }
  // console.log("bt", code)
  const icon = selected?'🐸':'🔘';
  return (
    
    <button onClick={handleButton} className={`p-2 m-1 flex flex-row justify-center items-center `}>
        <div>
          {icon}
        </div>
        <div className='text-xs font-bold'>
          {text&&text}
        </div>
    </button>
  )
}
