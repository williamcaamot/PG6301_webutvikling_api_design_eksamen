import React, { useState } from "react";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import SuccessMessage from "../globals/SuccessMessage.jsx";
import { METHODS } from "stream-http";
import { Link } from "react-router-dom";

function AddNewChatroom() {
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [chatRoomDescription, setChatRoomDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  async function handleAddChatRoom(e) {
    e.preventDefault();
    try {
      const chatroom = {
        title: chatRoomTitle,
        description: chatRoomDescription,
      };
      const res = await fetch("/api/v1/chatroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatroom),
      });
      const { data, message } = await res.json();
      if (res.status !== 201) {
        //TODO Make this logic better
        setSuccessMessage(null);
        setErrorMessage(message || "En ukjent feil har oppstått");
        return;
      }
      setErrorMessage(null);
      setSuccessMessage(message);
    } catch (e) {
      setSuccessMessage(null);
      setErrorMessage(e.message);
    }
  }

  return (
    <>
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          <h2>Add new chat room</h2>
          <div style={{ width: "100%", display: "flex" }}>
            <form onSubmit={handleAddChatRoom}>
              <p>
                Name of chatroom:{" "}
                <input
                  placeholder={"Title"}
                  value={chatRoomTitle}
                  onChange={(e) => setChatRoomTitle(e.target.value)}
                />
              </p>
              <br />
              <p>
                Description of chatroom:{" "}
                <input
                  placeholder={"What is the chatroom about?"}
                  value={chatRoomDescription}
                  onChange={(e) => setChatRoomDescription(e.target.value)}
                />
              </p>
              <br />
              <button>Legg til chatroom</button>
            </form>
          </div>
          <ErrorMessage message={errorMessage} />
          <SuccessMessage message={successMessage} />
        </div>
      </div>
    </>
  );
}
export default AddNewChatroom;
