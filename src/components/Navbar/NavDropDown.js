import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';


export default function NavDropDown({ maintxt, droplist }) {
    //-- 예시 --//
    // const maintxt = '글쓰기'
    // const nav_droplist = [
    // {title:'', list:[{name:'홈',to:'/home'}],},
    // ]
    //TailMenuButton Component 를 들고 오면 
    // react-dom.development.js:86 Warning: Function components cannot be given refs. Attempts to access this ref will fail.
    // 오류가 뜨므로 내부로 저장
    const btDesign = 'text-amber-950  shadow bg-yellow-50/80 border-dashed border-yellow-300/80 border-[3px] w-14 h-14   rounded-xl p32 m-1 flex flex-col justify-center items-center';
    const btHover = 'hover:text-white hover:bg-orange-400 hover:border-solid'
    let menulist = <></>;
    if (droplist) {
        menulist = droplist.map((eachCate, idx) =>
            <div key={eachCate.title}  className='p-1 my-1 rounded-md bg-white/[0.95] shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='text-sm  font-tenada text-amber-950/70 flex justify-center'>{eachCate.title}</div>
                <div className='my-0 border border-dashed border-yellow-800/10 ' />
                <div className='flex flex-row justify-center space-x-2'>
                    {eachCate.list.map((menu) =>
                <Menu.Item key={menu.name}>
                    {({ active }) =>
                        <Link to={menu.to} className={`${btDesign} ${btHover}`}>
                        <div>
                          {menu.icon&&menu.icon}
                        </div>
                        <div className='text-xs font-bold  '>
                          {menu.name&&menu.name}
                        </div>
                        </Link>
                    }
                </Menu.Item>
                )}
                </div>
            </div>
        );
    }

    return (
        <Menu as='div' className="relative inline-block text-left">
            <div>
                <Menu.Button className='p-1 m-3 border-4 transition duration-100 ease-in-out hover:bg-orange-500 border-yellow-400 rounded-full bg-yellow-50'>
                    {maintxt}
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right focus:outline-none">
                    <div className='p-2 z-50 flex flex-col'>
                        {menulist}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
