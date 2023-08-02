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
    try{
        const user = new userModel(req.body);
        await user.save();
        res.send(user);
    } catch(e){
        res.status(400).send(e);
    }
});

app.post("/tasks", async(req, res) => {
    try{
        const task = taskModel(req.body);
        await task.save();
        res.send(task);
    } catch(e){
        res.status(400).send(e);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port " + port)
})