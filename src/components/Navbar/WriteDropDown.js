import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function WriteDropDown({maintxt,droplist}) {
    //-- 예시 --//
    // const maintxt = '글쓰기'
    // const droplist = [
    //     {name:'커뮤니티/Q&A 쓰기',to:'/board/write/0'},
    //     {name:'보호소 리뷰 쓰기',to:'/board/write/1'},
    // ];
    const linkShape = 'block pt-3 pb-2 px-3 rounded-md lg:inline-block lg:mt-0 mr-4 flex flex-row justify-center items-center'
    const linkFont = 'text-slate-800 font-tenada '
    const linkDesign = 'text-sm border border-yellow-300 border-2 '
    const linkHover = 'hover:bg-orange-400 hover:text-white '
  return (
    <Menu as='div' className="relative inline-block text-left">
        <div>
            <Menu.Button className='flex flex-row font-tenada px-3 pt-3 pb-2 mx-5 my-2 text-sm font-bold bg-yellow-300 border-2 border-yellow-300 rounded-xl hover:bg-slate-800 hover:text-yellow-300'>
            {maintxt}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className='p-2  flex flex-col'>
                    {droplist&&droplist.map((item)=>
                        <Menu.Item key={item.name}>
                        {({active})=>
                            <Link to={item.to} className={` hover:bg-slate-800 hover:text-yellow-300` }>
                            {item.name}
                            </Link>
                        }
                        </Menu.Item>
                    )}
                    {/* <Menu.Item>
                        {({active})=>
                            <Link to="/board/write/0" className={` hover:bg-slate-800 hover:text-yellow-300` }>
                            커뮤니티/Q&A 쓰기
                            </Link>
                        }
                    </Menu.Item>
                    <div className='border-2 border-yellow-200'/>
                    <Menu.Item>
                        {({active})=>
                            <Link to="/board/write/1" className={` hover:bg-slate-800 hover:text-yellow-300`}>
                            보호소 리뷰 쓰기
                            </Link>
                        }
                    </Menu.Item> */}
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
  )
}
