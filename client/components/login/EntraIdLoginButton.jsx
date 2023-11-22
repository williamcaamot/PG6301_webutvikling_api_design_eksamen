import {useEffect, useState} from "react";

function EntraLoginButton({applicationConfig}) {


    const [authorizationUrl, setAuthorizationUrl] = useState();

    async function loadAuthorizationUrl() {
        const {openid_configuration_entraid, client_id_entraid} = applicationConfig;
        const {authorization_endpoint} = await fetchJSON(openid_configuration_entraid);
        const redirect_url = window.location.origin + "/login/callback/entraid";

        const code_verifier = randomString(50);
        window.sessionStorage.setItem("code_verifier", code_verifier);
        const state = randomString(50);
        window.sessionStorage.setItem("state", state);
        const code_challenge = await sha256(code_verifier);


        setAuthorizationUrl(
            authorization_endpoint +
            "?" +
            new URLSearchParams({
                response_mode: "fragment",
                response_type: "code",
                scope: "openid email profile",
                client_id: client_id_entraid,
                redirect_url,
                code_challenge,
                code_challenge_method: "S256",
                state,
            }),
        );
    }


    useEffect(() => {
        loadAuthorizationUrl();
    }, []);

    return <>
        <div style={{padding:"15px"}}>
            <a href={authorizationUrl} className={"entraIdLoginButton"}>
                Log in with Microsoft
            </a>
        </div>
    </>
}

export default EntraLoginButton;

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function sha256(string) {
    const binaryHash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder("utf-8").encode(string),
    );
    return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
        .split("=")[0]
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
    }
    return await res.json();
}