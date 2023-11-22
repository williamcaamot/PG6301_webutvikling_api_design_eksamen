import fetchJSON from "./fetchJSON.js";
import { Timestamp } from "mongodb";

export async function fetchUserInfo(openid_configuration, access_token, db) {
  try{
    const { userinfo_endpoint } = await fetchJSON(openid_configuration);
    const res = await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (await db.collection("users").findOne({ email: data.email })) {
        try {
          //TODO this needs some rework if it's supposed to work if someone changes their openid account details...
          const userFromDb = await db
              .collection("users")
              .findOne({ email: data.email });
          data.nickname = userFromDb.nickname;
          data.bio = userFromDb.bio;
        } catch (e) {
          console.log(e.message);
        }
      } else {
        try {
          data.bio =
              "Som alle andre på denne siden, er jeg en STOR fan av online chat-rom!";
          data.nickname = data.given_name || data.givenname;
          await db.collection("users").insertOne(data);
        } catch (e) {
          console.log(e.message);
        }
      }

      return data; //Goal is to return a user with additional information NOT from openid
    } else if (res.status !== 401) {
      throw new Error("Failed to fetch userinfo " + res.statusCode);
    }
  }catch (e) {
    console.log(e.message);
  }

}

export function userinfoMiddleware(db) {
  return async (req, res, next) => {
    const { access_token, login_provider } = req.signedCookies;
    if (access_token) {
      let user;
      if (login_provider === "google") {
        user = await fetchUserInfo(
          process.env.GOOGLE_OPENID_CONFIGURATION,
          access_token,
          db,
        );
      } else if (login_provider === "entraid") {
        user = await fetchUserInfo(
          process.env.ENTRA_OPENID_CONFIGURATION,
          access_token,
          db,
        );
      }
      if (user) {
        try {
          req.user = {
            //need to destructure the info from fetching user info because it's not identical across the two providers...
            name: user.given_name || givenname,
            family_name: user.family_name || familyname,
            email: user.email,
            picture: user.picture,
            nickname: user.nickname,
            bio: user.bio,
          };
        } catch (e) {
          console.log(e);
        }
      }
    }
    next();
  };
}