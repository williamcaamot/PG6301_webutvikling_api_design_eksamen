import React, {useContext, useState} from "react";
import {AppContext} from "../App.jsx";
import Profile from "./Profile.jsx";
import SuccessMessage from "../globals/SuccessMessage.jsx";
import ErrorMessage from "../globals/ErrorMessage.jsx";

function EditProfilePage() {

    const {user, setUser} = useContext(AppContext);

    const [nickname, setNickname] = useState();
    const [bio, setBio] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    async function handleUpdateUser(event) {
        event.preventDefault();
        const newUserDetails = {nickname: nickname, bio: bio};

        let res = await fetch(`/api/v1/profile/${user.email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserDetails)
        })
        const responseMessage = await res.json();
        if (res.status === 201) {
            setSuccessMessage(responseMessage);
        } else {
            setErrorMessage(responseMessage);
        }
    }

    if (!user) {
        return <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <h2>Du må være logget inn for å kunne redigere profilen sin</h2>
            </div>
        </div>
    }
    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <form onSubmit={handleUpdateUser}>
                    <p>Nickname: <input value={nickname}/></p>
                    <p>Bio: <input value={bio} onInput={event => setBio(event.target.value)}/></p>
                    <button>Endre detaljer</button>
                </form>

                <SuccessMessage message={successMessage}/>
                <ErrorMessage message={errorMessage}/>
            </div>
        </div>
    </>
}

export default EditProfilePage;