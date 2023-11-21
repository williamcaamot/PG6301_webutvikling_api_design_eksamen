import express from "express";


function chatApi(db) {
    const router = express.Router();

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