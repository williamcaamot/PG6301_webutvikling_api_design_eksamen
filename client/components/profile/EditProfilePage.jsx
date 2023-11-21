import React, {useContext} from "react";
import {AppContext} from "../App.jsx";
import Profile from "./Profile.jsx";

function EditProfilePage(){

    const {user, setUser} = useContext(AppContext);
    if(!user){
        return<div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <h2>Du må være logget inn for å kunne redigere profilen sin</h2>
            </div>
        </div>
    }
    return<>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <p>Nickname: <input/></p>
                <p>Bio: <input/></p>

            </div>
        </div>
    </>
}

export default EditProfilePage;