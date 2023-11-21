import React from "react";
import {Link} from "react-router-dom";

function Message(props) {
    return <>
        <div
            style={{
                width: "100%",
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                }}>
                <Link to={`/profile/${props.message.sender}`}
                style={{display:"flex"}}>
                    <div>
                        <img
                            style={{
                                height: "30px"
                            }}
                            src={props.message.picture}/>
                    </div>
                    <div><p
                        style={{padding: "5px"}}
                    >{props.message.nickname}:</p></div>

                </Link>
            </div>
            <div>
                <p>{props.message.message}</p>
            </div>

        </div>


    </>
}

export default Message;