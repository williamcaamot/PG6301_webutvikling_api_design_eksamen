import fetchJSON from "./fetchJSON.js";
import {Timestamp} from "mongodb";

export async function fetchUserInfo(openid_configuration, access_token) {

    const {userinfo_endpoint} = await fetchJSON(openid_configuration);
    const res = await fetch(userinfo_endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    if (res.ok) {
        return await res.json();
    } else if (res.status !== 401) {
        throw new Error("Failed to fetch userinfo " + res.statusCode);
    }
}

export function userinfoMiddleware() {
    return async (req, res, next) => {
        const {access_token, login_provider} = req.cookies;
        if (access_token) {
            let user;
            if (login_provider === "google") {
                user = await fetchUserInfo(process.env.GOOGLE_OPENID_CONFIGURATION, access_token);
            } else if (login_provider === "entraid") {
                user = await fetchUserInfo(process.env.ENTRA_OPENID_CONFIGURATION, access_token);
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