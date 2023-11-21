import React from "react";

function UserProfile(props) {
    console.log(props);
    if (props.user) return (
        <div className={"userProfile"}>
            <img src={props.user.picture} alt="User Profile" />
            <p>Kallenavn: {props.user.nickname} </p>
            <p>Fult navn: {props.user.name} {props.user.family_name}</p>
            <p>E-post: {props.user.email}</p>
            <p>Om meg: {props.user.bio}</p>

        </div>
    );
}

export default UserProfile;
