import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Login from "./components/user/Login/Login";
import FindPwd from "./components/user/Login/FindPwd";
import MyPage from "./components/user/MyPage/MyPage";
import Join from "./components/user/Join/Join";
import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar/Navbar";
import Rounge from "./components/board/Rounge/Rounge";
import Board from "./components/board/Board";
import Find from "./components/find/Find";
import Test from "./components/Home/Test";

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
            <Route path="/board" element={<Board/>}/>
            <Route path="/board/rounge" element={<Rounge/>}/>
        </Routes>
      </RecoilRoot>
      </BrowserRouter>
  );
}

export default App;
