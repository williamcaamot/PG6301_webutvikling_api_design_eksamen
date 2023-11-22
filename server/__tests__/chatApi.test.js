import request from "supertest";

import express from "express";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import chatApi from "../api/chatApi.js";


const app = express();
app.use(express.json());
let client;
jest.setTimeout(30000);

beforeAll(async () => {
    dotenv.config();
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    let db = await client.db("test-exam-database");
    await app.use("", chatApi(db));
})

afterAll(async () => {
    await client.close();  // Close the MongoDB connection
});


describe("chat api", () => {

    it("Should try get chat room by id and return not authorized", async() => {
        const res = await request(app).get("/chatroom/apidwjkpoawdkiwopadkj");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged inn to get a chat room!");
    })


    it("Should try get chat rooms associated with email and return not authorized", async() => {
        const res = await request(app).get("/chatroom/owner/notautheduser@gmail.com");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged inn to list your chat rooms!");
    })


    it("Should  try get chat rooms and return not authorized", async() => {
        const res = await request(app).get("/chatroom");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged in to view chatrooms!");
    })


    it("Should  try create new chat room and return not authorized", async() => {
        const res = await request(app).post("/chatroom").send({
            title:"Chat room title",
            description:"Chat room description"
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged in to add a chatroom");
    })

    it("Should  try update chat room and return not authorized", async() => {
        const res = await request(app).put("/chatroom/dawopijdawoipjwd").send({
            title:"Chat room title",
            description:"Chat room description"
        });
        console.log(res.body);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged in to edit chatroom details!");
    })

    it("Should  try create new chat room and return not authorized", async() => {
        const res = await request(app).delete("/chatroom/doaiwjawodijdwoiaj");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged in to delete a chat room");
    })

})