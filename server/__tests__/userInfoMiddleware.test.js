import request from "supertest";

import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import loginAPI from "../api/loginApi.js";
import { userinfoMiddleware } from "../api/userInfoMiddleware.js";

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
  await app.use("", loginAPI(db));
  await app.use(userinfoMiddleware(db));
});

afterAll(async () => {
  await client.close(); // Close the MongoDB connection
});

describe("testing that middleware dont apply users if not authed", () => {
  it("should return 401 not logged in", async () => {
    const res = await request(app).get("/login/");
    const { message, data } = await res.body;
    expect(res.status).toBe(401);
    expect(message).toBe("Not logged in");
  });
});
