const express = require("express");
const Task = require("../db/models/task.js");

const router = new express.Router();

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/tasks/:taskid", async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await Task.findById(taskid);

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
        const task = Task(req.body);
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

        const task = await Task.findByIdAndUpdate(taskid, updates, { new: true, runValidators: true });
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
        const task = await Task.findByIdAndDelete(taskid);

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;