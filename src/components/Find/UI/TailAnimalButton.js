import React from 'react'

export default function TailAnimalButton({icon,text,handleButton,selected}) {
  if(!selected){
    selected=false;
  }
  // console.log("bt", code)
  const color = selected?'bg-orange-400 border-solid border-black':'bg-white border-dashed border-yellow-300';
  return (
    <button onClick={handleButton} className={`${color} border-2 hover:bg-yellow-400 hover:border-solid hover:border-black rounded-xl p-2 m-1 flex flex-col justify-center items-center `}>
        <div>
          {icon&&icon}
        </div>
        <div className='text-xs font-bold'>
          {text&&text}
        </div>
    </button>
  )
}
