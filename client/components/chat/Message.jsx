import React from "react";

function Message(props) {
    return <>
        <div
            style={{
                width: "100%",
                display: "flex",
                flexWrap: "nowrap",
                alignItems:"center",
            }}
        >
            <div>
                <img
                    style={{
                        height:"30px"
                    }}
                    src={props.message.picture}/>
            </div>
            <div><p
                style={{padding:"5px"}}
            >{props.message.nickname}:</p></div> {/*TODO change to nickname*/}


            <div>
                <p>{props.message.message}</p>
            </div>

        </div>


    </>
}

export default Message;