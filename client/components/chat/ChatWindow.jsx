import React, {useEffect, useState} from "react";
import ErrorMessage from "../globals/ErrorMessage.jsx";


function ChatWindow(props) {


    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState();

    async function getMessages(){
        try{
            const res = await fetch(`/api/v1/chatroom/${props.acticeChatRoom}`);
            const {message, data} = await res.json();
            console.log(data);
            setMessages(data.messages)
        }
        catch (e) {
            setErrorMessage(e.message)
        }
    }


    async function handleSendMessage(e) {
        e.preventDefault();

        setNewMessage("");
    }

    useEffect(() => {
        getMessages();
    }, [props.acticeChatRoom]);

    return <>
        <ErrorMessage message={errorMessage}/>
        {messages && messages.map(e => {
            return (
            <p>Test</p>
            )
        })
        }
        <form onSubmit={handleSendMessage}>
            <input value={newMessage} onInput={e => setNewMessage(e.target.value)}/>
            <button>Send message</button>
        </form>
    </>
}

export default ChatWindow;