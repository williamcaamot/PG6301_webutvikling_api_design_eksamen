import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import {AppContext} from "../App.jsx";

function GoogleLoginCallback() {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const { setUser } = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState()

    async function handleCallback(){
        const callbackParameters = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1)),
        );



        const {access_token} = callbackParameters;
        const res = await fetch("/api/v1/login/google", {
            method: "POST",
            body: JSON.stringify({ access_token: access_token }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (!res.ok) {
            setError(await res.text());
            return
        }
        const user = await res.json();
        setUser(user);
        navigate("/");
    }

    useEffect(() => {
        handleCallback();
    }, []);

    return<>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <div><h2>Logging in with Google... Please wait</h2></div>
                <ErrorMessage message={errorMessage}/>
            </div>
        </div>

    </>
}
export default GoogleLoginCallback;