import React, {useEffect, useState} from "react";
import EntraLoginButton from "./EntraIdLoginButton.jsx";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

function Login(){

    const [entraIdApplicationConfig, setEntraIdApplicationConfig] = useState();
    const [applicationConfig, setApplicationConfig] = useState();


    async function loadConfig() {
        setApplicationConfig(await fetchJSON("/api/v1/config/google"));
        setEntraIdApplicationConfig(await fetchJSON("/api/v1/config/entraid"));
    }

    useEffect(() => {
        loadConfig();
    }, []);

    if (!applicationConfig) {
        return <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <h2>Loading...</h2>
            </div>
        </div>;
    }
    if(!entraIdApplicationConfig){
        return <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <h2>Loading...</h2>
            </div>
        </div>;
    }



    return <>
        <div className={"pageContentWrapper"}>
            <div className={"innerWrapper"}>
                <h2>Logg inn</h2>
                <div style={{width: "100%", padding: "20px"}}>
                    <GoogleLoginButton
                        applicationConfig={applicationConfig}
                    />
                    <EntraLoginButton
                        applicationConfig={entraIdApplicationConfig}
                    />
                </div>
            </div>
        </div>
    </>
}

export default Login;


async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
    }
    return await res.json();
}