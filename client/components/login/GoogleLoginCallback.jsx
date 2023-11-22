import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import { AppContext } from "../App.jsx";
import SuccessMessage from "../globals/SuccessMessage.jsx";

function GoogleLoginCallback() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  async function handleCallback() {
    try {
      const callbackParameters = Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1)),
      );
      const { access_token } = callbackParameters;
      const res = await fetch("/api/v1/login/google", {
        method: "POST",
        body: JSON.stringify({ access_token: access_token }),
        headers: {
          "content-type": "application/json",
        },
      });
      const { message, data } = await res.json();
      if (res.status !== 201) {
        setErrorMessage(message || "En ukjent feil har oppstått");
        return;
      }
      setSuccessMessage(message);
      setUser(data);
      navigate("/");
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <>
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          <div>
            <h2>Logging in with Google... Please wait</h2>
          </div>
          <ErrorMessage message={errorMessage} />
          <SuccessMessage message={successMessage} />
        </div>
      </div>
    </>
  );
}
export default GoogleLoginCallback;
