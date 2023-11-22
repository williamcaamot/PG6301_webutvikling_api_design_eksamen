import React, { useContext, useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import SuccessMessage from "../globals/SuccessMessage.jsx";

function EditChatRoom() {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const match = useMatch("/chatroom/edit/:id");
  const id = match.params.id;

  const [chatRoom, setChatRoom] = useState();

  const [chatRoomTitle, setChatRoomTitle] = useState();
  const [chatRoomDescription, setChatRoomDescription] = useState();

  async function loadChatRoom() {
    try {
      const res = await fetch(`/api/v1/chatroom/${id}`);
      const { message, data } = await res.json();
      if (res.status !== 200) {
        setMessages([]);
        setErrorMessage(message || "En ukjent feil har oppstått");
        return;
      }
      setChatRoom(data);
      setChatRoomTitle(data.title);
      setChatRoomDescription(data.description);
      console.log(data);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  useEffect(() => {
    loadChatRoom();
  }, []);

  async function handleUpdateChatRoom(e) {
    e.preventDefault();
    try {
      let res = await fetch(`/api/v1/chatroom/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: chatRoomTitle,
          description: chatRoomDescription,
        }),
      });
      const { message, data } = await res.json();
      if (res.status === 201) {
        setErrorMessage(null);
        setSuccessMessage(message);
      } else {
        setSuccessMessage(null);
        setErrorMessage(message || "En ukjent feil har oppstått");
      }
    } catch (e) {
      setSuccessMessage(null);
      setErrorMessage(e.message);
    }
  }

  async function handleDeleteChatRoom() {
    try {
      let res = await fetch(`/api/v1/chatroom/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, data } = await res.json();
      if (res.status === 201) {
        setErrorMessage(null);
        setSuccessMessage(message);
      } else {
        setSuccessMessage(null);
        setErrorMessage(message || "En ukjent feil har oppstått");
      }
    } catch (e) {
      setSuccessMessage(null);
      setErrorMessage(e.message);
    }
  }
  return (
    <>
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          {chatRoom && (
            <form onSubmit={handleUpdateChatRoom}>
              <p>
                New title:{" "}
                <input
                  value={chatRoomTitle}
                  onChange={(e) => setChatRoomTitle(e.target.value)}
                />
              </p>
              <p>
                New description:{" "}
                <input
                  value={chatRoomDescription}
                  onChange={(e) => setChatRoomDescription(e.target.value)}
                />
              </p>
              <div style={{ width: "100%", paddingTop: "20px" }}>
                <button>Oppdater</button>
                <Link to={"/profile"}>
                  <button>Avbryt, gå tilabke</button>
                </Link>
              </div>
            </form>
          )}
          <div style={{ width: "100%", paddingTop: "20px" }}>
            <button onClick={handleDeleteChatRoom}>Slett chatroom</button>
          </div>
          <ErrorMessage message={errorMessage} />
          <SuccessMessage message={successMessage} />
        </div>
      </div>
    </>
  );
}

export default EditChatRoom;
