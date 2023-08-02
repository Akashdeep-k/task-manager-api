const express = require("express");
const userModel = require("../db/models/user.js");

const router = new express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await userModel.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/users/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await userModel.findById(userid);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post("/users", async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch("/users/:userid", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ["name", "email", "password", "age"];

    const validUpdates = updates.every(update => allowedupdates.includes(update));

    if (!validUpdates) {
        res.status(400).send("Error: invalid updates !!!");
    }

    try {
        const { userid } = req.params;
        const updates = req.body;

        const user = await userModel.findByIdAndUpdate(userid, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete("/users/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await userModel.findByIdAndDelete(userid);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router