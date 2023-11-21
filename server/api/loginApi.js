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
        const user = await fetchUserInfo(openid_configuration, access_token, db);
        if(user){
            res.cookie("access_token", access_token);
            res.cookie("login_provider","google");
            await db
                .collection("userLogins")
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
        const user = await fetchUserInfo(openid_configuration_entraid, access_token, db);
        if(user){
            res.cookie("access_token", access_token);
            res.cookie("login_provider","entraid");
            await db
                .collection("userLogins")
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


    userRouter.get("/profile/:email", async (req, res)=>{
        console.log("fetching user");
        try{
            if(!req.user){
                res.status(401);
                res.json({message:"You must be logged in to view this"});
                return
            }
            const email = req.params.email;
            if(await db.collection("users").findOne({ email: email })){
                const data = await db.collection("users").findOne({ email: email });
                res.status(200);
                res.json({message:"Successfully found user", data: userDetails(data)});
            } else{
                res.status(404);
                res.json({message:"Could not find user"});
            }
        } catch (e){
            res.status(404);
            res.json("Internal server error");
        }
    })





    userRouter.put("/profile/:email", async(req, res)=>{
        const email = req.params.email;
        const data = await db.collection("users").findOne({ email: email });
        if(!req.user){
            res.sendStatus(401);
            return;
        }
        const newUser = {
            name: req.user.given_name || req.user.givenname,
            family_name: req.user.family_name || req.user.familyname,
            email: req.user.email,
            picture: req.user.picture,
            nickname: req.body.nickname,
            bio: req.params.bio
        }
        console.log(newUser);
        if(data){
            if(data.email !== newUser.email){
                res.sendStatus(401);
            }
            let resdata = await db.collection("users").updateOne(
                { email: email }, // The filter to match the document you want to update
                { $set: newUser } // The update document
            );
            res.status(201);
            res.json("Updated user");
        }else{
            res.status(401);
            res.json("Could not find user to update!");
        }
    })
















    return userRouter;
}

export default loginAPI;

function userDetails(user){
    let newUser = {
        name: user.given_name || givenname,
        family_name: user.family_name || familyname,
        email: user.email,
        picture: user.picture,
        nickname: user.nickname,
        bio: user.bio
    };
    return newUser;
}