import React, {useEffect, useState} from "react";
import ChatRoomListing from "./ChatRoomListing.jsx";
import ChatWindow from "./ChatWindow.jsx";

function Chat() {





    const [chatRooms, setChatRooms] = useState([]);

    const [activeChatRoom, setActiveChatRoom] = useState(null);

    const [errorMessage, setErrorMessage] = useState();

    async function handleFetchChatrooms() {
        try {
            const res = await fetch("/api/v1/chatroom");
            const {message, data} = await res.json();
            setChatRooms(data);


        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    async function handleSelectChatRoom(id){
        setActiveChatRoom(id);
    }

    async function setActiveChatoom(id){
        setActiveChatRoom(id);
        //Load messages?
        //Set messages? for chatroom
        //Establish correct websocket?
    }

    useEffect(() => {
        handleFetchChatrooms();
    }, []);

    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <div style={{width: "100%", display: "flex"}}>
                    <div className={"chatRooms"}>
                        <div style={{width: "100%", display: "flex", flexWrap: "nowrap"}}>
                            <h2>Available chatrooms:</h2>
                        </div>
                        <div style={{width:"100%"}}>
                            {chatRooms && chatRooms.map(e => {
                                return (<ChatRoomListing
                                        title={e.title}
                                        description={e.description}
                                        key={e._id}
                                        id={e._id}
                                        onSelectChatRoom={handleSelectChatRoom}
                                    />
                                )
                            })}
                        </div>
                    </div>


                    <div className={"chatWindow"} style={{padding:"15px"}}>
                        {activeChatRoom && <ChatWindow
                            acticeChatRoom={activeChatRoom}
                        />}
                    </div>


                </div>
            </div>
        </div>
    </>
}

export default Chat;