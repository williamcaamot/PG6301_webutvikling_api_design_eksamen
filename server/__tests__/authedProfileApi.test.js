import request from "supertest";

import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import chatApi from "../api/chatApi.js";
import profileApi from "../api/profileApi.js";

function addFakeUserMiddleware(db) {
  return async (req, res, next) => {
    req.user = {
      //need to destructure the info from fetching user info because it's not identical across the two providers...
      name: "Test",
      family_name: "User",
      email: "test@user.com",
      picture: "imagelinkdoesntmatterhere",
      nickname: "Hyped User",
      bio: "Hyped for this chat service",
    };
    next();
  };
}

const app = express();
app.use(express.json());
let client;
jest.setTimeout(30000);
let db;
beforeAll(async () => {
  dotenv.config();
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = await client.db("test-exam-database");
  await app.use(addFakeUserMiddleware(db));
  await app.use("", profileApi(db));

  const user1 = {
    name: "Test1",
    family_name: "User1",
    email: "test1@user.com",
    picture: "coolimagelink",
    nickname: "HYPO EL HYPE",
    bio: "WOOOOW COOL CHAT SERVICE!",
  };

  const user2 = {
    name: "Test",
    family_name: "User",
    email: "test@user.com",
    picture: "imagelinkdoesntmatterhere",
    nickname: "Hyped User",
    bio: "Hyped for this chat service",
  };

  await db.collection("users").insertOne(user1);
  await db.collection("users").insertOne(user2);
});

afterAll(async () => {
  await db.collection("users").deleteMany({});
  await client.close(); // Close the MongoDB connection
});

describe("profile api when not authed", () => {
  it("should return not logged in message with 401 status code", async () => {
    const res = await request(app).get("/profile/test1@user.com");
    const { message, data } = await res.body;
    expect(res.status).toBe(200);
    expect(message).toBe("Successfully found user");
    expect(data.name).toBe("Test1");
    expect(data.family_name).toBe("User1");
    expect(data.email).toBe("test1@user.com");
  });

  it("Should return successfully updated user", async () => {
    const res = await request(app).put("/profile/test@user.com").send({
      email: "doesnmatter",
      nickname: "coolio user",
      bio: "my personal biography",
    });
    const { message, data } = await res.body;
    expect(res.status).toBe(201);
    expect(message).toBe("Successfully updated user");
  });

  it("Should return user not found", async () => {
    const res = await request(app).put("/profile/bladswdaw@dawddwad.com").send({
      email: "doesnmatter",
      nickname: "coolio user",
      bio: "my personal biography",
    });
    const { message, data } = await res.body;
    expect(res.status).toBe(404);
    expect(message).toBe("Could not find user to update!");
  });
});
