import express from "express";

function profileApi(db) {
  const router = express.Router();

  router.get("/profile/:email", async (req, res) => {
    try {
      if (!req.user) {
        res.status(401);
        res.json({ message: "You must be logged in to view user profiles" });
        return;
      }
      const email = req.params.email;

      const user = await db.collection("users").findOne({ email: email });
      if (user) {
        res.status(200);
        res.json({ message: "Successfully found user", data: user });
      } else {
        res.status(404);
        res.json({ message: "Could not find user" });
      }
    } catch (e) {
      res.status(404);
      res.json("Internal server error");
    }
  });

  router.put("/profile/:email", async (req, res) => {
    try {
      const email = req.params.email;
      if (!req.user) {
        res.status(401);
        res.json({ message: "You must be logged in to change user details!" });
        return;
      }
      if (req.body.nickname.length < 5) {
        res.status(409);
        res.json({
          message: "Your nickname is not long enough! Minimum 5 characters!",
        });
        return;
      }
      const newUser = {
        name: req.user.name,
        family_name: req.user.family_name,
        email: req.user.email,
        picture: req.user.picture,
        nickname: req.body.nickname,
        bio: req.body.bio,
      };
      console.log(email);
      const data = await db.collection("users").findOne({ email: email });
      if (data) {
        if (data.email !== newUser.email) {
          res.sendStatus(401);
        }
        let resdata = await db.collection("users").updateOne(
          { email: email }, // The filter to match the document you want to update
          { $set: newUser }, // The update document
        );
        res.status(201);
        res.json({ message: "Successfully updated user", data: newUser });
      } else {
        res.status(404);
        res.json({ message: "Could not find user to update!" });
      }
    } catch (e) {
      res.json({
        message: "Something went wrong in the server, message: " + e.message,
      });
    }
  });

  return router;
}

export default profileApi;
