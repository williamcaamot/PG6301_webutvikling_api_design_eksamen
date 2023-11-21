import React, {useEffect, useState} from "react";
import ChatRoomListing from "./ChatRoomListing.jsx";

function Chat() {


    const [chatRooms, setChatRooms] = useState([]);

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
                        <div style={{width:"90%"}}> {/*TODO SHOULD BE ABLE TO BE 100% */}
                            {chatRooms && chatRooms.map(e => {
                                return (<ChatRoomListing
                                        title={e.title}
                                        description={e.description}
                                        key={e._id}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className={"chatWindow"}>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Chat;