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

    it("Should return not authorized", async() => {
        const res = await request(app).get("/chatroom");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must be logged in to view chatrooms!");
    })
})