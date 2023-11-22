import React, {useContext} from "react";
import {ChatContext} from "./Chat.jsx";
import {Link} from "react-router-dom";


function ChatRoomListing({chatRoom, user}) {


    if (!user) {
        const {setChatroom} = useContext(ChatContext);

        return <>
            <div style={{paddingTop: "15px", width: "100%"}}>
                <div className={"chatRoomListing"}
                     onClick={(e) => setChatroom(chatRoom._id, chatRoom.title)}>
                    <h3>{chatRoom.title}</h3>
                    <p>{chatRoom.description}</p>
                </div>
            </div>
        </>
    }

    return <>
        <div style={{paddingTop: "15px", width: "100%"}}>
            <Link to={`/chatroom/edit/${chatRoom._id}`} style={{textDecoration: "none"}}>
                <div className={"chatRoomListing"}>
                    <h3>{chatRoom.title} - <span style={{textDecoration: "underline"}}>Trykk her for å redigere eller slette chatroom</span>
                    </h3>
                    <p>{chatRoom.description}</p>
                </div>
            </Link>
        </div>


    </>

}

export default ChatRoomListing;