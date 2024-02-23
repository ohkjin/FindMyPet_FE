import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Login from "./components/user/Login/Login";
import FindPwd from "./components/user/Login/FindPwd";
import MyPage from "./components/user/MyPage/MyPage";
import Join from "./components/user/Join/Join";
import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar/Navbar";
import Reviews from "./components/boards/Reviews/Reviews"
import Boards from "./components/boards/Boards";
import Find from "./components/Find/Find";
import Test from "./components/Home/Test";
import MyPageEdit from "./components/user/MyPage/MyPageEdit";
import BoardWrite from "./components/boards/BoardWrite";
import Board from "./components/boards/Board";
import Footer from "./components/Footer/Footer";
import LoginAlertPage from "./UI/LoginAlertPage";

function App() {

  return (
      <BrowserRouter>
      <RecoilRoot>
        <div className="">
        <div className={`w-screen min-h-screen self-stretch bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat `}>
        {/* <div className="w-screen h-screen bg-welcomeHome"> */}
        <Navbar/>
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
            <Route path="/board/:boardId" element={<Board/>}/>
            <Route path="/board/write/:write_type" element={<BoardWrite/>}/>
            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/user/loginalert" element={<LoginAlertPage/>}/>
        </Routes>
        
        </div>
        </div>
        <Footer/>
      </RecoilRoot>
      </BrowserRouter>
  );
}

export default App;
