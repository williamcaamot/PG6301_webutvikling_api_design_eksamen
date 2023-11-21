import React, {useContext} from "react";
import {AppContext} from "../App.jsx";

function Profile() {


    const {user} = useContext(AppContext);

    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <div style={{width:"100%"}}>
                    <h2>{user && user.name} {user && user.family_name}</h2>
                </div>
                <div style={{width:"100%"}}>
                    <p>E-post: {user && user.email}</p>
                </div>
                <div style={{width:"100%"}}>
                    <p>Kallenavn</p>
                </div>
                <div style={{width:"100%"}}>
                    <p>Bio:</p>
                </div>
            </div>
        </div>
    </>
}

export default Profile;