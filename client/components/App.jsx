import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./login/Login.jsx";
import Header from "./globals/Header.jsx";
import Home from "./home/Home.jsx";
import GoogleLoginCallback from "./login/GoogleLoginCallback.jsx";
import EntraIdLoginCallback from "./login/EntraIdLoginCallback.jsx";
import { Chat } from "./chat/Chat.jsx";
import PersonalProfilePage from "./profile/PersonalProfilePage.jsx";
import AddNewChatroom from "./chat/AddNewChatroom.jsx";
import Profile from "./profile/Profile.jsx";
import ExternalProfilePage from "./profile/ExternalProfilePage.jsx";
import editProfilePage from "./profile/EditProfilePage.jsx";
import EditProfilePage from "./profile/EditProfilePage.jsx";
import EditChatRoom from "./chat/EditChatRoom.jsx";
import ErrorMessage from "./globals/ErrorMessage.jsx";

export const AppContext = createContext();

export function App() {
  const [errorMessage, setErrorMessage] = useState();

  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const res = await fetch("/api/v1/login");
      if (res.status === 401) {
        setUser(undefined);
      } else {
        const { message, data } = await res.json();
        setUser(data);
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <ErrorMessage message={errorMessage} />
        <Header />
        <Routes>
          <Route
            path={"/login/callback/entraid"}
            element={<EntraIdLoginCallback />}
          />
          <Route
            path={"login/callback/google"}
            element={<GoogleLoginCallback />}
          />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<PersonalProfilePage />} />
          <Route
            path={"/profile/:email"}
            element={<ExternalProfilePage />}
          />{" "}
          <Route path={"/chat"} element={<Chat />} />
          <Route path={"/chatroom/add"} element={<AddNewChatroom />} />
          <Route path={"/chatroom/edit/:id"} element={<EditChatRoom />} />
          <Route path={"/profile/edit"} element={<EditProfilePage />} />
          <Route path={"/"} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
