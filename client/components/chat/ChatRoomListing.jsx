import React from "react";


function ChatRoomListing(props) {
    //TODO need some clever onclick stuffy here, to set chatroom
    return <>
        <div style={{paddingTop: "15px", width:"100%"}}>
            <div className={"chatRoomListing"}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    </>
}

export default ChatRoomListing;