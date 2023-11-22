import express from "express";
import {ObjectId} from "mongodb";


function chatApi(db, sockets) {
    const router = express.Router();

    router.get("/chatroom/:id", async(req, res) => {
        console.log("Someone getting chatroom by id");
        try {
            const id = new ObjectId(req.params.id);
            const data = await db.collection("chatrooms").findOne( {_id: id});
            res.status(200);
            res.json({message: "Success", data: data});
        } catch (e) {
            res.status(404)
            res.json({message: "Something went wrong in the server, message: " + e.message});
        }
    })

    //TODO REMOVE THIS ONCE CERTAIN IT IS NO LONGER IN USE (REPLACED BY SOCKETS!)
    router.post("/chatroom/:id", async(req, res) => {
        console.log("Someone sending message");
        try {
            if (!req.user) {
                res.status(401);
                res.json({message: "You must be logged in to send messages!"});
                return;
            }
            console.log(req.body)
            const message = {
                sender: req.user.email,
                nickname: req.user.nickname,
                picture: req.user.picture,
                message: req.body.message,
                time: new Date(),
            }
            console.log(message);
            const id = new ObjectId(req.params.id);
            let resdata = await db.collection("chatrooms").updateOne(
                { _id: id },
                { $push: { messages: message } }
            );
            for(const s of sockets){
                s.send(`Updated ${new Date()}`);
            }
            res.status(200); //TODO fix status code
            res.json({message: "Success", data: resdata});
        } catch (e) {
            res.status(404)
            res.json({message: "Something went wrong in the server, message: " + e.message});
        }
    })



    router.get("/chatroom", async(req, res) => {
        try {
            const data = await db.collection("chatrooms").find().toArray();
            res.status(200);
            res.json({message: "Success", data: data});
        } catch (e) {
            res.status(404)
            res.json({message: "Something went wrong in the server, message: " + e.message});
        }
    })


    router.post("/chatroom",async (req, res) => {
        try {
            if (!req.user) {
                res.status(401);
                res.json({message: "You must be logged in to add a chatroom"});
                return;
            }
            if(req.body.title.length < 5 || req.body.description < 5 ){
                res.status(409);
                res.json({message: "The title or description is not long enough (minimum 5 characters)"});
                return;
            }
            if(await db.collection("chatrooms").findOne({ title: req.body.title })){
                console.log("Found exisiting chatroom");
                res.status(409);
                res.json({message: "A chatroom with this title already exists!"});
                return;
            }
            const chatroom = {
                owner: req.user.email,
                title: req.body.title,
                description: req.body.description,
                messages: []
            }
            const dbres = await db.collection("chatrooms").insertOne(chatroom);
            res.status(201);
            res.json({message: `Sucessfully added the chatroom with ID: ${dbres.insertedId}`, data: dbres});

        } catch (e) {
            res.json({message: "Something went wrong in the server, message: " + e.message});
        }
    })







    return router;
}


export default chatApi;