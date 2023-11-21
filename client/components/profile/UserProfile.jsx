import React from "react";

function UserProfile(props) {

    if (props.user) return (
        <div className={"userProfile"}>
            <img src={props.user.picture} alt="User Profile" />
            <p>Name: {props.user.name} {props.user.family_name}</p>
            <p>Email: {props.user.email}</p>
        </div>
    );
}

export default UserProfile;
