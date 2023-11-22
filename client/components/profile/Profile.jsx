import React from "react";

function Profile(props) {
  if (!props.user) {
    return <h2>Loading...</h2>;
  }

  if (props.user)
    return (
      <div>
        <div className={"userProfile"}>
          <img src={props.user.picture} alt="User Profile" />
          <p>Kallenavn: {props.user.nickname} </p>
          <p>
            Fult navn: {props.user.name} {props.user.family_name}
          </p>
          <p>E-post: {props.user.email}</p>
          <p>Om meg: {props.user.bio}</p>
        </div>
      </div>
    );
}

export default Profile;
