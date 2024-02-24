// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useRecoilValue } from 'recoil'
// import { userAuth, userNickname } from '../../components/user/token/TokenAtom'
// import WriteDropDown from '../../components/Navbar/WriteDropDown';
// import { Disclosure } from '@headlessui/react';
// // https://tailwindui.com/components/application-ui/application-shells/stacked
// const isLogin = useRecoilValue(userAuth);
// const nickname = useRecoilValue(userNickname);
// const linkShape = ' block pt-3 pb-2 px-3 rounded-md lg:inline-block lg:mt-0 mr-4 flex flex-row justify-center items-center'
// const linkFont = ' text-slate-800 font-tenada '
// const linkDesign = ' text-sm border border-yellow-300 border-2 bg-white/[0.5] '
// const linkHover = ' hover:bg-orange-400 hover:text-white '
// const navMenu = [
//     {name:'대시보드',to:'#',current:true},
//     {name:'홈',to:'/home',current:false},
//     {name:'테스트',to:'/test',current:false},
// ];

// const className=(...classes)=>{
//     return classes.filter(Boolean).join(' ')
// }
// export default function NavDropdown(){
//     return(
//         <div className='min-h-full'>
//             <Disclosure as='nav' className='bg-slate-50'>
//                 {({open})=>(
//                     <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
//                         <div className='flex h-16 items-center justify-between'>
//                         <div className="flex items-center">
//                             <div className='hidden md:block'>
//                                 <div className='ml-10 flex items-baseline space-x-4'>
//                                     {navMenu.map((menu)=>(
//                                         <Link to={menu.to} key={menu.name} className={classNames(`${linkShape} ${linkDesign} ${linkHover} ${linkFont}`)}>
//                                         홈
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                         </div>
//                     </div>
//                 )
//                 }
//             </Disclosure>
//         </div>
//     )
// }

