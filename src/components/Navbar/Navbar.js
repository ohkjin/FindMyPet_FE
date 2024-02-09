import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { stLogin } from '../user/atom/LoginAtom'

export default function Navbar() {
    const isLogin = useRecoilValue(stLogin);
    return (
        <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
        <div className="container mx-auto flex flex-row items-center">
            <div className='basis-2/5 flex flex-row justify-evenly items-center'>
                <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-blue-800 hover:text-white mr-4">
                    Home
                </Link>
            </div>
            <div className="basis-1/5 flex justify-center items-center text-gray-800 text-2xl font-bold">
                MyPetFinder
            </div>
            <div className='basis-2/5 flex flex-row justify-evenly items-center'>
                
                {isLogin?
                <Link to="/user/mypage" className="block mt-4 lg:inline-block lg:mt-0 text-blue-800 hover:text-white mr-4">
                    MyPage
                </Link>
                :
                <Link to="/user/login" className="block mt-4 lg:inline-block lg:mt-0 text-blue-800 hover:text-white mr-4">
                    Login
                </Link>
                }
            </div>
        </div>
    </nav>
    )
}
