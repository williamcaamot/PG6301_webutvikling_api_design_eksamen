import React, {useContext, useEffect, useState} from "react";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import {useFetcher} from "react-router-dom";
import Message from "./Message.jsx";
import {AppContext} from "../App.jsx";


function ChatWindow(props) {
    const { user } = useContext(AppContext);
    const [ws, setWs] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState();



    async function getMessages() {
        try {
            const res = await fetch(`/api/v1/chatroom/${props.acticeChatRoom}`);
            const {message, data} = await res.json();
            if(res.status !== 200){
                setErrorMessage(message);
                return;
            }
            console.log(data.messages)
            setMessages(data.messages)
            setErrorMessage(null);

        } catch (e) {
            setErrorMessage(e.message)
        }
    }

    async function handleSendMessage(e) {
        e.preventDefault();
        ws.send(JSON.stringify({chatroomid: props.acticeChatRoom, message:newMessage, user: user}))
        setNewMessage("");
    }


    useEffect(() => {
        getMessages();
    }, [props.acticeChatRoom]);

    useEffect(() => {
        const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
        setWs(ws);
        ws.onmessage = (event) => {
            const {chatroomid, message, user} = JSON.parse(event.data);
            console.log(chatroomid);
            console.log(message);
            if (chatroomid === props.acticeChatRoom) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        }
    }, []);

    return <>
        <div style={{width:"100%", flexWrap:"wrap"}}>
        <ErrorMessage message={errorMessage}/>
        <div style={{width:"100%"}}>
        {messages && messages.map(e => {
            return (
                <Message message={e}
                key={e.index}/>
            )
        })
        }
        </div>
        <div style={{width:"100%"}}>
            <form onSubmit={handleSendMessage}>
                <input placeholder={"message"} value={newMessage} onInput={e => setNewMessage(e.target.value)}/>
                <button>Send message</button>
            </form>
        </div>
        </div>
    </>
}

export default ChatWindow;