import fetchJSON from "./fetchJSON.js";
import {Timestamp} from "mongodb";

export async function fetchUserInfo(openid_configuration, access_token, db) {

    const {userinfo_endpoint} = await fetchJSON(openid_configuration);
    const res = await fetch(userinfo_endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;

    } else if (res.status !== 401) {
        throw new Error("Failed to fetch userinfo " + res.statusCode);
    }
}

export function userinfoMiddleware(db) {
    return async (req, res, next) => {
        const {access_token, login_provider} = req.cookies;
        if (access_token) {
            let user;
            if (login_provider === "google") {
                user = await fetchUserInfo(process.env.GOOGLE_OPENID_CONFIGURATION, access_token, db);
            } else if (login_provider === "entraid") {
                user = await fetchUserInfo(process.env.ENTRA_OPENID_CONFIGURATION, access_token, db);
            }
            if (user) {
                try {
                    req.user = { //need to destructure the info from fetching user info because it's not identical across the two providers...
                        name: user.given_name || givenname,
                        family_name: user.family_name || familyname,
                        email: user.email,
                        picture: user.picture
                    }

                } catch (e) {
                    console.log(e)

                }
            }
        }
        next();
    };
}