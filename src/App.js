import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Login from "./components/user/Login/Login";
import MyPage from "./components/user/MyPage/MyPage";
import Join from "./components/user/Join/Join";
import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar/Navbar";

function App() {

  return (
    <>
      <BrowserRouter>
      <RecoilRoot>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/user/login" element={<Login/>}/>
            <Route path="/user/join" element={<Join/>}/>
            <Route path="/user/mypage" element={<MyPage/>}/>
        </Routes>
      </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
