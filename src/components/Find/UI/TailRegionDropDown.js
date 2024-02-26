import React, { Fragment } from 'react'
import FindShelter from '../api/FindShelter'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function TailRegionDropDown({handleSelectShelter,codes,setCodes}) {
  return (
    <Menu as='div' className="relative inline-block text-left">
        <div>
            <Menu.Button className='bg-yellow-200 h-8 w-48 rounded-lg focus:bg-yellow-300 flex justify-center items-center'>
            지역
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
                    {/* {droplist&&droplist.map((item)=>
                        <Menu.Item key={item.name}>
                        {({active})=>
                            <Link to={item.to} className={` hover:bg-slate-800 hover:text-yellow-300` }>
                            {item.name}
                            </Link>
                        }
                        </Menu.Item>
                    )} */}
                    <FindShelter handleSelectShelter={handleSelectShelter} codes={codes} setCodes={setCodes}/>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
  )
}
