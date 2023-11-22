import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App.jsx";
import Profile from "./Profile.jsx";
import SuccessMessage from "../globals/SuccessMessage.jsx";
import ErrorMessage from "../globals/ErrorMessage.jsx";
import { Link, useNavigate } from "react-router-dom";
import { setTimeout } from "stream-http/lib/request.js";

function EditProfilePage() {
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { user, setUser } = useContext(AppContext);

  const [nickname, setNickname] = useState();
  const [bio, setBio] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setBio(user.bio);
    }
  }, [user]);

  async function handleUpdateUser(event) {
    event.preventDefault();
    const newUserDetails = { nickname: nickname, bio: bio };

    let res = await fetch(`/api/v1/profile/${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserDetails),
    });
    const { message, data } = await res.json();
    if (res.status === 201) {
      console.log(data);
      setUser(data);
      setSuccessMessage(message);
      setErrorMessage(null);
      navigate("/profile");
    } else {
      setErrorMessage(message);
    }
  }

  if (!user) {
    return (
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          <h2>Du må være logget inn for å kunne redigere profilen sin</h2>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={"pageContentWrapper"}>
        <div className={"innerWrapper"}>
          <form onSubmit={handleUpdateUser}>
            <p>
              Nickname:{" "}
              <input
                value={nickname}
                onInput={(event) => setNickname(event.target.value)}
              />
            </p>
            <p>
              Bio:{" "}
              <input
                value={bio}
                onInput={(event) => setBio(event.target.value)}
              />
            </p>
            <button>Oppdater</button>
            <Link to={"/profile"}>
              <button>Avbryt, gå tilabke</button>
            </Link>
          </form>

          <SuccessMessage message={successMessage} />
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
