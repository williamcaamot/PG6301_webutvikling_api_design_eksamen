import React, {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Login from "./login/Login.jsx";
import Header from "./Header.jsx";
import Home from "./home/Home.jsx";
import GoogleLoginCallback from "./login/GoogleLoginCallback.jsx";
import EntraIdLoginCallback from "./login/EntraIdLoginCallback.jsx";
import Chat from "./chat/Chat.jsx";
import Profile from "./profile/Profile.jsx";


export const AppContext = createContext();

export function App() {

    const [user, setUser] = useState(null);

    async function fetchUser() {
        const res = await fetch("/api/v1/login");
        if (res.status === 401) {
            setUser(undefined);

        } else {
            const user = await res.json();
            setUser(user);
            console.log(user)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return <AppContext.Provider value={{user, setUser}}>
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path={"/login/callback/entraid"} element={<EntraIdLoginCallback/>}/>
            <Route path={"login/callback/google"} element={<GoogleLoginCallback/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/chat"} element={<Chat/>}/>
            <Route path={"/"} element={<Home/>}/>
        </Routes>


    </BrowserRouter>
    </AppContext.Provider>
}