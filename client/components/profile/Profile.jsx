import React, {useContext, useState} from "react";
import {AppContext} from "../App.jsx";
import UserProfile from "./UserProfile.jsx";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState();

    async function handleLogout(){
        try{
            await fetch("/api/v1/login", {
                method: "DELETE"
            });
            setUser(null);
            navigate("/");
        }catch (e){
            setErrorMessage(e.message)
        }
    }

    return <>
    <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
            <UserProfile
                user={user}/>
            <div style={{width:"100%"}}>
            <button onClick={handleLogout}>Logg ut</button>
            </div>
    </div>

    </div>
</>
}

export default Profile;