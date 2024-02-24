import React from 'react'
import Home from '../Home/Home'
import { useRecoilValue } from 'recoil'
import { userNickname } from '../user/token/TokenAtom'
function Main() {
  const userNick = useRecoilValue(userNickname);
  return (
    <main className=''>
        <div>
            <Home/>
        </div>
    </main>
  )
}

export default Main