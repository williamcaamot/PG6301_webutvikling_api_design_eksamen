import express from "express";
import {fetchUserInfo} from "./userInfoMiddleware.js";

function loginAPI(db) {
    const userRouter = express.Router();


    //TODO SHOULD ACCESS TOKEN COOKIE BE SIGNED?

    const openid_configuration = process.env.GOOGLE_OPENID_CONFIGURATION;
    const client_id = process.env.GOOGLE_CLIENT_ID;

    // GOOGLE
    userRouter.get("/config/google", (req, res) => {
        const user = req.user; //Don't really need user here because of the login endpoint further down
        res.send({user, openid_configuration, client_id});
    });

    userRouter.post("/login/google", async (req, res) => {
        const {access_token} = req.body;
        const user = await fetchUserInfo(openid_configuration, access_token);
        if(user){
            res.cookie("access_token", access_token);
            res.cookie("login_provider","google");
            await db
                .collection("users")
                .insertOne({user: user, username: user.given_name, date: new Date()});
            res.status(201);
            res.json(userDetails(user));
        }
        else{
            res.sendStatus(401);
        }
    });



    const openid_configuration_entraid = process.env.ENTRA_OPENID_CONFIGURATION;
    const client_id_entraid = process.env.ENTRA_CLIENT_ID;
    //ENTRA ID

    userRouter.get("/config/entraid", (req, res) => {
        const user = req.user;
        res.send({user, openid_configuration_entraid, client_id_entraid});
    });

    userRouter.post("/login/entraid", async (req, res) => {
        const {access_token} = req.body;
        const user = await fetchUserInfo(openid_configuration_entraid, access_token);
        if(user){
            res.cookie("access_token", access_token);
            res.cookie("login_provider","entraid");
            await db
                .collection("users")
                .insertOne({user: user, username: user.givenname, date: new Date()});
            res.status(201);
            res.json(userDetails(user));
        }else{
            res.sendStatus(401);
        }
    })


    // Endpoints that work for both google and entra id
    userRouter.get("/login", async (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.sendStatus(401);
        }
    });
    userRouter.delete("/login", (req, res) => {
        res.clearCookie("username");
        res.clearCookie("access_token");
        res.sendStatus(204);
    });

    return userRouter;
}

export default loginAPI;

function userDetails(user){
    let newUser = {
        name: user.given_name || givenname,
        family_name: user.family_name || familyname,
        email: user.email,
        picture: user.picture
    };
    return newUser;
}