import {useEffect, useState} from "react";

function GoogleLoginButton({applicationConfig}) {

    const [authorizationUrl, setAuthorizationUrl] = useState();

    async function loadAuthorizationUrl() {
        const {openid_configuration, client_id} = applicationConfig;
        const {authorization_endpoint} = await fetchJSON(openid_configuration);
        const redirect_uri = window.location.origin + "/login/callback";
        setAuthorizationUrl(
            authorization_endpoint +
            "?" +
            new URLSearchParams({
                response_type: "token",
                scope: "email profile",
                client_id,
                redirect_uri,
            }),
        );
    }

    useEffect(() => {
        loadAuthorizationUrl();
    }, []);

    return <>
        <div style={{padding:"15px"}}>
            <a href={authorizationUrl} style={{
                display:"flex",
                width:"200px",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor: '#DB4437', // Google red color
                color: 'white',
                padding: '10px 20px',
                borderRadius: '3px',
                textDecoration: 'none',
                fontFamily: 'Roboto, sans-serif', // Google's font
                fontWeight: '500',
                fontSize: '16px',
                textAlign: 'center',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)'
            }}>
                Log in with Google <img
                style={{
                    width:"30px",
                    paddingLeft:"20px"
                }}src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Google_account_icon.svg/1606px-Google_account_icon.svg.png"}/>
            </a>
        </div>
    </>
}

export default GoogleLoginButton;


async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
    }
    return await res.json();
}