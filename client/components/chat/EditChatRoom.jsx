import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App.jsx";
import {Link, useMatch} from "react-router-dom";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import ChatRoomListing from "./ChatRoomListing.jsx";
import ChatWindow from "./ChatWindow.jsx";


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
            const {message, data} = await res.json();
            if (res.status !== 200) {
                setMessages([]);
                setErrorMessage(message);
                return;
            }
            setChatRoom(data);
            setChatRoomTitle(data.title);
            setChatRoomDescription(data.description)
            console.log(data);
            setErrorMessage(null);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    useEffect(() => {
        loadChatRoom();
    }, []);

    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <ErrorMessage message={errorMessage}/>
                {chatRoom &&
                    <form>
                        <p>New title: <input value={chatRoomTitle} onChange={(e) => setChatRoomTitle(e.target.value)}/></p>
                        <p>New description: <input value={chatRoomDescription} onChange={(e) => setChatRoomDescription(e.target.value)}/></p>
                        <button>Oppdater</button><Link to={"/profile"}><button>Avbryt, gå tilabke</button></Link>
                    </form>
                }
            </div>
        </div>
    </>
}

export default EditChatRoom;