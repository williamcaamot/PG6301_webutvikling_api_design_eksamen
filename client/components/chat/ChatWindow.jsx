import React, {useEffect, useState} from "react";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import {useFetcher} from "react-router-dom";
import Message from "./Message.jsx";


function ChatWindow(props) {


    const [update, setUpdated] = useState();
    const [ws, setWs] = useState();

    useEffect(() => {
        const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
        setWs(ws);
        ws.onmessage = (event) => {
            console.log(event.data);
            setUpdated(event.data);
        }
    }, []);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState();

    async function getMessages() {
        try {
            const res = await fetch(`/api/v1/chatroom/${props.acticeChatRoom}`);
            const {message, data} = await res.json();
            setMessages(data.messages)
            setErrorMessage(null);
        } catch (e) {
            setErrorMessage(e.message)
        }
    }


    async function handleSendMessage(e) {
        e.preventDefault();

        const res = await fetch(`/api/v1/chatroom/${props.acticeChatRoom}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message: newMessage})
        })
        setNewMessage("");
    }


    useEffect(() => {
        getMessages();
    }, [update]);

    return <>
        <div style={{width:"100%", flexWrap:"wrap"}}>
        <ErrorMessage message={errorMessage}/>
        <div style={{width:"100%"}}>
        {messages && messages.map(e => {
            return (
                <Message message={e}/>
            )
        })
        }
        </div>
        <div style={{width:"100%"}}>
            <form onSubmit={handleSendMessage}>
                <input value={newMessage} onInput={e => setNewMessage(e.target.value)}/>
                <button>Send message</button>
            </form>
        </div>
        </div>
    </>
}

export default ChatWindow;