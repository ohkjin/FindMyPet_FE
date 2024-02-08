import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { stLogin } from '../user/Login/LoginAtom'

export default function Navbar() {
    const isLogin = useRecoilValue(stLogin);
    return (
        <div className='w-full bg-blue-300 flex flex-row'>
            <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-blue-800 hover:text-white mr-4">
                Home
            </Link>
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
    )
}
