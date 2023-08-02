const express = require("express");
const taskModel = require("../db/models/task.js");

const router = new express.Router();

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/tasks/:taskid", async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await taskModel.findById(taskid);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/tasks", async (req, res) => {
    try {
        const task = taskModel(req.body);
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch("/tasks/:taskid", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ["description", "completed"];

    const validUpdates = updates.every((update) => allowedupdates.includes(update));

    if (!validUpdates) {
        res.status(400).send("Error: invalid updates !!!");
    }
    try {
        const { taskid } = req.params;
        const updates = req.body;

        const task = await taskModel.findByIdAndUpdate(taskid, updates, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/tasks/:taskid", async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await taskModel.findByIdAndDelete(taskid);

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;