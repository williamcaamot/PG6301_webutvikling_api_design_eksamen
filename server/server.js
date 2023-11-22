import express from "express";
import {MongoClient, ObjectId} from "mongodb";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as path from "path";
import loginApi from "./api/loginApi.js";
import {userinfoMiddleware} from "./api/userInfoMiddleware.js";
import chatApi from "./api/chatApi.js";
import {WebSocketServer} from "ws";

const app = express();
const port = 3002;
dotenv.config();


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// DB CONNECTION
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("examwebandapi");

app.use(userinfoMiddleware(db));

const sockets = [];

app.use("/api/v1", loginApi(db));
app.use("/api/v1", chatApi(db, sockets));


app.use(express.static("../client/dist/"));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

let server;
// Only start application if connection can be established to DB
await client.connect().then(() => {
    server = app.listen(process.env.PORT || port, () => {
        console.log(`Server is running`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});


const webSocketServer = new WebSocketServer({noServer: true});
server.on("upgrade", (req, socket, head) => {
    webSocketServer.handleUpgrade(req, socket, head, (socket) => {
        sockets.push(socket);
        socket.on("message", async (msg) => {
            const {chatroomid, message, user} = JSON.parse(msg);
            const newMessage = {
                message: message,
                sender: user.email, //TODO NEED ERROR HANDLING HERE, IF NOT ALL DETAILS NOW THE APP WILL CRASH
                nickname: user.nickname,
                picture: user.picture,
                time: new Date(),
            }
            for (const s of sockets) {
                s.send(JSON.stringify({
                    message: newMessage,
                    chatroomid: chatroomid
                }))
            }
            console.log(chatroomid);
            const id = new ObjectId(chatroomid);
            let resdata = await db.collection("chatrooms").updateOne(
                {_id: id},
                {$push: {messages: newMessage}}
            );
        })
    })
})
