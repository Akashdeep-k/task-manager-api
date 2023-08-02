const express = require("express");
require("./db/mongoose.js");
const userModel = require("./db/models/user.js");
const taskModel = require("./db/models/task.js");

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await userModel.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/users/:userid", async (req, res) => {
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

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/tasks/:taskid", async (req, res) => {
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

app.post("/users", async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const task = taskModel(req.body);
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch("/users/:userid", async (req, res) => {
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

app.patch("/tasks/:taskid", async (req, res) => {
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

app.delete("/users/:userid", async (req, res) => {
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

app.delete("/tasks/:taskid", async (req, res) => {
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

app.listen(3000, () => {
    console.log("Server is running on port " + port)
})