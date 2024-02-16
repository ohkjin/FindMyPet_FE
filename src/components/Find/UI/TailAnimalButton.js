import React from 'react'

export default function TailAnimalButton({icon,handleButton,code}) {
  return (
    <button onClick={handleButton} value={code} className='border-2 border-dashed border-yellow-300 hover:bg-yellow-400 hover:border-solid hover:border-black rounded-xl p-2'>
        {icon&&icon}
    </button>
  )
}
