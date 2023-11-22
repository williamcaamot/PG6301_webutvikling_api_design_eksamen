import request from "supertest";

import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import loginAPI from "../api/loginAPI.js";

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
});

afterAll(async () => {
  await client.close(); // Close the MongoDB connection
});

describe("login api", () => {
  it("should get google config", async () => {
    const res = await request(app).get("/config/google");
    expect(res.status).toBe(200);
    expect(res.body.openid_configuration.includes("google")).toBe(true);
    expect(res.body.client_id.length).toBeGreaterThan(10);
  });

  it("should try login with google and return 401", async () => {
    const res = await request(app).post("/login/google");
    expect(res.status).toBe(401);
  });

  it("should get entraid config", async () => {
    const res = await request(app).get("/config/entraid");
    expect(res.status).toBe(200);
    expect(
      res.body.openid_configuration_entraid.includes("microsoftonline"),
    ).toBe(true);
    expect(res.body.client_id_entraid.length).toBeGreaterThan(10);
  });

  it("should try login with google and return 401", async () => {
    const res = await request(app).post("/login/entraid");
    expect(res.status).toBe(401);
  });

  it("should delete cookies and return 204", async () => {
    const res = await request(app).delete("/login");
    expect(res.status).toBe(204);
  });

  it("should return not logged in message with 401 status code", async () => {
    const res = await request(app).get("/login");
    const { message, data } = await JSON.stringify(res);
    expect(res.status).toBe(401);
  });
});
