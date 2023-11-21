import React from "react";
import GoogleLoginButton from "../login/GoogleLoginButton.jsx";
import EntraLoginButton from "../login/EntraIdLoginButton.jsx";
function Home(){
    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <div style={{width:"100%"}}><h2>Velkommen til denne chatte appen!</h2></div>
                <p>Her kan alle registrerte brukere chatte med hverandre i forskjellige chat rom.</p>
                <p>Du kan logge inn med Google eller Microsoft Entra ID.</p>
            </div>
        </div>
    </>
}

export default Home;