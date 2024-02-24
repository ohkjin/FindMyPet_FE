import React from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
// import { useRecoilValue } from 'recoil'
// import { userAtom } from '../user/atom/TokenAtom'

export default function Navbar() {
    // const isLogin = useRecoilValue(userAtom);
    const isLogin=false;
    const linkShape = 'block pt-3 pb-2 px-3 rounded-md lg:inline-block lg:mt-0 mr-4 flex flex-row justify-center items-center'
    const linkFont = 'text-slate-800 font-tenada '
    const linkDesign = 'border border-yellow-300 border-2 '
    const linkHover = 'hover:bg-orange-400 hover:text-white '
=======
import { useRecoilValue } from 'recoil'
import { userAuth, userNickname } from '../user/token/TokenAtom'
import WriteDropDown from './WriteDropDown';
import { Disclosure } from '@headlessui/react';
import dogpaw from '../../assets/images/button/dogpaw_boldyellow_button.png'
import NavDropDown from './NavDropDown';
// import dogpaw from '../../assets/images/button/dogpaw_button.png'

export default function Navbar() {
    const nickname = useRecoilValue(userNickname);
    const isLogin = useRecoilValue(userAuth);
    const write_maintxt = '글쓰기'
    const write_droplist = [
        {name:'커뮤니티/Q&A 쓰기',to:'/board/write/0'},
        {name:'보호소 리뷰 쓰기',to:'/board/write/1'},
    ];
    const boards_maintxt = '보드'
    const boards_droplist = [
        {name:'커뮤니티/Q&A',to:'/boards'},
        {name:'보호소 리뷰',to:'/reviews'},
    ];
    const nav_maintxt = <img src={dogpaw} className='w-8 h-8' alt='dogpaw_button'/>
    const nav_droplist = [
        {title:'Main',
          list:[{name:'홈',icon:'🏡',to:'/home'},
                {name:'테스트',icon:'🧺',to:'/test'}],},
        {title:'유기동물', 
          list:[{name:'유기동물',icon:'🐇',to:'/find'}],},
        {title:'보드', 
          list:[{name:'게시판',icon:'🙋‍♀️',to:'/boards'},
                {name:'보호소',icon:'🏦',to:'/reviews'}],},
        {title:'글쓰기', 
          list:[{name:'게시글',icon:'✍',to:'/board/write/0'},
                {name:'리뷰',icon:'⭐',to:'/board/write/1'}],},
    ];
// const navMenu = [
//     {name:'대시보드',to:'#',current:true},
//     {name:'홈',to:'/home',current:false},
//     {name:'테스트',to:'/test',current:false},

// ];
    const linkShape = ' block pt-3 pb-2 px-3 rounded-md lg:inline-block lg:mt-0 mr-4 flex flex-row justify-center items-center'
    const linkFont = ' text-slate-800 font-tenada '
    const linkDesign = ' text-sm border border-yellow-300 border-2 bg-white/[0.5] '
    const linkHover = ' hover:bg-orange-400 hover:text-white '
>>>>>>> fe_home
    return (
        <nav className="totalContainer">
        <div className=" w-full mx-auto min-w-96 p-4 flex flex-row justify-center items-center">
            <div className='hidden lg:inline basis-2/5 flex flex-row  justify-evenly items-center'>
                <Link to="/home" className={`${linkShape} ${linkDesign} ${linkHover} ${linkFont}`}>
                    홈
                </Link>
                <Link to="/test" className={`${linkShape} ${linkDesign} ${linkHover} ${linkFont}`}>
                    테스트
                </Link>
                <Link to="/find" className={`${linkShape} ${linkDesign} ${linkHover} ${linkFont}`}>
                    유기동물
                </Link>
            </div>
            <Link to="/home" className={`basis-1/5 flex justify-center items-center text-2xl ${linkFont} `}> 
                MyPetFinder
            </Link>
            <div className='hidden lg:inline basis-2/5 flex flex-row justify-evenly items-center'>
                <WriteDropDown maintxt={boards_maintxt} droplist={boards_droplist}/>
                <WriteDropDown maintxt={write_maintxt} droplist={write_droplist}/>
                
            </div>
            <div className='inline  fixed top-0 right-0 flex flex-row'>
            {isLogin?
                <Link to="/user/mypage" className={`${linkShape} ${linkDesign} ${linkHover} ${linkFont}`}>
                    {nickname} 님
                </Link>
                :
                <Link to="/user/login" className={`${linkShape} ${linkDesign} ${linkHover} ${linkFont}`}>
                    로그인
                </Link>
                }
                <NavDropDown maintxt={nav_maintxt} droplist={nav_droplist}/>
            </div>
        </div>
    </nav>
    )
}
