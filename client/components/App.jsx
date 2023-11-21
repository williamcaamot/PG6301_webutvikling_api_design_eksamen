import React from "react";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Login from "./login/Login.jsx";
import Header from "./Header.jsx";
import Home from "./home/Home.jsx";

export function App() {
    return <BrowserRouter>
        <Header/>
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<Home/>}/>
        </Routes>


    </BrowserRouter>
}