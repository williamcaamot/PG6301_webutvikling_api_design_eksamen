import { useEffect, useState } from "react";
import ErrorMessage from "../globals/ErrorMessage.jsx";

function GoogleLoginButton({ applicationConfig }) {
    const [errorMessage, setErrorMessage] = useState();
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function loadAuthorizationUrl() {
      try{
          const { openid_configuration, client_id } = applicationConfig;
          const { authorization_endpoint } = await fetchJSON(openid_configuration);
          const redirect_uri = window.location.origin + "/login/callback/google";
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
      }catch (e) {
          setErrorMessage(e.message);
      }
  }

  useEffect(() => {
    loadAuthorizationUrl();
  }, []);

  return (
    <>
      <div style={{ padding: "15px" }}>
        <a href={authorizationUrl} className={"googleLoginButton"}>
          Log in with Google
        </a>
      </div>
        <ErrorMessage message={errorMessage}/>
    </>
  );
}

export default GoogleLoginButton;

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
  }
  return await res.json();
}
