import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userNickname } from '../components/user/token/TokenAtom';

export default function TailWriter({writer}) {
const nickname = useRecoilValue(userNickname);
const icons =['🦮','🐈','🐇','🦔','🐢','🐕','🐟','🐓','🐕‍🦺','🦜','🐍','🐩']
const navigate = useNavigate();
  return (
    <div className='px-1 border-[3px]  hover:bg-orange-400 bg-yellow-100/50 border-yellow-400/50 rounded-2xl'>
             <button
              type="button"
              className="font-bold hover:text-indigo-500"
              onClick={nickname===writer?()=>()=>navigate(`/user/mypage`):()=>{navigate(`/boards`)}}
            >
            {icons[(writer.charCodeAt(0)+writer.charCodeAt(writer.length-1))%icons.length]} {writer} 님
            </button>
          </div>
  )
}
