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
                    src={"https://lh3.googleusercontent.com/a/ACg8ocIOgSmXkWTJqoKPe5Hk3JlkkhfUNer4sWkVo3UuIa_dzg=s96-c"}/>
            </div>
            <div><p
                style={{padding:"5px"}}
            >{props.message.sender}:</p></div> {/*TODO change to nickname*/}


            <div>
                <p>{props.message.message}</p>
            </div>

        </div>


    </>
}

export default Message;