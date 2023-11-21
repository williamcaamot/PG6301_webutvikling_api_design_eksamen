import React, {useContext, useState} from "react";
import {AppContext} from "../App.jsx";
import Profile from "./Profile.jsx";
import {useNavigate} from "react-router-dom";

function PersonalProfilePage() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState();

    async function handleLogout() {
        try {
            await fetch("/api/v1/login", {
                method: "DELETE"
            });
            setUser(null);
            navigate("/");
        } catch (e) {
            setErrorMessage(e.message)
        }
    }

    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <Profile
                    user={user}/>
                <div style={{width: "100%", paddingTop:"20px"}}>
                    <button onClick={handleLogout}>Logg ut</button>
                    <button>Rediger profil</button>
                    <button>Se mine chat-rom</button>
                </div>
            </div>

        </div>
    </>
}

export default PersonalProfilePage;