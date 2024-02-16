import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Login from "./components/user/Login/Login";
import FindPwd from "./components/user/Login/FindPwd";
import MyPage from "./components/user/MyPage/MyPage";
import Join from "./components/user/Join/Join";
import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar/Navbar";
import Community from "./components/boards/Community/Community";
import Boards from "./components/boards/Boards";
import Find from "./components/Find/Find";
import Test from "./components/Home/Test";
import MyPageEdit from "./components/user/MyPage/MyPageEdit";
import BoardWrite from "./components/boards/BoardWrite";

function App() {

  return (
      <BrowserRouter>
      <RecoilRoot>
        <Navbar/>
        <div className=""></div>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/find" element={<Find/>}/>
            <Route path="/user/login" element={<Login/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/user/findpwd" element={<FindPwd/>}/>
            <Route path="/user/join" element={<Join/>}/>
            <Route path="/user/mypage" element={<MyPage/>}/>
            <Route path="/user/mypage/edit" element={<MyPageEdit/>}/>
            <Route path="/boards" element={<Boards/>}/>
            <Route path="/board/write" element={<BoardWrite/>}/>
            <Route path="/boards/community" element={<Community/>}/>
        </Routes>
      </RecoilRoot>
      </BrowserRouter>
  );
}

export default App;
