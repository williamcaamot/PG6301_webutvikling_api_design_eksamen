import request from "supertest";

import express from "express";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import profileApi from "../api/profileApi.js";


const app = express();
app.use(express.json());
let client;
jest.setTimeout(30000);
//Add custom middleware to add a user? A fake user to the request? To all requests maybe?

beforeAll(async () => {
    dotenv.config();
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    let db = await client.db("test-exam-database");
    await app.use("", profileApi(db));
})



afterAll(async () => {
    await client.close();  // Close the MongoDB connection
});


describe("profile api when not authed", () => {

    it("should return not logged in message with 401 status code", async() => {
        const res = await request(app).get("/profile/coolemail@gmail.com");
        const {message, data} = await (res.body);
        expect(res.status).toBe(401);
        expect(message).toBe("You must be logged in to view user profiles")
    })

    it("should return not logged in message with 401 status code", async() => {
        const res = await request(app).put("/profile/coolemail@gmail.com");
        const {message, data} = await (res.body);
        expect(res.status).toBe(401);
        expect(message).toBe("You must be logged in to view user profiles")
    })




})