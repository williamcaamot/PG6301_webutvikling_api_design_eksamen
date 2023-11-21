import express from "express";
import {MongoClient} from "mongodb";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as path from "path";

const app = express();
const port = 3002;
dotenv.config();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));


// DB CONNECTION
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("examwebandapi");

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