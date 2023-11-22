import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App.jsx";
import Profile from "./Profile.jsx";
import { Link, useNavigate } from "react-router-dom";
import ChatRoomListing from "../chat/ChatRoomListing.jsx";

function PersonalProfilePage() {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const [chatRooms, setChatRooms] = useState();

  async function handleLogout() {
    try {
      await fetch("/api/v1/login", {
        method: "DELETE",
      });
      setUser(null);
      navigate("/");
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  async function loadChatRooms() {
    try {
      const res = await fetch(`/api/v1/chatroom/owner/${user.email}`);
      const { message, data } = await res.json();
      if (res.status !== 200) {
        setErrorMessage(message || "En ukjent feil har oppstått");
        return;
      }
      setChatRooms(data);
      console.log(data);
    } catch (e) {
      setErrorMessage(e.message);
    }
  }
  useEffect(() => {
    loadChatRooms();
  }, [user]);

  return (
    <>
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          <Profile user={user} />
          <div style={{ width: "100%", paddingTop: "20px" }}>
            <button onClick={handleLogout}>Logg ut</button>
            <Link to={"/profile/edit"}>
              <button id={"editProfileButton"}>Rediger profil</button>
            </Link>
          </div>
          <h2>Dine chat rom:</h2>
          {chatRooms &&
            chatRooms.map((chatroom) => {
              return (
                <>
                  <ChatRoomListing chatRoom={chatroom} user={user} />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default PersonalProfilePage;
