import { useEffect, useState } from "react";

function GoogleLoginButton({ applicationConfig }) {
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function loadAuthorizationUrl() {
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
