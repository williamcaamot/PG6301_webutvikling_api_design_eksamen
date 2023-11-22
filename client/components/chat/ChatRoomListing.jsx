import React, {useContext} from "react";
import {ChatContext} from "./Chat.jsx";


function ChatRoomListing({chatRoom}) {

    const {setChatroom} = useContext(ChatContext);

    return <>
        <div style={{paddingTop: "15px", width:"100%"}}>
            <div className={"chatRoomListing"}
                onClick={(e) => setChatroom(chatRoom._id, chatRoom.title)}>
                <h3>{chatRoom.title}</h3>
                <p>{chatRoom.description}</p>
            </div>
        </div>
    </>
}

export default ChatRoomListing;