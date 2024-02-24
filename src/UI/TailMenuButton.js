import React from 'react'
import { Link } from 'react-router-dom';

export default function TailMenuButton({menu}) {
  
  // console.log("bt", code)
  const color = 'bg-yellow-50 border-dashed border-yellow-300';
  return (
    <Link to={menu.to} className={`${color} border-[3px] w-14 h-14 hover:bg-orange-400 hover:border-solid  rounded-xl p-2 m-1 flex flex-col justify-center items-center `}>
        <div>
          {menu.icon&&menu.icon}
        </div>
        <div className='text-xs font-bold'>
          {menu.name&&menu.name}
        </div>
    </Link>
  )
}
