import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return <>
        <div className={"flexWrapper"}>
            <div className={"headerWrapper"}>
                <div>
                    <h1>Banter Battle - Chat website</h1>
                </div>
                <div>
                    <nav>
                        <Link to="/" className={"mainMenuLink"}>Hjem</Link>
                        <Link to="/" className={"mainMenuLink"}>Chat</Link>

                    </nav>
                </div>
                <div>
                    <Link to="/login" className={"mainMenuLink"}>Logg inn</Link>
                </div>
            </div>
        </div>
    </>
}

export default Header;