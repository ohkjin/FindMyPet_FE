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
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Main/>}/>
      <Route path="/user/login" element={<Login/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/find" element={<Find/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
function App() {

  return (
      <BrowserRouter>
      <RecoilRoot>
        <Navbar/>
 
        <div className=""></div>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            
          
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


