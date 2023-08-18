const express = require("express");
const Task = require("../db/models/task.js");
const auth = require("../middleware/auth.js");

const router = new express.Router();

router.get("/tasks", auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        if (req.query.sortBy) {
            const fields = req.query.sortBy.split(":");
            sort[fields[0]] = fields[1] === "desc" ? -1 : 1;
        }
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/tasks/:taskid", auth, async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await Task.findOne({ _id: taskid, author: req.user })

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/tasks", auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            author: req.user._id
        })

        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch("/tasks/:taskid", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ["description", "completed"];

    const validUpdates = updates.every((update) => allowedupdates.includes(update));

    if (!validUpdates) {
        return res.status(400).send("Error: invalid updates !!!");
    }
    try {
        const { taskid } = req.params;

        const task = await Task.findOne({ _id: taskid, author: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            task[update] = req.body[update];
        })
        task.save();
        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/tasks/:taskid", auth, async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskid, author: req.user._id });

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;