import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../App.jsx";

function Header() {

    const { user } = useContext(AppContext);

    return <>
        <div className={"flexWrapper"}>
            <div className={"headerWrapper"}>
                <div style={{padding:"30px"}}>
                    <h1>ChatMania</h1>
                </div>
                <div>
                    <nav>
                        <Link to="/" className={"mainMenuLink"}>Hjem</Link>
                        <Link to="/chat" className={"mainMenuLink"}>Chat</Link>
                        <Link to="/chatroom/add" className={"mainMenuLink"}>Add new chat room</Link>
                        {user ?
                            <Link to="/profile" className={"mainMenuLink"}>Velkommen, {user.nickname}</Link>
                            :
                            <Link to="/login" className={"mainMenuLink"}>Logg inn</Link>
                        }
                    </nav>
                </div>
            </div>
        </div>
    </>
}

export default Header;