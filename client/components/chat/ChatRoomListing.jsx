import React from "react";


function ChatRoomListing(props) {
    return <>
        <div style={{paddingTop: "15px", width:"100%"}}>
            <div className={"chatRoomListing"}
                onClick={(e) => props.onSelectChatRoom(props.id)}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    </>
}

export default ChatRoomListing;