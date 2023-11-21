import express from "express";


function chatApi(db){
    const router = express.Router();

    router.get("/chatrooms", (req, res) => {
        const data = "";
        res.json({message:"Success", data: data});
    })


    return router;
}


export default chatApi;