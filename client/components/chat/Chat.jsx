import React, {createContext, useEffect, useState} from "react";
import ChatRoomListing from "./ChatRoomListing.jsx";
import ChatWindow from "./ChatWindow.jsx";


export const ChatContext = createContext();

export function Chat() {
    const [errorMessage, setErrorMessage] = useState();

    const [chatRooms, setChatRooms] = useState([]);
    const [activeChatRoom, setActiveChatRoom] = useState(null);

    async function handleFetchChatrooms() {
        try {
            const res = await fetch("/api/v1/chatroom");
            const {message, data} = await res.json();
            if (res.status !== 200) {
                setErrorMessage(message);
                return;
            }
            setChatRooms(data);

        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    async function setChatroom(id) {
        setActiveChatRoom(id);
        //Load messages?
        //Set messages? for chatroom
        //Establish correct websocket?
    }

    useEffect(() => {
        handleFetchChatrooms();
    }, []);


    return <ChatContext.Provider value={{
        chatRooms,
        activeChatRoom,
        setChatroom
    }}>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <div style={{width: "100%", display: "flex"}}>
                    <div className={"chatRooms"}>
                        <div style={{width: "100%", display: "flex", flexWrap: "nowrap"}}>
                            <h2>Available chatrooms:</h2>
                        </div>
                        <div style={{width: "100%"}}>
                            {chatRooms && chatRooms.map(e => {
                                return (<ChatRoomListing
                                    chatRoom={e}
                                    key={e._id}
                                />)
                            })}
                        </div>
                    </div>


                    <div className={"chatWindow"} style={{padding: "15px"}}>
                        {activeChatRoom && <ChatWindow
                            acticeChatRoom={activeChatRoom}
                        />}
                    </div>


                </div>
            </div>
        </div>
    </ChatContext.Provider>
}