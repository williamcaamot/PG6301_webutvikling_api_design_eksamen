import request from "supertest";

import express from "express";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import chatApi from "../api/chatApi.js";

function addFakeUserMiddleware(db) {
    return async (req, res, next) => {
        req.user = { //need to destructure the info from fetching user info because it's not identical across the two providers...
            name: "Test",
            family_name: "User",
            email: "test@user.com",
            picture: "imagelinkdoesntmatterhere",
            nickname: "Hyped User",
            bio: "Hyped for this chat service"
        }
        next();
    };
}

const app = express();
app.use(express.json());
let client;
jest.setTimeout(30000);

beforeAll(async () => {
    dotenv.config();
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    let db = await client.db("test-exam-database");
    await app.use(addFakeUserMiddleware(db));
    await app.use("", chatApi(db));
})

afterAll(async () => {
    await client.close();  // Close the MongoDB connection
});


describe("chat api", () => {

    it("Should return list of chat rooms", async () => {
        const res = await request(app).get("/chatroom");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
    })


    it("Should add a new chat room and return 201", async () => {
        //Arrange
        const title = "Chatroom Title";
        const description = "Best chatroom ever!"

        //Act
        const res = await request(app).post("/chatroom").send({
            title: title, description: description
        });


        //Assert
        expect(res.status).toBe(201);
        expect(res.body.data.length).toBe(24);


        //Cleanup
        await request(app).delete(`/chatroom/${res.body.data}`);
    })

    it("should not create a new chatroom because length too short", async () => {
        //Arrange
        const title = "a";
        const description = "a";

        //Act
        const res = await request(app).post("/chatroom").send({
            title: title, description: description
        })
        //Assert
        expect(res.status).toBe(409);
        expect(res.body.message).toBe("The title or description is not long enough (minimum 5 characters)");

    })


    it("Return chat room created", async () => {
        //Arrange
        const email = "test@user.com";
        const title = "Cool Chatroom";
        const description = "Best chatroom";

        //Act
        const res = await request(app).post("/chatroom").send({
            title: title, description: description
        })
        const res2 = await request(app).get(`/chatroom/owner/${email}`);
        const {message, data} = await JSON.stringify(res2);
        console.log(message);
        //Assert


        //Cleanup
        await request(app).delete(`/chatroom/${res.body.data}`);
    })


    it("should not return chat rooms due to wrong email according to user sending request", async () => {
        //Arrange
        const email = "wrongEmail@email.com";

        //Act
        const res = await request(app).get(`/chatroom/owner/${email}`);
        //Assert
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You can not list other peoples chat rooms");

    })

})

