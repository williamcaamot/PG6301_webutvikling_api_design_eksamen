import React, {useState} from "react";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import {useMatch} from "react-router-dom";

function ProfilePage() {

    const match = useMatch("/profile/:email");
    const email = match.params.email;

    const [user, setUser] = useState();
    const [errorMessage, setErrorMessage] = useState();


    async function getUser() {
        try {
            const res = await fetch(`/api/v1/profile/${email}`);
            const {message, data} = await res.json();

        } catch (e) {
            setErrorMessage(e.message);
        }
    }


    return <>
        <ErrorMessage message={errorMessage}/>
    </>
}

export default ProfilePage;